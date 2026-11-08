import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React from "react";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 6/SVG/Asset 1.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};



const GrammarA = () => {const [examples,setExamples]=React.useState(["Everyone "," anyone "]);const choose=(row,value)=>{setExamples(previous=>previous.map((old,i)=>i===row?(row===0?value[0].toUpperCase()+value.slice(1)+" ":" "+value+" "):old));setAnnouncement("Example "+(row+1)+" changed to "+value);};const audio=useExerciseAudio();const [announcement,setAnnouncement]=React.useState("");

  return (
    <div data-exercise-scope={"Unit8_Page3_GrammarA.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit8_Page3_GrammarA.jsx"] input:focus-visible,[data-exercise-scope="Unit8_Page3_GrammarA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit8_Page3_GrammarA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
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
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              <span className="text-[#12C8F9]">{examples[0]}</span>
              cheered when Hannah made a goal.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span {...activationKeys} onClick={()=>choose(0,"someone")} aria-pressed={examples[0].trim().toLowerCase()==="someone"} aria-label={"Use someone in example 1"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">1</b>someone
              </span>
              <span {...activationKeys} onClick={()=>choose(0,"somebody")} aria-pressed={examples[0].trim().toLowerCase()==="somebody"} aria-label={"Use somebody in example 1"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">2</b>somebody
              </span>
              <span {...activationKeys} onClick={()=>choose(0,"no one")} aria-pressed={examples[0].trim().toLowerCase()==="no one"} aria-label={"Use no one in example 1"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">3</b>no one
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
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              Did you see
              <span className="text-[#12C8F9]">{examples[1]}</span>
              at practice?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span {...activationKeys} onClick={()=>choose(1,"anybody")} aria-pressed={examples[1].trim().toLowerCase()==="anybody"} aria-label={"Use anybody in example 2"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">1</b>anybody
              </span>
              <span {...activationKeys} onClick={()=>choose(1,"something")} aria-pressed={examples[1].trim().toLowerCase()==="something"} aria-label={"Use something in example 2"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">2</b>something
              </span>
              <span {...activationKeys} onClick={()=>choose(1,"everybody")} aria-pressed={examples[1].trim().toLowerCase()==="everybody"} aria-label={"Use everybody in example 2"} data-choice={true} tabIndex={0} role={"button"}>
                <b className="mr-2">3</b>everybody
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
