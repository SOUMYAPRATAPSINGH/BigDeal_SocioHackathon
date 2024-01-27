// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
// Custom components
import React, { useRef, useState } from "react";
import {motion} from 'framer-motion'


export const LandingPage=()=> {
  const textColor = 'green.200';
  const textColor2 ='yellow.500'
 

  const aboutTab = useRef();


  return (
    <motion.div 
    initial={{x:"100%"}}
    animate={{x:"0%" }}
    transition={ {ease:"easeIn",duration:0.80 }}
    exit={{opacity:1}}>
    <Flex
      direction="column"
      minH="100vh"
      align="center"
      pt={{ sm: "125px", lg: "75px" }}
    >
      <Flex
        direction="column"
        textAlign="center"
        mb={{ sm: "25px", md: "45px" }}
      >
        <Text
          color={textColor}
          fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="bold"
          mb="8px"
        >
          Build your profile
        </Text>
        <Text
          color="gray.400"
          fontWeight="normal"
          fontSize={{ sm: "sm", md: "lg" }}
        >
          This information will let us know more about you.
        </Text>
      </Flex>
      <Tabs variant="unstyled" mt="24px" display="flex" flexDirection="column">
        <TabList
          display="flex"
          align="center"
          alignSelf="center"
          justifySelf="center"
        >
          <Tab
            ref={aboutTab}
            _focus="none"
            w={{ sm: "120px", md: "250px", lg: "300px" }}
            onClick={() =>
              setActiveBullets({
                about: true,
                account: false,
                address: false
              })
            }
          >
            
           
        </Tab>
        </TabList>
      </Tabs>
    </Flex>
    </motion.div>
  );
}


