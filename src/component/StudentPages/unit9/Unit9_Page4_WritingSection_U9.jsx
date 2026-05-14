import WritingA from "./Unit9_Page4_WritingA";
import Unit6_Page4_WritingB from "./Unit9_Page4_WritingB";
import WritingB from "./Unit9_Page4_WritingB";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 79/SVG/Asset 12.svg";
import WritingC from "./Unit9_Page4_WritingC";

const WritingSection_U9 = () => {
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

export default WritingSection_U9;
