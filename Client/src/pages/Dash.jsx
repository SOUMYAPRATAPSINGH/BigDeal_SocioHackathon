import {
 
  Box,
  Text,
  Flex,
  
} from '@chakra-ui/react';

import { Sidebar } from '../components/Sidebar.jsx';
import { LandingPage } from '../components/LandingPage.jsx';
import '../pages/HomePage.css'
import '@fontsource/ubuntu-mono';
export const Dash = () => {
  return (

    <div className='Home'>
    <Flex minH="100vh" bgColor={'black'} color="white" >

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

        <Box p="6" bg="black"  borderRadius="md" boxShadow="md" mb="4" id="PersonalityTest">

          {/* Feature */}
          <LandingPage />
        </Box>


        

      </Flex>
    </Flex></div>
  );
};
