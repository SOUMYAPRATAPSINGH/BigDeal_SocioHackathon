import React, { useRef } from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";
import QRCode from "react-qr-code";

export const Invoice = ({ invoiceData, handlePrint }) => {
  const componentRef = useRef();
 console.log("Invoice")
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      color="black"
      width="auto"
      p={4}
      boxShadow="lg"
      textAlign="center"
    >
      <Image src="/path/to/logo.png" alt="Company Logo" width={100} />
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="teal.500">
        Invoice
      </Text>
      <Text fontSize="lg" mb={2}>
        Service Name: {invoiceData.serviceName}
      </Text>
      <Text fontSize="lg" mb={2}>
        Company Name: {invoiceData.companyName}
      </Text>
      <Text fontSize="lg" mb={2}>
        Amount: &#x20B9; {invoiceData.amount}
      </Text>

      {/* Additional Order Details */}
      <Box mt={4} textAlign="left">
        <Text fontSize="lg" mb={2}>
          Order Date: {invoiceData.orderDate}
        </Text>
        <Text fontSize="lg" mb={2}>
          Order ID: {invoiceData.orderId}
        </Text>
        {/* Add more order details as needed */}
      </Box>

      <Box mt={6}>
        <QRCode
          value={`Service: ${invoiceData.serviceName}\nCompany: ${invoiceData.companyName}\nAmount: ${invoiceData.amount}`}
          size={150}
        />
      </Box>
      <Button
        onClick={handlePrint}
        mt={6}
        colorScheme="teal"
        fontSize="md"
        _hover={{ bg: "teal.500" }}
      >
        Generate PDF
      </Button>

      {/* Hidden component for PDF conversion */}
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <Box
            borderWidth="1px"
            borderRadius="md"
            color="black"
            width="auto"
            p={4}
            boxShadow="lg"
            textAlign="center"
          >
            <Image src="/path/to/logo.png" alt="Company Logo" width={100} />
            <Text fontSize="2xl" fontWeight="bold" mb={4} color="teal.500">
              Invoice
            </Text>
            <Text fontSize="lg" mb={2}>
              Service Name: {invoiceData.serviceName}
            </Text>
            <Text fontSize="lg" mb={2}>
              Company Name: {invoiceData.companyName}
            </Text>
            <Text fontSize="lg" mb={2}>
              Amount: &#x20B9; {invoiceData.amount}
            </Text>

            {/* Additional Order Details */}
            <Box mt={4} textAlign="left">
              <Text fontSize="lg" mb={2}>
                Order Date: {invoiceData.orderDate}
              </Text>
              <Text fontSize="lg" mb={2}>
                Order ID: {invoiceData.orderId}
              </Text>
              {/* Add more order details as needed */}
            </Box>

            <Box mt={6}>
              <QRCode
                value={`Service: ${invoiceData.serviceName}\nCompany: ${invoiceData.companyName}\nAmount: ${invoiceData.amount}`}
                size={150}
              />
            </Box>
            {/* Add other invoice details */}
          </Box>
        </div>
      </div>
    </Box>
  );
};


