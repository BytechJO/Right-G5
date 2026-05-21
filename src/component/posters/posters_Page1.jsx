import React from "react";
import page_1 from "../../assets/imgs/pages/posters/G5 Poster_Page_01.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 4/SVG/Asset 10.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 4/SVG/Asset 7.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 4/SVG/Asset 8.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 4/SVG/Asset 9.svg";
import longAudio from "../../assets/audio/ClassBook/U1/PG 4/conversation1.mp3";
import video from "../../assets/videos/grade 5 unit 1 page 4.mp4";
import wordJson from "../../assets/json/conversation1_eng.json";
import Conversation from "../Conversation";
import "./posters.css";
const Posters_Page1 = ({ openPopup }) => {
  const captionsExample = [
    {
      start: 0.56,
      end: 5.799,
      text: "Page four. Conversation. Listen and read, then say.",
    },
    {
      start: 6.839,
      end: 9.899,
      text: "Wake up, Hansel. You'll be late for school.",
    },
    {
      start: 9.899,
      end: 12.119,
      text: "Uh-oh, how late am I?",
    },
    {
      start: 12.119,
      end: 16.1,
      text: "It's almost 7:00. How did you forget to set your alarm?",
    },
    {
      start: 16.15,
      end: 19.1,
      text: "I think I fell asleep while I was studying.",
    },
    {
      start: 19.1,
      end: 25.18,
      text: "Oh, yes. You used your notebook as a pillow. How well do you know your math for your test today?",
    },
    {
      start: 25.18,
      end: 31.659,
      text: "Actually, I know it pretty well. I've been reviewing all week. I think I was counting in my sleep.",
    },
    {
      start: 31.659,
      end: 37.059,
      text: "Maybe you can do one more problem and figure the area of a pancake before you eat it.",
    },
    {
      start: 37.059,
      end: 43.379,
      text: "Pancakes? How did you know that's what I wanted this morning? I'll be there right away. I'm starving.",
    },
    {
      start: 44.399,
      end: 48.599,
      text: "You might want to wash your face first. It's blue on one side.",
    },
    {
      start: 48.599,
      end: 52.239,
      text: "Blue? Where's a mirror? Am I sick?",
    },
    {
      start: 52.239,
      end: 56.319,
      text: "Only with notebookitis. I think it's from the blue pen in your notebook.",
    },
  ];
  const filteredSegments = wordJson.segments.slice(1);
  const Voc = [
    [
      filteredSegments[0]?.words || [],
      filteredSegments[1]?.words || [],
      filteredSegments[2]?.words || [],
    ],
    [
      filteredSegments[3]?.words || [],
      filteredSegments[4]?.words || [],
      filteredSegments[5]?.words || [],
    ],
    [filteredSegments[6]?.words || [], filteredSegments[7]?.words || []],
    [
      filteredSegments[8]?.words || [],
      filteredSegments[9]?.words || [],
      filteredSegments[10]?.words || [],
    ],
  ];
  const captionTimings = [
    [captionsExample[1], captionsExample[2], captionsExample[3]],
    [captionsExample[4], captionsExample[5], captionsExample[6]],
    [captionsExample[7], captionsExample[8]],
    [captionsExample[9], captionsExample[10], captionsExample[11]],
  ];
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        { speaker: "Mom", text: "Wake up, Hansel! You'll be late for school." },
        { speaker: "Hansel", text: "Uh-oh! How late am I?" },
        {
          speaker: "Mom",
          text: "It’s almost seven o’clock. How did you forget to set your alarm?",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Hansel",
          text: "I think I fell asleep while I was studying.",
        },
        {
          speaker: "Mom",
          text: "Oh, yes. You used your notebook as a pillow. How well do you know your math for your test today?",
        },
        {
          speaker: "Hansel",
          text: " Actually, I know it pretty well. I’ve been reviewing all week. I think I was counting in my sleep.",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Mom",
          text: "Maybe you can do one more problem and figure the area of a pancake before you eat it.",
        },
        {
          speaker: "Hansel",
          text: " Pancakes! How did you know that’s what I wanted this morning? I’ll be there right away. I’m starving!",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Mom",
          text: "You might want to wash your face first. It’s blue on one side.",
        },
        { speaker: "Hansel", text: "Blue! Where’s a mirror? Am I sick" },
        {
          speaker: "Mom",
          text: "Only with notebook-it is. I think it’s from the blue pen in your notebook.",
        },
      ],
    },
  ];
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-page1-p hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Conversation
                  title="Conversation"
                  items={data}
                  sound={longAudio}
                  captions={captionsExample}
                  stopAtSecond={5.8}
                  captionTimings={captionTimings}
                  wordTimings={Voc}
                  openPopup={openPopup}
                  video={video}
                />
              </div>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
};

export default Posters_Page1;
