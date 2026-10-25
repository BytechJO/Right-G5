import React from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 31.png";
import "./Unit4_Page4.css";
import WritingSection_U2 from "./Unit4_Page4_WritingSection_U2";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const Unit4_Page4 = ({
  openPopup
}) => {
  return <div role="group" aria-label="Unit 4 page 4" data-page-access="unit4-page4" className="page1-img-wrapper" style={{
    backgroundImage: `url(${page_4})`
  }}><style>{`[data-page-access="unit4-page4"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div className="headset-icon-CD-page7 hover:scale-110 transition" style={{
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
      }} aria-label={"Open writing"} data-launcher={true} tabIndex={0} role={"button"} width="22" height="22" viewBox="0 0 90 90" onClick={() => openPopup("html", <WritingSection_U2 />)} style={{
        overflow: "visible"
      }}>
          <image aria-hidden={true} className="svg-img" href={arrowBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>
    </div>;
};
export default Unit4_Page4;
