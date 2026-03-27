import { ArrowRightIcon, MailIcon, UserIcon } from "lucide-react";
import SectionTitle from "../components/SectionTitle";

export default function ContactSection() {
  return (
    <div className=" mt-16 px-4 md:px-16 lg:px-24 xl:px-32">
      <SectionTitle
        text1="Contact"
        text2="Reach out to us"
        text3="Ready to grow your brand? Let’s connect and build something exceptional together."
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-16 w-full"
      >
        <div>
          <p className="mb-2 font-medium">Your name</p>
          <div className="flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-orange-500">
            <UserIcon className="size-5" />
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 outline-none"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium">Email id</p>
          <div className="flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-orange-500">
            <MailIcon className="size-5" />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 outline-none"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <p className="mb-2 font-medium">Message</p>
          <textarea
            name="message"
            rows={8}
            placeholder="Enter your message"
            className="focus:border-orange-500 resize-none w-full p-3 outline-none rounded-lg border border-slate-700"
          />
        </div>

        <button
          type="submit"
          className="group w-max flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-3 rounded-full"
        >
          Submit
          <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition duration-300" />
        </button>
      </form>
    </div>
  );
}
