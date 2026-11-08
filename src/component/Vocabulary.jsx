import { FaVolumeUp } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import QuestionAudioPlayer from "./QuestionAudioPlayer";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const Vocabulary = ({
  words = [],
  sound,
  captions,
  stopAtSecond,
  wordTimings = [],
  sounds = [],
  pageId,
  keyboardAccessible = false,
}) => {
  const audioRefs = React.useRef([]);
  const playRequest = React.useRef(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [playingWord, setPlayingWord] = useState(null);
  const mainAudioRef = React.useRef(null);
  useEffect(() => {
    if (!keyboardAccessible) return;
    const audios = audioRefs.current.filter(Boolean);
    const clear = (event) =>
      setPlayingWord((current) =>
        audios[current] === event.target ? null : current,
      );
    audios.forEach((audio) => {
      audio.addEventListener("ended", clear);
      audio.addEventListener("pause", clear);
      audio.addEventListener("error", clear);
    });
    return () =>
      audios.forEach((audio) => {
        audio.removeEventListener("ended", clear);
        audio.removeEventListener("pause", clear);
        audio.removeEventListener("error", clear);
        audio.pause();
      });
  }, [keyboardAccessible]);
  if (words.length === 0) return null;
  const playWordAudio = (index) => {
    const generation = ++playRequest.current;
    // 🔥 وقف صوت السؤال أول
    if (mainAudioRef.current) {
      mainAudioRef.current.pause();
    }

    // وقف كل أصوات الكلمات
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // شغل الصوت الجديد
    const audio = audioRefs.current[index];
    if (!audio) return;

    audio.currentTime = 0;
    if (keyboardAccessible) {
      setPlayingWord(index);
      audio.play().catch(() => {
        if (playRequest.current === generation)
          setPlayingWord((current) => (current === index ? null : current));
      });
    } else audio.play();
  };
  const columns = chunkWords(words, 3);
  const perCol = Math.ceil(words.length / 3);

  const activeIndex = wordTimings.findIndex(
    (w) => currentTime >= w.start && currentTime <= w.end,
  );

  return (
    <div
      data-vocab-access={keyboardAccessible || undefined}
      className="relative bg-white/70 backdrop-blur-sm border-2 border-[#6D2980] rounded-2xl shadow-lg p-6 pt-8 w-full max-w-[60%] mt-8"
    >
      {/* {keyboardAccessible && (
        <style>{`[data-vocab-access] :focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:12px;}`}</style>
      )} */}
      {/* Header */}
      <div className="absolute top-0 left-0 bg-[#6D2980] text-white font-bold px-4 py-1 rounded-tl-2xl">
        VOCABULARY
      </div>

      {/* Subtitle */}
      <h2 className="mb-5 pl-4 mt-4 font-bold">
        Listen and repeat. Find the words and expressions in the conversation
        above.
      </h2>

      {/* Audio */}
      <QuestionAudioPlayer
        pageId={pageId}
        ref={mainAudioRef}
        src={sound}
        captions={captions}
        stopAtSecond={stopAtSecond}
        onTimeUpdate={(t) => setCurrentTime(t)}
      />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-3">
            {col.map((word, i) => {
              const num = colIndex * perCol + i + 1;
              const isActive =
                keyboardAccessible && playingWord !== null
                  ? playingWord === num - 1
                  : activeIndex === num - 1;

              return (
                <div
                  key={i}
                  {...(keyboardAccessible
                    ? {
                        role: "button",
                        tabIndex: 0,
                        "data-vocab-word": true,
                        "aria-label": `Hear ${word}`,
                        ...activationKeys,
                      }
                    : {})}
                  style={
                    keyboardAccessible ? { position: "relative" } : undefined
                  }
                  onClick={() => playWordAudio(num - 1)}
                  className={`group flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 shadow-sm
${
  isActive
    ? "bg-[#6D2980] text-white border-[#6D2980] shadow-md scale-[1.02]"
    : "bg-[#f8f5fc] hover:bg-[#6D2980] border-transparent hover:border-[#6D2980]"
}`}
                >
                  {keyboardAccessible && playingWord === num - 1 && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "white",
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                      }}
                    >
                      <FaVolumeUp size={12} />
                    </span>
                  )}
                  <div className="flex items-center">
                    <span
                      className={`font-bold text-sm mr-3 ${
                        isActive
                          ? "text-white"
                          : "text-[#6D2980] group-hover:text-white"
                      }`}
                    >
                      {num}.
                    </span>

                    <span
                      className={`font-medium ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 group-hover:text-white"
                      }`}
                    >
                      {word}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {sounds.map((src, i) => (
        <audio key={i} ref={(el) => (audioRefs.current[i] = el)} src={src} />
      ))}
    </div>
  );
};

const chunkWords = (words, cols) => {
  const perCol = Math.ceil(words.length / cols);
  return Array.from({ length: cols }, (_, i) =>
    words.slice(i * perCol, (i + 1) * perCol),
  );
};

export default Vocabulary;
