import React, { useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import { useParams } from "react-router-dom";
import AspectRatioSelector from "../components/AspectRatioSelector";
import type { AspectRatio, ThumbnailStyle } from "../data/dataAssets";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";

const Generate = () => {
  const { id } = useParams<string>();
  const [title, setTitle] = useState<string>("");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [colorScheme, setColorScheme] = useState<string>('vibrant');
  // const [additionalInfo, setAdditionalInfo] = useState<string>("");

  return (
    <div className="pt-19 min-h-screen">
      <SoftBackdrop />
      <main className="max-w-6xl mx-auto px-4 md:px-8 lg:px-24 xl:px-32">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* left panel */}
          <div className={`${id && "pointer-events-none"} space-y-6`}>
            <div className="bg-white/8 border-white/12 rounded-2xl p-6 space-y-2">
              <div>
                <h1 className=" text-zinc-100 font-semibold text-xl">
                  Generate Your Thumbnails
                </h1>
                <p className="text-zinc-400">
                  Describe your vision and let AI bring it to life
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title or Topic
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="description"
                  id="title"
                  className="block w-full rounded-md outline-0 border border-zinc-600 shadow-sm focus:ring-2 focus:ring-orange-700 p-2 sm:text-sm bg-transparent text-zinc-400"
                  placeholder="e.g., 'How to Make a Perfect Cup of Coffee'"
                  maxLength={100}
                />
                <span className="block pt-2 text-zinc-400 text-right text-sm">
                  {title.length}/100
                </span>
              </div>
              {/* AspactRatioSelector */}
              <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
              {/* {StyleSelector} */}
              <StyleSelector value={style} onChange={setStyle} isOpen={isOpen} setIsOpen={setIsOpen} />
              {/* ColorSchemeSelector */}
              <ColorSchemeSelector value={colorScheme} onChange={setColorScheme}/>
            </div>
          </div>
          {/* right panel */}
          <div></div>
        </div>
      </main>
    </div>
  );
};

export default Generate;
