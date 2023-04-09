import { Sprite } from "@pixi/react";
import useDrag from "@/hooks/useDrag";

export const DraggableSprite = ({ x = 400, y = 300, ...props }) => {
  const bind = useDrag({ x, y });

  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      scale={4}
      {...bind}
      {...props}
    />
  );
};

export default DraggableSprite;
