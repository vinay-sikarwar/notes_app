import React from "react";
import "./Rest.css";
import Upload from "../assets/upload.gif";
import Study from "../assets/study.gif";
import Pay from "../assets/online-pay.gif";
import Browse from "../assets/browse.gif";

function Rest() {
  return (
    <div className="flex-col max-w-full mt-20 pb-20 bg-gray-500 pt-10">
      <h1 className="text-white text-4xl text-center font-bold mb-10">
        How it works?
      </h1>

      <div className="flex justify-center flex-wrap text-center">
        <div className="how_it_works">
          <img src={Upload} alt="upload" />
          <p>Seniors upload notes</p>
        </div>
        <div className="how_it_works">
          <img src={Browse} alt="" />
          <p>Juniors browse and preview</p>
        </div>
        <div className="how_it_works">
          <img src={Pay} alt="" />
          <p>Pay & download</p>
        </div>
        <div className="how_it_works">
          <img src={Study} alt="" />
          <p>Study smarter</p>
        </div>
      </div>
    </div>
  );
}

export default Rest;
