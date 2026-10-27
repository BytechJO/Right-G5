import {useRef} from "react";
import page_4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 4.png";
import "./WB_unit5.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit1_Page4 = ({ openPopup }) => {
  const audioRef = useRef(null);
  return (
    <div data-page-access={"WB_Unit1_Page4.jsx"}
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_4})` }}
    ><style>{`[data-page-access="WB_Unit1_Page4.jsx"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page_4} /> */}

      <div
        className="q3-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 1"} data-launcher={true} tabIndex={0} role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 2 })}
          style={{ overflow: "visible" }}
        >
          <image aria-hidden={true}
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
        className="q4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true}));}}} aria-label={"Open activity 2"} data-launcher={true} tabIndex={0} role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 3 })}
          style={{ overflow: "visible" }}
        >
          <image aria-hidden={true}
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

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default WB_Unit1_Page4;
