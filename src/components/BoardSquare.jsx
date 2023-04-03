import React from "react";
import { useDrop } from "react-dnd";

import Square from "./Square";
import Overlay from "./Overlay";
import usePositionStore from "@/store/usePositionStore";
import { ItemTypes } from "@/constants/ItemTypes";

import { Flex } from "@chakra-ui/layout";

function canPosition(xPos, yPos) {
  const [x, y] = usePositionStore.getState().position;

  console.log("canPosition", x, y);
  console.log("CONDITION", x == 7 && y == 7);

  if (xPos == 7 && yPos == 7) return false; // cannot drop on the bottom right square
  if (xPos == x && yPos == y) return false; // cannot drop on the current square
  return true; // can drop on any other square
}

export default function BoardSquare({ x, y, children }) {
  const setPosition = usePositionStore((state) => state.setPosition);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.PEICE,
      drop: () => setPosition(x, y),
      canDrop: () => canPosition(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [x, y]
  );

  return (
    <Flex
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square>{children}</Square>
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
      {isOver && canDrop && <Overlay color="green" />}
    </Flex>
  );
}
