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

export const Appointment = () => {
  return (
    <Flex minH="100vh" bgGradient="linear(to-r, #89f7fe, #66a6ff)" color="white" direction="column">
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
          bg="white"
          borderRadius="md"
          boxShadow="md"
          mb={{ base: '4', md: '8' }} // Adjust margin for mobile view
          id="PersonalityTest"
        >
          {/* Feature */}
          <Booking />
        </Box>

        {/* Footer component */}
        <Box textAlign="center" p="2">
          <Text fontSize="sm" color="gray.500">
            &copy;2024 Eunoia. All rights reserved.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
