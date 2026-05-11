import React, { useRef, useState } from "react";
import ReadingSection from "./ReadingSection";
import ComprehensionA from "./Unit5_Page2_ComprehensionA";
import ComprehensionB from "./Unit5_Page2_ComprehensionB";

import readingAudio from "../../../assets/audio/ClassBook/U5/PG 41/cd23pg41-reading.mp3";
import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 41/SVG/Asset 32.svg";

const ReadingSection_U2 = () => {
  const originalHtmlRef = useRef("");
  const [underlineMode, setUnderlineMode] = useState(false);

  const readingRef = useRef(null);

  const enableUnderline = () => {
    setUnderlineMode(true);

    readingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  const handleResetUnderline = () => {
    setUnderlineMode(false);
  };
  const paragraphs = [
    {
      speaker: "Server",
      parts: [{ text: "A table for three, sir?", underline: true }],
    },
    {
      speaker: "Customer",
      text: "Yes, please. We'd like one with a view, if possible.",
    },
    {
      speaker: "Server",
      text: "Not a problem. Does this one suit you?",
    },
    {
      speaker: "Customer",
      text: "Wonderful. Could we get a glass of juice, please?",
    },
    {
      speaker: "Server",
      text: "Certainly. Would everyone like orange juice?",
    },
    {
      speaker: "Customer",
      text: "That would be nice, thank you.",
    },

    {
      note: "(The server returns with their juices and is ready to take the order.)",
    },

    {
      speaker: "Server",
      parts: [
        { text: "Here are the juices you ordered. " },
        { text: "May I take your order now?", underline: true },
      ],
    },
    {
      speaker: "Customer",
      text: "Yes, I think we'll decide on the soup-of-the-day and sandwiches. My wife would like a grilled cheese, and my friend prefers turkey. I'll take a vegetarian sandwich.",
    },

    {
      note: "(A little while later the server brings the bowls of soup.)",
    },

    {
      speaker: "Server",
      text: "Here's your first course, sir, our famous broccoli cheese soup.",
    },
    {
      speaker: "Customer",
      text: "Excuse me, my soup is cold. Is it possible to warm it up some more?",
    },
    {
      speaker: "Server",
      parts: [
        {
          text: "I'm sorry, sir. The cooks must have forgotten to check it. ",
        },
        {
          text: "I'll take care of it right away.",
          underline: true,
        },
      ],
    },
    {
      speaker: "Customer",
      text: "Thank you. I appreciate your good service.",
    },
    {
      speaker: "Server",
      parts: [
        {
          text: "It's my pleasure. Again, I'll be back with your hot soup ",
        },
        {
          text: "as soon as possible.",
          underline: true,
        },
      ],
    },
  ];
  const captions = [
    {
      start: 0.319,
      end: 10.719,
      text: "Page 41 reading. Do you know how to place an order at a restaurant? What would you say to the server if your meal was cold? Eating out. A table for three, sir.",
    },
    {
      start: 10.719,
      end: 14.0,
      text: "Yes, please. We'd like one with a view, if possible.",
    },
    {
      start: 14.0,
      end: 16.219,
      text: "Not a problem. Does this one suit you?",
    },
    {
      start: 16.219,
      end: 19.239,
      text: "Wonderful. Could we get a glass of juice, please?",
    },
    {
      start: 19.239,
      end: 21.819,
      text: "Certainly. Would everyone like orange juice?",
    },
    {
      start: 21.819,
      end: 23.699,
      text: "That would be nice. Thank you.",
    },
    {
      start: 23.699,
      end: 26.779,
      text: "Here are the juices you ordered. May I take your order now?",
    },
    {
      start: 26.779,
      end: 36.159,
      text: "Yes. I think we all decided on the soup of the day and sandwiches. My wife would like a grilled cheese, and my friend prefers turkey. I'll take a vegetarian sandwich.",
    },
    {
      start: 36.159,
      end: 39.819,
      text: "Here's your first course, sir, our famous broccoli cheese soup.",
    },
    {
      start: 39.819,
      end: 44.419,
      text: "Excuse me, my soup is cold. Is it possible to warm it up some more?",
    },
    {
      start: 44.419,
      end: 49.459,
      text: "I'm sorry, sir. The cooks must have forgotten to check it. I'll take care of it right away.",
    },
    {
      start: 49.459,
      end: 52.179,
      text: "Thank you. I appreciate your good service.",
    },
    {
      start: 52.18,
      end: 56.279,
      text: "It's my pleasure. Again, I'll be back with your hot soup as soon as possible.",
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle={
          <>
            Do you know how to place an order at a restaurant?
            <br />
            What would you say to the server if your meal was cold?
          </>
        }
        title="Eating Out"
        image={imgReading}
        paragraphs={paragraphs}
        question="Are you usually a polite customer? How could you improve?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={7.5}
        readingRef={readingRef}
        underlineMode={underlineMode}
        originalHtmlRef={originalHtmlRef}
      />

      <div className="w-[60%] mt-4 space-y-6 ">
        <ComprehensionA />

        <ComprehensionB
          enableUnderline={enableUnderline}
          handleResetUnderline={handleResetUnderline}
          readingRef={readingRef}
        />
      </div>
    </div>
  );
};

export default ReadingSection_U2;
