import React from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 66.png";
import "./Unit8_Page3.css";
import GrammarSection_U8 from "./Unit8_Page3_GrammarSection_U8";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Unit8_Page3 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_3})` }}
    >
      <div
        className="headset-icon-CD-page6 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("html", <GrammarSection_U8 />)}
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
  );
};

export default Unit8_Page3;
