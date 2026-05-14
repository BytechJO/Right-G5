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
              If Jeremy <span className="text-[#12C8F9]">shoots a basket </span>
              , he <span className="text-[#12C8F9]"> will make it </span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <span>
                <b className="mr-2">1</b>cooks some eggs, will give us some
              </span>
              <span>
                <b className="mr-2">2</b>goes swimming, will practice diving
              </span>
              <span>
                <b className="mr-2">3</b>gets an A on his test, would be so
                happy
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
              Nancy{" "}
              <span className="text-[#12C8F9]"> will arrive shortly </span>
              if <span className="text-[#12C8F9]"> her plane is on time </span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <span>
                <b className="mr-2">1</b>would call us she’s going to be late
              </span>
              <span>
                <b className="mr-2">2</b>will jog, it’s not too hot
              </span>
              <span>
                <b className="mr-2">3</b>will know three languages, she learns
                English well
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
