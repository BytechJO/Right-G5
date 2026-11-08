import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";
import page24 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 74.png";
import React, { useEffect, useState } from "react";
import "./Reading_Unit8_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U8/PG 74/cd4pg74-story-adult-lady_1CKo40XZ.mp3";
import sound2 from "../../../assets/audio/ClassBook/U8/PG 74/Pg74_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U8/PG 74/Pg74_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/U8/PG 74/Pg74_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/U8/PG 74/Pg74_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/grade 5 unit 8 reading page 74-75.mp4";

const Reading_Unit8_Page1 = ({ openPopup, audioRef, setActiveAudio }) => {
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const audio = useExerciseAudio();
  React.useEffect(() => {
    if (audio.activeId === null) setActiveAudio(null);
  }, [audio.activeId, setActiveAudio]);
  useEffect(() => {
    setActiveAudio(null);
  }, [setActiveAudio]);
  const captions = [
    {
      start: 0.22,
      end: 10.84,
      text: "Page 74. Trina's trip to Holland. Trina and her mom are traveling from New York to Holland. Trina doesn't know anything about Holland except what her mother has told her.",
    },

    {
      start: 12.09,
      end: 55.06,
      text: "She and her mother are looking at an atlas, a book of maps. “Here is where we are going,” her mom says. “It's a little village in Holland. It is where I grew up.” The pilot is talking to the passengers now. He says that they will be landing sometime soon. “We're finally here,” says Mom. “That is Holland below us.” Trina looks out the window. She can see villages and farms. Crops are growing in the fields. The flowers are blooming. There is a river, too. At the airport, Mom rents a car. She is speaking Dutch with the people in Holland. Trina can understand only some of the words. Mom and Trina put their bags in the car. They drive off. Suddenly, Trina sees something strange.",
    },

    {
      start: 56.14,
      end: 64.68,
      text: "“What is that, Mom?” asks Trina. “That's a windmill,” says Mom. “Long ago, everyone in Holland used windmills to pump water.”",
    },

    {
      start: 66.18,
      end: 68.43,
      text: "Trina and Mom finally arrived at their hotel.",
    },

    {
      start: 69.94,
      end: 90.24,
      text: "Someone who works in the hotel takes their bags and shows them their room. “The weather is perfect for a bike ride,” says Mom. Trina and Mom go to the lobby in the hotel. There, they rent two bicycles. They ride for miles. They see more windmills. They see fields of tulips, the pretty flowers that grow all over Holland.",
    },

    {
      start: 91.77,
      end: 107.03,
      text: "The next day, Mom takes Trina to the village where she grew up. There is a festival that is going on. Everyone is celebrating the harvest of the tulips. Trina and Mom go to a restaurant. They sit at a table outside. They decide to have tea and cookies.",
    },

    {
      start: 108.61,
      end: 131.48,
      text: "“These cookies are delicious,” says Trina. “It's like having dessert before dinner.” Mom talks in Dutch with everyone in the restaurant. She tells them that it is good to be back in Holland. Trina and Mom stay in Holland for two weeks, then they have to go back to New York. “We'll be home just in time for the Fourth of July,” says Mom. “We can see the fireworks,” says Trina.",
    },

    {
      start: 132.54,
      end: 144.12,
      text: "“Did you like your visit to Holland?” asks Mom. “Yes. It was fun to see the place you were born and raised in. Everyone there was so nice. I liked everything about the trip,” says Trina.",
    },
  ];
  const clickableAreas = [
    { x1: 15.11, y1: 33.72, x2: 53.03, y2: 49.97, sound: sound2 },
    { x1: 55.4, y1: 33.86, x2: 93.32, y2: 49.97, sound: sound3 },
    { x1: 15.11, y1: 68.92, x2: 53.5, y2: 95.5, sound: sound4 },
    { x1: 55.62, y1: 84.1, x2: 93.54, y2: 95.32, sound: sound5 },
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
      data-story-access={"unit8-story1"}
      aria-label={
        "Trina and her mother travel to Holland by plane and explore the countryside by bicycle."
      }
      role={"group"}
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page24})` }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-story-access="unit8-story1"] [data-choice]:focus-visible,[data-story-access="unit8-story1"] :focus-visible{outline:3px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img
        src={page24}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}

     
      <div
        className="headset-icon-CD-unit2-page11-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
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
              if (!event.repeat)
                event.currentTarget.dispatchEvent(
                  new MouseEvent("click", { bubbles: true }),
                );
            }
          }}
          aria-label={"Open story audio"}
          tabIndex={0}
          role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => {
            audio.stop();
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            setActiveAudio(null);
            openPopup(
              "audio",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <AudioWithCaption
                  pageId={"sb_unit8_page74_reading"}
                  src={sound1}
                  captions={captions}
                />
              </div>,
            );
          }}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="pauseBtn-icon-CD-page21 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
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
              if (!event.repeat)
                event.currentTarget.dispatchEvent(
                  new MouseEvent("click", { bubbles: true }),
                );
            }
          }}
          aria-label={"Open story video"}
          tabIndex={0}
          role={"button"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => {
            audio.stop();
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            setActiveAudio(null);
            openPopup(
              "video",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <video
                  autoPlay
                  controls
                  style={{
                    width: "auto",
                    height: "80%",
                    objectFit: "fill",
                    borderRadius: "20px",
                  }}
                >
                  <source src={video3} type="video/mp4" />
                </video>
              </div>,
            );
          }}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={pauseBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

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
          aria-label={`Hear Trina’s Trip to Holland, panel ${index + 1}`}
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
            setActiveAudio(`page1-${index}`);
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

export default Reading_Unit8_Page1;
