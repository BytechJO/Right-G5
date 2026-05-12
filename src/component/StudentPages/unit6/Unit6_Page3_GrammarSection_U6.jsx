import GrammarA from "./Unit6_Page3_GrammarA";
import GrammarB from "./Unit6_Page3_GrammarB";
import GrammarC from "./Unit6_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 48/SVG/Asset 17.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U6/PG 48/cd29pg48-grammar.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
  const captions = [
    {
      start: 0.099,
      end: 10.68,
      text: "Page 48, grammar, modal verbs. I might go to the concert. Shall we go to the concert? James shouldn't take the backpack. Should James take the backpack?",
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
          stopAtSecond={1.8}
        />
      </div>

      <div className="flex flex-col w-[60%] mx-auto">
        <img
          src={img}
          alt=""
          style={{ width: "100%", height: "auto" }}
          className="w-full object-contain"
        />
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
