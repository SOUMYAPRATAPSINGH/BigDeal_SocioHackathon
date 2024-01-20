import {useState, useEffect} from 'react';
import logo from "../assets/logo.png";
import axios from "axios";
import { useUser } from '../userContext.jsx';
import {
  VStack,
  Button,
  Text,
 Image,Container,
 Box,
Flex,

} from '@chakra-ui/react';
import { Sidebar } from '../components/Sidebar.jsx';
import {TestRules} from '../components/TestRules.jsx';
import {QuestionsForm} from '../components/QuestionsForm.jsx';
import { ResultComponent } from '../components/ResultComponents.jsx';
export const Questions = () => {
  const questionsWithOptions = {
    "I am not a worrier.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I like to have a lot of people around me.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I enjoy concentrating on a fantasy or daydream and exploring all its possibilities, letting it grow and develop.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I try to be courteous to everyone I meet.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I keep my belongings neat and clean.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "At times I have felt bitter and resentful.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I laugh easily.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I think it's interesting to learn and develop new hobbies.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "At times I bully or flatter people into doing what I want them to.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I'm pretty good about pacing myself so as to get things done on time.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "When I'm under a great deal of stress, sometimes I feel like I'm going to pieces.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I prefer jobs that let me work alone without being bothered by other people.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I am intrigued by the patterns I find in art and nature.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "Some people think I'm selfish and egotistical.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I often come into situations without being fully prepared.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I rarely feel lonely or blue.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I really enjoy talking to people.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I believe letting students hear controversial speakers can only confuse and mislead them.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "If someone starts a fight. I'm ready to fight back.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I try to perform all the tasks assigned to me conscientiously.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I often feel tense and jittery.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I like to be where the action is.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "Poetry has little or no effect on me.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I'm better than most people, and I know it.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I have a clear set of goals and work toward them in an orderly fashion.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "Sometimes I feel completely worthless.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I shy away from crowds of people.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I would have difficulty just letting my mind wander without control or guidance.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "When I've been insulted, I just try to forgive and forget.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I waste a lot of time before settling down to work.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I rarely feel fearful or anxious.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I often feel as if I'm bursting with energy.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I seldom notice the moods or feelings that different environments produce.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I tend to assume the best about people.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I work hard to accomplish my goals.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I often get angry at the way people treat me.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I am a cheerful, high-spirited person.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I experience a wide range of emotions or feelings.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "Some people think of me as cold and calculating.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "When I make a commitment, I can always be counted on to follow through.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "Too often, when things go wrong, I get discouraged and feel like giving up.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I don't get much pleasure from chatting with people.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "Sometimes when I am reading poetry or looking at a work of art, I feel a chill or wave of excitement.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I have no sympathy for beggars.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "Sometimes I'm not as dependable or reliable as I should be.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I am seldom sad or depressed.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "My life is fast-paced.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I have little interest in speculating on the nature of the universe or the human condition.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I generally try to be thoughtful and considerate.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I am a productive person who always gets the job done.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I often feel helpless and want someone else to solve my problems.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I am a very active person.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I have a lot of intellectual curiosity.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "If I don't like people, I let them know it.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I never seem to be able to get organized.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "At times I have been so ashamed I just wanted to hide.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "I would rather go my own way than be a leader of others.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I often enjoy playing with theories or abstract ideas.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
    "If necessary, I am willing to manipulate people to get what I want.": { 'Strongly Disagree': 4, Disagree: 3, Neutral: 2, Agree: 1, 'Strongly Agree': 0 },
    "I strive for excellence in everything I do.": { 'Strongly Disagree': 0, Disagree: 1, Neutral: 2, Agree: 3, 'Strongly Agree': 4 },
  };
  
  
  
  const questions = Object.keys(questionsWithOptions);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [testGiven, setTestGiven] = useState(false);
  const [userData, setUserData] = useState();
  const { userId } = useUser();
  const [userinfo, setUserinfo] = useState(); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from the backend API using the userId
        const responseUserInfo = await axios.get(`/userdata/${userId}`);
        setUserinfo(responseUserInfo.data);
        console.log("User Info", responseUserInfo.data);
  
        const responseUserData = await axios.get(`/personality-test/data/${userId}`);
        setUserData(responseUserData.data);
        setTestGiven(true);
        console.log("personality-test", responseUserData.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
  
    if (userId) {
      fetchData();
    }
  }, [userId]);
  

  useEffect(() => {
    if (isTimerRunning) {
      const timerInterval = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          setIsTimerRunning(false);
          clearInterval(timerInterval);
          handleRestartTest();
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timer, isTimerRunning]);

  const handleOptionChange = (value) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = value;
    setSelectedOptions(updatedOptions);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleSubmission = async () => {
    const selectedIndices1 = Array.from({ length: 12 }, (_, index) => index * 5);
    const selectedIndices2 = Array.from({ length: 12 }, (_, index) => index + 1);
    const selectedIndices3 = Array.from({ length: 12 }, (_, index) => index + 2);
    const selectedIndices4 = Array.from({ length: 12 }, (_, index) => index + 3);
    const selectedIndices5 = Array.from({ length: 12 }, (_, index) => index + 4);

    const N = selectedIndices1.reduce((sum, index) => sum + (selectedOptions[index] || 0), 0);
    const E = selectedIndices2.reduce((sum, index) => sum + (selectedOptions[index] || 0), 0);
    const O = selectedIndices3.reduce((sum, index) => sum + (selectedOptions[index] || 0), 0);
    const A = selectedIndices4.reduce((sum, index) => sum + (selectedOptions[index] || 0), 0);
    const C = selectedIndices5.reduce((sum, index) => sum + (selectedOptions[index] || 0), 0);

    const resultArray = [N, E, O, A, C];

    const personalityTestData = {
      openness: N,
      conscientiousness: E,
      extraversion: O,
      agreeableness: A,
      neuroticism: C,
    };
    console.log(personalityTestData);

    const openness= N;
    const conscientiousness= E
    const extraversion= O
    const agreeableness= A
    const neuroticism= C

    try {
      const response = await axios.post(`/personality-test/${userId}`, {
        openness,
        conscientiousness,
        extraversion,
        agreeableness,
        neuroticism,
      });
  
      if (response.status === 200) {
        console.log('Personality test data submitted successfully!');
        setTestGiven(true);
  
        // Reload the page after the test is submitted
        window.location.reload();
      } else {
        console.error('Error submitting personality test data:', response.statusText);
      }
  
      setTestGiven(true);
    } catch (error) {
      console.error('Error submitting personality test data:', error.message);
    }
  };
  const startTest = () => {
    setTestStarted(true);
    setIsTimerRunning(true);
  };

  const handleRestartTest = () => {
    setTimer(600);
    setIsTimerRunning(false);
    setTestStarted(false);
    setAgreementChecked(false);
    setCurrentQuestion(0);
    setSelectedOptions(Array(questions.length).fill(null));
  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minH="100vh" bgGradient="linear(to-r, #89f7fe, #66a6ff)" color="white">
      <Sidebar display={{ base: 'none', md: 'solid' }} />
      <Flex flex="1" direction="column" p="8" ml={{ base: '0', md: '260px' }}>
        {testGiven ? (
          <ResultComponent userData={userData} userinfo={userinfo}/>
        ) : (
          <Box p="6" bg="white" borderRadius="md" boxShadow="md" mb="4" id="PersonalityTest">
            <Container maxW="xl" centerContent>
              <Box
                display={{ base: 'block', md: 'flex' }}
                justifyContent="center"
                p={3}
                bg={'white'}
                w="100%"
                m={{ base: '40px 0 15px 0', md: '20px 0 15px 0' }}
                borderRadius="lg"
                borderWidth="1px"
              >
                <Text fontSize={{ base: '4xl', md: '2xl' }} fontFamily="Work Sans" color="black">
                  Personality Test
                </Text>
              </Box>
            </Container>
            <VStack align="center" spacing="4" mt="4">
              <Image src={logo} alt="Personality Test Logo" boxSize={{ base: '200px', md: '150px' }} />

              {!testStarted && <TestRules agreementChecked={agreementChecked} onAgreementChange={setAgreementChecked} />}

              {testStarted && currentQuestion < questions.length && (
                <QuestionsForm
                  currentQuestion={currentQuestion}
                  questions={questions}
                  options={questionsWithOptions[questions[currentQuestion]]}
                  selectedOptions={selectedOptions}
                  onOptionChange={handleOptionChange}
                  onNextQuestion={handleNextQuestion}
                  onSubmit={handleSubmission}
                  timer={timer}
                />
              )}

              {!testStarted && (
                <Button
                  colorScheme="teal"
                  onClick={startTest}
                  isDisabled={!agreementChecked}
                  mt="4"
                >
                  Start Test
                </Button>
              )}
            </VStack>
          </Box>
        )}
        <Box mt="auto" textAlign="center">
          <Text fontSize="sm" color="gray.500">
            &copy; 2024 Eunoia. All rights reserved.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};