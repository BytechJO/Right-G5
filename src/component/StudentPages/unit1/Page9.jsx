import React from "react";
import page_9 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 9.png";
import "./Page9.css";
// import song from "../../../assets/audio/placeholders/song.mp3";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const Page9 = ({ openPopup }) => {
  return (
    <div data-page-access="Page9.jsx" role="group" aria-label="Unit 1, page 9"
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_9})` }}
    ><style>{`[data-page-access="Page9.jsx"] :focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="click-icon-page9-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-launcher aria-label="Open exercise 4" onKeyDown={(event) => { if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));} }} onKeyUp={(event)=>{if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();}}}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 3 })}
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
        className="click-icon-page9-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-launcher aria-label="Open exercise 5" onKeyDown={(event) => { if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));} }} onKeyUp={(event)=>{if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();}}}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 4 })}
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
        className="click-icon-page9-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-launcher aria-label="Open exercise 6" onKeyDown={(event) => { if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));} }} onKeyUp={(event)=>{if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();}}}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 5 })}
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

export default Page9;
