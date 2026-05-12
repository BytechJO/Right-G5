import WritingA from "./Unit6_Page4_WritingA";
import Unit6_Page4_WritingB from "./Unit6_Page4_WritingB";
import WritingB from "./Unit6_Page4_WritingB";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 49/SVG/Asset 18.svg";

const WritingSection_U6 = () => {
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
      </div>
    </div>
  );
};

export default WritingSection_U6;
