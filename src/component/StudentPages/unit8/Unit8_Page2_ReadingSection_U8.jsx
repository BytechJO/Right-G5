import ReadingSection from "./ReadingSection";
import ComprehensionA from "./Unit8_Page2_ComprehensionA";
import ComprehensionB from "./Unit8_Page2_ComprehensionB";

import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 47/SVG/Asset 19.svg";
import readingAudio from "../../../assets/audio/ClassBook/U8/PG 65/cd38pg65-reading.mp3";

const ReadingSection_U8 = () => {
  const paragraphs = [
    <>
      (<span className="text-[#1E88E5]">continued from Unit 7</span>)
    </>,

    <>
      It was time to head back to the ranch. We all helped to pack away the
      picnic things and walked towards the horses. We had tied their reins to
      the branches of a huge tree.
    </>,

    <>
      Suddenly, Lori cried out, “Where’s Cinderella?” She was looking everywhere
      for the beautiful, black horse, but it was nowhere in sight.
    </>,

    <>
      As soon as I heard Lori yell, I ran over to her. My family and I searched
      everywhere for Cinderella, but we couldn’t find her anywhere.
    </>,

    <>
      None of us knew what might have happened. Cinderella was a well-trained
      horse. She wouldn’t have run off. Somebody must have taken her. Who would
      do that? I couldn’t imagine how someone could steal Cinderella so quickly
      without any of us hearing anything.
    </>,

    <>
      “Look! Look at this!” called Jack, my younger brother. He was pointing to
      tire tracks in the dirt. Someone had driven away from the tree in a truck.
      It looked like the tire tracks led deep into the valley. “Maybe someone
      loaded Cinderella into the truck and drove away when we weren’t looking,”
      said Jack.
    </>,

    <>
      My dad said we needed to get back to the ranch because we had many other
      horses there. We needed to make sure they were okay. “We also need to call
      the police and tell them that Cinderella is missing,” said Dad.
    </>,

    <>“Lori will have to ride with you, Jenny,” said my mom.</>,

    <>I felt really worried. What if we never get Cinderella back?</>,

    <>
      (<span className="text-[#1E88E5]">to be continued ...</span>)
    </>,
  ];
  const captions = [
    {
      start: 0.319,
      end: 8.9,
      text: "Page 65 reading. Have you ever lost anything that is important? What would you do if something important was missing or lost?",
    },
    {
      start: 9.2,
      end: 32.02,
      text: "How could something that big disappear? Continued from unit seven. It was time to head back to the ranch. We all helped pack away the picnic things and walk towards the horses. We had tied their reins to the branches of a huge tree. Suddenly, Lori cried out, “Where’s Cinderella?” She was looking everywhere for the beautiful black horse, but it was nowhere in sight.",
    },
    {
      start: 33.059,
      end: 35.579,
      text: "As soon as I heard Lori yell, I ran over to her.",
    },

    {
      start: 36.759,
      end: 62.239,
      text: "My family and I searched everywhere for Cinderella, but we couldn’t find her anywhere. None of us knew what might have happened. Cinderella was a well-trained horse. She wouldn’t have run off. Somebody must have taken her. Who would do that? I couldn’t imagine how someone could steal Cinderella so quickly without any of us hearing anything. “Look! Look at this!” called Jack, my younger brother. He was pointing to tire tracks in the dirt.",
    },

    {
      start: 63.479,
      end: 65.819,
      text: "Someone had driven away from the tree in a truck.",
    },

    {
      start: 67.04,
      end: 80.199,
      text: "It looked like the tire tracks led deep into the valley. “Maybe someone loaded Cinderella into the truck and drove away when we weren’t looking,” said Jack. My dad said we needed to get back to the ranch because we had many other horses there.",
    },

    {
      start: 81.58,
      end: 95.879,
      text: "We needed to make sure they were okay. “We also need to call the police and tell them Cinderella is missing,” said Dad. “Lori will have to ride with you, Jenny,” said my mom. I felt really worried. What if we never got Cinderella back?",
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle={
          <>
            Have you ever lost anything that is important? What
            <br />
            would you do if something important was missing or lost?
          </>
        }
        title="How Could Something That Big Disappear?"
        image={imgReading}
        paragraphs={paragraphs}
        question="What could be some reasons why someone might have stolen the horse?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={8.9}
      />

      <div className="w-[60%] mt-4 space-y-6 ">
        <ComprehensionA />
        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U8;
