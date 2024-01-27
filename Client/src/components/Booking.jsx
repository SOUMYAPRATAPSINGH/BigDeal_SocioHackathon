// Booking.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { VStack, Box, Spinner, Text } from "@chakra-ui/react";
import { Invoice } from "./Invoice";
import { BookingDetails } from "./BookingDetails";
import { FormInputs } from "./FormInputs";
import { BookButton } from "./BookButton";
import image from "../assets/hello.jpg";

export const Booking = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    name: "",
    timing: "",
    age: "",
  });

  const [bookingDetails, setBookingDetails] = useState({
    serviceName: "One to One Virtual Counselling",
    companyName: "Eunoia",
    img: `${image}`,
    price: 999,
  });

  const [orderDetails, setOrderDetails] = useState(null);

  const [invoiceData, setInvoiceData] = useState(null);
  const [formCompleted, setFormCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isFormCompleted =
      appointmentDetails.name &&
      appointmentDetails.age &&
      appointmentDetails.date &&
      appointmentDetails.timing;

    setFormCompleted(isFormCompleted);
  }, [appointmentDetails]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  };

  const initPayment = async (paymentData) => {
    await loadRazorpayScript();

    const options = {
      key: "rzp_test_QwVFufHZbexRin",
      amount: paymentData.amount,
      currency: paymentData.currency,
      name: bookingDetails.serviceName,
      description: `Appointment for ${bookingDetails.serviceName} on ${appointmentDetails.date} at ${appointmentDetails.timing}`,
      image: bookingDetails.img,
      order_id: paymentData.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:3000/api/payment/verify";
          const { data: verifyData } = await axios.post(verifyUrl, response);

          handlePaymentSuccess(response);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    if (window.Razorpay) {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.error("Razorpay script not loaded");
    }
  };

  const handlePayment = async () => {
    try {
      if (formCompleted) {
        setLoading(true);

        const { data: orderData } = await axios.post(
          "http://localhost:3000/api/payment/orders",
          {
            amount: bookingDetails.price,
            appointmentDetails: appointmentDetails,
          }
        );

        // Store order details in state
        setOrderDetails(orderData.data);

        initPayment(orderData.data);
      } else {
        console.log("Please fill out the form completely.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      setLoading(true);

      // Store booking details in state
      setBookingDetails({
        ...bookingDetails,
        appointmentDetails: appointmentDetails,
      });

      // Store invoice data in state
      setInvoiceData({
        serviceName: bookingDetails.serviceName,
        companyName: bookingDetails.companyName,
        amount: bookingDetails.price,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} p={4} width="auto">
      <Box
        borderWidth="1px"
        borderRadius="md"
        color="black"
        width="auto"
        justifyContent={"center"}
        p={4}
      >
        <Text fontSize="xl" mb={4}>
          Appointment Booking
        </Text>
        <BookingDetails {...bookingDetails} />
        <FormInputs
          appointmentDetails={appointmentDetails}
          setAppointmentDetails={setAppointmentDetails}
        />
        <BookButton
          handlePayment={handlePayment}
          formCompleted={formCompleted}
          loading={loading}
        />
      </Box>

      {invoiceData && <Invoice invoiceData={invoiceData} />}
    </VStack>
  );
};
