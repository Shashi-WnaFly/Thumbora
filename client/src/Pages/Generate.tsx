import React from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import { useParams } from "react-router-dom";

const Generate = () => {
    const {id} = useParams<string>();
  return (
    <div className="min-h-screen">
      <SoftBackdrop />
      <main className="pt-19 max-w-6xl mx-auto px-4 md:px-8 lg:px-24 xl:px-32">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* left panel */}
            <div>
                <div className={`${id && "pointer-events-none"}`}>
                    <h1 className=" ">Generate Your Thumbnails</h1>
                    <p>Describe your vision and let AI bring it to life</p>
                </div>
            </div>
            {/* right panel */}
            <div>

            </div>
        </div>
      </main>
    </div>
  );
};

export default Generate;
