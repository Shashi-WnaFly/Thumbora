import React, { useState } from "react";
import { ThumbnailStyles, type ThumbnailStyle } from "../data/dataAssets";
import {
  LuChevronUp,
  LuCpu,
  LuImage,
  LuPenTool,
  LuSparkle,
  LuSquare,
} from "react-icons/lu";

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
    Minimalistic: "Clean design, ample white space, simple typography",
    Realistic: "Photo-realistic images, natural colors, detailed textures",
    Illustrated: "Hand-drawn, vibrant colors, artistic, creative",
    "Tech/Futuristic": "Sleek design, Modern, tech-inspired visuals",
  };

  const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
    "Bold & Graphic": <LuSparkle w-14 h-14 />,
    Minimalistic: <LuSquare w-14 h-14 />,
    Realistic: <LuImage w-14 h-14 />,
    Illustrated: <LuPenTool w-14 h-14 />,
    "Tech/Futuristic": <LuCpu w-14 h-14 />,
  };

  return (
    <div className="relative space-y-3 dark">
      <h3 className="block text-sm font-medium text-zinc-300">
        Thumbnail Style
      </h3>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full rounded-md border border-white/10 bg-white/8 p-3 text-left hover:bg-white/12 transition"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-medium">
            {styleIcons[value]}
            <span>{value}</span>
          </div>
          <p className="text-xs text-zinc-400">{styleDescriptions[value]}</p>
        </div>
        <LuChevronUp
          className={[
            "h-5 w-5 text-zinc-400 transition-transform",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 bottom-0 mt-1 w-full rounded-md bg-black/20 border border-white/12 backdrop-blur-2xl shadow-lg">
          {ThumbnailStyles.map((style) => (
            <button
              type="button"
              onClick={() => {
                onChange(style);
                setIsOpen(false);
              }}
              className="flex justify-between items-center w-full rounded-md border border-white/10 bg-black/30 p-3 text-left hover:bg-white/12 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-medium">
                  {styleIcons[style]}
                  <span>{style}</span>
                </div>
                <p className="text-xs text-zinc-400">
                  {styleDescriptions[style]}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleSelector;
