import React from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 43.png";
import "./Unit5_Page4.css";
import WritingSection_U2 from "./Unit5_Page4_WritingSection_U2";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const Unit5_Page4 = ({
  openPopup
}) => {
  return <div data-page-access={"unit5-page4"} aria-label={"Unit 5 page 4"} role={"group"} className="page1-img-wrapper" style={{
    backgroundImage: `url(${page_4})`
  }}><style>{`[data-page-access="unit5-page4"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div className="headset-icon-CD-page7 hover:scale-110 transition" style={{
      overflow: "visible"
    }}>
        <svg onKeyUp={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
        }
      }} onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          if (!event.repeat) event.currentTarget.dispatchEvent(new MouseEvent("click", {
            bubbles: true
          }));
        }
      }} aria-label={"Open writing"} data-launcher={true} tabIndex={0} role={"button"} width="22" height="22" viewBox="0 0 90 90" onClick={() => openPopup("html", <WritingSection_U2 />)} style={{
        overflow: "visible"
      }}>
          <image aria-hidden={true} className="svg-img" href={arrowBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>
    </div>;
};
export default Unit5_Page4;
