import GrammarA from "./page6_GrammarA";
import GrammarB from "./page6_GrammarB";
import GrammarC from "./page6_GrammarC";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 6/SVG/sch.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U1/PG 6/grammer_u1.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
 
  const captions = [
    {
      start: 0.34,
      end: 17.539,
      text: "Page six. Grammar. Questions with how. How much is the beach ball? How can you measure a giraffe? How does your grandma make such delicious cookies? Answering a how question. The swimmer dives ten meters deep. It is ten kilometers away.",
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
        <div className=" mt-4 space-y-15 ">
          <GrammarA />

          <GrammarB
          />

          <GrammarC
          />
        </div>
      </div>
    </div>
  );
};

export default GrammarSection_U1;
