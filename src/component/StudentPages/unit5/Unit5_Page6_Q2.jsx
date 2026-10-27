import clip0 from "../../../assets/audio/ClassBook/U5/Page 45 - D/Item_001_Jane_is_sitting_in_a_restaurant._She_waits_patiently_for_the_server_to_c.mp3";
import clip1 from "../../../assets/audio/ClassBook/U5/Page 45 - D/Item_002_The_waiter_finally_comes_to_her_table.mp3";
import clip2 from "../../../assets/audio/ClassBook/U5/Page 45 - D/Item_003_Server_Good_afternoon!_What_would_you_like_to_order.mp3";
import clip3 from "../../../assets/audio/ClassBook/U5/Page 45 - D/Item_004_Jane_I'm_sorry._I_don't_have_the_menu._Could_I_please_see_it.mp3";
import clip4 from "../../../assets/audio/ClassBook/U5/Page 45 - D/Item_005_Server_Certainly._Here_you_go.mp3";
import clip5 from "../../../assets/audio/ClassBook/U5/Page 45 - D/Item_006_Jane_Thank_you._I_would_like_to_order_the_chicken_salad.mp3";
import clip6 from "../../../assets/audio/ClassBook/U5/Page 45 - D/Item_007_Server_Would_you_like_anything_to_drink.mp3";
import clip7 from "../../../assets/audio/ClassBook/U5/Page 45 - D/Item_008_Jane_Yes._Would_you_please_bring_some_tea.mp3";
import clip8 from "../../../assets/audio/ClassBook/U5/Page 45 - D/Item_009_Server_Sure._Would_you_like_anything_else.mp3";
import clip9 from "../../../assets/audio/ClassBook/U5/Page 45 - D/Item_010_Jane_Yes,_please._I_would_like_a_burger_and_some_fries.mp3";
import clip10 from "../../../assets/audio/ClassBook/U5/Page 45 - D/Item_011_Server_Okay._Your_order_will_be_ready_in_15_minutes.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 45/Asset 29.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U5/PG 45/cd25pg45.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const activationKeys = {
  onKeyDown: event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
const fieldKeys = {
  onKeyDown: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  }
};
const normalizeAnswer = text => text.normalize("NFKC").toLowerCase().replace(/[‘’']/g, "").replace(/[.,!?;:…“”"–—-]/g, " ").replace(/\s+/g, " ").trim();
const Unit5_Page6_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const captions = [{
    start: 0.34,
    end: 8.26,
    text: "Page 45, write activities, exercise D. Listen and read the conversation, then write true or false."
  }, {
    start: 9,
    end: 19.859,
    text: "Jane is sitting in a restaurant. She waits patiently for the server to come and take her order. The waiter finally comes to her table. Good afternoon. What would you like to order?"
  }, {
    start: 19.859,
    end: 24.279,
    text: "I'm sorry. I don't have the menu. Could I please see it?"
  }, {
    start: 24.279,
    end: 26.539,
    text: "Certainly. Here you go."
  }, {
    start: 26.539,
    end: 30.1,
    text: "Thank you. I would like to order the chicken salad."
  }, {
    start: 30.1,
    end: 32.919,
    text: "Would you like anything to drink?"
  }, {
    start: 32.919,
    end: 36.399,
    text: "Yes. Would you please bring some tea?"
  }, {
    start: 36.399,
    end: 39.279,
    text: "Sure. Would you like anything else?"
  }, {
    start: 39.279,
    end: 43.679,
    text: "Yes, please. I would like a burger and some fries."
  }, {
    start: 43.679,
    end: 47.299,
    text: "Okay. Your order will be ready in 15 minutes."
  }, {
    start: 47.299,
    end: 48.739,
    text: "Thank you very much."
  }];
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const correctAnswers = ["False", "True", "True", "False", "False"];
  const handleSelect = (i, val) => {
    if (locked || result[i] === true) return;
    setAnswers(previous => previous.map((a, j) => j === i ? val : a));
    setResult(previous => {
      const next = [...previous];
      next[i] = undefined;
      return next;
    });
  };
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    if (answers.some(a => !a)) {
      setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please complete all fields.");
      return;
    }
    let correctCount = 0;
    const newResults = answers.map((ans, i) => {
      const ok = normalizeAnswer(ans) === normalizeAnswer(correctAnswers[i]);
      if (ok) correctCount++;
      return ok;
    });
    setResult(newResults);
    const total = answers.length;
    const color = correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;
    if (correctCount === total) {
      resetButtonRef.current?.focus({
        preventScroll: true
      });
      setLocked(true);
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.error(msg);
    } else {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.warning(msg);
    }
  };
  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    setAnswers(correctAnswers);
    setResult([true, true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const questions = ["Jane ordered a steak.", "The server was polite to Jane.", "Jane wanted some tea.", "Jane didn’t want any fries.", "The order would be ready in an hour."];
  return <div data-exercise-scope={"Unit5_Page6_Q2.jsx"} style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px"
  }}><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="Unit5_Page6_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit5_Page6_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit5_Page6_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--field-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall mb-15">
        {/* TITLE */}
        <ExerciseHeader sectionLetter="D" title={<>
          
          Listen and read the conversation. Then write{" "}
          <span className="text-[#19B6F0]">true</span> or
          <span className="text-[#19B6F0]">false</span> .
        </>} subTitle="Read or listen to each item carefully, then choose true or false only after checking the key detail." />
        <QuestionAudioPlayer pageId="sb_unit5_page6_q2" src={grammer_u1} captions={captions} stopAtSecond={8.5} />
        {/* TOP TEXT */}
        <div className="flex flex-col gap-1 text-[18px] leading-normal mb-6">
          <SentenceGroup label={"Hear the restaurant introduction, part 1"} src={clip0} id={"intro-0"} audio={audio}>
            Jane is sitting in a restaurant. She waits patiently for the server
            to come and take her order.
          </SentenceGroup>

          <SentenceGroup label={"Hear the restaurant introduction, part 2"} src={clip1} id={"intro-1"} audio={audio}>The waiter finally comes to her table.</SentenceGroup>
        </div>

        {/* DIALOG + IMAGE */}
        <div className="flex items-start gap-8 mb-10">
          {/* DIALOG */}
          <div className="flex flex-col gap-2 text-[18px] leading-[1.6] flex-1">
            <SentenceGroup label={"Hear conversation line 1"} src={clip2} id={"dialog-0"} audio={audio} className="flex gap-4">
              <span className="text-[#7A2D91] min-w-20">Server:</span>

              <span>Good afternoon! What would you like to order?</span>
            </SentenceGroup>

            <SentenceGroup label={"Hear conversation line 2"} src={clip3} id={"dialog-1"} audio={audio} className="flex gap-4">
              <span className="text-[#F28C28] min-w-20">Jane:</span>

              <span>
                I’m sorry. I don’t have the menu. Could I please see it?
              </span>
            </SentenceGroup>

            <SentenceGroup label={"Hear conversation line 3"} src={clip4} id={"dialog-2"} audio={audio} className="flex gap-4">
              <span className="text-[#7A2D91] min-w-20">Server:</span>

              <span>Certainly. Here you go.</span>
            </SentenceGroup>

            <SentenceGroup label={"Hear conversation line 4"} src={clip5} id={"dialog-3"} audio={audio} className="flex gap-4">
              <span className="text-[#F28C28] min-w-20">Jane:</span>

              <span>Thank you. I would like to order the chicken salad.</span>
            </SentenceGroup>

            <SentenceGroup label={"Hear conversation line 5"} src={clip6} id={"dialog-4"} audio={audio} className="flex gap-4">
              <span className="text-[#7A2D91] min-w-20">Server:</span>

              <span>Would you like anything to drink?</span>
            </SentenceGroup>

            <SentenceGroup label={"Hear conversation line 6"} src={clip7} id={"dialog-5"} audio={audio} className="flex gap-4">
              <span className="text-[#F28C28] min-w-20">Jane:</span>

              <span>Yes. Would you please bring some tea?</span>
            </SentenceGroup>

            <SentenceGroup label={"Hear conversation line 7"} src={clip8} id={"dialog-6"} audio={audio} className="flex gap-4">
              <span className="text-[#7A2D91] min-w-20">Server:</span>

              <span>Sure. Would you like anything else?</span>
            </SentenceGroup>

            <SentenceGroup label={"Hear conversation line 8"} src={clip9} id={"dialog-7"} audio={audio} className="flex gap-4">
              <span className="text-[#F28C28] min-w-20">Jane:</span>

              <span>Yes, please. I would like a burger and some fries.</span>
            </SentenceGroup>

            <SentenceGroup label={"Hear conversation line 9"} src={clip10} id={"dialog-8"} audio={audio} className="flex gap-4">
              <span className="text-[#7A2D91] min-w-20">Server:</span>

              <span>Okay. Your order will be ready in 15 minutes.</span>
            </SentenceGroup>

            <div className="flex gap-4">
              <span className="text-[#F28C28] min-w-20">Jane:</span>

              <span>Thank you very much.</span>
            </div>
          </div>

          {/* IMAGE */}
          <img src={img1} alt={"Friends eating together around a restaurant table."} style={{
          width: "35%",
          height: "auto",
          objectFit: "contain"
        }} />
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-5">
          {questions.map((q, i) => <div key={i} className="flex items-center gap-5">
              {/* NUMBER */}
              <span className="font-bold text-[18px] w-6">{i + 1}</span>

              {/* QUESTION */}
              <div className="text-[18px] flex-1">{q}</div>
              {/* ANSWER INPUT */}
              <div className="relative">
                <input placeholder={"True/false"} style={{
              ...(result[i] === true ? {
                borderColor: "#16a34a"
              } : {})
            ,"--field-focus-radius":"18px"}} {...fieldKeys} aria-invalid={!!(result[i] === false)} title={`Statement ${i + 1}, write true or false: ${questions[i]}`} aria-label={`Statement ${i + 1}, write true or false: ${questions[i]}`} type="text" value={answers[i]} disabled={locked || result[i] === true} onChange={e => handleSelect(i, e.target.value)} className={`
                      w-[220px]
                      h-[50px]
                      rounded-[18px]
                      border-2
                      px-5
                      text-[22px]
                      font-semibold
                      outline-none
                      transition-all
                      text-center

                      ${result[i] === false ? "border-[#D1232A] text-[#19B6F0]" : "border-[#7A2D91] text-[#19B6F0]"}
                    `} />

                {/* WRONG */}
                {result[i] === false && <span style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "22px",
              height: "22px",
              background: "#ef4444",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              border: "2px solid white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
            }}>
                    ✕
                  </span>}
              </div>
            </div>)}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button {...activationKeys} aria-label={"Show Answer"} type={"button"} className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button {...activationKeys} style={{
        cursor: locked ? "not-allowed" : "pointer"
      }} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>;
};
export default Unit5_Page6_Q2;
