import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../userContext.jsx'; 
import {
  Flex,
  HStack,
  VStack,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Box,
  Spacer,
  Divider,
  Text,
} from '@chakra-ui/react';


export const UserProfile = () => {
  const { userId } = useUser(); // Use the useUser hook to get userId
  const [userData, setUserData] = useState(null); 
  useEffect(() => {
    // Fetch user data from the backend API using the userId
    
    const getUserData = async () => {
      try {
        const response = await axios.get(`/userdata/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    }
  
    if (userId) {
      getUserData();
    }
  }, [userId]); 
  return (
    <div>
      <Flex p="8" align="center" justify="center" direction="column">
        <Box>
          <Avatar size="2xl" name={userData && userData.name} src="" />
        </Box>

        {/* Personal Information */}
        <div>
          <Text fontSize="xl" fontWeight="bold" mb="4"  color="teal">
          {userData && userData.name} 's information.
          </Text>
        </div>
        <HStack spacing="8" align="start" color="gray.300">
          <VStack spacing="4" align="start">
            <FormControl id="patientName">
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="John Doe" />
            </FormControl>
            <FormControl id="age">
              <FormLabel>Age</FormLabel>
              <Input type="number" placeholder="30" />
            </FormControl>
            <FormControl id="maritalStatus">
              <FormLabel>Marital Status</FormLabel>
              <Input type="text" placeholder="Single/Married" />
            </FormControl>
            <FormControl id="gender">
              <FormLabel>Gender</FormLabel>
              <Select placeholder="Select Gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>
          </VStack>
          <VStack spacing="4" align="start">
            <FormControl id="education">
              <FormLabel>Education</FormLabel>
              <Select placeholder="Select Education">
                <option value="highSchool">High School</option>
                <option value="college">College</option>
                {/* Add more options based on your requirements */}
              </Select>
            </FormControl>
            <FormControl id="occupation">
              <FormLabel>Occupation</FormLabel>
              <Select placeholder="Select Occupation">
                <option value="doctor">Doctor</option>
                <option value="engineer">Engineer</option>
                {/* Add more options based on your requirements */}
              </Select>
            </FormControl>
            <FormControl id="socioEconomicStatus">
              <FormLabel>Socio Economic Status</FormLabel>
              <Select placeholder="Select Status">
                <option value="high">High</option>
                <option value="middle">Middle</option>
                <option value="lower">Lower</option>
              </Select>
            </FormControl>
            <FormControl id="domicile">
              <FormLabel>Domicile</FormLabel>
              <Select placeholder="Select Domicile">
                <option value="urban">Urban</option>
                <option value="semiUrban">Semi Urban</option>
                <option value="rural">Rural</option>
              </Select>
            </FormControl>
          </VStack>
          <VStack spacing="4" align="start">
            <FormControl id="district">
              <FormLabel>District</FormLabel>
              <Input type="text" placeholder="District" />
            </FormControl>
            <FormControl id="state">
              <FormLabel>State</FormLabel>
              <Input type="text" placeholder="State" />
            </FormControl>
          </VStack>
        </HStack>

        <Divider my="8" />

        {/* Informant Section */}
        <div>
          <Text fontSize="xl" fontWeight="bold" mb="4" color="teal">
            Informant Section
          </Text>
        </div>
        <HStack spacing="20" align="start" color="gray.200">
          <VStack spacing="4" align="start">
            <FormControl id="relationshipToPatient">
              <FormLabel>Relationship to Patient</FormLabel>
              <Input type="text" placeholder="e.g., Family, Friend" />
            </FormControl>
            <FormControl id="intimacy">
              <FormLabel>Intimacy</FormLabel>
              <Input type="text" placeholder="e.g., Close, Distant" />
            </FormControl>
            <FormControl id="lengthOfAcquaintance">
              <FormLabel>Length of Acquaintance with Patient</FormLabel>
              <Input type="text" placeholder="e.g., Years, Months" />
            </FormControl>
          </VStack>
          <VStack spacing="4" align="start">
            <FormControl id="consistencyOfInformation">
              <FormLabel>Consistency of Information (Reliability)</FormLabel>
              <Input type="text" placeholder="e.g., Very Consistent, Inconsistent" />
            </FormControl>
            <FormControl id="adequacyOfInformation">
              <FormLabel>Adequacy of Information</FormLabel>
              <Input type="text" placeholder="e.g., Adequate, Inadequate" />
            </FormControl>
          </VStack>
        </HStack>

        <Divider my="8" />

        {/* Chief Complaints Section */}
        <div>
          <Text fontSize="xl" fontWeight="bold" mb="4" color="teal">
            Chief Complaints
          </Text>
        </div>
        <HStack spacing="7" align="start" color="gray.200">
          <VStack spacing="4" align="start">
            <FormControl id="chiefComplaint1">
              <FormLabel>Chief Complaint 1</FormLabel>
              <Input type="text" placeholder="Complaint 1" />
            </FormControl>
            <FormControl id="chiefComplaint2">
              <FormLabel>Chief Complaint 2</FormLabel>
              <Input type="text" placeholder="Complaint 2" />
            </FormControl>
            <FormControl id="chiefComplaint3">
              <FormLabel>Chief Complaint 3</FormLabel>
              <Input type="text" placeholder="Complaint 3" />
            </FormControl>
          </VStack>
          <VStack spacing="4" align="start">
            <FormControl id="chiefComplaint4">
              <FormLabel>Chief Complaint 4</FormLabel>
              <Input type="text" placeholder="Complaint 4" />
            </FormControl>
            <FormControl id="chiefComplaint5">
              <FormLabel>Chief Complaint 5</FormLabel>
              <Input type="text" placeholder="Complaint 5" />
            </FormControl>
            <FormControl id="chiefComplaint6">
              <FormLabel>Chief Complaint 6</FormLabel>
              <Input type="text" placeholder="Complaint 6" />
            </FormControl>
          </VStack>
          <VStack spacing="4" align="start">
            <FormControl id="chiefComplaintDuration">
              <FormLabel>Duration of Symptoms</FormLabel>
              <Textarea placeholder="Describe the duration of symptoms for each complaint" />
            </FormControl>
          </VStack>
        </HStack>

      

        <Divider my="8" />

        <Button colorScheme="teal" variant="solid" mt="4">
          Save Profile
        </Button>

        <Spacer />

        
      </Flex>
    </div>
  );
};
