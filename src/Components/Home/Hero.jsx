import React from "react";

function Hero() {
  return (
    <div className="text-center max-w-[800px] mt-20 mx-auto px-4">
      <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-10">
        Study Smarter with Notes That Actually Work.
      </h1>

      <p className="text-gray-500">
        Get top-rated notes from seniors who’ve been there, done that. Save
        time, boost your grades, and focus on what really matters.
      </p>

      <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
        <button className="bg-white text-black rounded-3xl px-6 py-2 font-semibold shadow hover:bg-gray-100">
          Explore Now
        </button>
        <button className="text-white border-2 border-gray-400 rounded-3xl px-6 py-2 font-semibold hover:bg-gray-800">
          How it works
        </button>
      </div>
    </div>
  );
}

export default Hero;
