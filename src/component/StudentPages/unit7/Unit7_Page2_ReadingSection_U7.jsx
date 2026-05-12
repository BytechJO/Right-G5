import ReadingSection from "./ReadingSection";
import ComprehensionA from "./Unit7_Page2_ComprehensionA";

import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 47/SVG/Asset 19.svg";
import readingAudio from "../../../assets/audio/ClassBook/U7/PG 59/cd33pg59-reading.mp3";

const ReadingSection_U7 = () => {
  const paragraphs = [
    <>
      (<span className="text-[#1E88E5]">continued from Unit 6</span>)
    </>,

    <>
      When we got to the barn, Lori got to meet my whole family and Cinderella.
      As soon as Lori saw Cinderella, she wanted to ride her. She liked
      Cinderella a lot. My family decided to go on a trail ride with us.
    </>,

    <>
      We left the barn and trotted across Meadowlark Meadow. The flowers were
      blooming and everyone felt happy. Then, I had a good idea, “Let’s have a
      race!”
    </>,

    <>
      We lined up our horses and my dad yelled, “On your mark. Get set. Go!”
      Then we were all racing across the beautiful meadow as fast as we could
      go. My brother, Jack, was ahead of us all, but Lori and I were close
      behind him. I shouted, “I am riding a fast horse.” Lori shouted, “I am
      riding the fastest horse!” Everyone was yelling with excitement. We all
      wanted to win. All of a sudden, my horse pulled ahead! I was surprised
      because Cinderella is usually our fastest horse. I shouted, “Now, I’m
      riding the fastest horse!”
    </>,

    <>
      Before I knew it, the race was over, and I was the winner! “Good for you,
      Jenny!” they all said, as they patted me on the back. I was laughing, and
      my horse Nancy was acting like a queen.
    </>,

    <>
      After the race, we all felt tired. We stopped under the shade of a huge
      tree. My mom had packed a picnic lunch. While we ate, Lori and I were
      talking all about horses. She was telling me about how she hopes to make
      it to the Olympics in five years. We will be 16 then. I told her that she
      will be able to go to the Olympics because she trains really hard.
    </>,

    <>
      The sun was starting to go down, and all too soon I heard my mom calling
      me, “Jenny, it’s time to head home. We are leaving.”
    </>,

    <>
      (<span className="text-[#1E88E5]">to be continued ...</span>)
    </>,
  ];
  const captions = [
    {
      start: 0.42,
      end: 6.78,
      text: "Page 59, Reading. What fun activities do you do with your friends? Do you like the same things?",
    },

    {
      start: 7.98,
      end: 20.82,
      text: "A Great Day with a Great Friend. Continued from Unit Six. When we got to the barn, Lori got to meet my whole family and Cinderella! As soon as Lori saw Cinderella, she wanted to ride her.",
    },

    {
      start: 21.88,
      end: 37.0,
      text: "She liked Cinderella a lot. My family decided to go on a trail ride with us. We left the barn and trotted across Meadowlark Meadow. The flowers were blooming, and everyone felt happy. Then I had a good idea: “Let's have a race!”",
    },

    {
      start: 38.06,
      end: 47.92,
      text: "We lined up our horses, and my dad yelled, “On your mark, get set, go!” Then we were all racing across the beautiful meadow as fast as we could.",
    },

    {
      start: 49.16,
      end: 59.88,
      text: "My brother, Jack, was ahead of us all, but Lori and I were close behind him. I shouted, “I am riding a fast horse!” Lori shouted, “I am riding the fastest horse!”",
    },

    {
      start: 61.3,
      end: 85.8,
      text: "Everyone was yelling with excitement. We all wanted to win. All of a sudden, my horse pulled ahead. I was surprised because Cinderella is usually our fastest horse. I shouted, “Now I’m riding the fastest horse!” But before I knew it, the race was over, and I was the winner. “Good for you, Jenny,” they all said as they patted me on the back. I was laughing, and my horse, Nancy, was acting like a queen.",
    },

    {
      start: 87.0,
      end: 93.62,
      text: "After the race, we all felt tired. We stopped under the shade of a huge tree. My mom had packed a picnic lunch.",
    },

    {
      start: 94.72,
      end: 110.82,
      text: "While we ate, Lori and I were talking all about horses. She was telling me about how she hopes to make it to the Olympics in five years. We will be sixteen then. I told her that she will be able to go to the Olympics because she trains really hard.",
    },

    {
      start: 111.86,
      end: 119.12,
      text: "The sun was starting to go down, and all too soon, I heard my mom calling me, “Jenny, it’s time to head home. We are leaving.”",
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle={
          <>
            What fun activities do you do with your friends? Do you
            <br />
            like the same things?
          </>
        }
        title="A Great Day With a Great Friend"
        image={imgReading}
        paragraphs={paragraphs}
        question="Which part of the day do you think Jenny enjoys the most?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={7.1}
      />

      <div className="w-[60%] mt-4 space-y-6 ">
        <ComprehensionA />
      </div>
    </div>
  );
};

export default ReadingSection_U7;
