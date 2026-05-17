import page24 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 20.png";
import React, { useEffect, useState } from "react";
import "./Reading_Unit2_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U2/PG 20/reading.mp3";
import sound2 from "../../../assets/audio/ClassBook/U2/PG 20/Pg20_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U2/PG 20/Pg20_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/U2/PG 20/Pg20_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/U2/PG 20/Pg20_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 5 unit 2 reading page 20-21.mp4";

const Reading_Unit2_Page1 = ({
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
      start: 0.38,
      end: 1.2,
      text: "Page twenty.",
    },
    {
      start: 3.0,
      end: 15.62,
      text: "A desert drought ends. How hot is it in the desert? Some desert temperatures can be over fifty-five degrees Celsius. The animals that live there are trying to stay cool. How can they find water?",
    },
    {
      start: 16.96,
      end: 23.32,
      text: "It isn't easy. In fact, a terrible drought has dried up the only water there was in Dry Desert.",
    },
    {
      start: 24.46,
      end: 87.02,
      text: "Kathy the kangaroo rat, who jumps along her back legs, hasn't had a drink of water in a long time. How far has she jumped in search of water? Probably, she has jumped several kilometers now. Toad rests in the shade of a tall cactus. When will we get some rain? asks Leo the lizard. Kathy the kangaroo doesn't know. Some of the animals live inside the cactus, which keeps them cool.",
    },
    {
      start: 87.02,
      end: 147.02,
      text: 'Tiny Bird and Teeny Bird are neighbors. They live in this cactus. "When are we going to get some rain?" asks Teeny Bird. Tiny Bird doesn\'t know. Kathy the kangaroo rat is exhausted from running around. She decides to go back to her home that is underground. She needs to rest and stay cool.',
    },
    {
      start: 147.02,
      end: 176.88,
      text: 'Kathy settles down in her home. She wonders to herself, "When are we going to get some rain?" Suddenly, the sky gets dark. Toad starts running down the dry riverbed. No water has flowed in this river for a long time. There is a crash of thunder. Lightning lights up the dark sky.',
    },
    {
      start: 88.07,
      end: 116.88,
      text: '"We are getting some rain, finally," yells Toad. The long drought is over. "Hooray for the rain," shout all the animals. Toad is very happy to see the water falling from the sky.',
    },
    {
      start: 116.88,
      end: 136.88,
      text: 'The insects come out from the ground. Toad eats the insects with his long tongue. "Mm," says Toad, "I love the rain. How long will it last?"',
    },
    {
      start: 136.88,
      end: 156.88,
      text: "By evening, the rain clouds are gone. The rain has stopped, but the ground is wet. The river flows with water again.",
    },
    {
      start: 159.04,
      end: 166.9,
      text: 'Coyote, who stands on a cliff by herself, is in a happy mood now that the drought has ended. "Ahooo," she calls to the moon.',
    },
  ];
  const clickableAreas = [
    { x1: 15.11, y1: 34.06, x2: 52.38, y2: 49.29, sound: sound2 },
    { x1: 55.4, y1: 34.23, x2: 93.81, y2: 50.29, sound: sound3 },
    { x1: 16.0, y1: 84.0, x2: 52.9, y2: 95.5, sound: sound4 },
    { x1: 56.0, y1: 83.5, x2: 93.7, y2: 95.9, sound: sound5 },
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
                  <source src={video} type="video/mp4" />
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

export default Reading_Unit2_Page1;
