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
          alt={"If: model poem with four moods and actions. Happy: clap your hands. Sad: cry some tears. Angry: stomp your feet. Excited: shout Hooray. Each stanza repeats If you are [mood] and you know it, followed by the action, twice; then repeats the if line, adds And you really want to show it, repeats the if line, and ends with the action. A photograph shows two smiling children clapping. Writing tips: decide the mood of your poem and use exact word choices and rhythm to communicate it to the reader. In an if poem, make the if part lead to the second part. A stronger change at the end gives the reader a stronger message."}
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
