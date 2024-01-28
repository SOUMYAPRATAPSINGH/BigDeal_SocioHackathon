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
  useBreakpointValue,
  useSteps,
} from '@chakra-ui/react';

const steps = [
  { title: 'First', description: 'Healthy' },
  { title: 'Second', description: 'Can make it!' },
  { title: 'Third', description: 'Consult' },
];

export const StepperComponent = (score) => {
  console.log('Score', score.score);
  let sum = 0;
  if (score.score < 75) {
    sum += 2;
  } else {
    sum += 0;
  }

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { activeStep, setActiveStep } = useSteps({
    index: sum,
    count: steps.length,
  });

  return (
    <Stepper size={isMobile ? 'sm' : 'lg'} orientation={isMobile ? 'vertical' : 'horizontal'} index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
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

          {index < steps.length - 1 && <StepSeparator />}
        </Step>
      ))}
    </Stepper>
  );
};
