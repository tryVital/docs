import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

export const Badge = ({ children, type }) => {
  const bg = type === "success" ? "green" : "gray";
  return (
    <Box
      bg={bg}
      color={"white"}
      width={"5vw"}
      p={3}
      borderRadius={5}
      fontSize={14}
      textAlign={"center"}
    >
      {children}
    </Box>
  );
};
