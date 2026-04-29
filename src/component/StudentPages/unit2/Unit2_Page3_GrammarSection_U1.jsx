import GrammarA from "./Unit2_Page3_GrammarA";
import GrammarB from "./Unit2_Page3_GrammarB";
import GrammarC from "./Unit2_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 13/SVG/Asset 8.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U2/PG 12/grammer.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
  const captions = [
    {
      start: 0.099,
      end: 18.56,
      text: "Page 12, grammar, relative clauses. My sister who runs on the track team won first place on Wednesday. My sister won first place, which is a hard thing to do. The elephant that stood on its back legs ate the peanut. The elephant ate the peanut that was on my hand.",
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
          stopAtSecond={3}
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
