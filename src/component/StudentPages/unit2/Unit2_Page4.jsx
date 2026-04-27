import React from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 13.png";
import "./Unit2_Page4.css";
import WritingSection_U2 from "./Unit2_Page4_WritingSection_U2";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Unit2_Page4 = ({ openPopup }) => {
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
          onClick={() => openPopup("html", <WritingSection_U2 />)}
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
export default Unit2_Page4;
