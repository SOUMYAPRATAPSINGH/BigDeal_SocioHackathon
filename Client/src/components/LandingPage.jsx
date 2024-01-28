// Chakra imports
import {
  Flex,
  TabList,
  Tabs,
  Text,Image
} from "@chakra-ui/react";
// Custom components
import React, {  useState } from "react";
import image from "../assets/C.jpg";
import {motion} from 'framer-motion'
//  const [name,setName]=useState("hh")
//  const [email,setemail] =useState("")
import '@fontsource/ubuntu-mono';

export const LandingPage=()=> {
  const textColor = 'green.200';
  const textColor2 ='yellow.500'
  const img =`${image}`
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
      
      pt={{ sm: "125px", lg: "5px" }}
    >
      <Flex
        direction="column"
        textAlign="center"
        mb={{ sm: "25px", md: "45px" }}
      >
        <Text
          color={textColor}
          fontSize={{ sm: "2xl", md: "3xl", lg: "8xl" }}
          fontWeight="bold"
          mb="9px"    
             
        >
          Eunoia
        </Text>
        <Text
          color="gray.400"
          fontWeight="normal"
          fontSize={{ sm: "sm", md: "lg" }}
        >
          A mental health support system with the power of AI.
        </Text>
        <Text
          color="gray.400"
          fontWeight="normal"
          fontSize={{ sm: "sm", md: "lg" }}
        >
          One idea can change minds.
        </Text>
        <Text
          color="yellow.600"
          fontWeight="bold"
          fontSize={{ sm: "sm", md: "lg" }}
        >
          One advise can save people.
        </Text>
        <Image src={img} h={'66vh'}></Image>
      </Flex>
      <Tabs variant="unstyled" mt="24px" display="flex" flexDirection="column">
        <TabList
          display="flex"
          align="center"
          alignSelf="center"
          justifySelf="center"
        >
          
        </TabList>
      </Tabs>
    </Flex>
    </motion.div>
  );
}


