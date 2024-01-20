// TestRules.js
import React from 'react';
import { Text, VStack, FormControl, FormLabel } from '@chakra-ui/react';

export const TestRules = ({ agreementChecked, onAgreementChange }) => (
  <VStack spacing="4" align="center">
    <Text textAlign="center" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="teal.800">
      Test Rules
    </Text>
    <Text textAlign="justify" color="gray.700" mb="4" fontSize={{ base: 'sm', md: 'md' }}>
      Welcome to the Personality Assessment. Answer each question honestly and quickly, prioritizing your first instinctive response. You have 10 minutes to complete the test. Respond to as many questions as possible within this timeframe. Only provide one answer per question, and do not review or change your responses. If a question is challenging, feel free to skip it. Be mindful of the timer, as the test will end automatically after 10 minutes. Submit your responses promptly. Relax, focus, and thank you for participating in this valuable assessment. Begin when ready.
    </Text>
    <FormControl>
      <FormLabel color="teal.800" fontSize={{ base: 'sm', md: 'md' }}>
        <input
          type="checkbox"
          onChange={(e) => onAgreementChange(e.target.checked)}
        />{' '}
        I agree to the terms
      </FormLabel>
    </FormControl>
  </VStack>
);

export default TestRules;
