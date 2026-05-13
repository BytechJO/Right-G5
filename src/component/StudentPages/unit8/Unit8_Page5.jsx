import page_5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 68.png";
import "./Unit8_Page5.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const Unit8_Page5 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_5})` }}
    >
      {/* <img src={page_5} /> */}

      <div
        className="click-icon-unit8-page5-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 73 })}
          style={{ overflow: "visible" }}
        >
          <image
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
        className="click-icon-unit8-page5-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 74 })}
          style={{ overflow: "visible" }}
        >
          <image
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

export default Unit8_Page5;
