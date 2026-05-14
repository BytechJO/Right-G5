import React from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 79.png";
import "./Unit9_Page4.css";
import WritingSection_U9 from "./Unit9_Page4_WritingSection_U9";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Unit9_Page4 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_4})` }}
    >
      <div
        className="headset-icon-CD-page7 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("html", <WritingSection_U9 />)}
          style={{ overflow: "visible" }}
        >
          <image
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
export default Unit9_Page4;
