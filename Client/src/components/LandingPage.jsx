// // Chakra imports
// import {
//   Avatar,
//   Box,
//   Button,
//   Checkbox,
//   Flex,
//   FormControl,
//   FormLabel,
//   Grid,
//   Icon,
//   Input,
//   Stack,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Text,
//   useColorModeValue
// } from "@chakra-ui/react";
// // Custom components
// import React, { useRef, useState } from "react";
// import { AiFillSetting } from "react-icons/ai";
// import { BsCircleFill } from "react-icons/bs";
// import { FaCube } from "react-icons/fa";
// import { MdModeEdit } from "react-icons/md";


// export const LandingPage=()=> {
//   const textColor = useColorModeValue("gray.700", "white");
//   const bgPrevButton = useColorModeValue("gray.100", "gray.100");
//   const iconColor = useColorModeValue("gray.300", "gray.700");
//   const [activeBullets, setActiveBullets] = useState({
//     about: true,
//     account: false,
//     address: false
//   });

//   const [checkboxes, setCheckboxes] = useState({
//     design: false,
//     code: false,
//     develop: false
//   });

//   const aboutTab = useRef();
//   const accountTab = useRef();
//   const addressTab = useRef();

//   return (
//     <Flex
//       direction="column"
//       minH="100vh"
//       align="center"
//       pt={{ sm: "125px", lg: "75px" }}
//     >
//       <Flex
//         direction="column"
//         textAlign="center"
//         mb={{ sm: "25px", md: "45px" }}
//       >
//         <Text
//           color={textColor}
//           fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }}
//           fontWeight="bold"
//           mb="8px"
//         >
//           Build your profile
//         </Text>
//         <Text
//           color="gray.400"
//           fontWeight="normal"
//           fontSize={{ sm: "sm", md: "lg" }}
//         >
//           This information will let us know more about you.
//         </Text>
//       </Flex>
//       <Tabs variant="unstyled" mt="24px" display="flex" flexDirection="column">
//         <TabList
//           display="flex"
//           align="center"
//           alignSelf="center"
//           justifySelf="center"
//         >
//           <Tab
//             ref={aboutTab}
//             _focus="none"
//             w={{ sm: "120px", md: "250px", lg: "300px" }}
//             onClick={() =>
//               setActiveBullets({
//                 about: true,
//                 account: false,
//                 address: false
//               })
//             }
//           >
//             <Flex
//               direction="column"
//               justify="center"
//               align="center"
//               position="relative"
//               _before={{
//                 content: "''",
//                 width: { sm: "120px", md: "250px", lg: "300px" },
//                 height: "3px",
//                 bg: activeBullets.account ? textColor : "gray.200",
//                 left: { sm: "12px", md: "26px" },
//                 top: { sm: activeBullets.about ? "6px" : "4px", md: null },
//                 position: "absolute",
//                 bottom: activeBullets.about ? "40px" : "38px",
//                 zIndex: -1,
//                 transition: "all .3s ease"
//               }}
//             >
//               <Icon
//                 as={BsCircleFill}
//                 color={activeBullets.about ? textColor : "gray.300"}
//                 w={activeBullets.about ? "16px" : "12px"}
//                 h={activeBullets.about ? "16px" : "12px"}
//                 mb="8px"
//               />
//               <Text
//                 color={activeBullets.about ? { textColor } : "gray.300"}
//                 fontWeight={activeBullets.about ? "bold" : "normal"}
//                 display={{ sm: "none", md: "block" }}
//                 fontSize="sm"
//               >
//                 About
//               </Text>
//             </Flex>
//           </Tab>
//           <Tab
//             ref={accountTab}
//             _focus="none"
//             w={{ sm: "120px", md: "250px", lg: "300px" }}
//             onClick={() =>
//               setActiveBullets({
//                 about: true,
//                 account: true,
//                 address: false
//               })
//             }
//           >
//             <Flex
//               direction="column"
//               justify="center"
//               align="center"
//               position="relative"
//               _before={{
//                 content: "''",
//                 width: { sm: "120px", md: "250px", lg: "300px" },
//                 height: "3px",
//                 bg: activeBullets.address ? textColor : "gray.200",
//                 left: { sm: "12px", md: "28px" },
//                 top: { sm: activeBullets.account ? "6px" : "4px", md: null },
//                 position: "absolute",
//                 bottom: activeBullets.account ? "40px" : "38px",
//                 zIndex: -1,
//                 transition: "all .3s ease"
//               }}
//             >
//               <Icon
//                 as={BsCircleFill}
//                 color={activeBullets.account ? textColor : "gray.300"}
//                 w={activeBullets.account ? "16px" : "12px"}
//                 h={activeBullets.account ? "16px" : "12px"}
//                 mb="8px"
//               />
//               <Text
//                 color={activeBullets.account ? { textColor } : "gray.300"}
//                 fontWeight={activeBullets.account ? "bold" : "normal"}
//                 transition="all .3s ease"
//                 fontSize="sm"
//                 _hover={{ color: textColor }}
//                 display={{ sm: "none", md: "block" }}
//               >
//                 Account
//               </Text>
//             </Flex>
//           </Tab>
//           <Tab
//             ref={addressTab}
//             _focus="none"
//             w={{ sm: "120px", md: "250px", lg: "300px" }}
//             onClick={() =>
//               setActiveBullets({
//                 about: true,
//                 account: true,
//                 address: true
//               })
//             }
//           >
//             <Flex
//               direction="column"
//               justify="center"
//               align="center"
//               position="relative"
//               _before={{
//                 content: "''",
//                 width: { sm: "120px", md: "250px", lg: "300px" },
//                 height: "3px",
//                 left: { sm: "12px", md: "32px" },
//                 top: { sm: activeBullets.address ? "6px" : "4px", md: null },
//                 position: "absolute",
//                 bottom: activeBullets.address ? "40px" : "38px",
//                 zIndex: -1,
//                 transition: "all .3s ease"
//               }}
//             >
//               <Icon
//                 as={BsCircleFill}
//                 color={activeBullets.address ? textColor : "gray.300"}
//                 w={activeBullets.address ? "16px" : "12px"}
//                 h={activeBullets.address ? "16px" : "12px"}
//                 mb="8px"
//               />
//               <Text
//                 color={activeBullets.address ? { textColor } : "gray.300"}
//                 fontWeight={activeBullets.address ? "bold" : "normal"}
//                 transition="all .3s ease"
//                 fontSize="sm"
//                 _hover={{ color: textColor }}
//                 display={{ sm: "none", md: "block" }}
//               >
//                 Address
//               </Text>
//             </Flex>
//           </Tab>
//         </TabList>
//         <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
//           <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
//             <Box>
//               <Flex mb="40px">
//                 <Flex
//                   direction="column"
//                   align="center"
//                   justify="center"
//                   textAlign="center"
//                   w="80%"
//                   mx="auto"
//                 >
//                   <Text
//                     color={textColor}
//                     fontSize="lg"
//                     fontWeight="bold"
//                     mb="4px"
//                   >
//                     Let's start with the basic information
//                   </Text>
//                   <Text color="gray.400" fontWeight="normal" fontSize="sm">
//                     Let us know your name and email address. Use an address you
//                     don't mind other users contacting you at
//                   </Text>
//                 </Flex>
//               </Flex>
//               <Box>
//                 <Flex direction="column" w="100%">
//                   <Flex
//                     direction={{ sm: "column", md: "row" }}
//                     w="100%"
//                     mb="24px"
//                   >
//                     <Box
//                       position="relative"
//                       minW={{ sm: "110px", xl: "150px" }}
//                       h={{ sm: "110px", xl: "150px" }}
//                       mx={{ sm: "auto", md: "40px", xl: "85px" }}
//                       mb={{ sm: "25px" }}
//                     >
//                       <Avatar w="100%" h="100%" borderRadius="12px" />
//                     </Box>
//                     <Stack direction="column" spacing="20px" w="100%">
//                       <FormControl>
//                         <FormLabel
//                           color={textColor}
//                           fontSize="xs"
//                           fontWeight="bold"
//                         >
//                           First Name
//                         </FormLabel>
//                         <Input
//                           borderRadius="15px"
//                           placeholder="eg. Michael"
//                           fontSize="xs"
//                         />
//                       </FormControl>
//                       <FormControl>
//                         <FormLabel
//                           color={textColor}
//                           fontSize="xs"
//                           fontWeight="bold"
//                         >
//                           Last Name
//                         </FormLabel>
//                         <Input
//                           borderRadius="15px"
//                           placeholder="eg. Jackson"
//                           fontSize="xs"
//                         />
//                       </FormControl>
//                       <FormControl>
//                         <FormLabel
//                           color={textColor}
//                           fontSize="xs"
//                           fontWeight="bold"
//                         >
//                           Email Address
//                         </FormLabel>
//                         <Input
//                           borderRadius="15px"
//                           placeholder="eg. example@address.com"
//                           fontSize="xs"
//                         />
//                       </FormControl>
//                     </Stack>
//                   </Flex>
//                   <Button
//                     variant="no-hover"
//                     bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
//                     alignSelf="flex-end"
//                     mt="24px"
//                     w={{ sm: "75px", lg: "100px" }}
//                     h="35px"
//                     onClick={() => accountTab.current.click()}
//                   >
//                     <Text fontSize="xs" color="#fff" fontWeight="bold">
//                       NEXT
//                     </Text>
//                   </Button>
//                 </Flex>
//               </Box>
//             </Box>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </Flex>
//   );
// }


import React from 'react'
import {Index} from "../../src copy/pages/Index.jsx"
export const LandingPage = () => {
  return (
    <div   >
      <Index/>
    </div>
  )
}

