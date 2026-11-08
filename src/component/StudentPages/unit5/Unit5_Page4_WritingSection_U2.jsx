import WritingA from "./Unit5_Page4_WritingA";
import Unit4_Page4_WritingB from "./Unit5_Page4_WritingB";
import WritingB from "./Unit5_Page4_WritingB";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 43/SVG/Asset 30.svg";
const WritingSection_U1 = () => {
  return <div>
      {/* العنوان */}
      <div className="w-[60%] mx-auto mb-4 flex items-center">
        <div className="px-4 py-1 font-bold text-black w-fit" style={{
        backgroundImage: `url(${ReadingBG})`,
        backgroundSize: "cover"
      }}>
          Writing
        </div>
      </div>

      {/* المحتوى */}
      <div className="flex flex-col w-[60%] mx-auto space-y-10">
        <img src={img} alt={"Two women looking at clothes in a shop. How can you speak politely? Examples: Pardon me. Do you mind ...? Said with a soft voice. I am awfully sorry. It seems there is a problem with ... Sorry to bother you, but ... Do you think ... Please forgive me ... What a kind thing to do. Could you please tell me ...? Do not worry about it. I should have been more careful. Perhaps there is another model? What do you think? Is it possible? I greatly appreciate your help. How thoughtful of you. Writing tips: Add words or arrange a basic statement or question to make it polite. Memorize polite idioms and use them when needed."} style={{
        width: "auto",
        height: "100%",
        objectFit: "contain"
      }} />
        <WritingA />
        <WritingB />
      </div>
    </div>;
};
export default WritingSection_U1;
