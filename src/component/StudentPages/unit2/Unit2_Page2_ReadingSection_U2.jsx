import ReadingSection from "../../ReadingSection";
import ComprehensionA from "./Unit2_Page2_ComprehensionA";
import ComprehensionB from "./Unit2_Page2_ComprehensionB";

import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 11/SVG/Asset 1.svg";
import readingAudio from "../../../assets/audio/ClassBook/U2/PG 11/reading_U2.mp3";

const ReadingSection_U2 = () => {
  const paragraphs = [
    "Twins are babies who are born at the same time from the same mom. Most of us know about twins who look the same and sometimes dress the same. Also, there are unusual sets of twins that are born very so often.",

    "For example, there are twins who look alike, but it's the opposite sides of their bodies that are alike. They are called mirror-image twins. For example, one has a birthmark on the right arm, and the other twin will have the same birthmark on the left arm.",

    "Another type of twin is dwarf twins. A dwarf is a person who does not grow at a usual rate, so their body is sized differently than other people's. Sometimes one twin has a disability and the other doesn't. In one case, twins were born and both were dwarfs, but this doesn't happen very often.",

    "Sometimes, twins are joined together at one part of their body. They are called conjoined twins, and they can often be separated. If they are twins who share the same heart or another important part of the body, they must stay together. Conjoined twins are not born very often, either.",

    'All twins usually grow up being very close. They might like the same things, choose similar jobs, or dress alike. Being a twin must be a "one-of-a-kind" experience!',
  ];

  const captions = [
    {
      start: 0.439,
      end: 8.38,
      text: "Page eleven reading. Have you ever seen two people who look exactly alike? Do you have a brother or sister who looks exactly like you?",
    },
    {
      start: 9.04,
      end: 49.419,
      text: "Unusual sets of twins. Twins are babies who are born at the same time from the same mom. Most of us know about twins who look the same and sometimes dress the same. Also, there are unusual sets of twins that are born very so often. For example, there are twins who look alike, but it's the opposite sides of their bodies that are alike. They are called mirror-image twins. For example, one has a birthmark on the right arm, and the other twin will have the same birthmark on the left arm. Another type of twin is dwarf twins. A dwarf is a person who does not grow at a usual rate, so their body is sized differently than other people's.",
    },
    {
      start: 50.579,
      end: 89.18,
      text: " Sometimes one twin has a disability and the other doesn't. In one case, twins were born and both were dwarfs, but this doesn't happen very often. Sometimes, twins are joined together at one part of their body. They are called conjoined twins, and they can often be separated. If they are twins who share the same heart or another important part of the body, they must stay together. Conjoined twins are not born very often, either.All twins usually grow up being very close. They might like the same things, choose similar jobs, or dress alike. Being a twin must be a one-of-a-kind experience!",
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle={
          <>
            Have you ever seen two people who look exactly alike? <br />
            Do you have a brother or sister who looks exactly like you?
          </>
        }
        title="Unusual Sets of Twins"
        image={imgReading}
        paragraphs={paragraphs}
        question="Think of two other things that would be unusual about being a twin."
        sound={readingAudio}
        captions={captions}
        stopAtSecond={8.5}
      />

      <div className="w-[60%] mt-4 space-y-6 ">
        <ComprehensionA />

        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U2;
