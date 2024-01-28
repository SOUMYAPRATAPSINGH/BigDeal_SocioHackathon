import {useState, useEffect} from 'react';
import axios from "axios";
import { useUser } from '../userContext.jsx';
import logo from "../assets/OpenUp.jpg"
import {FaceDetectionComponent} from "./FaceDetectionComponent.jsx"
import {
  VStack,
  Button,
  Text,
 Container,
 Box,
Flex,

} from '@chakra-ui/react';

import '../pages/Homepage.css'
import {motion} from 'framer-motion'
import { Sidebar } from '../components/Sidebar.jsx';
import {Rules} from '../components/Rules.jsx';
import {QuestionsForm} from '../components/QuestionsForm.jsx';
import { ResultComponent } from '../components/ResultComponents.jsx';
export const Assessment = () => {
  const questionsWithOptions = {
    "Overall how would you rate your mental health?": {
      'Excellent': 0,
      'Somewhat good': 1,
      'Average': 2,
      'Somewhat poor': 3,
      'Poor': 4
    },
    "During the past 4 weeks, have you had any problems with your work or daily life due to any emotional problems, such as feeling depressed, sad or anxious?": {
      'Yes': 4,
      'Some sort': 3,
      'Not sure': 2,
      'May be once or twice': 1,
      'Not at all': 0
    },
    "During the past 4 weeks, how often has your mental health affected your ability to get work done?": {
      'Very often': 4,
      'Somewhat often': 3,
      'May be once or twice': 2,
      'Not so often': 1,
      'Not at all': 0
    },
    "Have you felt particularly low or down for more than 2 weeks in a row?": {
      'Very often': 4,
      'Somewhat often': 3,
      'May be once or twice': 2,
      'Not so often': 1,
      'Not at all': 0
    },
    "During the past two weeks, how often has your mental health affected your relationships?": {
      'Very often': 4,
      'Somewhat often': 3,
      'May be once or twice': 2,
      'Not so often': 1,
      'Not at all': 0
    },
    "During the past 4 weeks, do you think you are going through a tough emotional situation?": {
      'Yes Extremely': 4,
      'Some sort of': 3,
      'May be once or twice': 2,
      'Have to think': 1,
      'Not at all': 0
    },
    "During the past 4 weeks, how often did you get agitated?": {
      'Very often': 4,
      'Somewhat often': 3,
      'May be once or twice': 2,
      'Not so often': 1,
      'Not at all': 0
    }
  }
  
  
  
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
  
        const responseUserData = await axios.get(`/personality-test/data/${userId}`);
        setUserData(responseUserData.data);
        setTestGiven(true);
      } catch (error) {
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
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1 }}
    transition={ {ease:"easeIn",duration:0.60 }}
    exit={{opacity:0}}>
    <Flex direction={{ base: 'column', md: 'row' }} minH="100vh" bgColor={'black'} color="white">
    <Sidebar display={{ base: 'none', md: 'solid' }} />
    <Flex flex="1" direction="column" p="8" ml={{ base: '0', md: '260px' }}>
      {testGiven ? (
        <ResultComponent userData={userData} userinfo={userinfo} />
      ) : (
        <Box p="6" bgColor={'black'} borderRadius="md" boxShadow="md" mb="4" id="PersonalityTest">
          <Container maxW="xl" centerContent>
            <Box
              display={{ base: 'block', md: 'flex' }}
              justifyContent="center"
              p={2}
             
              w="100%"
              m={{ base: '40px 0 15px 0', md: '20px 0 15px 0' }}
             
            >
              <Text fontWeight={'bold'} fontSize={{ base: '7xl', md: '2xl' }}  color="yellow.600">
                Mental state assessment
              </Text>
            </Box>
          </Container>
          <VStack align="center" spacing="4" mt="4">
            <FaceDetectionComponent  />

            {!testStarted && <Rules agreementChecked={agreementChecked} onAgreementChange={setAgreementChecked} />}

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
              <Button colorScheme="teal" onClick={startTest} isDisabled={!agreementChecked} mt="4">
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
  </motion.div>
);
};