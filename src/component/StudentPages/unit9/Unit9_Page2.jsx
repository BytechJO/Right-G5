import React from "react";
import page_5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 77.png";
import "./Unit9_Page2.css";

import ReadingSection_U9 from "./Unit9_Page2_ReadingSection_U9";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Unit9_Page2 = ({ openPopup }) => {
  return (
    <>
      <div data-page-access={"Unit9_Page2.jsx"}
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page_5})` }}
      ><style>{`[data-page-access="Unit9_Page2.jsx"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
        <div
          className="click-icon-page5 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 1"} data-launcher={true} tabIndex={0} role={"button"}
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("html", <ReadingSection_U9 />)}
            style={{ overflow: "visible" }}
          >
            <image aria-hidden={true}
              className="svg-img"
              href={audioBtn}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Unit9_Page2;
