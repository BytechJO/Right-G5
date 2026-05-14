import GrammarA from "./Unit9_Page3_GrammarA";
import GrammarB from "./Unit9_Page3_GrammarB";
import GrammarC from "./Unit9_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 78/SVG/Asset 11.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U9/PG 78/cd44pg78-grammar.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U9 = () => {
  const captions = [
    {
      start: 0.079,
      end: 20.14,
      text: "Page 78. Grammar. First conditional. Conditional at the beginning. If Helen kicks the ball, she will make a goal. When Helen kicks the ball, she will make a goal. First conditional. Conditional at the end. Helen will make a goal if she kicks the ball. Helen will make a goal when she kicks the ball",
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
        <div className=" mt-5 space-y-10 ">
          <GrammarA />
          <GrammarB />
          <GrammarC />
        </div>
      </div>
    </div>
  );
};

export default GrammarSection_U9;
