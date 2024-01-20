// BookingDetails.js
import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

export const BookingDetails = ({ serviceName, companyName, img, price }) => (
  <Box className="book_container">
    <Image src={img} alt="book_img" className="book_img" width={500} />
    <Text className="book_name" fontWeight="bold" fontSize="lg">
      {serviceName}
    </Text>
    <Text className="book_companyName" color="gray.600">
      By {companyName}
    </Text>
    <Text className="book_price" color="green.500" fontWeight="bold">
      Price: <span>&#x20B9; {price}</span>
    </Text>
    <Text className="book_companyName" color="gray.600">
      Duration: 1hr
    </Text>
  </Box>
);


