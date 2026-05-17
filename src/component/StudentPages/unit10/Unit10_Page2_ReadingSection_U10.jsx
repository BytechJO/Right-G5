import ReadingSection from "./ReadingSection";
import ComprehensionA from "./Unit10_Page2_ComprehensionA";

import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 47/SVG/Asset 19.svg";
import readingAudio from "../../../assets/audio/ClassBook/U10/PG 83/cd48pg83-reading.mp3";

const ReadingSection_U10 = () => {
  const paragraphs = [
    <>
      (<span className="text-[#1E88E5]">continued from Unit 9</span>)
    </>,

    <>
      On the morning after Cinderella went missing, I woke up to the sound of my
      mom calling my name. I could hear her speaking to someone downstairs. Who
      could it be?
    </>,

    <>
      I opened the curtains and grabbed my brush to fix my hair as fast as I
      could. As I walked down the stairs, I heard Cinderella’s name. I ran into
      the living room, and a man who looked like a cowboy stood up and shook my
      hand. “Hello. My name is Clyde. You must be Jenny.” He said in a cheery
      voice.
    </>,

    <>
      “Do you know something about Cinderella?” I asked. My mom told me that
      Cinderella was fine. I was so happy that I almost started crying.
    </>,

    <>
      Clyde told me that he worked with his brother on a ranch outside of our
      town. The day before, they had been looking for a runaway horse that was
      the same color as Cinderella. When they saw Cinderella, they thought they
      had found the horse they were looking for. They loaded Cinderella into
      their truck and took her back to their ranch.
    </>,

    <>
      But when the ranch owner saw Cinderella, he knew that it wasn’t the same
      horse that had run away. Clyde and his brother drove to town to find out
      whom Cinderella belonged to. They saw all of our posters, but it had been
      too late to bring Cinderella home last night. They kept her in the barn.
    </>,

    <>
      I thanked Clyde and ran outside to hug Cinderella. Cinderella neighed and
      looked happy to be home.
    </>,
  ];
  const captions = [
    {
      start: 0.159,
      end: 8.26,
      text: "Page 83, Reading. How would you feel if you found something that had been missing for a long time? What would you do to show your feelings?",
    },
    {
      start: 9.22,
      end: 12.38,
      text: "A Cinderella Ending, continued from Unit 9.",
    },

    {
      start: 13.559,
      end: 27.0,
      text: "On the morning after Cinderella went missing, I woke up to the sound of my mom calling my name. I could hear her speaking to someone downstairs. Who could it be?",
    },

    {
      start: 27.0,
      end: 48.5,
      text: "I opened the curtains and grabbed my brush to fix my hair as fast as I could. As I walked down the stairs, I heard Cinderella’s name. I ran into the living room, and a man who looked like a cowboy stood up and shook my hand. “Hello. My name is Clyde. You must be Jenny,” he said in a cheery voice.",
    },

    {
      start: 48.5,
      end: 58.5,
      text: "“Do you know something about Cinderella?” I asked. My mom told me that Cinderella was fine. I was so happy that I almost started crying.",
    },

    {
      start: 58.5,
      end: 88.0,
      text: "Clyde told me that he worked with his brother on a ranch outside of our town. The day before, they had been looking for a runaway horse that was the same color as Cinderella. When they saw Cinderella, they thought they had found the horse they were looking for. They loaded Cinderella into their truck and took her back to their ranch.",
    },

    {
      start: 88.0,
      end: 99.5,
      text: "But when the ranch owner saw Cinderella, he knew that it wasn’t the same horse that had run away.",
    },

    {
      start: 99.5,
      end: 111.5,
      text: "Clyde and his brother drove to town to find out whom Cinderella belonged to. They saw all of our posters, but it had been too late to bring Cinderella home last night. They kept her in the barn.",
    },

    {
      start: 111.5,
      end: 120.039,
      text: "I thanked Clyde and ran outside to hug Cinderella. Cinderella neighed and looked happy to be home.",
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle={
          <>
            How would you feel if you found something that had
            <br />
            been missing for a long time? What would you do to show your
            feelings?
          </>
        }
        title="A Cinderella Ending"
        image={imgReading}
        paragraphs={paragraphs}
        question="Why do you think people cry sometimes when they’re happy?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={8.6}
      />

      <div className="w-[60%] mt-4 space-y-6 ">
        <ComprehensionA />
      </div>
    </div>
  );
};

export default ReadingSection_U10;
