import {
  Container,
  VStack,
  HStack,
  Button,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';

import { Sidebar } from "../components/Sidebar.jsx"
import { Booking } from '../components/Booking.jsx';
import '../pages/HomePage.css'

export const Appointment = () => {
  return (
   
    <Flex  minH="100vh"  color="white" bgColor={'black'} direction="column">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Flex
        flex="1"
        direction="column"
        p={{ base: '2', md: '4' }} // Adjust padding for mobile view
      >
        {/* Main Content */}
        <Box
          p={{ base: '2', md: '4' }} // Adjust padding for mobile view
          color={'white'}
          borderRadius="md"
          boxShadow="md"
          
          mb={{ base: '4', md: '8' }} // Adjust margin for mobile view
          id="PersonalityTest"
        >
          {/* Feature */}
          <Booking />
        </Box>

       
      </Flex>
    </Flex>
    
  );
};
