import { CheckIcon, ChevronRight, VideoIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TiltImage from "../components/TiltImage";

export default function HeroSections() {
  const navigate = useNavigate();
  const specialFeatures = [
    "No Design Skills Needed",
    "Fast Generation",
    "High CTR Templates",
  ];
  return (
    <div className="relative flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 xl:px-32 ">
      <div className="absolute top-30 left-1/4 -z-10 bg-orange-500 size-72 blur-[800px]"></div>
      <div
        onClick={() => navigate("/generate")}
        className="group flex text-sm items-center mt-44 bg-orange-200/15 p-1 pr-3 rounded-full gap-2 cursor-pointer"
      >
        <span className="p-2 bg-orange-700 rounded-full px-3 py-1 ">New</span>
        <p className="flex items-center gap-1">
          <span>Generate your first thumbnail for free</span>
          <ChevronRight
            size={20}
            className="group-hover:translate-x-0.5 transition duration-300"
          />
        </p>
      </div>
      <h1 className="text-5xl/17 md:text-6xl/21 font-medium max-w-3xl text-center mt-6">
        AI Thumbnail Generator for your{" "}
        <span className="move-gradient px-6 rounded-xl text-nowrap">
          Video.
        </span>
      </h1>
      <p className="text-slate-200 text-center mt-6 max-w-lg p-2 text-base">
        Stop wasting hours on design. Get high-converting thumbnails in seconds
        with our advance AI
      </p>
      <div className="flex items-center gap-8 mt-8">
        <button
          onClick={() => navigate("/generate")}
          className="bg-orange-600 px-6 h-11 rounded-full hover:bg-orange-700 transition duration-300"
        >
          Generate
        </button>
        <button
          onClick={() => navigate("/generate")}
          className="flex items-center border gap-2 border-orange-800 px-6 h-11 rounded-full bg-orange-950/50 transition duration-300"
        >
          <VideoIcon strokeWidth={1} />
          See how it works
        </button>
      </div>
      <div className="flex items-center gap-8 mt-12 text-slate-400">
        {specialFeatures.map((feature: string) => (
          <div className="flex gap-2 items-center" key={feature}>
            <span className="text-orange-600 "><CheckIcon size={20} /></span>
            <span key={feature}>{feature}</span>
          </div>
        ))}
      </div>
      <TiltImage />
    </div>
  );
}
