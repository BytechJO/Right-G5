import React from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 48.png";
import "./Unit6_Page3.css";
import GrammarSection_U6 from "./Unit6_Page3_GrammarSection_U6";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Unit6_Page3 = ({ openPopup }) => {
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
          onClick={() => openPopup("html", <GrammarSection_U6 />)}
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

export default Unit6_Page3;
