import { Container } from "@pixi/react";
import CustomSprite from "./CustomSprite";
import useSpriteStore from "../../store/useSpriteStore";
import { useCallback } from "react";

const ListOfSprites = () => {
  const addSprite = useSpriteStore((state) => state.addSprite);

  const handleClick = useCallback(() => {
    console.log("click");
    addSprite({
      x: 50,
      y: 50,
      id: new Date().getTime(),
    });
  }, [addSprite]);

  return (
    <Container>
      <CustomSprite x={100} y={100} onClick={handleClick} />
      <CustomSprite x={100} y={200} onClick={handleClick} />
      <CustomSprite x={100} y={300} onClick={handleClick} />
    </Container>
  );
};

export default ListOfSprites;
