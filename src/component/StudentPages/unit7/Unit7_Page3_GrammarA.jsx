import React from "react";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 6/SVG/Asset 1.svg";
const GrammarA = () => {
  return (
    <div>
      {/* العنوان */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read ">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* السؤال 1 */}
      <div className="mb-12">
        <div className="flex items-start gap-5 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              My brother is
              <span className="text-[#12C8F9]"> playing in the finals</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <span>
                <b className="mr-2">1</b>jumping on the trampoline
              </span>
              <span>
                <b className="mr-2">2</b>catching butterflies in the net
              </span>
              <span>
                <b className="mr-2">3</b>jumping rope in the gym
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* السؤال 2 */}
      <div>
        <div className="flex items-start gap-5 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              Are the
              <span className="text-[#12C8F9]"> players winning the first game</span>?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <span>
                <b className="mr-2">1</b>squirrels searching the grass for nuts
              </span>
              <span>
                <b className="mr-2">2</b>violinists playing for the first time 
              </span>
              <span>
                <b className="mr-2">3</b>farmers harvesting the wheat
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
