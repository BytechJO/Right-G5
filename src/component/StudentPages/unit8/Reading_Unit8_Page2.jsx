import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";
import React, { useState } from "react";
import page25 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 75.png";
import "./Reading_Unit8_Page1.css";
import { FaHeadphones } from "react-icons/fa";
import sound1 from "../../../assets/audio/ClassBook/U8/PG 75/Pg75_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/U8/PG 75/Pg75_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U8/PG 75/Pg75_1.8_Adult Lady.mp3";
const Reading_Unit8_Page2 = ({ audioRef, setActiveAudio }) => {
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const audio = useExerciseAudio();
  React.useEffect(() => {
    if (audio.activeId === null) setActiveAudio(null);
  }, [audio.activeId, setActiveAudio]);
  const clickableAreas = [
    { x1: 8.27, y1: 27.63, x2: 45.76, y2: 50.47, sound: sound1 },
    { x1: 52.87, y1: 37.1, x2: 91.44, y2: 50.13, sound: sound2 },
    { x1: 53.52, y1: 56, x2: 90.58, y2: 73.5, sound: sound3 },
  ];
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };
  const playSound = (soundPath) => {
    audio.play(soundPath, soundPath);
    setHoveredAreaIndex(null);
  };

  return (
    <div
      data-story-access={"unit8-story2"}
      aria-label={
        "Trina and her mother visit a restaurant and a tulip festival before flying home."
      }
      role={"group"}
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page25})` }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-story-access="unit8-story2"] [data-choice]:focus-visible,[data-story-access="unit8-story2"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img
        src={page25}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}

      {clickableAreas.map((area, index) => (
        <div
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
              if (!event.repeat) event.currentTarget.click();
            }
          }}
          aria-label={`Hear Trina’s Trip to Holland, panel ${index === 2 ? 8 : index + 5}`}
          data-choice={true}
          tabIndex={0}
          role={"button"}
          key={index}
          className={`clickable-area ${hoveredAreaIndex === index || audio.activeId === area.sound ? "highlight" : ""}`}
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
          onMouseEnter={() => setHoveredAreaIndex(index)}
          onMouseLeave={() => setHoveredAreaIndex(null)}
        ></div>
      ))}
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_Unit8_Page2;
