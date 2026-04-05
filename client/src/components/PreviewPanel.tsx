import React from "react";
import type { AspectRatio, IThumbnail } from "../data/dataAssets";

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: string;
}) => {
    const aspectClasses = {
        "16:9": "aspect-video",
        "1:1": "aspect-square",
        "9:16": "aspect-[9/16]"
    } as Record<AspectRatio, string>

  return <div className="w-full max-w-2xl mx-auto relative">
    <div className={`relative overflow-hidden ${aspectClasses[aspectRatio as AspectRatio]} rounded-2xl bg-white/8 border-white/12 ${isLoading ? "animate-pulse" : ""}`}>

    </div>
  </div>
};

export default PreviewPanel;
