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
    <div>
    <Flex minH="100vh" bgColor={'black'} color="white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Flex
        flex="1"
        direction="column"
        p="8"
        ml={{ base: '0', md: '300px' }} // Adjust margin for mobile view
      >
        {/* Main Content */}
        <Box p="6" bg="black" borderRadius="md" boxShadow="md" mb="4" id="PersonalityTest">
          {/* Feature */}
          <LandingPage />
        </Box>

        
      </Flex>
    </Flex></div>
  );
};
