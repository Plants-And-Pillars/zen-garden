import DraggableItem from "@/components/DraggableItem";
import BoardSquare from "@/components/BoardSquare";
import { Flex } from "@chakra-ui/layout";

function renderSquare(i, position) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  return (
    <Flex key={i} style={{ width: "12.5%", height: "12.5%" }}>
      <BoardSquare x={x} y={y}>
        {renderPiece(x, y, position)}
      </BoardSquare>
    </Flex>
  );
}

function renderPiece(x, y, [posX, posY]) {
  if (x === posX && y === posY) {
    return <DraggableItem />;
  }
}

export default renderSquare;
