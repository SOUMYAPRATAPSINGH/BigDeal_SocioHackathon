import { useState, useEffect } from "react";
import { StepperComponent} from "../components/Stepper.jsx";
import { Link } from 'react-router-dom';

import {
  Box,
  CircularProgress,
  Flex,
  Text,
  VStack,
  Spacer,
  FormControl,
  HStack,
  CircularProgressLabel,
  FormLabel,
  Textarea,
  Button,
  Progress,
  useBreakpointValue,
  
} from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "../userContext.jsx";

export const UserProfile = () => {
  const { userId } = useUser();
  const [userData, setUserData] = useState(null);
  const [mentalHealthStatus, setMentalHealthStatus] = useState(70);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/userdata/${userId}`);
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (userId) {
      getUserData();
    }
  }, [userId]);
  let num;

if (userData) {
  num = userData.adviceScore;
} else {
  num =0
}

const score = num ? Math.round((num / 28) * 100) : 0; 
const handlePersonalityTest = () => {
    console.log("Starting Personality Test...");
  };

  const animatedBoxStyle = {
    animation: "breathe 3s infinite",
  };

  const isMobile = useBreakpointValue({ base: true, md: false });
   
  

  return (
    <div>
      <Flex
        bg="#fbd1a2"
        border={2}
        borderRadius={10}
        justify="space-between"
        align="center"
        px={{ base: 4, md: 6, lg: 8 }}
        py={8}
        direction={isMobile ? "column" : "row"}
      >
        <VStack spacing={4} align="start">
          <Text fontSize="2xl" fontWeight="bold" color="gray.900">
            Welcome Back, {userData && userData.name}!
          </Text>
          <Text fontSize="sm" color="gray.500">
            "Mental health is crucial for overall well-being. It affects how we
            think, feel, and handle stress. Prioritizing mental health fosters
            resilience, positive relationships, and a fulfilling life journey."
          </Text>
        </VStack>
        <Spacer />
      </Flex>

      <Box
        mt={5}
        bg="gray.100"
        borderRadius={10}
        align="center"
        px={{ base: 4, md: 6, lg: 8 }}
        py={8}
        direction={isMobile ? "column" : "row"}
      >
        <VStack spacing={4} align="start" ml={isMobile ? 0 : 8}>
          <Text fontSize="lg" fontWeight="bold" color="gray.900">
            Mental Health Status Tracker
          </Text>
          <Progress colorScheme="teal" value={mentalHealthStatus} size="md" />
          <CircularProgress value={`${userData && score}`} color='green.400'>
            <CircularProgressLabel color="black">{userData && score}%</CircularProgressLabel>
          </CircularProgress>
          <Text fontSize="sm" color="gray.500">
            Current Mental Health Status: {score}%
          </Text>

          <Text color="black" as="h2" className="sr-only">
            Stages
          </Text>

          <Flex align="center" mt={4}>
            <Box overflow="hidden" rounded="full" bg="gray.200" w="1/2">
              <Box h="2" rounded="full" bg="blue.500"></Box>
            </Box>

            <Spacer />

          < StepperComponent score={score}/>
          </Flex>
        </VStack>
      </Box>

      <Box
        mt={5}
        bg="gray.100"
        borderRadius={10}
        px={{ base: 4, md: 6, lg: 8 }}
        py={8}
        direction={isMobile ? "column" : "row"}
        style={animatedBoxStyle}
      >
        <Text pl={7} fontSize="lg" fontWeight="bold" color="gray.900">
          Advice
        </Text>
        <Text mt={8} fontSize="sm" color="gray.500">
        A counselor provides empathetic guidance, helping individuals navigate challenges, explore emotions, and develop coping strategies. Through active listening and support, counselors empower clients to enhance their well-being and make positive life choices.
        </Text>
        <Text
          id="OrderNotes"
          mt="2"
          rounded="lg"
          border="1px"
          borderColor="gray.200"
          boxShadow="sm"
          fontSize="md"
          rows="4"
          color="green"
          placeholder="Test not taken..."
        > {userData && userData.advice}</Text>
        <Spacer/>
        <Button
          mt={3}
          colorScheme="blue"
          variant="solid"
          onClick={handlePersonalityTest}
        >
         <Link to="/assessment">Take test</Link> 
        </Button>
      </Box>

      <Flex
  mt={5}
  bg="gray.100"
  borderRadius={10}
  align="center"
  px={{ base: 4, md: 6, lg: 8 }}
  py={8}
  direction={isMobile ? "column" : "row"}
  color={"black"}
>
  <VStack spacing={8} align="start" ml={isMobile ? 0 : 8} width={isMobile ? "100%" : "auto"}>
    <Text fontSize="lg" fontWeight="bold" color="gray.900">
      Personality Test Session
    </Text>
    <Text fontSize="sm" color="gray.500">
      Personality tests offer valuable insights into individual traits, behaviors, and preferences, fostering self-awareness. They aid in career choices, relationship dynamics, and personal growth, enhancing overall understanding and development.
    </Text>
    <HStack justify="space-between" spacing={isMobile ? 4 : 20} width="100%">
      <CircularProgress value={40} color='green.400'>
        <CircularProgressLabel>59%</CircularProgressLabel>
      </CircularProgress>
      <CircularProgress value={40} color='green.400'>
        <CircularProgressLabel>50%</CircularProgressLabel>
      </CircularProgress>
      <CircularProgress value={40} color='green.400'>
        <CircularProgressLabel>70%</CircularProgressLabel>
      </CircularProgress>
      <CircularProgress value={40} color='green.400'>
        <CircularProgressLabel>80%</CircularProgressLabel>
      </CircularProgress>
      <CircularProgress value={40} color='green.400'>
        <CircularProgressLabel>90%</CircularProgressLabel>
      </CircularProgress>
    </HStack>
    <Button
      colorScheme="teal"
      variant="solid"
      onClick={handlePersonalityTest}
      mt={isMobile ? 4 : 0}
      width={isMobile ? "100%" : "auto"}
    >
      <Link to="/personality-test">View Results </Link>
    </Button>
  </VStack>
</Flex>

    </div>
  );
};


