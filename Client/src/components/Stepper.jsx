// MyStepperComponent.jsx
import React from 'react';
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';

const steps = [
  { title: 'First', description: 'Healthy' },
  { title: 'Second', description: 'Can make it!' },
  { title: 'Third', description: 'Consult' },
];

export const StepperComponent=()=> {
  const { activeStep, setActiveStep } = useSteps({
    index: 3,
    count: steps.length,
  });

  return (
    <Stepper size="lg" index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index} >
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle color="black">{step.title}</StepTitle>
            <StepDescription color="black"> {step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}


