import React from "react";
import page_5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 77.png";
import "./Unit9_Page2.css";

import ReadingSection_U9 from "./Unit9_Page2_ReadingSection_U9";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Unit9_Page2 = ({ openPopup }) => {
  return (
    <>
      <div
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page_5})` }}
      >
        <div
          className="click-icon-page5 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("html", <ReadingSection_U9 />)}
            style={{ overflow: "visible" }}
          >
            <image
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

export default Unit9_Page2;
