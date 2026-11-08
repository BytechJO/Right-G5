// import React, { useState, useRef, useEffect } from "react";
import page_8 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 8.png";

import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import "./Page8.css"
const Page8 = ({ openPopup }) => {
  return (
    <div data-page-access="Page8.jsx" role="group" aria-label="Unit 1, page 8"
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_8})` }}
    ><style>{`[data-page-access="Page8.jsx"] :focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page_8} /> */}
      <div
        className="click-icon-page8-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-launcher aria-label="Open exercise 1" onKeyDown={(event) => { if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));} }} onKeyUp={(event)=>{if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();}}}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 0 })}
          // className="click-icon-page8-1 hover:scale-110 transition"
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
      <div
        className="click-icon-page8-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-launcher aria-label="Open exercise 2" onKeyDown={(event) => { if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));} }} onKeyUp={(event)=>{if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();}}}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 1 })}
          style={{ overflow: "visible" }}
          // className="click-icon-page8-2 hover:scale-110 transition"
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

      <div
        className="click-icon-page8-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-launcher aria-label="Open exercise 3" onKeyDown={(event) => { if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));} }} onKeyUp={(event)=>{if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();}}}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 2 })}
          // className="click-icon-page8-3 hover:scale-110 transition"
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

export default Page8;
