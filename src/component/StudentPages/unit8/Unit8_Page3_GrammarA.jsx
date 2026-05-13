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
        <div className="flex items-start gap-2 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              <span className="text-[#12C8F9]">Everyone </span>
              cheered when Hannah made a goal.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <span>
                <b className="mr-2">1</b>someone
              </span>
              <span>
                <b className="mr-2">2</b>somebody
              </span>
              <span>
                <b className="mr-2">3</b>no one
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
              Did you see
              <span className="text-[#12C8F9]"> anyone </span>
              at practice?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <span>
                <b className="mr-2">1</b>anybody
              </span>
              <span>
                <b className="mr-2">2</b>something
              </span>
              <span>
                <b className="mr-2">3</b>everybody
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
