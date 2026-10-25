import React, { useRef } from "react";
import page3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 3.png";
const Page3 = ({ goToUnit }) => {
  const clickableAreas = [
    {
      title: "Unit 6",
      startIndex: 46,
      top: "9%",
      left: "14%",
      width: "20%",
      height: "8%",
    },
    {
      title: "Unit 7",
      startIndex: 58,
      top: "25%",
      left: "14%",
      width: "20%",
      height: "8%",
    },
    {
      title: "Unit 8",
      startIndex: 64,
      top: "46%",
      left: "14%",
      width: "20%",
      height: "8%",
    },
    {
      title: "Unit 9",
      startIndex: 76,
      top: "62%",
      left: "14%",
      width: "20%",
      height: "8%",
    },
    {
      title: "Unit 10",
      startIndex: 82,
      top: "77%",
      left: "14%",
      width: "20%",
      height: "8%",
    },
  ];

  const imgRef = useRef(null);

  const handleClick = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = ((x / rect.width) * 100).toFixed(2);
    const yPercent = ((y / rect.height) * 100).toFixed(2);

    // اختياري: تنقل للوحدة 3 كمثال عند أي نقرة
    // goToUnit(22);
  };
  return (
    <div data-page-access="Page3.jsx" role="group" aria-label="Contents, units 6 to 10"
      className="page1-img-wrapper"
      ref={imgRef}
      onClick={handleClick}
      style={{ backgroundImage: `url(${page3})` }}
    ><style>{`[data-page-access="Page3.jsx"] [data-launcher]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img
        src={page3}
        alt="Book Index"
        ref={imgRef}
        onClick={handleClick}
        className="w-full h-full rounded-2xl shadow-lg"
      /> */}
      {clickableAreas.map((area, index) => (
        <div role="button" tabIndex={0} data-launcher aria-label={`Go to ${area.title}`} onKeyDown={(event)=>{if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();if(!event.repeat)goToUnit(area.startIndex);}}} onKeyUp={(event)=>{if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();}}}
          key={index}
          onClick={() => goToUnit(area.startIndex)}
          className="absolute cursor-pointer hover:scale-105 transition-all duration-150"
          style={{
            top: area.top,
            left: area.left,
            width: area.width,
            height: area.height,
            // border: "2px solid rgba(255, 255, 255, 0.3)",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Page3;
