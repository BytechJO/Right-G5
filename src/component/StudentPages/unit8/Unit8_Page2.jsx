import React from "react";
import page_5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 65.png";
import "./Unit8_Page2.css";

import ReadingSection_U8 from "./Unit8_Page2_ReadingSection_U8";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Unit8_Page2 = ({ openPopup }) => {
  return (
    <>
      <div data-page-access={"Unit8_Page2.jsx"}
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page_5})` }}
      ><style>{`[data-page-access="Unit8_Page2.jsx"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
        <div
          className="click-icon-page5 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 1"} data-launcher={true} tabIndex={0} role={"button"}
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("html", <ReadingSection_U8 />)}
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

export default Unit8_Page2;
