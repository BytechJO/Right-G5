import React, { useState } from "react";
import WritingA from "./Unit2_Page4_WritingA";
import WritingB from "./Unit2_Page4_WritingB";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 7/SVG/Asset 1.svg";

const WritingSection_U1 = () => {

  const [resetTrigger, setResetTrigger] = useState(0);

  return (
    <div>
      {/* العنوان */}
      <div className="w-[60%] mx-auto mb-4 flex items-center">
        <div
          className="px-4 py-1 font-bold text-black w-fit"
          style={{
            backgroundImage: `url(${ReadingBG})`,
            backgroundSize: "cover",
          }}
        >
          Writing
        </div>
      </div>

      {/* المحتوى */}
      <div className="flex flex-col w-[60%] mx-auto space-y-10 mb-15">
        <img
          src={img}
          alt=""
          style={{ width: "auto", height: "500px", objectFit: "contain" }}
        />
        <WritingA
          resetTrigger={resetTrigger} // 👈 مهم
        />
        <WritingB resetTrigger={resetTrigger} />
      </div>
      <div className="action-buttons-container">
        <button
          className="try-again-button"
          onClick={() => {
            setResetTrigger((p) => p + 1);
          }}
        >
          Start Again ↻
        </button>
      </div>
      
    </div>
  );
};

export default WritingSection_U1;
