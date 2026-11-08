import React from "react";
import page_2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 37.png";
import "./Review4_Page2.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
// import Unit4_Page6_Q2 from "./Unit4_Page6_Q2";
const Review4_Page2 = ({ openPopup }) => {
  return (
    <div
      data-review-access={"Review4_Page2.jsx"}
      aria-label={"Review4_Page2"}
      role={"group"}
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{
        backgroundImage: `url(${page_2})`,
      }}
    >
      <style>{`[data-review-access="Review4_Page2.jsx"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page_2} /> */}

      <div
        className="click-icon-review3-page2-2-p37 hover:scale-110 transition"
        style={{
          overflow: "visible",
        }}
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
                  new MouseEvent("click", {
                    bubbles: true,
                  }),
                );
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
              startIndex: 44,
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
        className="click-icon-review3-page2-3-p37 hover:scale-110 transition"
        style={{
          overflow: "visible",
        }}
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
                  new MouseEvent("click", {
                    bubbles: true,
                  }),
                );
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
              startIndex: 45,
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
export default Review4_Page2;
