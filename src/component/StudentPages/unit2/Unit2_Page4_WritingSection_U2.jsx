import WritingA from "./Unit2_Page4_WritingA";
import WritingB from "./Unit2_Page4_WritingB";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 13/SVG/Asset 25.svg";

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
      </div>
    </div>
  );
};

export default WritingSection_U1;
