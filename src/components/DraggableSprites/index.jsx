import { Container } from "@pixi/react";
import useSpriteStore from "../../store/useSpriteStore";

import DraggableSprite from "./DraggableSprite";

const DraggableSprites = () => {
  const sprites = useSpriteStore((state) => state.sprites);

  return (
    <Container>
      {sprites.map((sprite) => (
        <DraggableSprite
          x={sprite.x}
          y={sprite.y}
          key={sprite.id}
        />
      ))}
    </Container>
  );
};

export default DraggableSprites;
