import React from "react";
import { AspectRatios, type AspectRatio } from "../data/dataAssets";
import { RiRectangleLine, RiSquareLine } from "react-icons/ri";

const ratioIcons = {
  "16:9": <RiRectangleLine className="size-6" />,
  "1:1": <RiSquareLine className="size-6" />,
  "9:16": <RiRectangleLine className="size-6" style={{ transform: "rotate(90deg)" }} />,
} as Record<AspectRatio, React.ReactNode>;

const AspectRatioSelector = ({
  value,
  onChange,
}: {
  value: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-medium text-zinc-300">Aspect Ratio</h3>
      <div className="flex flex-wrap justify-evenly text-zinc-100">
        {AspectRatios.map((ratio) => {
          const selected = value === ratio;
          return (
            <button
              key={ratio}
              onClick={() => onChange(ratio)}
              className={`text-bold inline-flex items-center px-5 py-3 rounded-md text-sm mr-4 mb-4 ${selected ? "bg-white/10" : "hover:bg-white/10"}`}
            >
              {ratioIcons[ratio]}
              <span className="ml-2 text-sm md:text-base">{ratio}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
