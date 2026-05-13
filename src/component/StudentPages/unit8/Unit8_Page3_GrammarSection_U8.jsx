import GrammarA from "./Unit8_Page3_GrammarA";
import GrammarB from "./Unit8_Page3_GrammarB";
import GrammarC from "./Unit8_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 66/SVG/Asset 4.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U8/PG 66/cd39pg66-grammar.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
  const captions = [
    {
      start: 0.079,
      end: 26.08,
      text: "Page 66, grammar. Indefinite pronouns as subjects. Everyone cheered when Hannah made a goal. Did everyone cheer when Hannah made a goal? Anyone can buy a ticket at the gate. Can anyone buy a ticket at the gate? Indefinite pronouns as complements. Harley saw someone on the field. Did Harley see someone on the field? I didn't see anyone at practice. Did you see anyone at practice?",
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
