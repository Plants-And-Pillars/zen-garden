import Image from "next/image";
import { useDrag } from "react-dnd";
import { Flex } from "@chakra-ui/react";

import { ItemTypes } from "@/constants/ItemTypes";
import item from "./assets/item.png";

const DraggableItem = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PEICE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Flex
      width="fit-content"
      height="fit-content"
      border="1px solid grey"
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
      ref={drag}
    >
      <Image src={item} alt="item" />
    </Flex>
  );
};

export default DraggableItem;
