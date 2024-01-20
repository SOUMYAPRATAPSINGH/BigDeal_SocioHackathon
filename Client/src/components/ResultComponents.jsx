import { MdCheckCircle, MdModeOfTravel } from 'react-icons/md';
import { InfoIcon } from '@chakra-ui/icons';
import Swal from 'sweetalert2';
import image from "../assets/personality.png"
import {
  Flex,
  List,
  ListItem,
  ListIcon,
  Box,
  Text,
  VStack,
  Heading,
  Image,
  Badge,
  CircularProgress,
  CircularProgressLabel,
  HStack,
} from '@chakra-ui/react';

export const ResultComponent = ({ userData ,userinfo}) => {
  const handleInfoClick = (trait, text, text1, text2) => {
    const combinedText = `${text}<br><br>${text1}<br><br>${text2}`;
  
    Swal.fire({
      icon: 'info',
      title: trait,
      html: combinedText,
    });
  };

  const opennessValue = Math.round((userData.openness / 48) * 100);
  const conscientiousnessValue = Math.round((userData.conscientiousness / 48) * 100);
  const extraversionValue = Math.round((userData.extraversion / 48) * 100);
  const agreeablenessValue = Math.round((userData.agreeableness / 48) * 100);
  const neuroticismValue = Math.round((userData.neuroticism / 48) * 100);

  const traits = {
    O: ["Imaginative,Curious,Open to new experiences", "Balanced imagination and practicality", "Prefer routine,Practical"],
    C: ["Organized , Reliable", "Responsible, Balanced organization and flexibility", "Spontaneous, Flexible"],
    E: ["Outgoing, Sociable, Energetic","Balanced social and solitary tendencies", "Introverted, Reserved"],
    A: ["Cooperative, Empathetic, Compassionate", "Balanced cooperation and assertiveness", "Competitive, Skeptical"],
    N: ["Emotional instability, Anxiety", "Mood swings, Balanced emotional stability", "Emotional stability, Resilience"]
  };
  
  
  function analyzeTrait(score, highThreshold, lowThreshold) {
    if(score<=lowThreshold ){
      return 2
    }
    else if(score>= highThreshold){
      return 0
    }
    else{
      return 1
    }
  }
  
  const OTrait =traits.O[analyzeTrait(opennessValue, 77, 55)];
  const CTrait =traits.C[ analyzeTrait(conscientiousnessValue, 75, 45)];
  const ETrait =traits.E[  analyzeTrait(extraversionValue, 79, 52)];
  const ATrait = traits.A[ analyzeTrait(agreeablenessValue, 75, 47)];
  const NTrait =traits.N[  analyzeTrait(neuroticismValue , 66, 35)];
 
  return (
    <Box
      p="4"
      bgGradient="linear(to-r, #36D1DC, #5B86E5)" 

      borderRadius="md"
      boxShadow="lg"
      textAlign="center"
      color="teal"
    >
      <VStack spacing="4">
        <Heading fontSize={{ base: '2xl', md: '4xl' }} color="white">
          NEO Personality Inventory
        </Heading>

        <VStack align="center" justify="center">
          <Image src={image} alt="Trophy" boxSize="100px" width={100} />
          <Badge
            ml="2"
            colorScheme="yellow"
            variant="outline"
            fontSize={{ base: 'md', md: 'lg' }}
            textTransform="uppercase"
          >
            {userinfo.name}
          </Badge>
        </VStack>

        <Box
          p="4"
          bg="whiteAlpha.900"
          borderRadius="md"
          mt="4"
          w={{ base: '100%', md: '80%' }}
          boxShadow="md"
        >
          <VStack spacing={{ base: '4', md: '8' }}>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.500">
              Your Personality Analysis
            </Text>

            {/* Add CircularProgress for each personality trait */}
            <HStack spacing={{ base: '2', md: '8' }}>
              <CircularProgress value={userData ? opennessValue : 0} color="green.400" size={{ base: '80px', md: '160px' }}>
                <CircularProgressLabel fontSize={{ base: 'xs', md: 'sm' }}>Openness</CircularProgressLabel>
              </CircularProgress>

              <CircularProgress value={userData ? conscientiousnessValue : 0} color="blue.400" size={{ base: '80px', md: '160px' }}>
                <CircularProgressLabel fontSize={{ base: 'xs', md: 'sm' }}>Conscientiousness</CircularProgressLabel>
              </CircularProgress>
              <CircularProgress value={userData ? extraversionValue : 0} color="orange.400" size={{ base: '80px', md: '160px' }}>
                <CircularProgressLabel fontSize={{ base: 'xs', md: 'sm' }}>Extraversion</CircularProgressLabel>
              </CircularProgress>
            </HStack>

            <HStack spacing={{ base: '4', md: '8' }}>
              <CircularProgress value={userData ? agreeablenessValue : 0} color="purple.400" size={{ base: '80px', md: '160px' }}>
                <CircularProgressLabel fontSize={{ base: 'xs', md: 'sm' }}>Agreeableness</CircularProgressLabel>
              </CircularProgress>
              <CircularProgress value={userData ? neuroticismValue : 0} color="red.400" size={{ base: '80px', md: '160px' }}>
                <CircularProgressLabel fontSize={{ base: 'xs', md: 'sm' }}>Neuroticism</CircularProgressLabel>
              </CircularProgress>
            </HStack>
          </VStack>

          <Flex direction={{ base: 'column', md: 'row' }} justify={'space-between'} mt="4">
           
            {/* Adding InfoIcon with onClick event handler */}
            <Flex
              onClick={() =>
                handleInfoClick(
                  `Your Score (${opennessValue}%)`,
                  `High Scores(77-100):Individuals with high openness scores tend to be imaginative, curious, and open to new experiences. They are often creative, curious, and appreciate art and beauty.`,
                  `Low Scores(0-50): Low scorers may prefer routine, be more practical, and may be resistant to change. `,
                  `Average Scores(51-76):Individuals with medium scores strike a balance between openness and practicality, showing a moderate interest in both routine and new experiences.`
                )
              }
              cursor="pointer"
              align="center"
              mb={{ base: '2', md: '0' }}
            >
              <InfoIcon />
              <Text color="green.400">Openness</Text>
            </Flex>

            <Flex
              onClick={() =>
                handleInfoClick(
                  `Your Score (${conscientiousnessValue}%)`,
                  `High Scores(75-100): Conscientious individuals are organized, reliable, and responsible. They set and achieve goals, and they are often diligent and hardworking.`,
                  `Low Scores(0-45): Low scorers may be more spontaneous, flexible, and less focused on long-term planning.
                  `,
                  `Average Scores(51-76):Individuals with medium scores strike a balance between openness and practicality, showing a moderate interest in both routine and new experiences.`
                )
              }
              cursor="pointer"
              align="center"
              mb={{ base: '2', md: '0' }}
            >
              <InfoIcon />
              <Text color="blue.400">Conscientiousness</Text>
            </Flex>

            <Flex
              onClick={() =>
                handleInfoClick(
                  `Your Score(${extraversionValue}%)`,
                  `High Scores(79-100): Extraverted individuals are outgoing, sociable, and energetic. They enjoy social interactions, are assertive, and may take on leadership roles.`,
                  `Low Scores(0-52):Introverted individuals are more reserved, reflective, and may prefer solitude or smaller social gatherings.`,
                  `Average Scores(53-78):Individuals with medium scores exhibit a balance between social and solitary inclinations.`
                )
              }
              cursor="pointer"
              align="center"
              mb={{ base: '2', md: '0' }}
            >
              <InfoIcon />
              <Text color="orange.400">Extraversion</Text>
            </Flex>

            <Flex
              onClick={() =>
                handleInfoClick(
                  `Your Score(${agreeablenessValue}%)`,
                  `High Scores(75-100):Agreeable individuals are cooperative, empathetic, and compassionate. They value harmony in relationships and are generally considerate of others.`,
                  `Low Scores(0-47): Low scorers may be more competitive, skeptical, and may prioritize personal goals over maintaining social harmony.
                  `,`Average Scores(48-74):Cooperative but may assert personal goals when necessary.
                  Analysis: Individuals with medium scores balance cooperation with assertiveness.`
                )
              }
              cursor="pointer"
              align="center"
              mb={{ base: '2', md: '0' }}
            >
              <InfoIcon />
              <Text color="purple.400">Agreeableness</Text>
            </Flex>

            <Flex
              onClick={() =>
                handleInfoClick(
                  `Your Score(${neuroticismValue}%)`,
                  `High Scores(66-100):  Neurotic individuals may experience emotional instability, anxiety, and mood swings. They might be more prone to stress and worry.`,
                  `Low Scores(0-35): Low neuroticism scores indicate emotional stability, resilience, and a more even-tempered nature.what are the score analysysis for high low and medium
                  `,
                  `Average Scores(36-65):Individuals with medium scores maintain a balanced emotional stability, occasionally experiencing stress.`
                )
              }
              cursor="pointer"
              align="center"
            >
              <InfoIcon />
              <Text color="red.400">Neuroticism</Text>
            </Flex>
          </Flex>
        </Box>

        <Box
          p="4"
          bg="whiteAlpha.900"
          borderRadius="md"
          mt="4"
          w={{ base: '100%', md: '80%' }}
          boxShadow="md"
        >
          <VStack spacing={{ base: '4', md: '8' }} align="start">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.500">
              Your Personality Traits:
            </Text>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {OTrait}
              </ListItem>

              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {CTrait}
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
               {ETrait}
              </ListItem>

              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {ATrait}
              </ListItem>

              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {NTrait}
              </ListItem>
            </List>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ResultComponent;
