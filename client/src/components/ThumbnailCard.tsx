import { FaDownload, FaTrash } from "react-icons/fa";
import type { IThumbnail } from "../data/dataAssets";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const ThumbnailCard = ({
  thumbnail,
  aspectRatio,
}: {
  thumbnail: IThumbnail;
  aspectRatio: string;
}) => {
  return (
    <div className="group rounded-2xl bg-white/6 cursor-pointer flex flex-col gap-2 overflow-hidden hover:shadow-lg hover:shadow-orange-600 transition-shadow duration-300">
      <div
        className={`w-full h-full ${aspectRatio} overflow-hidden rounded-t-2xl `}
      >
        <img
          className="object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
          src={thumbnail.image_url}
          alt={thumbnail.title}
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-md font-semibold text-zinc-200">
          {thumbnail.title}
        </h3>
        <div className="flex gap-2 text-xs text-zinc-400 ">
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-nowrap text-ellipsis overflow-hidden">
            {thumbnail.style}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/10 ">
            {thumbnail.color_scheme}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/10 ">
            {thumbnail.aspect_ratio}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-nowrap text-ellipsis overflow-hidden text-xs line-clamp-2 text-zinc-400 ">
            {new Date(thumbnail.createdAt!).toDateString()}
          </p>
          <div className=" text-sm gap-4 group-hover:flex hidden">
            <button>
              <FaTrash className="text-white hover:text-orange-600" />
            </button>
            <button>
              <FaDownload className="text-white hover:text-orange-600" />
            </button>
            <button>
              <FaArrowUpRightFromSquare className="text-white hover:text-orange-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCard;
