import ReadingSection from "./ReadingSection";
import ComprehensionA from "./Unit9_Page2_ComprehensionA";
import ComprehensionB from "./Unit9_Page2_ComprehensionB";

import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 47/SVG/Asset 19.svg";
import readingAudio from "../../../assets/audio/ClassBook/U9/PG 77/cd43pg77-reading.mp3";

const ReadingSection_U9 = () => {
  const paragraphs = [
    <>
      (<span className="text-[#1E88E5]">continued from Unit 8</span>)
    </>,

    <>
      When we arrived home, my dad called the police. They arrived quickly and
      asked us many questions about Cinderella and how the horse disappeared.
    </>,

    <>
      “If someone tried to sell your horse, how much money would they get?”
      asked one of the policemen. I explained that Cinderella was worth a lot of
      money because the horse was well-trained.
    </>,

    <>
         The police asked us many other questions. The police decided that the
      townspeople would be a big help if Cinderella was stolen. I thought, “If
      we tell the townspeople about Cinderella, the thieves would worry. Also,
      if we tell the townspeople, they will not be able to sell the horse
      because everyone will be looking for her.”
    </>,

    <>
      Lori and my family made posters with Cinderella’s photo on them. Then, we
      drove to town and put them up everywhere. We told people to call the
      police if they saw the horse.
    </>,

    <>
      Lori felt bad about Cinderella going missing. We were supposed to have a
      special day together. When it was time for her to go home, she wanted to
      stay and help us.
    </>,

    <>
      Before I went to sleep that night, I felt sad about losing Cinderella, but
      I felt happy to have a good friend like Lori.
    </>,

    <>
      (<span className="text-[#1E88E5]">to be continued ...</span>)
    </>,
  ];
  const captions = [
    {
      start: 0.159,
      end: 8.6,
      text: "Page 77 reading. Do you have helpful neighbors? Who would you ask if you need help to find something or someone?",
    },

    {
      start: 8.9,
      end: 19.639,
      text: "A Lot of What-Ifs. Continued from Unit Eight. When we arrived home, my dad called the police. They arrived quickly and asked us many questions about Cinderella and how the horse disappeared.",
    },

    {
      start: 20.899,
      end: 38.299,
      text: "“If someone tried to sell your horse, how much money would they get?” asked one of the policemen. I explained that Cinderella was worth a lot of money because the horse was well-trained. The police asked us many other questions. The police decided that the townspeople would be a big help if Cinderella was stolen.",
    },

    {
      start: 39.399,
      end: 43.779,
      text: "I thought, “If we tell the townspeople about Cinderella, the thieves would worry.”",
    },

    {
      start: 45.239,
      end: 77.899,
      text: "“Also, if we tell the townspeople, they will not be able to sell the horse because everyone will be looking for her.” Lori and my family made posters with Cinderella’s photo on them. Then we drove to town and put them up everywhere. We told people to call the police if they saw the horse. Lori felt bad about Cinderella going missing. We were supposed to have a special day together. When it was time for her to go home, she wanted to stay and help us. Before I went to sleep that night, I felt sad about losing Cinderella, but I felt happy to have a good friend like Lori.",
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle={
          <>
            Do you have helpful neighbors? Who would you ask if
            <br />
            you need help to find something or someone?
          </>
        }
        title="A Lot of “What Ifs?”"
        image={imgReading}
        paragraphs={paragraphs}
        question="What do you think happened to Cinderella?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={8.6}
      />

      <div className="w-[60%] mt-4 space-y-6 ">
        <ComprehensionA />
        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U9;
