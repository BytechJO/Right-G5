import React, { useState } from "react";
import conversationBG from "../assets/imgs/conversation.svg";
import QuestionAudioPlayer from "./QuestionAudioPlayer";
import pauseBtn from "../assets/Page 01/Right Video Button.svg";

const ConversationItem = React.memo(
  ({
    number,
    dialogues,
    image,
    currentTime,
    wordsData = [],
    captions,
    imageWidth,
  }) => {
    return (
      <div className="flex items-start gap-3 mb-10">
        <span
          className="bg-[#F79530] text-white font-bold flex items-center justify-center"
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "4px",
            fontSize: "13px",
            flexShrink: 0,
            marginTop: "3px",
          }}
        >
          {number}
        </span>

        <div className="flex justify-between items-start flex-1">
          <div className="flex-1 pr-6">
            {dialogues.map((d, index) => (
              <p key={index} className="text-[17px] leading-relaxed flex">
                <span
                  style={{
                    fontWeight: 600,
                    color: "#53B2F1",
                    width: "80px",
                    display: "inline-block",
                    textAlign: "left",
                  }}
                >
                  {d.speaker}:
                </span>

                {/* النص */}
                <RenderWords
                  text={d.text}
                  words={wordsData[index] || []}
                  currentTime={currentTime}
                  captionStart={captions[index]?.start}
                  captionEnd={captions[index]?.end}
                />
              </p>
            ))}
          </div>

          <img
            src={image}
            alt={`scene-${number}`}
            style={{
              width: imageWidth || "250px",
              height: "100%",
              objectFit: "contain",
              marginLeft: "16px",
            }}
          />
        </div>
      </div>
    );
  },
);
const RenderWords = ({
  text,
  words = [],
  currentTime,
  captionStart,
  captionEnd,
}) => {
  const realWords = words.filter((w) => w.text.trim() !== "");
  const textWords = text.match(/\S+\s*/g) || [];

  const isSentenceActive =
    currentTime >= captionStart && currentTime <= captionEnd;

  const passedCount = realWords.filter(
    (w) => currentTime >= w.start_time,
  ).length;
  return (
    <span style={{ flex: 1 }}>
      {textWords.map((word, index) => {
        const isActive = isSentenceActive && index < passedCount;

        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              padding: "2px 3px",
              borderRadius: "4px",
              backgroundColor: isActive ? "#892EA3" : "transparent",
              color: isActive ? "#fff" : "inherit",
              transition: "0.15s",
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};
const Conversation = ({
  title,
  items,
  sound,
  captions,
  stopAtSecond,
  wordTimings,
  captionTimings,
  video,
  imageWidth,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="w-[60%] mx-auto">
      {/* العنوان */}
      <div className="flex items-center gap-4 mb-12 mt-3">
        <h2
          className="text-xl font-bold px-3 py-1"
          style={{
            backgroundImage: `url(${conversationBG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {title}
        </h2>
        <h2 className="text-black font-bold">Listen and read. Then say.</h2>
      </div>
      <div
        className="pauseBtn-icon-CD-page4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 90 90"
          onClick={() => setShowVideo(true)}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={pauseBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <QuestionAudioPlayer
        src={sound}
        captions={captions}
        stopAtSecond={stopAtSecond}
        onTimeUpdate={setCurrentTime}
      />
      {/* المحادثات */}
      {items.map((item, index) => (
        <ConversationItem
          key={item.number}
          {...item}
          currentTime={currentTime}
          wordsData={wordTimings?.[index]}
          captions={captionTimings?.[index]}
          imageWidth={imageWidth}
        />
      ))}
      {showVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-9999">
          <div className="relative  w-[80%] max-w-[900px]">
            <video autoPlay controls className="w-full max-h-[80vh] rounded-xl">
              <source src={video} type="video/mp4" />
            </video>

            {/* زر الإغلاق */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-0 right-2 text-black text-2xl font-bold hover:scale-110"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
