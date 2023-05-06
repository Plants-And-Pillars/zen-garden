import { Stage } from "@pixi/react";

import useSpriteStore from "@/store/useSpriteStore";
import DraggableSpritesContent from "./DraggableSpritesContent";

import { Button, Flex } from "@chakra-ui/react";

const DraggableSprites = () => {
  const forestPixiApp = useSpriteStore((state) => state.forestPixiApp);

  const captureForestState = () => {
    const forestDataURL = forestPixiApp.view.toDataURL();
    console.log("forestDataURL", forestDataURL);
  };

  return (
    <Flex direction="column">
      <Stage options={{ backgroundColor: "#e0d9c9" }}>
        <DraggableSpritesContent />
      </Stage>
      <Button isDisabled={!forestPixiApp} onClick={captureForestState}>
        Capture
      </Button>
    </Flex>
  );
};

export default DraggableSprites;
