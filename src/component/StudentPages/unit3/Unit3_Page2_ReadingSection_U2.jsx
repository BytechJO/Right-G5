import ReadingSection from "./ReadingSection";
import ComprehensionA from "./Unit3_Page2_ComprehensionA";
import ComprehensionB from "./Unit3_Page2_ComprehensionB";

import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 23/SVG/Asset 23.svg";
import readingAudio from "../../../assets/audio/ClassBook/U3/PG 23/pg23-reading.mp3";

const ReadingSection_U2 = () => {
  const paragraphs = [
    "What do you want to be when you get older? What jobs interest you? What are people like who do these jobs? Have you ever thought of being a news commentator or analyst?",

    "Linda Robinson is a news commentator for a news station in the United States of America. A news station reports the news that many different people might be interested in. She is also a senior news analyst on TV. Her job is to tell people how the news might affect the world.",

    "Linda is known for her thoughtful comments on the news. She is also a good speaker. She is an author, and she is also famous for some of her books. She is married to a professor at a famous university, and they have two children. Linda and her husband have written a book together. Linda is a busy person who always tries to do her best. Many people like watching Linda on the news. Have you ever thought of being on TV or the radio?",
  ];

  const captions = [
    {
      start: 0.179,
      end: 6.22,
      text: "Page 23, reading. Is there something you would like to be when you get older? Why do you want to be this?",
    },
    {
      start: 6.76,
      end: 8.22,
      text: " Let me introduce you.",
    },
    {
      start: 9.02,
      end: 18.859,
      text: "What do you want to be when you get older? What jobs interest you? What are people like who do these jobs? Have you ever thought of being a news commentator or analyst?",
    },
    {
      start: 19.939,
      end: 50.959,
      text: "Linda Robinson is a news commentator for a news station in the United States of America. A news station reports the news that many different people might be interested in. She is also a senior news analyst on TV. Her job is to tell people how the news might affect the world. Linda is known for her thoughtful comments on the news. She is also a good speaker. She is an author, and she is also famous for some of her books. She is married to a professor at a famous university, and they have two children.",
    },
    {
      start: 52.059,
      end: 63.879,
      text: "Linda and her husband have written a book together. Linda is a busy person who always tries to do her best. Many people like watching Linda on the news. Have you ever thought of being on TV or the radio?",
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle={
          <>
            Is there something you would like to be when you get
            <br />
            older? Why do you want to be this?
          </>
        }
        title="Let Me Introduce You!"
        image={imgReading}
        paragraphs={paragraphs}
        question="What do you think she is like? What would you like to ask Linda Robinson?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={6.5}
      />

      <div className="w-[60%] mt-4 space-y-6 ">
        <ComprehensionA />

        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U2;
