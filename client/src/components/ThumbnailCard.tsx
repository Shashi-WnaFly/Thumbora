import type { IThumbnail } from "../data/dataAssets";

const ThumbnailCard = ({
  thumbnail,
  aspectRatio,
}: {
  thumbnail: IThumbnail;
  aspectRatio: string;
}) => {
  return (
    <div className="rounded-2xl bg-white/6 cursor-pointer flex flex-col gap-2 overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
      <div
        className={`w-full h-full ${aspectRatio} overflow-hidden rounded-t-2xl`}
      >
        <img
          className="object-cover rounded-t-2xl"
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
        <p className="text-xs text-zinc-400 line-clamp-2">
          {new Date(thumbnail.createdAt!).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default ThumbnailCard;
