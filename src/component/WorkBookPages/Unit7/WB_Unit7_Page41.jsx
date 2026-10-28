import React from "react";
import page_1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 41.png";
import "./WB_unit7.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit7_Page41 = ({ openPopup }) => {
  return (
    <div aria-label={"Workbook Unit 7, page 41"} role={"group"} data-page-access={"WB_Unit7_Page41.jsx"}
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    ><style>{`[data-page-access="WB_Unit7_Page41.jsx"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="q5-7 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 1"} data-launcher={true} tabIndex={0} role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 76 })}
          style={{ overflow: "visible" }}
          // className="click-icon-page8-2 hover:scale-110 transition"
        >
          <image aria-hidden={true}
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

      <div
        className="q6-7 hover:scale-110 transition "
        style={{ overflow: "visible" }}
      >
        <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 2"} data-launcher={true} tabIndex={0} role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 77 })}
          style={{ overflow: "visible" }}
          // className="click-icon-page8-2 hover:scale-110 transition"
        >
          <image aria-hidden={true}
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

export default WB_Unit7_Page41;
