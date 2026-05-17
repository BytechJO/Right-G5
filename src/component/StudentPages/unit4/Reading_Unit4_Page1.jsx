import page24 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 38.png";
import React, { useEffect, useState } from "react";
import "./Reading_Unit4_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U4/PG 38/cd2pg38-story-adult-lady_NILS0ysY.mp3";
import sound2 from "../../../assets/audio/ClassBook/U4/PG 38/Pg38_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U4/PG 38/Pg38_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/U4/PG 38/Pg38_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/U4/PG 38/Pg38_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/grade 5 unit 4 reading page 38-39.mp4";

const Reading_Unit4_Page1 = ({
  openPopup,
  audioRef,
  activeAudio,
  setActiveAudio,
}) => {
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    setActiveAudio(null);
  }, [setActiveAudio]);
  const captionsExample = [
    {
      start: 0.14,
      end: 97.119,
      text: "Page thirty-eight. In and around the pond. What kind of animals live in or around the pond? There are many different kinds of animals. You need to look closely to find the animals, but they are there. This is a tiny green tree frog. It lives near the pond and often climbs trees. When this frog is in a green tree, you can't see it very well. Dragonflies are big insects. They frequently fly back and forth across the pond. They like to eat smaller insects. They never eat tree frogs, and tree frogs never eat them because dragonflies are too big. Some animals, such as snails, protect themselves with their shells. Snails are tiny and soft, but they live inside hard shells. Their shells protect them from enemies. If another animal wants to eat the snail, it must first break its shell. That can be a hard thing to do. This turtle is resting on a rock in the pond. Like snails, turtles stay safe from danger inside their tough shells. They hide until the danger is gone. Then they come out and look for insects to eat. This snake can hide in the grass around the pond. It usually eats earthworms that come up through the grass. Some snakes have long, sharp teeth called fangs. These snakes can be very dangerous. This is a beaver. It's like a big rat with a large flat tail. It lives in the pond. It builds a home out of trees and tree branches. It cuts down the trees with its long, sharp teeth. The beaver can stay very safe in its home. There are many different animals living in and around a pond. What other animals do you know that live in a pond?",
    },
  ];
  const clickableAreas = [
    { x1: 15.26, y1: 35.78, x2: 52.6, y2: 50.47, sound: sound2 },
    { x1: 56.0, y1: 35.98, x2: 92.44, y2: 49.63, sound: sound3 },
    { x1: 15.32, y1: 81.95, x2: 52.9, y2: 95.5, sound: sound4 },
    { x1: 55.62, y1: 81.78, x2: 93.7, y2: 94.9, sound: sound5 },
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
      style={{ backgroundImage: `url(${page24})` }}
    >
      {/* <img
        src={page24}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}

      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAudio === `page1-${index}`
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
            setActiveAudio(`page1-${index}`);
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

      <div
        className="headset-icon-CD-unit2-page11-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => {
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
                <AudioWithCaption src={sound1} captions={captionsExample} />
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
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => {
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
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_Unit4_Page1;
