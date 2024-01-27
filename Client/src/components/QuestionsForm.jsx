import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  VStack,
  Button,
  Text,
  Spinner,
} from '@chakra-ui/react';

export const QuestionsForm = ({
  currentQuestion,
  questions,
  options,
  selectedOptions,
  onOptionChange,
  onNextQuestion,
  onSubmit,
  timer,
}) => {
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      setSpeechSynthesis(synthesis);
    }
  }, []);

  useEffect(() => {
    if (speechSynthesis) {
      speakQuestion(questions[currentQuestion]);
    }
  }, [currentQuestion, speechSynthesis]);

  const speakQuestion = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleOptionChange = (optionValue) => {
    onOptionChange(optionValue);
    setIsAnswerSelected(true);
  };

  const handleNextQuestion = () => {
    if (isAnswerSelected) {
      setIsAnswerSelected(false);
      onNextQuestion();
    }
  };

  const handleSubmit = async () => {
    if (isAnswerSelected) {
      setIsLoading(true);
      // Assuming onSubmit returns a Promise
      try {
        await onSubmit();
        // Reset loading state on successful submission
        setIsLoading(false);
      } catch (error) {
        // Handle error if submission fails
        setIsLoading(false);
        console.error('Error submitting form:', error.message);
      }
    }
  };

  return (
    <VStack w="100%" align="start" spacing="4">
      <FormControl as="fieldset" w="100%">
        <FormLabel
          fontSize={{ base: 'md', md: 'lg' }}
          color="teal.500"
          textAlign="start"
        >
          {currentQuestion + 1}. {questions[currentQuestion]}
        </FormLabel>
        <RadioGroup value={selectedOptions[currentQuestion] || ''}>
          <VStack spacing="2" color="gray.800" align="flex-start">
            {Object.entries(options).map(([optionKey, optionValue]) => (
              <Radio
                key={optionValue}
                isChecked={selectedOptions[currentQuestion] === optionValue}
                value={optionValue}
                colorScheme="teal"
                size="md"
                onChange={() => handleOptionChange(optionValue)}
                style={{
                  backgroundColor:
                    selectedOptions[currentQuestion] === optionValue
                      ? 'black'
                      : 'white',
                  color:
                    selectedOptions[currentQuestion] === optionValue
                      ? 'white'
                      : 'black',
                }}
              >
                {optionKey}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
        <FormHelperText color="gray.400" textAlign="start">
          Choose the option that best describes your opinion.
        </FormHelperText>
      </FormControl>

      <VStack mt="4" spacing="4" w="100%" align="start">
        {isLoading ? (
          <Spinner size="lg" color="teal.500" />
        ) : (
          <>
            {currentQuestion === questions.length - 1 ? (
              <Button
                w="100%"
                colorScheme="teal"
                onClick={handleSubmit}
                disabled={!isAnswerSelected}
              >
                Submit
              </Button>
            ) : (
              <Button
                w=""
                colorScheme="teal"
                onClick={handleNextQuestion}
                disabled={!isAnswerSelected}
              >
                Next Question
              </Button>
            )}
          </>
        )}
        <Text color="gray.800">{`Time remaining: ${Math.floor(
          timer / 60
        )}:${timer % 60}`}</Text>
      </VStack>
    </VStack>
  );
};
