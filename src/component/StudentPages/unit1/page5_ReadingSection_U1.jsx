import ReadingSection from "../../ReadingSection";
import ComprehensionA from "./page5_ComprehensionA";
import ComprehensionB from "./page5_ComprehensionB";

import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 5/SVG/Asset 5.svg";
import readingAudio from "../../../assets/audio/ClassBook/U1/PG 5/readingU1.mp3";

const ReadingSection_U1 = () => {
  const paragraphs = [
    "How fast can you run? How deep can you dive? How long are your fingernails? Probably not as fast, deep, or long as some people who have made it into the record books! For some reason, people like to try to set records. They want to be the best at something. Here are some amazing records that people have set over the years.",
    "How tightly can your mom or dad park a car? In 2015, Alistair Moffatt set a record for parallel parking. He only needed 7.5 cm more than the length of his car.",
    "How fast can you put on your socks? In 2016, Pavol Durdik from Slovakia put 52 socks on his foot in one minute!",
    "How far can you walk on your hands? Sarah Chapman walked over 5,000 meters in eight hours on her hands in 2002.",
  ];

  const captions = [
    {
      start: 0.439,
      end: 5.96,
      text: "Page five, Reading. Is there something that you can do better than most people? What is it?",
    },
    {
      start: 6.86,
      end: 27.719,
      text: "Page five, Reading. Is there something that you can do better than most people? What is it? How fast can you run? How deep can you dive? How long are your fingernails? Probably not as fast, deep, or long as some people who have made it into the record books. For some reason, people like to try to set records. They want to be the best at something. Here are some amazing records that people have set over the years.",
    },
    {
      start: 28.979,
      end: 42.059,
      text: "How tightly can your mom or dad park a car? In two thousand and fifteen, Alastair Moffat set a record for parallel parking. He only needed seven-point-five centimeters more than the length of his car.",
    },
    {
      start: 43.079,
      end: 61.84,
      text: "How fast can you put on your socks? In two thousand and sixteen, Pavol Durdík from Slovakia put fifty-two socks on his foot in one minute! How far can you walk on your hands? Sarah Chapman walked over five thousand meters in eight hours on her hands in two thousand and two.",
    },
    {
      start: 62.919,
      end: 66.559,
      text: "For some of us, the question might be, how can we walk on our hands?",
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle="Is there something that you can do better than most people?"
        title="Radical Records and Fantastic Facts"
        image={imgReading}
        paragraphs={paragraphs}
        question="Why do you think many people like to set records?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={6.1}
      />

      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA />

        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U1;
