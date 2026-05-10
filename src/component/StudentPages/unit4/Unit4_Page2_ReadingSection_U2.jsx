import ReadingSection from "../../ReadingSection";
import ComprehensionA from "./Unit4_Page2_ComprehensionA";
import ComprehensionB from "./Unit4_Page2_ComprehensionB";

import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 29/SVG/Asset 37.svg";
import readingAudio from "../../../assets/audio/ClassBook/U4/PG 29/cd18pg29-reading.mp3";

const ReadingSection_U2 = () => {
  const paragraphs = [
    "Do you ever feel like you are always busy? Do you think being a parent is easy? Do you think it can be difficult?",

    "First of all, a parent is on the job all day! Even if they are away from their children, they are thinking about them. They are always ready to stop everything to take care of them. If you ask most parents why they work, they will say that they work to be able to buy the things their family needs.",

    "When moms and dads are at home, they are always doing things to help their children. They often cook and do chores around the house. Sometimes, they help their children with their homework.",

    "Even though parents have one of the hardest jobs in the world, they almost always say that being a mom or a dad is the BEST job in the world. They love their children, and they do so much for them. A parent’s love is for always.",
  ];

  const captions = [
    {
      start: 0.359,
      end: 8.85,
      text: "Page 29, Reading. Are your parents always busy? What do they do? What do you usually do as a family during their free time?",
    },
    {
      start: 9.2,
      end: 13.02,
      text: " Mirror, mirror on the wall, who's the busiest of them all?",
    },
    {
      start: 13.64,
      end: 27.779,
      text: "Do you ever feel like you are always busy? Do you think being a parent is easy? Do you think it can be difficult? First of all, a parent is on the job all day! Even if they are away from their children, they are thinking about them.",
    },
    {
      start: 28.939,
      end: 38.579,
      text: "They are always ready to stop everything to take care of them. If you ask most parents why they work, they will say that they work to be able to buy the things their family needs.",
    },

    {
      start: 40.299,
      end: 50.259,
      text: "When moms and dads are at home, they are always doing things to help their children. They often cook and do chores around the house. Sometimes, they help their children with their homework.",
    },

    {
      start: 51.799,
      end: 65.459,
      text: "Even though parents have one of the hardest jobs in the world, they almost always say that being a mom or a dad is the BEST job in the world. They love their children, and they do so much for them. A parent’s love is for always.",
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle={
          <>
            Are your parents always busy? What do they do?
            <br />
            What do you usually do as a family during their free time?
          </>
        }
        title="Mirror, Mirror on the Wall, Who’s the Busiest of Them All?"
        image={imgReading}
        paragraphs={paragraphs}
        question="What are some things that your parents do for you?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={8.7}
      />

      <div className="w-[60%] mt-4 space-y-6 ">
        <ComprehensionA />

        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U2;
