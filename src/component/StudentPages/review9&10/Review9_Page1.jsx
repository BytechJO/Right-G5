
import page_1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 88.png";
import "./Review9_Page1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
// import Unit4_Page6_Q2 from "./Unit4_Page6_Q2";
const Review9_Page1 = ({ openPopup }) => {
  return (
    <div data-page-access={"Review9_Page1.jsx"}
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_1})` }}
    ><style>{`[data-page-access="Review9_Page1.jsx"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page_1} /> */}
      <div
        className="click-icon-review9-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 1"} data-launcher={true} tabIndex={0} role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 99 })}
          style={{ overflow: "visible" }}
        >
          <image aria-hidden={true}
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
        className="click-icon-review9-page1-2  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 2"} data-launcher={true} tabIndex={0} role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 100})}
          style={{ overflow: "visible" }}
        >
          <image aria-hidden={true}
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
        className="click-icon-review9-page1-3  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 3"} data-launcher={true} tabIndex={0} role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 101 })}
          style={{ overflow: "visible" }}
        >
          <image aria-hidden={true}
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

export default Review9_Page1;
