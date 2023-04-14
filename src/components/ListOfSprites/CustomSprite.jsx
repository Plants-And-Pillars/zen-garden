import { Sprite } from "@pixi/react";

const CustomSprite = ({ x, y, onClick }) => {
  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      scale={2}
      x={x}
      y={y}
      interactive={true}
      onpointerup={onClick}
    />
  );
};

export default CustomSprite;
