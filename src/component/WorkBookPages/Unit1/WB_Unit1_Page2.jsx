import React from "react";
import pageImage from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 12.png";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import { useExerciseAudio } from "../../StudentPages/unit1/useExerciseAudio";
import unit1Audio from "../../../assets/audio/titel G5/Unit 1.mp3";
import unit2Audio from "../../../assets/audio/titel G5/Unit 2.mp3";
import unit3Audio from "../../../assets/audio/titel G5/Unit 3.mp3";
import unit4Audio from "../../../assets/audio/titel G5/Unit 4.mp3";
import unit5Audio from "../../../assets/audio/titel G5/Unit 5.mp3";
import unit6Audio from "../../../assets/audio/titel G5/Unit 6.mp3";
import unit7Audio from "../../../assets/audio/titel G5/Unit 7.mp3";
import unit8Audio from "../../../assets/audio/titel G5/Unit 8.mp3";
import unit9Audio from "../../../assets/audio/titel G5/Unit 9.mp3";
import unit10Audio from "../../../assets/audio/titel G5/Unit 10 Wrong voice.mp3";

const units = [
  {
    number: 1,
    title: "How Late Am I?",
    page: 3,
    audio: unit1Audio,
    top: "18.000%",
    left: "19.8%",
    width: "18.200%",
    height: "2.6%",
  },
  {
    number: 2,
    title: "Who’s the One?",
    page: 9,
    audio: unit2Audio,
    top: "23.080%",
    left: "19.8%",
    width: "18.200%",
    height: "2.6%",
  },
  {
    number: 3,
    title: "Curry Tastes Great!",
    page: 15,
    audio: unit3Audio,
    top: "28.160%",
    left: "19.8%",
    width: "22.200%",
    height: "2.6%",
  },
  {
    number: 4,
    title: "Shopping With Our Friends",
    page: 21,
    audio: unit4Audio,
    top: "33.240%",
    left: "19.8%",
    width: "34.200%",
    height: "2.6%",
  },
  {
    number: 5,
    title: "What Would You Like to Read?",
    page: 27,
    audio: unit5Audio,
    top: "38.320%",
    left: "19.8%",
    width: "35.200%",
    height: "2.6%",
  },
  {
    number: 6,
    title: "Shall We? Should We? May We?",
    page: 33,
    audio: unit6Audio,
    top: "43.400%",
    left: "19.8%",
    width: "36.700%",
    height: "2.6%",
  },
  {
    number: 7,
    title: "Helen Is Visiting Grandma",
    page: 39,
    audio: unit7Audio,
    top: "48.480%",
    left: "19.8%",
    width: "32.200%",
    height: "2.6%",
  },
  {
    number: 8,
    title: "Let’s Ride in a Hot-Air Balloon!",
    page: 45,
    audio: unit8Audio,
    top: "53.560%",
    left: "19.8%",
    width: "35.200%",
    height: "2.6%",
  },
  {
    number: 9,
    title: "What If?",
    page: 51,
    audio: unit9Audio,
    top: "58.640%",
    left: "19.8%",
    width: "17.200%",
    height: "2.6%",
  },
  {
    number: 10,
    title: "It Was the Best Day!",
    page: 57,
    audio: unit10Audio,
    top: "63.720%",
    left: "19.8%",
    width: "24.200%",
    height: "2.6%",
  },
];

export default function WB_Unit1_Page2({ goToUnit }) {
  const { activeId, error, play, stop } = useExerciseAudio();
  const navigate = (unit) => {
    stop();
    goToUnit(unit.page);
  };
  const activateKey = (event, action) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) action();
  };
  const releaseKey = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  return (
    <div
      className="page1-img-wrapper"
      role="group"
      aria-label="Workbook contents, Units 1 through 10. Listen to each unit title or use its arrow to open the unit."
      style={{ backgroundImage: `url(${pageImage})`, position: "relative" }}
    >
      <div className="sr-only" role="status" aria-live="polite">
        {error ||
          (activeId
            ? `Playing Unit ${activeId}: ${units.find((unit) => unit.number === activeId)?.title}.`
            : "")}
      </div>
      {/* Match the printed image height even when the Book wrapper is taller. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          aspectRatio: "1270 / 1624",
          pointerEvents: "none",
        }}
      >
        {units.map((unit) => (
          <React.Fragment key={unit.number}>
            <button
              type="button"
              aria-label={`Play Unit ${unit.number}: ${unit.title} audio`}
              aria-pressed={activeId === unit.number}
              onClick={(event) => {
                event.stopPropagation();
                play(unit.number, unit.audio);
              }}
              onKeyDown={(event) =>
                activateKey(event, () => play(unit.number, unit.audio))
              }
              onKeyUp={releaseKey}
              className={`absolute cursor-pointer transition-all duration-150 focus-visible:outline-solid! focus-visible:outline-4! focus-visible:outline-[#2563eb]! focus-visible:outline-offset-2! ${activeId === unit.number ? "ring-4 ring-green-500" : "hover:ring-2 hover:ring-blue-400"}`}
              style={{
                top: unit.top,
                left: unit.left,
                width: unit.width,
                height: unit.height,
                padding: 0,
                background: "transparent",
                border: "none",
                borderRadius: 8,
                pointerEvents: "auto",
              }}
            >
              {activeId === unit.number && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: -25,
                    left: 0,
                    background: "#16a34a",
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: 5,
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  🔊 Playing
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label={`Go to Unit ${unit.number}: ${unit.title}, page ${unit.page}`}
              onClick={(event) => {
                event.stopPropagation();
                navigate(unit);
              }}
              onKeyDown={(event) => activateKey(event, () => navigate(unit))}
              onKeyUp={releaseKey}
              className="absolute z-20 flex items-center justify-center bg-transparent border-0 cursor-pointer transition-all duration-150 hover:scale-110 active:scale-95 focus-visible:outline-solid! focus-visible:outline-4! focus-visible:outline-[#2563eb]! focus-visible:outline-offset-2!"
              style={{
                top: `calc(${unit.top} + 1.3%)`,
                translate: "0 -50%",
                left: `calc(${unit.left} + ${unit.width} + 1%)`,
                width: "4.835%",
                height: "auto",
                aspectRatio: "1",
                maxWidth: 18,
                maxHeight: 18,
                padding: 0,
                borderRadius: "50%",
                pointerEvents: "auto",
              }}
            >
              <img
                src={arrowBtn}
                alt=""
                aria-hidden="true"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
