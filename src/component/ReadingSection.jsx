import React from "react";
import ReadingBG from "../assets/imgs/conversation.svg";
import think from "../assets/../assets/imgs/pages/classbook/think.svg";
import QuestionAudioPlayer from "./QuestionAudioPlayer";
import Button from "./Button";

const ReadingSection = ({
  mainTitle,
  title,
  image,
  paragraphs = [],
  question,
  sound,
  captions,
  stopAtSecond,
}) => {
  return (
    <div className="p-6 flex flex-col items-center ">
      <div className="flex items-center gap-4 mb-4 w-[60%]">
        <div
          className="px-4 py-1 font-bold text-black"
          style={{
            backgroundImage: `url(${ReadingBG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          Reading
        </div>

        <h2 className="font-bold text-[18px] text-black">{mainTitle}</h2>
      </div>
      <div className="w-[70%] mx-auto">
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />
      </div>
      <div className="relative w-[60%] mt-2">
        <div className="absolute -top-3 left-4 bg-[#6D2980] text-white px-5 py-1 rounded-md text-sm font-bold">
          {title}
        </div>

        <div className="border-2 border-[#6D2980] rounded-2xl p-4 pt-6 bg-white">
          <div className="flex gap-4">
            <img
              src={image}
              style={{ width: "220px", height: "150px", objectFit: "cover" }}
              className="w-[220px] h-[150px] object-cover rounded-md"
            />

            <div className="mt-3 text-[14px] leading-relaxed text-black space-y-2 font-medium">
              {paragraphs.slice(0, 2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-3 text-[14px] leading-relaxed text-black space-y-2 font-medium">
            {paragraphs.slice(2).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-[60%]">
        <img
          src={think}
          alt="think"
          style={{ height: "150px", width: "auto" }}
        />

        <div className="absolute top-1/2 left-10 -translate-y-1/2 text-[15px] text-black text-left max-w-[70%]">
          {question}
        </div>
      </div>

      <div className="w-[60%] mt-3 space-y-6">
        <div className="flex items-center gap-4">
          <div
            className="px-4 py-1 font-bold text-black"
            style={{
              backgroundImage: `url(${ReadingBG})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            Comprehension
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingSection;
