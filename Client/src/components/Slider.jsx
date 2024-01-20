import {useSteps} from "react";
import {
    Step,
   
    StepIcon,
    StepIndicator,

    StepSeparator,
    StepStatus,
    
    Stepper,
    useSteps,
  } from '@chakra-ui/react'

const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' },
  ]
  
export const Slider=() {
    const { activeStep, setActiveStep } = useSteps({
      index: 1,
      count: steps.length,
    })
  
    const activeStepText = steps[activeStep].description
  
    return (
      <Stack>
        <Stepper size='sm' index={activeStep} gap='0'>
          {steps.map((step, index) => (
            <Step key={index} gap='0'>
              <StepIndicator>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>
              <StepSeparator _horizontal={{ ml: '0' }} />
            </Step>
          ))}
        </Stepper>
        <Text>
          Step {activeStep + 1}: <b>{activeStepText}</b>
        </Text>
      </Stack>
    )
  }
  
