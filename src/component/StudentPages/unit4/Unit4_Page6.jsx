import React from "react";
import page_6 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 33.png";
// import song from "../../../assets/img_unit4/sounds-unit4/Pg15.Sing_Adult Lady.mp3";
import "./Unit4_Page6.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const Unit4_Page6 = ({ openPopup }) => {
  return (
    <div
      role="group"
      aria-label="Unit 4 page 6"
      data-page-access="unit4-page6"
      className="page1-img-wrapper"
      style={{
        backgroundImage: `url(${page_6})`,
      }}
    >
      <style>{`[data-page-access="unit4-page6"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page_6} /> */}

      <div
        className="click-icon-unit4-page6-1 hover:scale-110 transition"
        style={{
          overflow: "visible",
        }}
      >
        <svg
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              if (!event.repeat)
                event.currentTarget.dispatchEvent(
                  new MouseEvent("click", {
                    bubbles: true,
                  }),
                );
            }
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          aria-label={"Open exercise 1"}
          data-launcher={true}
          tabIndex={0}
          role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup("exercise", {
              startIndex: 32,
            })
          }
          style={{
            overflow: "visible",
          }}
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
        className="click-icon-unit4-page6-2 hover:scale-110 transition"
        style={{
          overflow: "visible",
        }}
      >
        <svg
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              if (!event.repeat)
                event.currentTarget.dispatchEvent(
                  new MouseEvent("click", {
                    bubbles: true,
                  }),
                );
            }
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          aria-label={"Open exercise 2"}
          data-launcher={true}
          tabIndex={0}
          role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup("exercise", {
              startIndex: 33,
            })
          }
          style={{
            overflow: "visible",
          }}
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
        className="click-icon-unit4-page6-3 hover:scale-110 transition"
        style={{
          overflow: "visible",
        }}
      >
        <svg
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              if (!event.repeat)
                event.currentTarget.dispatchEvent(
                  new MouseEvent("click", {
                    bubbles: true,
                  }),
                );
            }
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          aria-label={"Open exercise 3"}
          data-launcher={true}
          tabIndex={0}
          role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup("exercise", {
              startIndex: 34,
            })
          }
          style={{
            overflow: "visible",
          }}
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
export default Unit4_Page6;
