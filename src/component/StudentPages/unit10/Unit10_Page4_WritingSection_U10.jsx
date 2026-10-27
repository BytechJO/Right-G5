import WritingA from "./Unit10_Page4_WritingA";
import WritingB from "./Unit10_Page4_WritingB";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 85/SVG/Asset 15.svg";

const WritingSection_U10 = () => {
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
          alt={"It Was the Best Day! A personal narrative with a photograph of a bicycle. The writer helped his author father record book orders and carry envelopes to a distant mailbox. After a busy morning, his father went to town and returned with a new bicycle for those trips. The writer still has the bicycle and remembers receiving it. Writing tips: tell events in a clear order, introduce the main idea without giving the story away, include relevant details, and choose words that convey the mood and your feelings."}
          style={{ width: "auto", height: "100%", objectFit: "contain" }}
        />
        <WritingA />
        <WritingB />
      </div>
    </div>
  );
};

export default WritingSection_U10;
