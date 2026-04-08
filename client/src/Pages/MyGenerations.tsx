import React, { useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import type { IAspectRatio, IThumbnail } from "../data/dataAssets";
import ThumbnailCard from "../components/ThumbnailCard";
import { demoThumbnail as thumbnails} from "../data/dataAssets";

const MyGenerations = () => {

  const AspectRatioClass : Record<IAspectRatio, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  }

  // const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(false);

  // setThumbnails(demoThumbnail);

  return (
    <>
      <SoftBackdrop />
      <div className="mt-29 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-zinc-200 text-2xl font-bold">My Generations</h1>
          <p className="text-zinc-400 text-sm mt-1">
            View or manage your AI-generated thumbnails
          </p>
        </div>
        {loading && (
          <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white/8 border-white/12 rounded-2xl p-4 h-52"
              />
            ))}
          </div>
        )}

        {!loading && thumbnails.length < 1 && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <h3 className="font-bold text-zinc-200 text-lg">No thumbnails yet</h3>
            <p className="text-zinc-400 text-sm mt-2">
              You haven't generated any thumbnails yet. Start creating to see
              them here.
            </p>
          </div>
        )}

        {!loading && thumbnails.length > 0 && (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {thumbnails?.map((thumb) => (<ThumbnailCard key={thumb?.id} thumbnail={thumb} aspectRatio={AspectRatioClass[thumb?.aspect_ratio]}   />))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyGenerations;
