import React from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 49.png";
import "./Unit6_Page4.css";
import WritingSection_U2 from "./Unit6_Page4_WritingSection_U6";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Unit6_Page4 = ({ openPopup }) => {
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
export default Unit6_Page4;
