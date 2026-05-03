import GrammarA from "./Unit3_Page3_GrammarA";
import GrammarB from "./Unit3_Page3_GrammarB";
import GrammarC from "./Unit3_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 21.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U3/PG 24/pg24-grammar.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
  const captions = [
    {
      start: 0.159,
      end: 20.739,
      text: "Page 24. Grammar. Adjectives and the verb to be. Jimmy is tall. Is Jimmy tall? The students are happy. Are the students happy? Adjectives and linking verbs. The milk tastes sour. Does the milk taste sour? Their voices sound clear. Do their voices sound clear?",
    },
  ];

  return (
    <div>
      <div className="w-[60%] mx-auto mb-4 flex items-center mt-3">
        <div
          className="px-4 py-1 font-bold text-black w-fit"
          style={{
            backgroundImage: `url(${ReadingBG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          Grammar
        </div>
      </div>
      <div className="w-[70%] mx-auto">
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={2}
        />
      </div>

      <div className="flex flex-col w-[60%] mx-auto">
        <img
          src={img}
          alt=""
          style={{ width: "100%", height: "auto" }}
          className="w-full object-contain"
        />
        <div className=" mt-2 space-y-10 ">
          <GrammarA />
          <GrammarB />
          <GrammarC />
        </div>
      </div>
    </div>
  );
};

export default GrammarSection_U1;
