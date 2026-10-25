import React from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 30.png";
import "./Unit4_Page3.css";
import GrammarSection_U1 from "./Unit4_Page3_GrammarSection_U1";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
const Unit4_Page3 = ({
  openPopup
}) => {
  return <div role="group" aria-label="Unit 4 page 3" data-page-access="unit4-page3" className="page1-img-wrapper" style={{
    backgroundImage: `url(${page_3})`
  }}><style>{`[data-page-access="unit4-page3"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div className="headset-icon-CD-page6 hover:scale-110 transition" style={{
      overflow: "visible"
    }}>
        <svg onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          if (!event.repeat) event.currentTarget.dispatchEvent(new MouseEvent("click", {
            bubbles: true
          }));
        }
      }} onKeyUp={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
        }
      }} aria-label={"Open grammar"} data-launcher={true} tabIndex={0} role={"button"} width="22" height="22" viewBox="0 0 90 90" onClick={() => openPopup("html", <GrammarSection_U1 />)} style={{
        overflow: "visible"
      }}>
          <image aria-hidden={true} className="svg-img" href={audioBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>
    </div>;
};
export default Unit4_Page3;
