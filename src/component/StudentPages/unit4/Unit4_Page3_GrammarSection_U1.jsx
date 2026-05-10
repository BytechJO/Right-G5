import GrammarA from "./Unit4_Page3_GrammarA";
import GrammarB from "./Unit4_Page3_GrammarB";
import GrammarC from "./Unit4_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 30/SVG/Asset 29.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U4/PG 30/cd19pg30-grammar.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
  const captions = [
    {
      start: 0.099,
      end: 26.28,
      text: "Page 30, grammar. One, adverbs of indefinite frequency. Two, Sally often studies at the library. Three, does Sally often study at the library? Four, the barber sometimes works on Sunday. Five, does the barber sometimes work on Sunday? Adverbs of definite frequency. Sally studies science daily. Does Sally study at the library daily?",
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
          stopAtSecond={1.5}
        />
      </div>

      <div className="flex flex-col w-[60%] mx-auto">
        <img
          src={img}
          alt=""
          style={{ width: "100%", height: "auto" }}
          className="w-full object-contain"
        />
        <p className="mt-2 text-sm text-black">
          *Note: <strong>Sometimes</strong> the adverb can go in different
          places in the sentence. For example, adverbs of indefinite frequency
          can <strong>sometimes</strong> go at the beginning of a sentence to
          show the importance of the time.
        </p>
        <div className=" mt-5 space-y-10 ">
          <GrammarA />
          <GrammarB />
          <GrammarC />
        </div>
      </div>
    </div>
  );
};

export default GrammarSection_U1;
