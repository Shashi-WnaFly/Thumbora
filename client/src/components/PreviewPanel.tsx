import React from "react";
import type { AspectRatio, IThumbnail } from "../data/dataAssets";
import { LuDownload, LuImage, LuLoader } from "react-icons/lu";

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
    "9:16": "aspect-[9/16]",
  } as Record<AspectRatio, string>;

  const onDownload = () => {
    if (!thumbnail || !thumbnail.image_url) return;
    window.open(thumbnail.image_url, "_blank");
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div
        className={`relative overflow-hidden ${aspectClasses[aspectRatio as AspectRatio]} rounded-2xl bg-white/8 border-white/12 `}
      >
        {isLoading && (
          <div className="flex flex-col inset-0 absolute items-center justify-center gap-4 bg-black/25">
            <LuLoader className="animate-spin size-8 text-zinc-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-200">
                AI is creating your thumbnail...
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                This may take 10-20 seconds.
              </p>
            </div>
          </div>
        )}

        {!isLoading && thumbnail?.image_url && (
          <div className="w-full h-full group relative">
            <img
              src={thumbnail.image_url}
              alt={thumbnail.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-end justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={onDownload}
                className="mb-6 flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-medium transition bg-white/30 ring-2 ring-white/40 backdrop-blur hover:scale-105 active:scale-95"
              >
                <LuDownload className="size-4" />
                Download Thumbnail
              </button>
            </div>
          </div>
        )}

        {!isLoading && !thumbnail?.image_url && (
          <div className="flex flex-col inset-0 absolute items-center justify-center gap-4 bg-black/25">
            <div className="max-sm:hidden flex size-20 items-center justify-center rounded-full bg-white/10">
              <LuImage className="size-10 text-white opacity-50" />
            </div>
            <div className="text-center px-4">
              <p className="text-sm font-medium text-zinc-200">
                Generate your thumbnail
              </p>
              <p className="text-xs text-zinc-400">
                Fill out the form and click "Generate Thumbnails"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
