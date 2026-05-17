import React, { useEffect, useState } from "react";
import page25 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 21.png";
import "./Reading_Unit2_Page1.css";
import { FaHeadphones } from "react-icons/fa";
import sound1 from "../../../assets/audio/ClassBook/U2/PG 21/Pg21_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/U2/PG 21/Pg21_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U2/PG 21/Pg21_1.8_Adult Lady.mp3";
const Reading_Unit2_Page2 = ({ audioRef, activeAudio, setActiveAudio }) => {
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    setActiveAudio(null);
  }, [setActiveAudio]);
  const clickableAreas = [
    { x1: 10.43, y1: 33.89, x2: 47.92, y2: 48.95, sound: sound1 },
    { x1: 50.93, y1: 33.89, x2: 88.64, y2: 48.78, sound: sound2 },
    { x1: 51.58, y1: 55.38, x2: 87.78, y2: 72.13, sound: sound3 },
  ];
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };
  const playSound = (soundPath) => {
    if (audioRef.current) {
      audioRef.current.src = soundPath;
      audioRef.current.play();
      setIsPlaying(true);
      setHoveredAreaIndex(null); // إزالة الهايلايت عند بدء الصوت

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setHoveredAreaIndex(null);
        setActiveAudio(null);
      };
    }
  };

  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page25})` }}
    >
      {/* <img
        src={page25}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}

      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAudio === `page2-${index}`
              ? "highlight"
              : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
            setActiveAudio(`page2-${index}`);
            playSound(area.sound);
          }}
          onMouseEnter={() => {
            if (!isPlaying) setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            if (!isPlaying) setHoveredAreaIndex(null);
          }}
        ></div>
      ))}
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_Unit2_Page2;
