import {useState, useEffect} from 'react';
import axios from "axios";
import { useUser } from '../userContext.jsx';
import logo from "../assets/OpenUp.jpg"
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
        const responseUserInfo = await axios.get(`http://localhost:3000/userdata/${userId}`);
        setUserinfo(responseUserInfo.data);
  
        const responseUserData = await axios.get(`http://localhost:3000/personality-test/data/${userId}`);
        setUserData(responseUserData.data);
        setTestGiven(true);
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

    const openness= N;
    const conscientiousness= E
    const extraversion= O
    const agreeableness= A
    const neuroticism= C

    try {
      const response = await axios.post(`http://localhost:3000/personality-test/${userId}`, {
        openness,
        conscientiousness,
        extraversion,
        agreeableness,
        neuroticism,
      });
  
      if (response.status === 200) {
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