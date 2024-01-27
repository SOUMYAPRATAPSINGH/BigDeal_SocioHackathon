import React from 'react'
import {Container, Box, Text} from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from "../components/Login.jsx"
import SignUp from "../components/SignUp.jsx"
import '../pages/HomePage.css'
import '@fontsource/ubuntu-mono';
import {motion} from 'framer-motion'
export const HomePage = () => {
  return (
    <motion.div
    initial={{opacity:0.5}}
    animate={{opacity:1 }}
    transition={ {ease:"easeIn",duration:0.80 }}
    exit={{opacity:0.5}}>
    <div className="Home">
      <Container maxW="xl" centerContent>
          <Box 
          display={"flex"}
          justifyContent="center"
          p={3}
          w="100%"
          m="40px 0 15px 0"
          
          >
              <Text fontSize='6xl' fontWeight={'bold'} color="green.200">Eunoia</Text>
          </Box>

          <Box bg="black" w='100%' p={4} >

          <Tabs variant='soft-rounded' >
          <TabList>
            <Tab width="50%" >Login</Tab>
            <Tab width="50%" >Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
          </Tabs>
          </Box>
      </Container>
      </div>
      </motion.div>
  )
}

