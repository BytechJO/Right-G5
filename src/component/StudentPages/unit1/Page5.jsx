import React from "react";
import page_5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 5.png";
import "./Page5.css";
import ReadingSection_U1 from "./page5_ReadingSection_U1";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Page5 = ({ openPopup }) => {
  return (
    <>
      <div data-page-access="Page5.jsx" role="group" aria-label="Unit 1, page 5"
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page_5})` }}
      ><style>{`[data-page-access="Page5.jsx"] :focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
        <div
          className="click-icon-page5 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg role="button" tabIndex={0} data-launcher aria-label="Open reading and comprehension" onKeyDown={(event) => { if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));} }} onKeyUp={(event)=>{if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();}}}
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("html", <ReadingSection_U1 />)}
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

export default Page5;
