import type { SectionTitleProps } from "../types";

export default function SectionTitle({text1, text2, text3}: SectionTitleProps) {
  return (
    <div className="p-2 flex justify-center items-center flex-col gap-4">
      <p className="px-8 py-2 border text-center border-amber-600 bg-amber-700/40 rounded-full text-orange-400">{text1}</p>
      <h3 className="text-3xl font-semibold">{text2}</h3>
      <p className="text-slate-300">{text3}</p>
    </div>
  )
}
