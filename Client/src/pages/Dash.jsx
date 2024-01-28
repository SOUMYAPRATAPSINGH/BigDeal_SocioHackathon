import {
  Container,
  VStack,
  HStack,
  Button,
  Box,
  Text,
  Flex,
  Spacer,
} from '@chakra-ui/react';

import { Sidebar } from '../components/Sidebar.jsx';
import { LandingPage } from '../components/LandingPage.jsx';

export const Dash = () => {
  return (
    <Flex minH="100vh" bgGradient="linear(to-r, #89f7fe, #66a6ff)" color="black" direction="column">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Flex
        flex="1"
        direction="column"
        p={{ base: '4', md: '8' }}
        ml={{ base: '0', md: '300px' }} // Adjust margin for mobile view
      >
        {/* Main Content */}
        <Box p={{ base: '4', md: '6' }} bg="#fbd1a2" borderRadius="md" boxShadow="md" mb={{ base: '4', md: '0' }} id="PersonalityTest">
          {/* Feature */}
          <LandingPage />
        </Box>

        {/* Footer component */}
        <Box textAlign="center" mt="auto">
          <Text fontSize="sm" color="gray.500">
            &copy; 2023 Eunoia Dashboard. All rights reserved.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
