import React from "react";
import page2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 16.png";
import "./WB_unit1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit1_Page4 = ({ openPopup }) => {
 

    return (
      <div
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page2})` }}
      >
        <div
          className="q3-3 hover:scale-110 transition "
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("exercise", { startIndex: 26 })}
            style={{ overflow: "visible" }}
            // className="click-icon-page8-2 hover:scale-110 transition"
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

export default WB_Unit1_Page4;
