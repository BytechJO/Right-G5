import WritingA from "./Unit4_Page4_WritingA";
import Unit4_Page4_WritingB from "./Unit4_Page4_WritingB";
import WritingC from "./Unit4_Page4_WritingC";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 31/SVG/Asset 28.svg";
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
        <img src={img} alt={"What Is My Schedule Really Like? A girl writes in class. I thought I was always studying, but my mom thought I was often talking on the phone at home. My brother said I was always bothering him! So, I made a schedule of what I do during the day. The place where I spend most of my time is in school. Usually, I am listening or taking notes. Sometimes, I play with my friends or eat lunch. Rarely, do I study. Between classes, I talk with my friends. The next place I spend a lot of time is at home. I study, but only for one or two hours each day. It just feels like it's a long time! I talk on the phone, but usually just one hour or so. I actually only spend 15 minutes bothering my brother, but my mom says that is 15 minutes too long! Maybe tomorrow I will play a game with him instead. Then, I spend about one hour on chores and half an hour for dinner. Then, I'm ready for bed by 9:00, but I can always read or listen to music until 9:30. I never watch TV on school nights. So that's how I spend all my time! Writing tips: Use adverbs of frequency to tell how often you do an activity, and adverbs of order to tell the order of activities."} style={{
        width: "auto",
        height: "100%",
        objectFit: "contain"
      }} />
        <WritingA />
        <Unit4_Page4_WritingB />
        <WritingC />
      </div>
    </div>;
};
export default WritingSection_U1;
