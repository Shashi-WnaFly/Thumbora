import SectionTitle from "../components/SectionTitle";
import { features } from "../data/features";
import type { IFeature } from "../types";

export default function Feature() {
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
            <div className={`${index == 1 ? "p-px rounded-[13px] bg-linear-to-br from-orange-500 to-slate-800" : ""}`}>
              <div
                key={feature.title}
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
    </div>
  );
}
