import React from "react";
import page from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 23.png";
import "./WB_unit1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit4_Page23 = ({ openPopup }) => {
  return (
    <div
      aria-label={"Workbook Unit 4, page 23"}
      role={"group"}
      data-page-access={"WB_Unit4_Page23.jsx"}
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page})` }}
    >
      <style>{`[data-page-access="WB_Unit4_Page23.jsx"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page} /> */}
      <div
        className="q7-4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          onKeyUp={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              if (!event.repeat)
                event.currentTarget.dispatchEvent(
                  new MouseEvent("click", { bubbles: true }),
                );
            }
          }}
          aria-label={"Open activity 1"}
          data-launcher={true}
          tabIndex={0}
          role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 40 })}
          // className="click-icon-page8-1 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <image
            aria-hidden={true}
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
      <div
        className="q6-4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          onKeyUp={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              if (!event.repeat)
                event.currentTarget.dispatchEvent(
                  new MouseEvent("click", { bubbles: true }),
                );
            }
          }}
          aria-label={"Open activity 2"}
          data-launcher={true}
          tabIndex={0}
          role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 41 })}
          style={{ overflow: "visible" }}
          // className="click-icon-page8-2 hover:scale-110 transition"
        >
          <image
            aria-hidden={true}
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

export default WB_Unit4_Page23;
