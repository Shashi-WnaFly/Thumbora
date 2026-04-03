import React, { useState } from "react";
import { ThumbnailStyles, type ThumbnailStyle } from "../data/dataAssets";
import { LuSparkle } from "react-icons/lu";

const StyleSelector = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
}: {
  value: ThumbnailStyle;
  onChange: (value: ThumbnailStyle) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  //   const [showStyles, setShowStyles] = useState<boolean>(false);
  const styleDescriptions: Record<ThumbnailStyle, string> = {
    "Bold & Graphic": "High contrast, bold typography, striking visuals",
    "Minimalistic": "Clean design, ample white space, simple typography",
    "Realistic": "Photo-realistic images, natural colors, detailed textures",
    "Illustrated": "Hand-drawn or digitally illustrated elements, vibrant colors, artistic, creative",
    "Tech/Futuristic": "Sleek design, Modern, tech-inspired visuals",
  }

  const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
    "Bold & Graphic": <LuSparkle w-14 h-14 />
  }
  return (
    <div>
      <h3>Thumbnail Style</h3>
    </div>
  );
};

export default StyleSelector;
