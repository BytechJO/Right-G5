import page_4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 10.png";
import "./WB_unit1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const WB_Unit1_Page4 = ({
  openPopup
}) => {
  return <div data-page-access={"WB_Unit2_Page10.jsx"} className="page1-img-wrapper" style={{
    backgroundImage: `url(${page_4})`
  }}><style>{`[data-page-access="WB_Unit2_Page10.jsx"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page_4} /> */}
     
      <div className="q3-2 hover:scale-110 transition" style={{
      overflow: "visible"
    }}>
        <svg onKeyUp={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
        }
      }} onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          if (!event.repeat) event.currentTarget.dispatchEvent(new MouseEvent("click", {
            bubbles: true
          }));
        }
      }} aria-label={"Open activity 1"} data-launcher={true} tabIndex={0} role={"button"} width="22" height="22" viewBox="0 0 90 90" onClick={() => openPopup("exercise", {
        startIndex: 15
      })} style={{
        overflow: "visible"
      }}>
          <image aria-hidden={true} className="svg-img" href={arrowBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>


      <div className="q4-2 hover:scale-110 transition" style={{
      overflow: "visible"
    }}>
        <svg onKeyUp={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
        }
      }} onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          if (!event.repeat) event.currentTarget.dispatchEvent(new MouseEvent("click", {
            bubbles: true
          }));
        }
      }} aria-label={"Open activity 2"} data-launcher={true} tabIndex={0} role={"button"} width="22" height="22" viewBox="0 0 90 90" onClick={() => openPopup("exercise", {
        startIndex: 16
      })} style={{
        overflow: "visible"
      }}>
          <image aria-hidden={true} className="svg-img" href={arrowBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>

    </div>;
};
export default WB_Unit1_Page4;
