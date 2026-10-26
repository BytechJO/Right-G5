import clip0 from "../../../assets/audio/ClassBook/U5/Page 44 - B/Item_001_Sophia.mp3";
import clip1 from "../../../assets/audio/ClassBook/U5/Page 44 - B/Item_002_milk.mp3";
import clip2 from "../../../assets/audio/ClassBook/U5/Page 44 - B/Item_003_Natalie.mp3";
import clip3 from "../../../assets/audio/ClassBook/U5/Page 44 - B/Item_004_lemonade.mp3";
import clip4 from "../../../assets/audio/ClassBook/U5/Page 44 - B/Item_005_Pete.mp3";
import clip5 from "../../../assets/audio/ClassBook/U5/Page 44 - B/Item_006_bagels.mp3";
import clip6 from "../../../assets/audio/ClassBook/U5/Page 44 - B/Item_007_Felicity.mp3";
import clip7 from "../../../assets/audio/ClassBook/U5/Page 44 - B/Item_008_waffles.mp3";
import clip8 from "../../../assets/audio/ClassBook/U5/Page 44 - B/Item_009_Jonas.mp3";
import clip9 from "../../../assets/audio/ClassBook/U5/Page 44 - B/Item_010_burger.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import leftImage from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/Asset 33.svg";
import Jonas from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 34.svg";
import Natalie from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 35.svg";
import Pete from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 36.svg";
import Sophia from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 37.svg";
import Felicity from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 38.svg";
import cloud from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 39.svg";
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
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};
const Unit5_Page5_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const answerRefs = React.useRef([]),
    answerListRef = React.useRef(null);
  const resizeAnswers = React.useCallback(() => {
    answerRefs.current.forEach((field) => {
      if (!field) return;
      const border = field.offsetHeight - field.clientHeight;
      field.style.height = "auto";
      field.style.height = field.scrollHeight + border + "px";
    });
  }, []);
  React.useLayoutEffect(resizeAnswers, [answers, resizeAnswers]);
  React.useEffect(() => {
    let alive = true,
      lastWidth = -1;
    const resize = () => resizeAnswers();
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width;
            if (width === lastWidth) return;
            lastWidth = width;
            resizeAnswers();
          })
        : null;
    if (answerListRef.current) observer?.observe(answerListRef.current);
    window.addEventListener("resize", resize);
    document.fonts?.ready.then(() => {
      if (alive) resizeAnswers();
    });
    return () => {
      alive = false;
      observer?.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [resizeAnswers]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const correctAnswers = [
    ["I would prefer a burger, please."],
    ["I would like lemonade, please."],
    ["Could I please have a bagel?", "Could I please have bagels?"],
    ["I would like some milk, please."],
    ["Could you please give me some waffles?"],
  ];
  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    setAnswers((previous) => previous.map((a, j) => (j === i ? val : a)));
    setResult((previous) => {
      const next = [...previous];
      next[i] = undefined;
      return next;
    });
  };
  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    setAnswers([
      correctAnswers[0][0],
      correctAnswers[1][0],
      correctAnswers[2][0],
      correctAnswers[3][0],
      correctAnswers[4][0],
    ]);
    setResult([true, true, true, true, true]);
    setLocked(true);
  };
  const reset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const rightCharacters = [Jonas, Natalie, Pete, Sophia, Felicity];
  return (
    <div
      className="u5-chart-exercise"
      data-exercise-scope={"Unit5_Page5_Q2.jsx"}
    >
      <style>{`
.u5-chart-exercise{box-sizing:border-box;width:100%;min-width:0;display:flex;flex-direction:column;align-items:center;padding:clamp(10px,2%,30px);container:unit5-chart-response / inline-size;}
.u5-chart-exercise .u5-chart-content{width:60%;max-width:900px;min-width:0;}
.u5-chart-exercise .header-title-page8,.u5-chart-exercise .sub-header{min-width:0;overflow-wrap:anywhere;}
.u5-chart-layout{display:grid;grid-template-columns:minmax(240px,450px) minmax(0,380px);justify-content:center;align-items:start;gap:clamp(20px,4cqi,55px);margin-bottom:20px;min-width:0;}
.u5-chart-figure{position:relative;width:100%;max-width:450px;min-width:0;justify-self:center;}
.u5-chart-image{display:block;width:100%;height:auto;object-fit:contain;}
.u5-chart-answers{display:flex;flex-direction:column;gap:24px;margin-top:6px;width:100%;min-width:0;}
.u5-chart-answer-row{display:grid;grid-template-columns:95px 16px minmax(0,1fr);align-items:center;gap:10px;min-width:0;}
.u5-chart-portrait{width:95px;height:95px;object-fit:contain;}
.u5-chart-number{font-weight:bold;font-size:18px;text-align:center;}
.u5-chart-bubble{position:relative;min-width:0;width:100%;}
.u5-chart-cloud{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
.u5-chart-answer{display:block;position:relative;box-sizing:border-box;width:80%;min-width:0;min-height:60px;margin:16px 4% 16px 16%;font-size:18px;line-height:1.4;resize:none;overflow:hidden;white-space:pre-wrap;overflow-wrap:anywhere;padding:6px 10px;}
.u5-chart-exercise .u5-chart-actions{position:static;left:auto;right:auto;bottom:auto;transform:none;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;width:100%;margin:20px 0 0;}
.u5-chart-actions>button{max-width:min(100%,180px);}
@container unit5-chart-response (max-width:1300px){.u5-chart-layout{grid-template-columns:minmax(0,1fr);gap:24px;}.u5-chart-answers{max-width:480px;justify-self:center;}}
@container unit5-chart-response (max-width:440px){.u5-chart-content .sub-header{font-size:16px!important;line-height:1.5;}.u5-chart-content header.header-title-page8{font-size:20px;}.u5-chart-answer-row{grid-template-columns:64px 16px minmax(0,1fr);gap:8px;}.u5-chart-portrait{width:64px;height:64px;}.u5-chart-answers{gap:16px;}.u5-chart-answer{min-height:72px;font-size:16px;padding:6px 8px;}}
@container unit5-chart-response (max-width:320px){.u5-chart-content>.header-title-page8>img{height:70px!important;}.u5-chart-answer-row{grid-template-columns:50px 14px minmax(0,1fr);gap:6px;}.u5-chart-portrait{width:50px;height:60px;}}
`}</style>
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit5_Page5_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit5_Page5_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit5_Page5_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall u5-chart-content">
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="B"
          title={<>Read the chart and complete.</>}
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        {/* MAIN CONTENT */}
        <div className="u5-chart-layout">
          {/* LEFT IMAGE */}
          <div className="u5-chart-figure">
            <img
              className="u5-chart-image"
              src={leftImage}
              alt={
                "Chart of preferences: Sophia, milk; Natalie, lemonade; Pete, bagels; Felicity, waffles; Jonas, burger."
              }
            />
            {[
              "Sophia: milk",
              "Natalie: lemonade",
              "Pete: bagels",
              "Felicity: waffles",
              "Jonas: burger",
            ].map((label, index) => (
              <div
                key={label}
                role="button"
                tabIndex={0}
                data-choice
                aria-label={`Hear chart row ${index + 1}: ${label}`}
                {...activationKeys}
                onClick={() =>
                  audio.play(
                    `chart-${index}`,
                    [
                      [clip0, clip1],
                      [clip2, clip3],
                      [clip4, clip5],
                      [clip6, clip7],
                      [clip8, clip9],
                    ][index],
                  )
                }
                style={{
                  position: "absolute",
                  left: 0,
                  top: `${index * 20}%`,
                  width: "100%",
                  height: "20%",
                  borderRadius: 6,
                  cursor: "pointer",
                  ...(audio.activeId === `chart-${index}`
                    ? {
                        boxShadow: "inset 0 0 0 3px #2563eb",
                        backgroundColor: "rgba(219,234,254,.35)",
                      }
                    : {}),
                }}
              >
                {audio.activeId === `chart-${index}` && <AudioSpeaker />}
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div ref={answerListRef} className="u5-chart-answers">
            {rightCharacters.map((char, i) => (
              <div className="u5-chart-answer-row" key={i}>
                {/* CHARACTER */}
                <img
                  className="u5-chart-portrait"
                  src={char}
                  alt={
                    [
                      "Jonas, a smiling boy in a yellow shirt.",
                      "Natalie, a girl in a green top.",
                      "Pete, a boy in a light blue shirt.",
                      "Sophia, a girl wearing blue overalls and a headband.",
                      "Felicity, a girl with two ponytails in a blue shirt.",
                    ][i]
                  }
                />

                {/* NUMBER */}
                <span className="u5-chart-number">{i + 1}</span>

                {/* CLOUD */}
                <div className="u5-chart-bubble">
                  <img className="u5-chart-cloud" src={cloud} alt={""} />

                  {/* INPUT */}
                  <textarea
                    className="u5-chart-answer"
                    ref={(field) => {
                      answerRefs.current[i] = field;
                    }}
                    {...fieldKeys}
                    aria-invalid={!!(result[i] === false)}
                    title={`Item ${i + 1}, polite request for ${["Jonas", "Natalie", "Pete", "Sophia", "Felicity"][i]}, using the chart`}
                    aria-label={`Item ${i + 1}, polite request for ${["Jonas", "Natalie", "Pete", "Sophia", "Felicity"][i]}, using the chart`}
                    rows={2}
                    value={answers[i]}
                    disabled={locked || result[i] === true}
                    placeholder="Write here..."
                    onChange={(e) => handleChange(i, e.target.value)}
                    style={{
                      outline: "none",
                      background: "transparent",
                      color: "#6D2980",
                      fontWeight: "600",
                      border: "1.5px dashed #c084d2",
                      borderRadius: "10px",
                      ...(result[i] === true
                        ? {
                            borderColor: "#16a34a",
                          }
                        : {}),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container u5-chart-actions">
        <button
          {...activationKeys}
          ref={resetButtonRef}
          aria-label={"Start Again"}
          type={"button"}
          className="try-again-button"
          onClick={reset}
        >
          Start Again ↻
        </button>

        <button
          {...activationKeys}
          aria-label={"Show Answer"}
          type={"button"}
          className="show-answer-btn"
          onClick={showAnswers}
        >
          Show Answer
        </button>
      </div>
    </div>
  );
};
export default Unit5_Page5_Q2;
