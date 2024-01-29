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
import '../pages/HomePage.css'
export const IntakeForm = () => {
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  return (
    <motion.div 
    
    className='Home'
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={ {ease:"easeOut",duration:0.5 }}
    exit={{opacity:0}}>
    <Flex direction={isMobile ? 'column' : 'row'} minH="100vh" bgColor={'black'} color="white">
      {/* Sidebar */}
      {isMobile ? null : <Sidebar />}

      {/* Main Content */}
      <Flex flex="1" direction="column" p="4" ml={isMobile ? '0' : '300px'}>
        {/* Main Content */}
        <Box p="4" bg="black" borderRadius="md" boxShadow="md" mb="4" id="IntakeForm">
          {/* Questions */}
          <UserProfile />
        </Box>

        {/* Footer component */}
        <Box mt="auto" textAlign="center">
          <Text fontSize="sm" color="gray.500">

            &copy; Eunoia 2024. All rights reserved.

          </Text>
        </Box>
      </Flex>

      {/* Sidebar for mobile view */}
      {isMobile && <Sidebar />}
    </Flex>
    </motion.div>
  );
};
