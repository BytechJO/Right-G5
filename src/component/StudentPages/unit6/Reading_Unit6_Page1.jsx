import page24 from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 56.png";
import React, { useEffect, useState } from "react";
import "./Reading_Unit6_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U6/PG 56/cd3pg56-story.mp3";
import sound2 from "../../../assets/audio/ClassBook/U6/PG 56/Pg56_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U6/PG 56/Pg56_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/U6/PG 56/Pg56_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/U6/PG 56/Pg56_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/grade 5 unit 6 reading page 56-57.mp4";

const Reading_Unit6_Page1 = ({
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
  const captions = [
    {
      start: 0.16,
      end: 70.58,
      text: "Page 56, The Lights Go Out. Brian was at home with his younger brother, Freddy. Their father was working late that night. The boys sat on the sofa watching TV. Then, all of a sudden, the lights went out. “Don’t worry, Freddy, I have everything under control,” said Brian. He found a few candles and a couple of flashlights. He gave one flashlight to Freddy. Suddenly, they heard a loud noise. It sounded like someone crashed into something. “What was that?” cried Freddy. “I’m scared.” “I don’t know,” said Brian. “Would you please bring me the phone? I think I should call the police.” Freddy gave Brian the phone. Brian picked up the phone and then thought for a moment. He might call and then find out nothing was wrong. He decided to call only if there was an emergency. He remembered when a firefighter came to their school. He talked to the class about safety and how to stay safe. He also told them what to do during an emergency. He told them they should stay calm and not panic. “Don’t worry, Freddy, I’m sure there is nothing to worry about,” said Brian. Freddy still looked scared. “Shall we go look outside and check? I’m sure it’s nothing,” said Brian, trying to comfort Freddy.",
    },

    {
      start: 72.28,
      end: 95.18,
      text: "Brian looked out the door while Freddy stood behind him. They both opened the door and pointed their flashlights onto the porch. They saw a flowerpot lying on its side. Could someone or something have knocked it over? Suddenly, something brown walked by. “Ah!” they both screamed. “Oh, look, it’s Pumpkin,” said Freddy. “Pumpkin must have knocked the flowerpot over,” said Brian.",
    },

    {
      start: 96.2,
      end: 134.78,
      text: "Pumpkin was Mrs. Tupper’s cat. Mrs. Tupper was their neighbor who lived next door. She loved two things in life: books and cats. “I’m sure Mrs. Tupper is worried about Pumpkin. Let’s go and take Pumpkin to her,” said Brian. “Could you please go alone?” said Freddy. “I would rather go to sleep now.” “Okay, I’ll go alone,” said Brian. Brian took the cat, Pumpkin, and went to Mrs. Tupper’s house. He found her back door open. “Mrs. Tupper,” called Brian from behind the open door. There was no answer. He walked inside. It was very dark. “Mrs. Tupper,” he said while flashing his light on the couch.",
    },

    {
      start: 135.84,
      end: 166.92,
      text: "Someone in the chair moved. There she was, Mrs. Tupper, sleeping in the chair. “Goodness,” she said, “I must have fallen asleep.” Brian gave the cat to Mrs. Tupper. “Thank you, Brian,” said Mrs. Tupper. “My son must have forgotten to close the door when he left to go out with his friends. That must be how Pumpkin got out of the house.” “Good night, Mrs. Tupper.” Brian went back home. He was relieved that nothing was wrong. As he opened his front door, the lights came back on. Finally. That was a night he wouldn’t forget.",
    },
  ];
  const clickableAreas = [
    { x1: 15.11, y1: 29.66, x2: 52.6, y2: 52.17, sound: sound2 },
    { x1: 55.62, y1: 32.7, x2: 92.89, y2: 51.83, sound: sound3 },
    { x1: 15.11, y1: 80.26, x2: 53.38, y2: 95.83, sound: sound4 },
    { x1: 55.62, y1: 76.7, x2: 93.67, y2: 95.66, sound: sound5 },
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
                <AudioWithCaption src={sound1} captions={captions} />
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

export default Reading_Unit6_Page1;
