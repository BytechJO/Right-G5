import page24 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 92.png";
import React, { useEffect, useState } from "react";
import "./Reading_Unit10_Page2.css";
import sound1 from "../../../assets/audio/ClassBook/U10/PG 92/cd5pg92-story.mp3";
import sound2 from "../../../assets/audio/ClassBook/U10/PG 92/Pg92_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U10/PG 92/Pg92_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/U10/PG 92/Pg92_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/U10/PG 92/Pg92_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/grade 5 unit 10 reading page 92-93.mp4";

const Reading_Unit10_Page1 = ({
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
      start: 0.3,
      end: 21.26,
      text: "Page 92, A Perfect Pet for Aunt Jessie. Brent, Sue, and Natasha were taking care of their neighbor’s cats. Every morning, they would feed the cats and make sure there was clean water to drink. They were getting paid for helping the neighbors, and it was a fun job as well. One day, the friends were planning what to do with their money.",
    },

    {
      start: 22.3,
      end: 37.5,
      text: "“If I get paid on Monday, I might use some of my money to get a bike,” said Sue. “I think if I get paid, I will save my money,” said Brent. “I really want to get a skateboard, but I will have to save for a while. What about you, Natasha?”",
    },

    {
      start: 37.5,
      end: 55.0,
      text: "“If she wants one, I would like to get my Aunt Jessie a pet for her apartment. She lives by herself, so I think she would want one,” said Natasha. “That’s a great idea,” agreed Sue.",
    },

    {
      start: 55.0,
      end: 74.0,
      text: "“If we have time after we finish feeding the cats, I will go to her apartment. You two can come with me if you like,” offered Natasha. Aunt Jessie was happy to see Natasha and her friends. She invited them in for milk and cookies.",
    },

    {
      start: 74.0,
      end: 94.35,
      text: "Natasha told Aunt Jessie about her plans to buy her a pet. Aunt Jessie thought it was a good idea. On their way home, the friends talked about what kind of pet would be good for Aunt Jessie.",
    },

    {
      start: 75.95,
      end: 88.0,
      text: "“If she gets a hamster, she can watch it run on its wheel and climb in the cage tunnels,” said Brent. “She might enjoy the beautiful music if she gets a parakeet,” added Sue.",
    },

    {
      start: 88.0,
      end: 94.75,
      text: "Natasha said, “Maybe she will enjoy a cat sitting on her lap.” The friends were still talking about the pet possibilities when they got to their houses.",
    },

    {
      start: 95.78,
      end: 112.0,
      text: "Natasha decided she would think about it and then get one next week. The next week, Natasha went with her mom to find a pet for Aunt Jessie. They looked at several pet stores, and finally they found just the right pet for Aunt Jessie.",
    },

    {
      start: 112.0,
      end: 126.0,
      text: "“Surprise, Aunt Jessie!” Natasha exclaimed as Aunt Jessie opened the door. “We have a pet for you.” “Oh, I can’t wait to see it. So what kind of animal did you get?” Aunt Jessie questioned.",
    },

    {
      start: 126.0,
      end: 147.16,
      text: "“It’s a mouse,” Natasha told her, holding the box open for her to see. “It’s very fun to watch, and you can hold it too if you want to.” “A mouse? I’ve been trying to get rid of one in my closet for a week now. Oh, it is very cute, isn’t it?” Natasha replied, “I think you’ll like it a lot, Aunt Jessie. It just takes getting used to, to having a mouse as a pet instead of trying to get rid of it.”",
    },
  ];
  const clickableAreas = [
    { x1: 15.76, y1: 30.5, x2: 53.03, y2: 49.46, sound: sound2 },
    { x1: 55.62, y1: 41.13, x2: 92.46, y2: 49.29, sound: sound3 },
    { x1: 15.97, y1: 65.53, x2: 52.17, y2: 85, sound: sound4 },
    { x1: 55.62, y1: 85.32, x2: 93.11, y2: 96.9, sound: sound5 },
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

export default Reading_Unit10_Page1;
