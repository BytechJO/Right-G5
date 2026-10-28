import React from "react";
import page_1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 29.png";
import "./WB_unit5.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit5_Page29 = ({ openPopup }) => {
  return (
    <div aria-label={"Workbook Unit 5, page 29"} role={"group"} data-page-access={"WB_Unit5_Page29.jsx"}
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    ><style>{`[data-page-access="WB_Unit5_Page29.jsx"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="q5-5 hover:scale-110 transition "
        style={{ overflow: "visible" }}
      >
        <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 1"} data-launcher={true} tabIndex={0} role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 50 })}
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
        className="q6-5 hover:scale-110 transition "
        style={{ overflow: "visible" }}
      >
        <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 2"} data-launcher={true} tabIndex={0} role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 51 })}
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
        className="q7-5 hover:scale-110 transition "
        style={{ overflow: "visible" }}
      >
        <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 3"} data-launcher={true} tabIndex={0} role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 52 })}
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

export default WB_Unit5_Page29;
