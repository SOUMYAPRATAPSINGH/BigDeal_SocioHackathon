// FormInputs.js
import React from "react";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

export const FormInputs = ({ appointmentDetails, setAppointmentDetails }) => (
  <>
    <FormControl mt={4} isRequired>
      <FormLabel>Name</FormLabel>
      <Input
        type="text"
        value={appointmentDetails.name}
        onChange={(e) =>
          setAppointmentDetails({
            ...appointmentDetails,
            name: e.target.value,
          })
        }
      />
    </FormControl>

    <FormControl mt={4} isRequired>
      <FormLabel>Age</FormLabel>
      <Input
        type="number"
        value={appointmentDetails.age}
        onChange={(e) =>
          setAppointmentDetails({
            ...appointmentDetails,
            age: e.target.value,
          })
        }
      />
    </FormControl>

    <FormControl isRequired>
      <FormLabel>Date</FormLabel>
      <Input
        type="date"
        value={appointmentDetails.date}
        onChange={(e) =>
          setAppointmentDetails({
            ...appointmentDetails,
            date: e.target.value,
          })
        }
      />
    </FormControl>

    <FormControl id="time" isRequired mt={4}>
      <FormLabel>Time</FormLabel>
      <Select
        placeholder="Select time"
        value={appointmentDetails.timing}
        onChange={(e) =>
          setAppointmentDetails({
            ...appointmentDetails,
            timing: e.target.value,
          })
        }
      >
        <option value="9:00 AM">9:00 AM</option>
        <option value="10:00 PM">10:00 AM</option>
        <option value="11:30 PM">11:30 AM</option>
        <option value="12:00 AM">12:00 AM</option>
        <option value="1:00 PM">1:00 AM</option>
        <option value="2:30 PM">2:30 AM</option>
      </Select>
    </FormControl>
  </>
);

