import { useExerciseAudio } from "./useExerciseAudio";
import { AudioFeedback } from "./ExerciseAudioText";
import React, { useEffect, useState } from "react";
import page25 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 39.png";
import "./Reading_Unit4_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U4/PG 39/Pg39_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/U4/PG 39/Pg39_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U4/PG 39/Pg39_1.8_Adult Lady.mp3";
const Reading_Unit4_Page2 = ({ audioRef, setActiveAudio }) => {
  const audio = useExerciseAudio();
  useEffect(() => {
    if (audio.activeId === null) setActiveAudio(null);
  }, [audio.activeId, setActiveAudio]);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  useEffect(() => {
    setActiveAudio(null);
  }, [setActiveAudio]);
  const clickableAreas = [
    {
      x1: 10.43,
      y1: 28.47,
      x2: 48.35,
      y2: 39.81,
      sound: sound1,
    },
    {
      x1: 51.8,
      y1: 28.64,
      x2: 89.07,
      y2: 39.13,
      sound: sound2,
    },
    {
      x1: 52.01,
      y1: 47.62,
      x2: 88.42,
      y2: 69.43,
      sound: sound3,
    },
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
      data-story-access={"unit4-story2"}
      aria-label={
        "In and around the pond: a snake, a beaver and other pond animals."
      }
      role={"group"}
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{
        backgroundImage: `url(${page25})`,
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-story-access="unit4-story2"] [data-choice]:focus-visible,[data-story-access="unit4-story2"] svg:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          aria-label={
            [
              "Hear about the snake",
              "Hear about the beaver",
              "Hear the closing paragraph about pond animals",
            ][index]
          }
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
          onMouseEnter={() => {
            setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            setHoveredAreaIndex(null);
          }}
        >

        </div>
      ))}
      <audio
        ref={audioRef}
        style={{
          display: "none",
        }}
      />
    </div>
  );
};
export default Reading_Unit4_Page2;
