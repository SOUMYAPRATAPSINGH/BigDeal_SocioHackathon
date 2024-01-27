import React from 'react';
import {
  Flex,
  Box,
  Text,
  Spacer,
  useMediaQuery,
} from '@chakra-ui/react';
import { Sidebar } from '../components/Sidebar.jsx';
import { UserProfile } from '../pages/UserProfile.jsx';
import { animate, easeIn, motion } from 'framer-motion'

export const IntakeForm = () => {
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  return (
    <motion.div
    
    >
    <Flex direction={isMobile ? 'column' : 'row'} minH="100vh" bgColor={'black'} color="white">
      {/* Sidebar */}
      {isMobile ? null : <Sidebar />}

      {/* Main Content */}
      <Flex flex="1" direction="column" p="4" ml={isMobile ? '0' : '300px'}>
        {/* Main Content */}
        <Box p="4" bg="white" borderRadius="md" boxShadow="md" mb="4" id="IntakeForm">
          {/* Questions */}
          <UserProfile />
        </Box>

        {/* Footer component */}
        <Box mt="auto" textAlign="center">
          <Text fontSize="sm" color="gray.500">
            &copy; 2023 Naruto Dashboard. All rights reserved.
          </Text>
        </Box>
      </Flex>

      {/* Sidebar for mobile view */}
      {isMobile && <Sidebar />}
    </Flex>
    </motion.div>
  );
};
