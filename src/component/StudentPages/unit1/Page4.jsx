import page4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 4.png";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 4/SVG/Asset 10.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 4/SVG/Asset 7.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 4/SVG/Asset 8.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 4/SVG/Asset 9.svg";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import longAudio from "../../../assets/audio/ClassBook/U1/PG 4/conversation1.mp3";
import "./Page4.css";
import Conversation from "../../Conversation";
import wordJson from "../../../assets/json/conversation1_eng.json";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U1/PG 4/vocab.mp3";
import sound1 from "../../../assets/audio/ClassBook/U1/PG 4/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/U1/PG 4/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/U1/PG 4/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/U1/PG 4/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/U1/PG 4/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/U1/PG 4/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/U1/PG 4/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/U1/PG 4/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/U1/PG 4/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/U1/PG 4/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/U1/PG 4/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/U1/PG 4/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/U1/PG 4/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/U1/PG 4/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/U1/PG 4/sound15.mp3";
import sound16 from "../../../assets/audio/ClassBook/U1/PG 4/sound16.mp3";
import CriticalThinking from "../../CriticalThinking";
import video from "../../../assets/videos/grade 5 unit 1 page 4.mp4";

const Page4 = ({ openPopup }) => {
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
  const wordTimingsVoc = [
    { start: 8.8, end: 11.1 },
    { start: 11.2, end: 13.6 },
    { start: 13.94, end: 15.5 },
    { start: 16.4, end: 17.6 },

    { start: 19.04, end: 20.26 },
    { start: 21.6, end: 22.94 },
    { start: 24.2, end: 25.38 },
    { start: 26.8, end: 28.64 },

    { start: 29.719, end: 31.5 },
    { start: 32.32, end: 34.18 },
    { start: 35.06, end: 37.06 },
    { start: 37.719, end: 39.579 },
    { start: 40.36, end: 42.499 },
    { start: 43.279, end: 45.459 },

    { start: 46.259, end: 48.459 },
    { start: 49.52, end: 52.119 },
  ];

  const captionVoc = [
    {
      start: 0.159,
      end: 8.5,
      text: "Page four, unit one vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },

    { start: 8.8, end: 11.1, text: "1. alarm." },
    { start: 11.2, end: 13.6, text: "2. notebook." },
    { start: 13.94, end: 15.5, text: "3. pillow." },
    { start: 16.4, end: 17.6, text: "4. counting." },

    { start: 19.04, end: 20.26, text: "5. face." },
    { start: 21.6, end: 22.94, text: "6. figure." },
    { start: 24.2, end: 25.38, text: "7. reviewing." },
    { start: 26.8, end: 28.64, text: "8. pancakes." },

    { start: 29.719, end: 31.5, text: "9. starving." },
    { start: 32.32, end: 34.18, text: "10. actually." },
    { start: 35.06, end: 37.06, text: "11. mirror." },

    { start: 37.719, end: 39.579, text: "12. uh-oh." },
    { start: 40.36, end: 42.499, text: "13. fell asleep." },
    { start: 43.279, end: 45.459, text: "14. how did you know?" },

    { start: 46.259, end: 48.459, text: "15. right away." },
    { start: 49.52, end: 52.119, text: "16. on one side." },
  ];
  return (
    <>
      <div
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page4})` }}
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
                    stopAtSecond={8.5}
                    sounds={sounds}
                    wordTimings={wordTimingsVoc}
                    words={[
                      "alarm",
                      "notebook",
                      "pillow",
                      "counting",
                      "face",
                      "figure",
                      "reviewing",
                      "pancakes",
                      "starving",
                      "actually",
                      "mirror",
                      "Uh-oh!",
                      "fell asleep",
                      "How did you know?",
                      "right away",
                      "on one side",
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
                  title={
                    "Why did Hansel’s mom say he could do an extra math problem?"
                  }
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
    </>
  );
};

export default Page4;
