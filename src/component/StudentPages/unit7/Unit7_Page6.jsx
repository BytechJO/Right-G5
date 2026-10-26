import React from "react";
import page_6 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 63.png";

// import song from "../../../assets/img_unit5/sounds-unit5/Pg15.Sing_Adult Lady.mp3";
import "./Unit7_Page6.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Unit7_Page6 = ({ openPopup }) => {
  return (
    <div
      data-page-access={"Unit7_Page6.jsx"}
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_6})` }}
    >
      <style>{`[data-page-access="Unit7_Page6.jsx"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page_6} /> */}
      <div
        className="click-icon-unit7-page6-1 hover:scale-110 transition"
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
          onClick={() => openPopup("exercise", { startIndex: 70 })}
          style={{ overflow: "visible" }}
        >
          <image
            aria-hidden={true}
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="click-icon-unit7-page6-2 hover:scale-110 transition"
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
          onClick={() => openPopup("exercise", { startIndex: 71 })}
          style={{ overflow: "visible" }}
        >
          <image
            aria-hidden={true}
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>{" "}
      <div
        className="click-icon-unit7-page6-3 hover:scale-110 transition"
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
          aria-label={"Open activity 3"}
          data-launcher={true}
          tabIndex={0}
          role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 72 })}
          style={{ overflow: "visible" }}
        >
          <image
            aria-hidden={true}
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
    </div>
  );
};

export default Unit7_Page6;
