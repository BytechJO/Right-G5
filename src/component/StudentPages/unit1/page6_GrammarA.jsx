import React, { useState } from "react";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 6/SVG/Asset 1.svg";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); }
  },
};


const GrammarA = () => {
 const [examples,setExamples] = useState([["far","walk"],["jump","three meters"]]);
 const [announcement,setAnnouncement] = useState("");
 const choose=(row,words)=>{setExamples(previous=>previous.map((value,index)=>index===row?words:value));setAnnouncement(row===0?`How ${words[0]} can you ${words[1]}?`:`I can ${words[0]} ${words[1]}.`);};
  return (
    <div data-unit1-scope="grammar-a">
<style>{`[data-unit1-scope="grammar-a"] input:focus-visible,[data-unit1-scope="grammar-a"] textarea:focus-visible,[data-unit1-scope="grammar-a"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      {/* العنوان */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* السؤال 1 */}
      <div className="mb-12">
        <div className="flex items-start gap-5">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div >
            <p className="text-[18px]">
              How <span className="text-[#12C8F9]">{examples[0][0]}</span> can you{" "}
              <span className="text-[#12C8F9]">{examples[0][1]}</span>?
            </p>

            <div className="grid grid-cols-3 mt-5 text-[17px] w-[500px]">
              <span role="button" tabIndex={0} data-choice aria-label="Use deep dive in example 1" aria-pressed={examples[0][0]==="deep" && examples[0][1]==="dive"} {...activationKeys} onClick={()=>choose(0,["deep","dive"])}>
                <b>1</b> deep, dive
              </span>
              <span role="button" tabIndex={0} data-choice aria-label="Use low sing in example 1" aria-pressed={examples[0][0]==="low" && examples[0][1]==="sing"} {...activationKeys} onClick={()=>choose(0,["low","sing"])}>
                <b>2</b> low, sing
              </span>
              <span role="button" tabIndex={0} data-choice aria-label="Use high reach in example 1" aria-pressed={examples[0][0]==="high" && examples[0][1]==="reach"} {...activationKeys} onClick={()=>choose(0,["high","reach"])}>
                <b>3</b> high, reach
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
              I can <span className="text-[#12C8F9]">{examples[1][0]}</span>{" "}
              <span className="text-[#12C8F9]">{examples[1][1]}</span>.
            </p>

            <div className="grid grid-cols-3 mt-5 text-[17px] w-[500px]">
              <span role="button" tabIndex={0} data-choice aria-label="Use dive 10 meters in example 2" aria-pressed={examples[1][0]==="dive" && examples[1][1]==="10 meters"} {...activationKeys} onClick={()=>choose(1,["dive","10 meters"])}>
                <b>1</b> dive 10 meters
              </span>
              <span role="button" tabIndex={0} data-choice aria-label="Use sing a low C in example 2" aria-pressed={examples[1][0]==="sing" && examples[1][1]==="a low C"} {...activationKeys} onClick={()=>choose(1,["sing","a low C"])}>
                <b>2</b> sing a low C
              </span>
              <span role="button" tabIndex={0} data-choice aria-label="Use reach two meters in example 2" aria-pressed={examples[1][0]==="reach" && examples[1][1]==="two meters"} {...activationKeys} onClick={()=>choose(1,["reach","two meters"])}>
                <b>3</b> reach two meters
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
