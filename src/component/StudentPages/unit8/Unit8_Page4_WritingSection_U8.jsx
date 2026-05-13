import WritingA from "./Unit8_Page4_WritingA";
import Unit6_Page4_WritingB from "./Unit8_Page4_WritingB";
import WritingB from "./Unit8_Page4_WritingB";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 67/SVG/Asset 27.svg";
import WritingC from "./Unit8_Page4_WritingC";

const WritingSection_U7 = () => {
  return (
    <div>
      {/* العنوان */}
      <div className="w-[60%] mx-auto mb-4 flex items-center">
        <div
          className="px-4 py-1 font-bold text-black w-fit"
          style={{
            backgroundImage: `url(${ReadingBG})`,
            backgroundSize: "cover",
          }}
        >
          Writing
        </div>
      </div>

      {/* المحتوى */}
      <div className="flex flex-col w-[60%] mx-auto space-y-10">
        <img
          src={img}
          alt=""
          style={{ width: "auto", height: "100%", objectFit: "contain" }}
        />
        <WritingA />
        <WritingB />
        <WritingC />
      </div>
    </div>
  );
};

export default WritingSection_U7;
