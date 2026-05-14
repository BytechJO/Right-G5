import React from "react";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 6/SVG/Asset 1.svg";
const GrammarA = () => {
  return (
    <div>
      {/* العنوان */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* السؤال 1 */}
      <div className="mb-12">
        <div className="flex items-start gap-5 mt-7 ">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px] ml-2.5">
              Jimmy is
              <span className="text-[#12C8F9]"> tall </span> .
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 ml-2.5 text-[17px] w-[900px]">
              <span>
                <b>1</b> a dentist
              </span>
              <span>
                <b>2</b> athletic
              </span>
              <span>
                <b>3</b> slim
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
              Does the <span className="text-[#12C8F9]"> milk</span> taste{" "}
              <span className="text-[#12C8F9]">sour</span> ?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <span>
                <b>1</b> bread, stale
              </span>
              <span>
                <b>2</b> lemon, bitter
              </span>
              <span>
                <b>3</b> cake, sweet
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
