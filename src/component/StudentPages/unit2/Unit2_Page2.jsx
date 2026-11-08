import React from "react";
import page_5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 11.png";
import "./Unit2_Page2.css";

import ReadingSection_U2 from "./Unit2_Page2_ReadingSection_U2";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Unit2_Page2 = ({ openPopup }) => {
  return (
    <>
      <div role="group" aria-label="unit2 Unit2_Page2" data-page-access="unit2/Unit2_Page2.jsx"
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page_5})` }}
      ><style>{`[data-page-access="unit2/Unit2_Page2.jsx"] :focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
        <div
          className="click-icon-page5 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg role="button" tabIndex={0} data-launcher aria-label="Open reading and comprehension" onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}}
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("html", <ReadingSection_U2 />)}
            style={{ overflow: "visible" }}
          >
            <image aria-hidden="true"
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

export default Unit2_Page2;
