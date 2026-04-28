import WritingA from "./page7_WritingA";
import WritingB from "./page7_WritingB";
import WritingC from "./page7_WritingC";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 7/SVG/Asset 1.svg";

const WritingSection_U1 = () => {
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
          style={{ width: "auto", height: "500px", objectFit: "contain" }}
        />
        <WritingA />
        <WritingB />
        <WritingC />
      </div>
    </div>
  );
};

export default WritingSection_U1;
