import ReadingSection from "./ReadingSection";
import ComprehensionA from "./Unit6_Page2_ComprehensionA";

import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 47/SVG/Asset 19.svg";
import readingAudio from "../../../assets/audio/ClassBook/U6/PG 47/cd28pg47-reading.mp3";

const ReadingSection_U6 = () => {
  const paragraphs = [
    <>
      Today, Lori Beck is coming to visit me!{" "}
      <span className="underline">I couldn’t believe it!</span> She hopes to
      become an Olympic show jumper.
    </>,

    <>
      Our friendship started last year at horse camp. Lori went to the same
      camp, and we stayed in a cabin together. We became good friends. I grinned
      as I pulled the front door open. “Lori! It’s so good to see you!”
    </>,

    <>
      Lori was jumping up and down with excitement. “Jenny, it’s so great to be
      at your house!”
    </>,

    <>
      “Today, <span className="underline">we can go</span> to the barn in the
      back. You will be able to meet my brother and my dad. You met my mom
      already, right?” I asked.
    </>,

    <>
      “Yes, I met her when she came to pick you up from camp. She was really
      nice. <span className="underline">I would love to</span> meet the rest of
      your family, but I’d like a glass of water first,” said Lori.
    </>,

    <>
      As I handed her the glass of water, I asked, “Shall we go riding today?”
    </>,

    <>
      “Riding is always my favorite thing to do! We{" "}
      <span className="underline">might be able to</span> try out the trail ride
      you told me about!” answered Lori.
    </>,

    <>
      As we walked towards the barn, we talked about which horse Lori might
      ride. Cinderella seemed like a good choice.
    </>,
    <>
      (<span className="text-[#1E88E5]">to be continued ...</span>)
    </>,
  ];

  const captions = [
    {
      start: 0.159,
      end: 6.639,
      text: "Page 47 reading. Do you have a special friend? How often do you spend time with them? A Special Visitor.",
    },

    {
      start: 7.679,
      end: 24.76,
      text: "Today, Lori Beck is coming to visit me! I couldn’t believe it! She hopes to become an Olympic show jumper. Our friendship started last year at horse camp. Lori went to the same camp, and we stayed in a cabin together. We became good friends. I grinned as I pulled the front door open.",
    },

    {
      start: 26.459,
      end: 51.959,
      text: '"Lori was jumping up and down with excitement. “Jenny, it’s so great to be at your house!" "Today, we can go to the barn in the back. You will be able to meet my brother and my dad. You met my mom already, right?” I asked. "Yes, I met her when she came to pick you up from camp. She was really nice. I would love to meet the rest of your family, but I’d like a glass of water first,” said Lori',
    },

    {
      start: 53.5,
      end: 71.079,
      text: 'As I handed her the glass of water, I asked, “Shall we go riding today?" "Riding is always my favorite thing to do! We might be able to try out the trail ride you told me about!” answered Lori. As we walked towards the barn, we talked about which horse Lori might ride. Cinderella seemed like a good choice',
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle={
          <>
            Do you have a special friend? How often do you spend
            <br />
            time with them?
          </>
        }
        title="A Special Visitor"
        image={imgReading}
        paragraphs={paragraphs}
        question="Do you think Lori and Jenny will have a good day together? How can you tell?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={5.3}
      />

      <div className="w-[60%] mt-4 space-y-6 ">
        <ComprehensionA />
      </div>
    </div>
  );
};

export default ReadingSection_U6;
