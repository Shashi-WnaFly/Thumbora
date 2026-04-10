import React from "react";
import { yt_html } from "../data/dataAssets";
import { useSearchParams } from "react-router-dom";

const YTPreview = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "";
  const thumbnailUrl = searchParams.get("thumbnail_url") || "";
  const ytThumbnail = yt_html
    .replace("%%THUMBNAIL_URL%%", thumbnailUrl.toString())
    .replace("%%TITLE%%", title.toString());

  return (
    <div className="pt-19 min-h-screen">
      <main className="pt-16 max-w-7xl mx-auto px-4 md:px-8 lg:px-24 xl:px-32">
        <div className="bg-white/8 border-white/12 rounded-2xl p-6 space-y-2">
          <iframe
            srcDoc={ytThumbnail}
            width="100%"
            height="100%"
            allowFullScreen
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export default YTPreview;
