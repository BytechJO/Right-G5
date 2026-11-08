import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React from "react";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 6/SVG/Asset 1.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};



const GrammarA = () => {const [examples,setExamples]=React.useState(["she was "," you were diving in the water "]);const choices=[["I was","you were","we were happy"],["Mary was getting on the horse","I was running a race","the team was winning the game English well"]];const choose=(row,col)=>{setExamples(previous=>previous.map((v,i)=>i===row?choices[row][col]+" ":v));setAnnouncement("Example "+(row+1)+" changed to "+choices[row][col]);};const audio=useExerciseAudio();const [announcement,setAnnouncement]=React.useState("");

  return (
    <div data-exercise-scope={"Unit10_Page3_GrammarA.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit10_Page3_GrammarA.jsx"] input:focus-visible,[data-exercise-scope="Unit10_Page3_GrammarA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit10_Page3_GrammarA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* العنوان */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read ">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* السؤال 1 */}
      <div className="mb-12">
        <div className="flex items-start gap-5 mt-7">
          <img
            src={img}
            alt={""}
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              While it rained, <span className="text-[#12C8F9]">{examples[0]}</span>
              jumping in the puddles.
            </p>

            <div className="flex flex-wrap gap-15 mt-5 text-[17px]">
              <span style={{borderRadius:6}} {...activationKeys} onClick={()=>choose(0,0)} aria-pressed={examples[0].trim()===choices[0][0]} aria-label={"Use I was in example 1"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">1</b>I was
              </span>
              <span style={{borderRadius:6}} {...activationKeys} onClick={()=>choose(0,1)} aria-pressed={examples[0].trim()===choices[0][1]} aria-label={"Use you were in example 1"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">2</b>you were
              </span>
              <span style={{borderRadius:6}} {...activationKeys} onClick={()=>choose(0,2)} aria-pressed={examples[0].trim()===choices[0][2]} aria-label={"Use we were happy in example 1"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">3</b>we were happy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* السؤال 2 */}
      <div>
        <div className="flex items-start gap-5 mt-7">
          <img
            src={img}
            alt={""}
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              We took a picture when{" "}
              <span className="text-[#12C8F9]">{examples[1]}</span>
              .
            </p>

            <div className="flex flex-wrap gap-10 mt-5 text-[17px]">
              <span style={{borderRadius:6}} {...activationKeys} onClick={()=>choose(1,0)} aria-pressed={examples[1].trim()===choices[1][0]} aria-label={"Use Mary was getting on the horse in example 2"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">1</b>Mary was getting on the horse
              </span>
              <span style={{borderRadius:6}} {...activationKeys} onClick={()=>choose(1,1)} aria-pressed={examples[1].trim()===choices[1][1]} aria-label={"Use I was running a race in example 2"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">2</b>I was running a race
              </span>
              <span style={{borderRadius:6}} {...activationKeys} onClick={()=>choose(1,2)} aria-pressed={examples[1].trim()===choices[1][2]} aria-label={"Use the team was winning the game English well in example 2"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">3</b>the team was winning the game English
                well
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
