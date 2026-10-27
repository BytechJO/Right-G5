import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_001_How_many_hours_do_you_spend_studying_for_an_exam_How_many_times_have.mp3";
import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_002_you_fallen_asleep_while_doing_your_homework_or_studying_Did_you_ever_sle.mp3";
import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_003_on_your_books_This_happens_to_almost_every_student._Studying_takes_up_a.mp3";
import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_004_of_time._Sometimes,_there_just_isn't_enough_time_to_study!.mp3";
import clip4 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_005_That's_what_happened_to_John,_a_fifth_grade_student._He_was_studying_for.mp3";
import clip5 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_006_math_exam_when_he_fell_asleep_at_his_desk._In_the_morning,_his_alarm_wen.mp3";
import clip6 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_007_Uh-oh!_It_was_already_time_to_go_to_school!_John_didn't_finish_studying.mp3";
import clip7 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_008_didn't_know_what_to_do._When_he_went_to_school,_he_tried_to_study,_but_t.mp3";
import clip8 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_009_wasn't_enough_time._He_only_had_10_minutes_to_review_before_the_math_exa.mp3";
import clip9 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_010_When_it_was_time_for_the_exam,_John_was_not_ready._He_took_the_exam_but.mp3";
import clip10 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_011_couldn't_figure_out_many_of_the_answers._Sadly,_John_got_70_on_his_math.mp3";
import clip11 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_012_exam._Next_time,.mp3";
import clip12 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_013_will_study_as_soon_as.mp3";
import clip13 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_014_go_home,_he_thought.mp3";
import clip14 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_015_How_many_minutes_did_John_have_to_study_at_school.mp3";
import clip15 from "../../../assets/audio/Workbook/Unit 1/Page 7 - K/Item_016_What_mark_did_John_get_on_his_exam.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 7/Asset 10.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit1_Page7_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    "He only had 10 minutes to study.",
    "John got 70% on his math exam.",
    "He should study as soon as he gets home.",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = text=>normalizeAnswer(text).replace(/%/g,"");

  const handleChange = (i, value) => {
    if (locked || result[i] === true || (i === 3 && locked)) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    // كل الحقول لازم تكون معبية
    const hasEmpty = answers.some((a) => !a.trim());

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));
      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      // السؤال الرابع ما ينحسب
      if (i === 3) {
        return undefined;
      }

      const ok = normalize(a) === normalize(questions[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    // السكور فقط لأول 3
    const total = 3;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:18px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;

    if (correctCount === total) {
      resetButtonRef.current?.focus({preventScroll:true});setLocked(true);

      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.success(msg));
    } else if (correctCount === 0) {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.error(msg));
    } else {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.warning(msg));
    }
  };

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setAnswers([
      "He only had 10 minutes to study.",
      "John got 70% on his math exam.",
      "He should study as soon as he gets home.",
    answers[3] || "",]);

    setResult([true,true,true,undefined]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <div className="relative w-full">
      <input placeholder={i===3?"Your own answer":"Answer"} style={{...(result[i]===true?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={result[i]===false} title={["How many minutes did John have to study at school?","What mark did John get on his exam?","What should John do next time before an exam?","How long does it take you to study? Personal response, not graded"][i]} aria-label={["How many minutes did John have to study at school?","What mark did John get on his exam?","What should John do next time before an exam?","How long does it take you to study? Personal response, not graded"][i]} {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1
          placeholder:text-[#999]

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );

  return (
    <div data-exercise-scope={"WB_Unit1_Page7_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit1_Page7_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page7_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page7_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div
        className="div-forall "
        style={{
          lineHeight: "1.5",
        }}
      >
        {/* TITLE */}
        <ExerciseHeader subTitle="Read the whole passage once, return to the sentence that contains the answer, then write a short response based on the text." isWorkbook sectionLetter="K" title={<>
          
          Read and write.
        </>}/>

        {/* READING */}
        <div className="flex gap-8 items-start mb-12 text-[17px]">
          <div className="flex-1">
            <SentenceGroup label={"Hear reading paragraph 1"} src={[clip0,clip1,clip2,clip3]} id={"reading-paragraph-0"} audio={audio} className="mb-5">
              How many hours do you spend studying for an exam? How many times
              have you fallen asleep while doing your homework or studying? Did
              you ever sleep on your books? This happens to almost every
              student. Studying takes up a lot of time. Sometimes, there just
              isn’t enough time to study!
            </SentenceGroup>

            <SentenceGroup label={"Hear reading paragraph 2"} src={[clip4,clip5,clip6,clip7,clip8,clip9,clip10,clip11,clip12,clip13]} id={"reading-paragraph-1"} audio={audio}>
              That’s what happened to John, a fifth grade student. He was
              studying for a math exam when he fell asleep at his desk. In the
              morning, his alarm went off. Uh-oh! It was already time to go to
              school! John didn’t finish studying. He didn’t know what to do.
              When he went to school, he tried to study, but there wasn’t enough
              time. He only had 10 minutes to review before the math exam. When
              it was time for the exam, John was not ready. He took the exam but
              couldn’t figure out many of the answers. Sadly, John got 70% on
              his math exam. “Next time, I will study as soon as I go home,” he
              thought.
            </SentenceGroup>
          </div>

          {/* IMAGE */}
          <img
            src={img1}
            alt={"A boy asleep with his head resting on a book at a desk."}
            style={{
              width: "260px",
              height: "auto",
              objectFit: "contain",
              marginTop: "90px",
            }}
          />
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-12 mb-10">
          {/* 1 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">1</span>

              <span><AudioText audio={audio} id={"audio-0"} src={clip14} label={"Hear How many minutes did John have to study at school?"}>How many minutes did John have to study at school?</AudioText></span>
            </div>

            <div className="pl-7">{inputField(0)}</div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">2</span>

              <span><AudioText audio={audio} id={"audio-1"} src={clip15} label={"Hear What mark did John get on his exam?"}>What mark did John get on his exam?</AudioText></span>
            </div>

            <div className="pl-7">{inputField(1)}</div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">3</span>

              <span>What should John do next time before an exam?</span>
            </div>

            <div className="pl-7">{inputField(2)}</div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">4</span>

              <span>How long does it take you to study?</span>
            </div>

            <div className="pl-7">{inputField(3, "Answers will vary")}</div>
          </div>
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

        <button style={{cursor:locked?"not-allowed":"pointer"}} {...activationKeys} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit1_Page7_Q1;
