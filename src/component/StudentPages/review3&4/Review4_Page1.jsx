import page_1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36.png";
import "./Review4_Page1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const Review4_Page1 = ({ openPopup }) => {
  return (
    <div
      data-review-access={"Review4_Page1.jsx"}
      aria-label={"Review4_Page1"}
      role={"group"}
      className="page1-img-wrapper"
      style={{
        backgroundImage: `url(${page_1})`,
      }}
    >
      <style>{`[data-review-access="Review4_Page1.jsx"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page_1} /> */}

      <div
        className="click-icon-review3-page1-1-p36 hover:scale-110 transition"
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
              startIndex: 41,
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
        className="click-icon-review3-page1-2-p36 hover:scale-110 transition"
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
              startIndex: 42,
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
        className="click-icon-review3-page1-3-p36 hover:scale-110 transition"
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
          aria-label={"Open exercise 3"}
          data-launcher={true}
          tabIndex={0}
          role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup("exercise", {
              startIndex: 43,
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
export default Review4_Page1;
