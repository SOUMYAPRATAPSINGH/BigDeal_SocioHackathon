// Payment.jsx

import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { createRazorpayInstance } from "../Payment/razorpayScript.jsx";

export const Payment = ({ onPaymentSuccess, onPaymentFailure, patientName }) => {
  const processPayment = async () => {
    const options = {
      key: "your-razorpay-key", // Replace with your Razorpay API key
      amount: 5000, // Amount in paise (100 paise = 1 INR)
      currency: "INR",
      name: "Eunoia",
      description: "Payment for Appointment",
      image: "path/to/your/logo.png", // Replace with your company logo
      prefill: {
        name: patientName,
        email: "patient@example.com", // Replace with the actual email or fetch dynamically
        contact: "9876543210", // Replace with the actual contact number or fetch dynamically
      },
      notes: {
        appointment_id: "YOUR_APPOINTMENT_ID",
      },
      theme: {
        color: "#528FF0",
      },
    };

    const razorpayInstance = createRazorpayInstance(
      options,
      (response) => onPaymentSuccess(response.razorpay_payment_id),
      onPaymentFailure
    );

    if (razorpayInstance) {
      razorpayInstance.open();
    }
  };

  return (
    <Box mt={4}>
      <Text fontSize="lg">Payment Details</Text>
      <Button colorScheme="blue" id="rzp-button" onClick={processPayment}>
        Process Payment
      </Button>
    </Box>
  );
};


