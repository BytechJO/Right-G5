import React from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 13.png";
import "./Unit2_Page4.css";
import WritingSection_U2 from "./Unit2_Page4_WritingSection_U2";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Unit2_Page4 = ({ openPopup }) => {
  return (
    <div role="group" aria-label="unit2 Unit2_Page4" data-page-access="unit2/Unit2_Page4.jsx"
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_4})` }}
    ><style>{`[data-page-access="unit2/Unit2_Page4.jsx"] :focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="headset-icon-CD-page7 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-launcher aria-label="Open writing" onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("html", <WritingSection_U2 />)}
          style={{ overflow: "visible" }}
        >
          <image aria-hidden="true"
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
};
export default Unit2_Page4;
