import React from "react";
import page_5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 23.png";
import "./Unit3_Page2.css";

import ReadingSection_U2 from "./Unit3_Page2_ReadingSection_U2";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Unit3_Page2 = ({ openPopup }) => {
  return (
    <>
      <div
        role="group" aria-label="Unit 3, page 2" data-page-access="unit3-page2" className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page_5})` }}
      ><style>{`[data-page-access="unit3-page2"] :focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
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

export default Unit3_Page2;
