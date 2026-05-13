import page_1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 58.png";
import "./Unit7_Page1.css";
import longAudio from "../../../assets/audio/ClassBook/U7/PG 58/cd31pg58-conversation.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U7/PG 58/cd32pg58-vocab.mp3";
import sound1 from "../../../assets/audio/ClassBook/U7/PG 58/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/U7/PG 58/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/U7/PG 58/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/U7/PG 58/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/U7/PG 58/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/U7/PG 58/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/U7/PG 58/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/U7/PG 58/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/U7/PG 58/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/U7/PG 58/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/U7/PG 58/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/U7/PG 58/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/U7/PG 58/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/U7/PG 58/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/U7/PG 58/sound15.mp3";
import sound16 from "../../../assets/audio/ClassBook/U7/PG 58/sound16.mp3";
import CriticalThinking from "../../CriticalThinking";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 58/SVG/Asset 15.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 58/SVG/Asset 22.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 58/SVG/Asset 23.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 58/SVG/Asset 25.svg";
import wordJson from "../../../assets/json/cd31pg58-conversation_eng.json";
import video from "../../../assets/videos/grade 5 unit 7 page 58.mp4";

const Unit7_Page1 = ({ openPopup }) => {
  // ==================== conversation data ==================== //
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Grandma",
          text: "Come in. I am putting some water in the kettle for tea.",
        },
        {
          speaker: "Helen",
          text: "Hi, Grandma! You’re limping today. Are you okay?",
        },
        {
          speaker: "Grandma",
          text: "Come inside, Helen. I’m fine, but I am feeling a little tired today. I’m stiff from sitting down, so that’s why I’m walking oddly.",
        },
      ],
    },

    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Helen",
          text: "I’m glad I’m helping you today, Grandma. Where do you want me to start?",
        },
        {
          speaker: "Grandma",
          text: "First, thank you for coming. Now, sit down. Make yourself at home. I’m getting the photo albums out for us to look at.",
        },
      ],
    },

    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Helen",
          text: "Super! Are you getting Mom’s baby book also?",
        },
        {
          speaker: "Grandma",
          text: "Of course! I know you love looking at your mom’s baby pictures.",
        },
        {
          speaker: "Helen",
          text: "You like seeing when you were a young mom! In some ways you look so different, but in other ways you look the same! Do you ever miss being young, Grandma?",
        },
      ],
    },

    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Grandma",
          text: "Oh, those were wonderful years, but I’m treasuring my life now. I learned a long time ago to treasure each minute of what I have so I don’t miss it later.",
        },
        {
          speaker: "Helen",
          text: "That’s a good way to deal with it. What are you doing these weekends now, Grandma?",
        },
        {
          speaker: "Grandma",
          text: "Well, I’m keeping busy, that’s for sure! I ride my bike to the orphanage to visit the children. They would love to meet you. Can you come next weekend?",
        },
        {
          speaker: "Helen",
          text: "I’m jotting it down right now, Grandma! You’re at the top of my list for next weekend!",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.299,
      end: 4.8,
      text: "Page 58, Conversation. Listen and read, then say.",
    },
    {
      start: 5.4,
      end: 9.199,
      text: "Come in. I am putting some water in the kettle for tea.",
    },

    {
      start: 9.199,
      end: 12.539,
      text: "Hi, Grandma. You're limping today. Are you okay?",
    },

    {
      start: 13.779,
      end: 21.299,
      text: "Come inside, Helen. I'm fine, but I'm feeling a little tired today. I'm stiff from sitting down, so that's why I'm walking oddly.",
    },

    {
      start: 21.299,
      end: 25.92,
      text: "I'm glad I'm helping you today, Grandma. Where do you want me to start?",
    },

    {
      start: 25.92,
      end: 33.52,
      text: "First, thank you for coming. Now, sit down. Make yourself at home. I'm getting the photo albums for us to look at.",
    },

    {
      start: 33.52,
      end: 36.899,
      text: "Super. Are you getting Mom's baby book also?",
    },

    {
      start: 36.899,
      end: 40.959,
      text: "Of course. I know you love looking at your mom's baby pictures.",
    },

    {
      start: 40.959,
      end: 50.639,
      text: "You like seeing when you were a young mom. In some ways, you look so different, but in other ways you look the same. Do you ever miss being young, Grandma?",
    },

    {
      start: 50.639,
      end: 60.159,
      text: "Oh, those were wonderful years. But I'm treasuring my life now. I learned a long time ago to treasure each minute of what I have so I don't miss it later.",
    },

    {
      start: 60.159,
      end: 64.999,
      text: "That's a good way to deal with it. What are you doing on the weekends now, Grandma?",
    },

    {
      start: 65.0,
      end: 73.839,
      text: "Well, I'm keeping busy, that's for sure. I ride my bike to the orphanage to visit the children. They would love to meet you. Can you come next weekend?",
    },

    {
      start: 73.839,
      end: 79.099,
      text: "I'm jotting it down right now, Grandma. You're at the top of my list for next weekend.",
    },
  ];
  const captionTimings = [
    [captionsExample[1], captionsExample[2], captionsExample[3]],

    [captionsExample[4], captionsExample[5]],

    [captionsExample[6], captionsExample[7], captionsExample[8]],

    [
      captionsExample[9],
      captionsExample[10],
      captionsExample[11],
      captionsExample[12],
    ],
  ];
  const filteredSegments = wordJson.segments.slice(1);

  const Voc = [
    [
      filteredSegments[0]?.words || [],
      filteredSegments[1]?.words || [],
      filteredSegments[2]?.words || [],
    ],

    [filteredSegments[3]?.words || [], filteredSegments[4]?.words || []],

    [
      filteredSegments[5]?.words || [],
      filteredSegments[6]?.words || [],
      filteredSegments[7]?.words || [],
    ],

    [
      filteredSegments[8]?.words || [],
      filteredSegments[9]?.words || [],
      filteredSegments[10]?.words || [],
      filteredSegments[11]?.words || [],
    ],
  ];
  /////////////////VOCABULARY/////////////////
  const sounds = [
    sound1,
    sound2,
    sound3,
    sound4,
    sound5,
    sound6,
    sound7,
    sound8,
    sound9,
    sound10,
    sound11,
    sound12,
    sound13,
    sound14,
    sound15,
    sound16,
  ];
  const captionVoc = [
    {
      start: 0.379,
      end: 4.579,
      text: "Page 58, unit seven, vocabulary. Listen and repeat.",
    },

    {
      start: 5.0,
      end: 7.919,
      text: "Find the words and expressions in the conversation above.",
    },

    {
      start: 8.399,
      end: 10.039,
      text: "1. limping.",
    },

    {
      start: 10.939,
      end: 12.619,
      text: "2. stiff.",
    },

    {
      start: 13.819,
      end: 15.559,
      text: "3. oddly.",
    },

    {
      start: 16.52,
      end: 18.44,
      text: "4. albums.",
    },

    {
      start: 19.299,
      end: 21.119,
      text: "5. super.",
    },

    {
      start: 22.139,
      end: 25.359,
      text: "6. treasure (treasuring)",
    },

    {
      start: 26.459,
      end: 29.379,
      text: "7. miss (verb).",
    },

    {
      start: 30.399,
      end: 32.179,
      text: "8. orphanage.",
    },

    {
      start: 33.0,
      end: 34.859,
      text: "9. jotting down.",
    },

    {
      start: 35.779,
      end: 37.679,
      text: "10. wonderful.",
    },

    {
      start: 38.379,
      end: 41.279,
      text: "11. where do you want me to start?",
    },

    {
      start: 42.239,
      end: 44.539,
      text: "12. make yourself at home.",
    },

    {
      start: 45.5,
      end: 47.619,
      text: "13. of course.",
    },

    {
      start: 48.619,
      end: 50.759,
      text: "14. deal with it.",
    },

    {
      start: 51.68,
      end: 53.739,
      text: "15. keeping busy.",
    },

    {
      start: 54.819,
      end: 57.88,
      text: "16. at the top of my list.",
    },
  ];

  const wordTimingsVoc = [
    { start: 8.399, end: 10.039 },
    { start: 10.939, end: 12.619 },
    { start: 13.819, end: 15.559 },
    { start: 16.52, end: 18.44 },
    { start: 19.299, end: 21.119 },

    { start: 22.139, end: 25.359 },
    { start: 26.459, end: 29.379 },
    { start: 30.399, end: 32.179 },
    { start: 33.0, end: 34.859 },
    { start: 35.779, end: 37.679 },

    { start: 38.379, end: 41.279 },
    { start: 42.239, end: 44.539 },
    { start: 45.5, end: 47.619 },
    { start: 48.619, end: 50.759 },
    { start: 51.68, end: 53.739 },

    { start: 54.819, end: 57.88 },
  ];

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
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
                  stopAtSecond={4.8}
                  captionTimings={captionTimings}
                  wordTimings={Voc}
                  openPopup={openPopup}
                  video={video}
                  imageWidth="300px"
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
      <div
        className="headset-icon-CD-page4-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
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
                <Vocabulary
                  title="VOCABULARY"
                  subtitle="Listen and repeat. Find the words and expressions in the conversation above."
                  sound={VocabularAudio}
                  captions={captionVoc}
                  stopAtSecond={8}
                  sounds={sounds}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "limping",
                    "stiff",
                    "oddly",
                    "albums",
                    "super",
                    "treasure (treasuring)",
                    "miss (verb)",
                    "orphanage",
                    "jotting down",
                    "wonderful",
                    "where do you want me to start?",
                    "make yourself at home",
                    "of course",
                    "deal with it",
                    "keeping busy",
                    "at the top of my list",
                  ]}
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
      <div
        className="headset-icon-CD-page4-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <CriticalThinking
                title={"What does Grandma treasure?"}
              />,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
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

export default Unit7_Page1;
