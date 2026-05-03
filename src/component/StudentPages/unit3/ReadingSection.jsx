import React from "react";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import think from "../../../assets/imgs/pages/classbook/think.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import Button from "../../Button";

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

        <div className="border-2 border-[#6D2980] rounded-2xl p-5 pt-7 bg-white">
          {/* الصورة مع float */}
          <img
            src={image}
            style={{ width: "220px", height: "280px", objectFit: "cover" }}
            className="float-left mr-5 mb-2 rounded-md"
          />

          {/* كل الفقرات */}
          <div className="text-[14px] leading-[1.7] text-black space-y-3 font-medium text-justify">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* تنظيف الفلوت */}
          <div className="clear-both"></div>
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
