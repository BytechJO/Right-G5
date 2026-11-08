import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";
import React, { useEffect, useState } from "react";
import page25 from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 57.png";
import "./Reading_Unit6_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U6/PG 57/Pg57_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/U6/PG 57/Pg57_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U6/PG 57/Pg57_1.8_Adult Lady.mp3";
const Reading_Unit6_Page2 = ({ audioRef, setActiveAudio }) => {
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const audio = useExerciseAudio();
  useEffect(() => {
    if (audio.activeId === null) setActiveAudio(null);
  }, [audio.activeId, setActiveAudio]);
  useEffect(() => {
    setActiveAudio(null);
  }, [setActiveAudio]);
  const clickableAreas = [
    { x1: 6.12, y1: 31.35, x2: 43.82, y2: 50.13, sound: sound1 },
    { x1: 50.72, y1: 23.73, x2: 88.86, y2: 49.97, sound: sound2 },
    { x1: 51.15, y1: 54.87, x2: 88.86, y2: 73.66, sound: sound3 },
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
      data-story-access={"unit6-story2"}
      aria-label={
        "The Lights Go Out: the boys find Pumpkin the cat and return it to Mrs. Tupper."
      }
      role={"group"}
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page25})` }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-story-access="unit6-story2"] [data-choice]:focus-visible,[data-story-access="unit6-story2"] svg:focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          aria-label={`Hear The Lights Go Out, story panel ${index === 2 ? 8 : index + 5}`}
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

export default Reading_Unit6_Page2;
