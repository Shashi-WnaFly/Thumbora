import { yt_html } from "../data/dataAssets";
import { useSearchParams } from "react-router-dom";

const YTPreview = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") ?? "";
  const thumbnailUrl = searchParams.get("thumbnail_url") ?? "";
  
  const ytThumbnail = yt_html
    .replace("%%THUMBNAIL_URL%%", thumbnailUrl.toString())
    .replace("%%TITLE%%", title.toString());

  return (
    <div className="z-100 inset-0 w-full h-full fixed bg-black">
      <iframe
        srcDoc={ytThumbnail}
        className="w-full h-full"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YTPreview;
