import { ArrowRight } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { features } from "../data/features";
import type { IFeature } from "../types";

export default function FeaturesSection() {
  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="w-full mt-16 flex flex-col justify-center items-center ">
        <SectionTitle
          text1="Features"
          text2="What you get"
          text3="Components, patterns and pages - everything you need to ship"
        />
        <div className=" p-8 rounded-lg mt-8 flex flex-wrap justify-center md:justify-between items-center gap-6">
          {features.map((feature: IFeature, index: number) => (
            <div
              key={feature.title}
              className={`${index == 1 ? "p-px rounded-[13px] bg-linear-to-br from-orange-500 to-slate-800" : ""}`}
            >
              <div
                className={` max-w-xs px-4 py-8 rounded-xl border border-slate-800 bg-slate-950 flex flex-col justify-start items-start gap-4`}
              >
                <div>{feature.icon}</div>
                <h3 className="font-semibold text-base">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-40 relative mx-auto max-w-5xl flex flex-col justify-center">
        <div className="absolute -z-50 size-100 -top-10 -left-20 aspect-square rounded-full bg-orange-500/40 blur-3xl"></div>
        <p className="text-slate-300 text-lg text-left max-w-3xl">
          Our AI understands what makes a video go viral and designs thumbnails
          accordingly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
          <div className="md:col-span-2 rounded-2xl overflow-hidden">
            <img
              src={"/assets/Excited_duo_promoting_design_tool.png"}
              alt="feature showcase"
              height={500}
              width={1000}
              className="h-full w-auto "
            />
          </div>
          <div className="md:col-span-1 flex flex-col items-center gap-8">
            <img
              className="hover:-translate-y-0.5 transition duration-300 rounded-2xl"
              height={500}
              width={1000}
              src={"/assets/Monthly_Invoice.png"}
              alt="feature showcase"
            />
            <h3 className="text-2xl text-slate-300 font-semibold py-2">
              boost your views with our AI-powered thumbnails
            </h3>
            <p className="text-slate-300">
              Stop guessing and start creating thumbnails that actually grab
              attention.
            </p>
            <button className="flex gap-2 justify-center items-center group py-2 w-full text-center hover:bg-orange-500/20 hover:text-orange-500 transition duration-300 rounded-2xl">
              Start generating free{" "}
              <span className="-rotate-45 group-hover:rotate-0 transition duration-300">
                <ArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
