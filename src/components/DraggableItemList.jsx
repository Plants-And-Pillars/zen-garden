import DraggableItem from "./DraggableItem";
import { Flex } from "@chakra-ui/react";

const DraggableItemList = () => {
  return (
    <Flex direction="column">
      <DraggableItem />
      <DraggableItem />
      <DraggableItem />
    </Flex>
  );
};

export default DraggableItemList;
