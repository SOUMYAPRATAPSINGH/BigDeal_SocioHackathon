// BookButton.js
import React from "react";
import { Button, Spinner } from "@chakra-ui/react";

export const BookButton = ({ handlePayment, formCompleted, loading }) => (
  <Button
    onClick={handlePayment}
    colorScheme="teal"
    variant="solid"
    mt={4}
    disabled={!formCompleted || loading}
  >
    {loading ? <Spinner size="sm" /> : "Book"}
  </Button>
);


