import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";
import React, { useEffect, useState } from "react";
import page25 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 93.png";
import "./Reading_Unit10_Page2.css";

import sound1 from "../../../assets/audio/ClassBook/U10/PG 93/Pg93_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/U10/PG 93/Pg93_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U10/PG 93/Pg93_1.8_Adult Lady.mp3";
const Reading_Unit10_Page2 = ({ audioRef, setActiveAudio }) => {
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const audio = useExerciseAudio();
  React.useEffect(() => {
    if (audio.activeId === null) setActiveAudio(null);
  }, [audio.activeId, setActiveAudio]);
  useEffect(() => {
    setActiveAudio(null);
  }, [setActiveAudio]);
  const clickableAreas = [
    { x1: 8.27, y1: 22.89, x2: 45.76, y2: 49.97, sound: sound1 },
    { x1: 52.35, y1: 40.8, x2: 90.36, y2: 49.44, sound: sound2 },
    { x1: 49.21, y1: 53.52, x2: 93.16, y2: 75.86, sound: sound3 },
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
      data-story-access={"unit10-story2"}
      aria-label={
        "A Perfect Pet for Aunt Jessie, panels 5 to 8. The children consider different pets, and Natasha visits Aunt Jessie with a present."
      }
      role={"group"}
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page25})` }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-story-access="unit10-story2"] [data-choice]:focus-visible,[data-story-access="unit10-story2"] :focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          aria-label={`Hear A Perfect Pet for Aunt Jessie, panel ${index === 2 ? 8 : index + 5}`}
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
          onClick={(event) => {
            event.stopPropagation();
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

export default Reading_Unit10_Page2;
