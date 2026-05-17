import page_1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 82.png";
import "./Unit10_Page1.css";
import longAudio from "../../../assets/audio/ClassBook/U10/PG 82/cd46pg82-conversation.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U10/PG 82/cd47pg82-vocab.mp3";
import sound1 from "../../../assets/audio/ClassBook/U10/PG 82/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/U10/PG 82/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/U10/PG 82/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/U10/PG 82/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/U10/PG 82/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/U10/PG 82/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/U10/PG 82/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/U10/PG 82/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/U10/PG 82/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/U10/PG 82/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/U10/PG 82/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/U10/PG 82/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/U10/PG 82/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/U10/PG 82/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/U10/PG 82/sound15.mp3";
import CriticalThinking from "../../CriticalThinking";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 82/SVG/3.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 82/SVG/1.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 82/SVG/2.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 82/SVG/4.svg";
import wordJson from "../../../assets/json/cd46pg82-conversation_eng.json";
import video from "../../../assets/videos/grade 5 unit 10 page 82.mp4";

const Unit10_Page1 = ({ openPopup }) => {
  // ==================== conversation data ==================== //
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Eric",
          text: "What were you doing last night, Jen and Jeremy? There was a great symphony.",
        },
        {
          speaker: "Jen",
          text: "Our family was visiting my uncle’s house. We were harvesting lettuce there. It was the best day!",
        },
        {
          speaker: "Eric",
          text: "Nice! Your uncle must have several acres, huh?",
        },
        {
          speaker: "Jen",
          text: "Yes, he has a large ranch of 40 acres. He raises cattle there, and he has an enormous garden near his house.",
        },
      ],
    },

    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Jeremy",
          text: "It’s your turn, Eric. Were you playing in the symphony or listening to it last night?",
        },
        {
          speaker: "Eric",
          text: "I was listening to it. I play the violin, but I’ve got a long way to go before I’m ready for the symphony!",
        },
      ],
    },

    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Jeremy",
          text: "Were they playing anything lively? I don’t like lots of slow symphony music. It makes me sad.",
        },
        {
          speaker: "Eric",
          text: "Actually, symphony music can be very lively. During Mozart’s and Beethoven’s time, composers were writing very beautiful music. Often it depended on the composer and the times.",
        },
      ],
    },

    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Jen",
          text: "Which type of music do you play on your violin?",
        },
        {
          speaker: "Eric",
          text: "I like to play music with a variety of moods.",
        },
        {
          speaker: "Jeremy",
          text: "There are even some rock and roll songs that use the violin. It’s a very flexible instrument.",
        },
        {
          speaker: "Eric",
          text: "That’s a good point! That’s one reason that makes the violin so appealing to me.",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.179,
      end: 6.139,
      text: "Page 82, conversation. Listen and read, then say.",
    },

    // Conversation 1
    {
      start: 5.519,
      end: 9.88,
      text: "What were you doing last night, Jen and Jeremy? There was a great symphony.",
    },
    {
      start: 10.899,
      end: 17.92,
      text: "Our family was visiting my uncle’s house. We were harvesting lettuce there. It was the best day!",
    },
    {
      start: 18.979,
      end: 22.159,
      text: "Nice! Your uncle must have several acres, huh?",
    },
    {
      start: 23.239,
      end: 34.699,
      text: "Yes, he has a large ranch of 40 acres. He raises cattle there, and he has an enormous garden near his house.",
    },

    // Conversation 2
    {
      start: 34.7,
      end: 39.899,
      text: "It’s your turn, Eric. Were you playing in the symphony or listening to it last night?",
    },
    {
      start: 39.899,
      end: 46.939,
      text: "I was listening to it. I play the violin, but I’ve got a long way to go before I’m ready for the symphony!",
    },

    // Conversation 3
    {
      start: 46.939,
      end: 53.419,
      text: "Were they playing anything lively? I don’t like lots of slow symphony music. It makes me sad.",
    },
    {
      start: 53.419,
      end: 65.779,
      text: "Actually, symphony music can be very lively. During Mozart and Beethoven’s time, composers were writing very beautiful music. Often it depended on the composer and the times.",
    },

    // Conversation 4
    {
      start: 65.779,
      end: 69.76,
      text: "Which type of music do you play on your violin?",
    },
    {
      start: 69.76,
      end: 72.819,
      text: "I like to play music with a variety of moods.",
    },
    {
      start: 73.879,
      end: 80.4,
      text: "There are even some rock and roll songs that use the violin. It’s a very flexible instrument.",
    },
    {
      start: 80.4,
      end: 84.479,
      text: "That’s a good point! That’s one reason that makes the violin so appealing to me.",
    },
  ];
  const captionTimings = [
    [
      captionsExample[1],
      captionsExample[2],
      captionsExample[3],
      captionsExample[4],
    ],

    [captionsExample[5], captionsExample[6]],

    [captionsExample[7], captionsExample[8]],

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
      filteredSegments[3]?.words || [],
    ],

    [filteredSegments[4]?.words || [], filteredSegments[5]?.words || []],

    [filteredSegments[6]?.words || [], filteredSegments[7]?.words || []],

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
  ];
  const captionVoc = [
    {
      start: 0.239,
      end: 2.879,
      text: "Page 82, unit ten, vocabulary.",
    },

    {
      start: 3.659,
      end: 5.38,
      text: "1. symphony.",
    },

    {
      start: 6.259,
      end: 8.159,
      text: "2. harvesting.",
    },

    {
      start: 9.039,
      end: 10.88,
      text: "3. acres.",
    },

    {
      start: 11.819,
      end: 13.979,
      text: "4. enormous.",
    },

    {
      start: 14.939,
      end: 16.899,
      text: "5. lively.",
    },

    {
      start: 17.959,
      end: 20.139,
      text: "6. composers.",
    },

    {
      start: 21.159,
      end: 23.159,
      text: "7. variety.",
    },

    {
      start: 24.1,
      end: 25.979,
      text: "8. moods.",
    },

    {
      start: 26.92,
      end: 28.879,
      text: "9. flexible.",
    },

    {
      start: 29.879,
      end: 31.859,
      text: "10. instrument.",
    },

    {
      start: 32.84,
      end: 34.899,
      text: "11. appealing.",
    },

    {
      start: 35.759,
      end: 37.399,
      text: "12. ... huh?",
    },

    {
      start: 38.459,
      end: 40.599,
      text: "13. it’s your turn.",
    },

    {
      start: 41.379,
      end: 43.959,
      text: "14. a long way to go.",
    },

    {
      start: 44.819,
      end: 47.24,
      text: "15. that’s a good point!",
    },
  ];

  const wordTimingsVoc = [
    { start: 3.659, end: 5.38 },
    { start: 6.259, end: 8.159 },
    { start: 9.039, end: 10.88 },
    { start: 11.819, end: 13.979 },
    { start: 14.939, end: 16.899 },

    { start: 17.959, end: 20.139 },
    { start: 21.159, end: 23.159 },
    { start: 24.1, end: 25.979 },
    { start: 26.92, end: 28.879 },
    { start: 29.879, end: 31.859 },

    { start: 32.84, end: 34.899 },
    { start: 35.759, end: 37.399 },
    { start: 38.459, end: 40.599 },
    { start: 41.379, end: 43.959 },
    { start: 44.819, end: 47.24 },
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
                  stopAtSecond={5.2}
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
                  stopAtSecond={3}
                  sounds={sounds}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "symphony",
                    "harvesting",
                    "acres",
                    "enormous",
                    "lively",
                    "composers",
                    "variety",
                    "moods",
                    "flexible",
                    "instrument",
                    "appealing",
                    "... huh?",
                    "it’s your turn",
                    "a long way to go",
                    "that’s a good point!",
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
              <CriticalThinking title={"Why does Eric like his violin?"} />,
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

export default Unit10_Page1;
