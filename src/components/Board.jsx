import React from "react";
import renderSquare from "@/functions/renderSquare";
import { Flex } from "@chakra-ui/react";

export default function Board({ position }) {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, position));
  }

  console.log("run");

  return (
    <Flex
      style={{
        width: "70vw",
        height: "70vh",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {squares}
    </Flex>
  );
}
