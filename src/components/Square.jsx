import React from "react";
import { Flex } from "@chakra-ui/react";

export default function Square({ children }) {
  return (
    <Flex
      style={{
        backgroundColor: "#e0d9c9",
        color: "#e0d9c9",
        width: "100%",
        height: "100%",
        border: "1px solid black",
      }}
    >
      {children}
    </Flex>
  );
}
