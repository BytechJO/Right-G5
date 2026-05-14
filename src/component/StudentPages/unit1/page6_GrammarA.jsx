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
        <div className="flex items-start gap-5">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div >
            <p className="text-[18px]">
              How <span className="text-[#12C8F9]">far</span> can you{" "}
              <span className="text-[#12C8F9]">walk</span>?
            </p>

            <div className="grid grid-cols-3 mt-5 text-[17px] w-[500px]">
              <span>
                <b>1</b> deep, dive
              </span>
              <span>
                <b>2</b> low, sing
              </span>
              <span>
                <b>3</b> high, reach
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
              I can <span className="text-[#12C8F9]">jump</span>{" "}
              <span className="text-[#12C8F9]">three meters</span>.
            </p>

            <div className="grid grid-cols-3 mt-5 text-[17px] w-[500px]">
              <span>
                <b>1</b> dive 10 meters
              </span>
              <span>
                <b>2</b> sing a low C
              </span>
              <span>
                <b>3</b> reach two meters
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
