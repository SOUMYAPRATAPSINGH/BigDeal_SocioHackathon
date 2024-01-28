AWS_SDK_LOAD_CONFIG=1

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const env = require('dotenv');
const OpenAI = require('openai');
const multer = require("multer");
const app = express();
const port = 3000;
const AWS = require("aws-sdk");
const pako=require("pako")
app.use(cors());
app.use(express.json());
env.config();

mongoose.connect(`mongodb+srv://abish:l2TFchymzqLLYAOY@cluster0.btfwxae.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: "admin", 
});
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});


const Polly = new AWS.Polly({
  signatureVersion: "v4",
  region: "us-east-1",
});

AWS.config.logger = console;

// Now you can use AWS SDK functionality, e.g., creating an S3 client
// const s3 = new AWS.S3();

// // Example: List all S3 buckets
// s3.listBuckets((err, data) => {
//   if (err) {
//     console.error('Error listing buckets:', err);
//   } else {
//     console.log('S3 Buckets:', data.Buckets);
//   }
// });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  age: Number,
  maritalStatus: String,
  gender: String,
  password: String,
  personalityTestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalityTest',
  },
  advice: {
    type:String,
    default:"Test Not Taken",
  },
  adviceScore:{type:Number,
    default:0,
  }
});

const personalityTestSchema = new mongoose.Schema({
  openness: Number,
  conscientiousness: Number,
  extraversion: Number,
  agreeableness: Number,
  neuroticism: Number,
  personalityDescription: [
    {
      trait: String,
      description: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

});

const User = mongoose.model('User', userSchema);
const PersonalityTest = mongoose.model('PersonalityTest', personalityTestSchema);

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied. Token not provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });

    req.user = user;
    next();
  });
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const upload = multer();
app.use(express.json({ limit: "1500mb" }));
app.use(express.urlencoded({ extended: true, limit: "1500mb" }));


async function getPromptApi(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: prompt,
      temperature: 0.6,
      max_tokens: 1000,
    });
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

app.post("/api/chat", upload.single("audio"), async (req, res) => {
  try {
    const sessionResponse = {
      transcription: null,
      chatResponse: null,
      audioResponse: null,
      messages: null,
    };

    console.log("Received request with body:", req.body);

    sessionResponse.messages = req.body.messages;
    console.log(req.body.audio)
    if (req.body.audio) {
      // Assuming req.body.audio is a base64-encoded string
      const base64Audio = req.body.audio;
      const base64Data = base64Audio.replace(/\s/g, ''); // Remove line breaks and whitespaces
    
      // Compress the audio data using pako
      const compressedData = pako.deflate(base64Data);
    
      const trimmedAudio = { compressedData };
    
      const buf = Buffer.from(compressedData, "base64");
      buf.name = "sound.webm";
  
      const response = await getPromptApi(buf, `whisper-1`);

      console.log("Transcription response:", response.data);

      sessionResponse.transcription = response.data.text;
      sessionResponse.messages.push({
        role: "user",
        content: sessionResponse.transcription,
      });
    }

    console.log("sessionResponse.messages___________________", sessionResponse.messages);

    // Fetch chat completion response from OpenAI API
    try {
      const chatCompletionResponse = await getPromptApi(sessionResponse.messages);

      console.log("___________________", chatCompletionResponse.choices[0].message.content);

      if (
        chatCompletionResponse &&
        chatCompletionResponse.choices &&
        chatCompletionResponse.choices.length > 0 &&
        chatCompletionResponse.choices[0].message
      ) {
        const lastChatMessage = chatCompletionResponse.choices[0].message;

        sessionResponse.messages.push({
          role: lastChatMessage.role,
          content: lastChatMessage.content,
        });

        const pollyParams = {
          Text: lastChatMessage.content,
          OutputFormat: "mp3",
          VoiceId: req.body.voiceId || "Joanna",
          Engine: "neural",
        };
        console.log('----------------------------------------------',pollyParams)
        Polly.synthesizeSpeech(pollyParams, (err, data) => {
          if (err) {
            console.log("Error synthesizing speech:", err);
            res.status(500).json({ error: "Error synthesizing speech" });
          } else if (data) {
            const audioBuffer = Buffer.from(data.AudioStream);
            const audioDataURI = `data:${data.ContentType};base64,${audioBuffer.toString(
              "base64"
            )}`;
            data.audioDataURI = audioDataURI;

            sessionResponse.audio = data;
            console.log("Session response:", sessionResponse);
            res.status(200).json(sessionResponse);
          }
        });
      } 
    } catch (err) {
      console.error("Invalid or empty response from OpenAI API");
      res.status(500).json({ error: "Invalid or empty response from OpenAI API" });
    }
  } catch (err) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Signup route with JWT token
app.post('/signup', async (req, res) => {
  try {
    const { email, name, phoneNumber, age, maritalStatus, gender, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // Create a new user
    const newUser = new User({ email, name, phoneNumber, age, maritalStatus, gender, password });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token with email and user ID
    const token = jwt.sign(
      { userId: newUser._id, name, email, phoneNumber, age, maritalStatus, gender },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with the token
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the password matches
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If both email and password match, generate a token
    const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send the token and user ID in the response
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/payment/orders', async (req, res) => {
  console.log('order');
  try {
    const instance = new Razorpay({
      key_id: process.env.RZYKEY_ID,
      key_secret: process.env.RZYSECRET_KEY,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something Went Wrong' });
      }
      console.log(order);
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/payment/orders', (req, res) => {
  res.send('Hey');
});

app.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac('sha256', process.env.RZY_SECRET_KEY)
      .update(sign.toString())
      .digest('hex');

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    } else {
      return res.status(200).json({ message: 'Payment verified successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/userdata/:id', async (req, res) => {
  // Assuming the requested user ID is in the request parameters
  const requestedUserId = req.params.id;
  console.log(requestedUserId)
  try {
    // Fetch user data from the database based on the requested user ID
    const requestedUser = await User.findById(requestedUserId);

    // Check if the requested user exists
    if (!requestedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the requested user ID matches the authenticated user's ID
   else{
    const userData = {
      userId: requestedUser._id,
      name: requestedUser.name,
      email: requestedUser.email,
      phoneNumber: requestedUser.phoneNumber,
      age: requestedUser.age,
      maritalStatus: requestedUser.maritalStatus,
      gender: requestedUser.gender,
      advice: requestedUser.advice,
      adviceScore:requestedUser.adviceScore,
    };
      console.log(userData)
    res.status(200).json(userData);

   }

    // If it matches, construct the user data response
    
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/personality-test/:userId', async (req, res) => {
  try {
    const { openness, conscientiousness, extraversion, agreeableness, neuroticism } = req.body;
    const personalityTestData = {
      openness,
      conscientiousness,
      extraversion,
      agreeableness,
      neuroticism,
      personalityDescription: [
        {
          trait: 'Openness',
          description: 'High scorers are often inventive, open-minded, and ready to embrace new ideas or experiences...',
        },
        // Add descriptions for other traits
      ],
      user: req.params.userId,
    };

    const personalityTest = await PersonalityTest.create(personalityTestData);
    console.log(personalityTest)
    // Update the User model with the personality test ID
    const updateUser = await User.findByIdAndUpdate(req.params.userId, { personalityTestId: personalityTest._id });
    console.log( updateUser)
    res.status(200).json({
      message: 'Personality test created successfully',
      userId: req.params.userId,
      personalityTestId: personalityTest._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get personality test by user ID
app.get('/personality-test/data/:userId', async (req, res) => {
  try {
    // Find the user by their ID and get the personalityTestId
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const personalityTestId = user.personalityTestId;

    // Use the personalityTestId to find the associated PersonalityTest
    const personalityTestData = await PersonalityTest.findById(personalityTestId);

    if (!personalityTestData) {
      return res.status(404).json({ error: 'Personality Test not found' });
    }
   console.log(personalityTestData)
    res.status(200).json(personalityTestData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Mental Assessment


async function getPrompt(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: prompt,
      temperature: 0.6,
      max_tokens: 1000,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


app.post('/assessment-test/:userId', async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(user)
    const updatedb = async (ans, sum) => {
      console.log(ans)
    
      await User.updateOne(
        { _id: user._id },
        { $set: { advice: ans, adviceScore: sum } }
      )
      .then((result) => {
        console.log(`Updated`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };
    

    // Calculating the score
    const scores = req.body.selectedOptions;
    let sum = 0;

    for (const key in scores) {
      if (scores.hasOwnProperty(key)) {
        sum += parseInt(scores[key]);
      }
    }

    console.log(sum);

    let ans = '';

    if (sum >= 16) {
      // Initial phase of anxiety
      const message = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'I need tips on mental health?' },
        {
          role: 'assistant',
          content:
            "It seems like you are in good mental health, which is wonderful to hear. However, remember that mental health can fluctuate, so it's essential to continue practicing self-care and reach out for support if you ever feel the need. Keep up the positive attitude.",
        },
      ];
      ans = await getPrompt(message);
      console.log(ans)
      updatedb(ans, sum);
      res.redirect('/Account');
    } else if (sum >= 12 && sum <= 16) {
      const message = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'I need tips on mental health?' },
        {
          role: 'assistant',
          content:
            "It appears that you may be experiencing some mild mental health symptoms. It's important to acknowledge these feelings and consider seeking support. Remember, reaching out to friends, family, or a mental health professional can make a significant difference in how you feel.",
        },
      ];
      ans = await getPrompt(message);
      updatedb(ans, sum);
      res.redirect('/Account');
    } else if (sum >= 8 && sum <= 12) {
      const message = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'I need tips on mental health?' },
        {
          role: 'assistant',
          content:
            "Your responses indicate that you may be dealing with moderate mental health symptoms. It's essential to prioritize your well-being and consider speaking with a mental health professional. They can provide guidance and support to help you manage these challenges.",
        },
      ];
      ans = await getPrompt(message);
      updatedb(ans, sum);
      res.redirect('/Account');
    } else {
      const message = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'I need tips on mental health?' },
        {
          role: 'assistant',
          content:
            "Your answers suggest that you are facing severe mental health symptoms. It's crucial to seek immediate help and not face these challenges alone. Reach out to a mental health professional, a trusted friend, or a helpline right away. You don't have to go through this on your own, and there is support available.",
        },
      ];
      ans = await getPrompt(message);
      updatedb(ans, sum);
      res.redirect('/Account');
    }
  } catch (error) {
    console.error('Error processing assessment test:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});