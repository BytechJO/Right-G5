import { useExerciseAudio } from "./useExerciseAudio";
import { AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import bootsSound from "../../../assets/audio/ClassBook/U4/Page 32 - B/Item_001_boots.mp3";
import grocerySound from "../../../assets/audio/ClassBook/U4/Page 32 - B/Item_002_grocery_store.mp3";
import arcadeSound from "../../../assets/audio/ClassBook/U4/Page 32 - B/Item_003_arcade.mp3";
import jeansSound from "../../../assets/audio/ClassBook/U4/Page 32 - B/Item_004_jeans.mp3";
import foodSound from "../../../assets/audio/ClassBook/U4/Page 32 - B/Item_005_food_court.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 32/SVG/Asset 12.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 32/SVG/Asset 13.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 32/SVG/Asset 14.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 32/SVG/Asset 15.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 32/SVG/Asset 16.svg";
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
const Unit4_Page5_Q2 = () => {
  const audio = useExerciseAudio();
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [preview, setPreview] = useState(null);
  const [, refreshGeometry] = useState(0);
  const imageEndpoints = useRef([]),
    textEndpoints = useRef([]),
    focusFrame = useRef(null);
  const imageDescriptions = ["Blue denim trousers.", "A tall dark boot with a buckle.", "Food counters with dishes pictured above them.", "Two people choosing produce in a grocery store.", "A man and children playing an arcade game."];
  const wordSounds = [bootsSound, grocerySound, arcadeSound, jeansSound, foodSound];
  const imageLocked = id => locked || validatedMatches[id] === correct[id];
  const textLocked = id => locked || Object.keys(validatedMatches).some(key => validatedMatches[key] === id && correct[key] === id);
  const cancelFocus = () => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = null;
  };
  const focusEndpoint = (side, id) => {
    cancelFocus();
    focusFrame.current = requestAnimationFrame(() => {
      focusFrame.current = null;
      (side === "image" ? imageEndpoints : textEndpoints).current[id]?.focus({
        preventScroll: true
      });
    });
  };
  const clearSelection = () => {
    cancelFocus();
    setSelectedImg(null);
    setSelectedSentence(null);
    setPreview(null);
  };
  const cancelSelection = () => {
    const side = selectedImg !== null ? "image" : "text",
      id = selectedImg ?? selectedSentence;
    clearSelection();
    setAnnouncement("Connection cancelled.");
    if (id !== null) focusEndpoint(side, id);
  };
  const connect = (imgId, sentId, keyboard) => {
    if (imageLocked(imgId) || textLocked(sentId)) return;
    const affected = Object.keys(matches).filter(key => Number(key) === imgId || matches[key] === sentId);
    setMatches(previous => {
      const next = {
        ...previous
      };
      affected.forEach(key => {
        if (!imageLocked(Number(key))) delete next[key];
      });
      next[imgId] = sentId;
      return next;
    });
    setValidatedMatches(previous => {
      const next = {
        ...previous
      };
      affected.forEach(key => {
        if (!imageLocked(Number(key))) delete next[key];
      });
      return next;
    });
    clearSelection();
    setAnnouncement("Picture " + (imgId + 1) + " connected to " + sentences[sentId].text + ".");
    if (keyboard) {
      const next = sentences.find(item => !textLocked(item.id));
      if (next) focusEndpoint("text", next.id);
    }
  };
  const chooseEndpoint = (side, id, keyboard = false) => {
    cancelFocus();
    if (side === "image") {
      if (imageLocked(id)) return;
      if (selectedSentence !== null) {
        connect(id, selectedSentence, keyboard);
        return;
      }
      if (selectedImg === id) {
        clearSelection();
        setAnnouncement("Connection cancelled.");
        return;
      }
      setSelectedImg(id);
      setSelectedSentence(null);
      setPreview(null);
      setAnnouncement("Picture " + (id + 1) + " selected. Choose its matching word.");
      if (keyboard) {
        const target = sentences.find(item => !textLocked(item.id));
        if (target) focusEndpoint("text", target.id);
      }
    } else {
      if (textLocked(id)) return;
      if (selectedImg !== null) {
        connect(selectedImg, id, keyboard);
        return;
      }
      if (selectedSentence === id) {
        clearSelection();
        setAnnouncement("Connection cancelled.");
        return;
      }
      setSelectedSentence(id);
      setSelectedImg(null);
      setPreview(null);
      setAnnouncement(sentences[id].text + " selected. Choose its matching picture.");
      if (keyboard) {
        const target = images.find(item => !imageLocked(item.id));
        if (target) focusEndpoint("image", target.id);
      }
    }
  };
  const previewEndpoint = (side, id) => {
    if (side === "text" && selectedImg !== null && !textLocked(id) || side === "image" && selectedSentence !== null && !imageLocked(id)) setPreview({
      side,
      id
    });else setPreview(null);
  };
  const endpointKey = (event, side, id) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) cancelSelection();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) {
        if (side === "text") audio.play("word-" + id, wordSounds[id]);
        chooseEndpoint(side, id, true);
      }
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    const available = (side === "image" ? images : sentences).filter(item => !(side === "image" ? imageLocked(item.id) : textLocked(item.id)));
    if (!available.length) return;
    const position = available.findIndex(item => item.id === id),
      step = ["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 1;
    focusEndpoint(side, available[(position + step + available.length) % available.length].id);
  };
  const lineCoordinates = (imgId, sentId) => {
    const img = imageRefs.current[imgId],
      sent = sentenceRefs.current[sentId],
      container = containerRef.current;
    if (!img || !sent || !container) return null;
    const a = img.getBoundingClientRect(),
      b = sent.getBoundingClientRect(),
      c = container.getBoundingClientRect();
    if (!c.width || !c.height) return null;
    const sx = container.clientWidth / c.width,
      sy = container.clientHeight / c.height;
    return {
      x1: (b.left + b.width / 2 - c.left) * sx,
      y1: (b.top + b.height / 2 - c.top) * sy,
      x2: (a.left + a.width / 2 - c.left) * sx,
      y2: (a.top + a.height / 2 - c.top) * sy
    };
  };
  React.useEffect(() => {
    const refresh = () => refreshGeometry(value => value + 1);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(refresh) : null;
    if (containerRef.current) observer?.observe(containerRef.current);
    window.addEventListener("resize", refresh);
    window.addEventListener("scroll", refresh, true);
    refresh();
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", refresh, true);
      cancelFocus();
    };
  }, []);
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);
  const [validatedMatches, setValidatedMatches] = useState({});
  const imageRefs = useRef([]);
  const sentenceRefs = useRef([]);
  const containerRef = useRef(null);
  const images = [{
    id: 0,
    img: img1
  }, {
    id: 1,
    img: img2
  }, {
    id: 2,
    img: img3
  }, {
    id: 3,
    img: img4
  }, {
    id: 4,
    img: img5
  }];
  const sentences = [{
    id: 0,
    text: "boots"
  }, {
    id: 1,
    text: "grocery store"
  }, {
    id: 2,
    text: "arcade"
  }, {
    id: 3,
    text: "jeans"
  }, {
    id: 4,
    text: "food court"
  }];
  const correct = {
    0: 3,
    1: 0,
    2: 4,
    3: 1,
    4: 2
  };
  const checkAnswers = () => {
    if (locked) return;
    clearSelection();
    audio.stop();
    if (Object.keys(matches).length !== images.length) {
      setAnnouncement(String("Please match all.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please match all.");
      return;
    }
    let correctCount = 0;
    Object.entries(matches).forEach(([imgId, sentId]) => {
      if (correct[imgId] === sentId) correctCount++;
    });
    const total = images.length;
    const message = `
        Score: ${correctCount} / ${total}
  `;
    if (correctCount === total) {
      resetButtonRef.current?.focus({
        preventScroll: true
      });
      setLocked(true);
      setAnnouncement(String(message).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.success(message);
    } else if (correctCount === 0) {
      setAnnouncement(String(message).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.error(message);
    } else {
      setAnnouncement(String(message).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.warning(message);
    }
    setValidatedMatches(matches);
    setShowResult(true);
  };
  const showAnswers = () => {
    clearSelection();
    audio.stop();
    setMatches({
      ...correct
    });
    setValidatedMatches({
      ...correct
    });
    setLocked(true);
    setShowResult(true);
    setAnnouncement("All correct connections shown and locked.");
  };
  const reset = () => {
    clearSelection();
    audio.stop();
    setValidatedMatches({});
    setMatches({});
    setShowResult(false);
    setLocked(false);
    setAnnouncement("All connections and feedback cleared.");
  };
  return <div data-exercise-scope="Unit4_Page5_Q2.jsx" ref={containerRef} style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    position: "relative"
  }}><style>{`[data-exercise-scope="Unit4_Page5_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit4_Page5_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit4_Page5_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><AudioFeedback audio={audio} /><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall">
        <ExerciseHeader sectionLetter="B" title={<>
          
          Read, look, and match.
        </>} subTitle="Start with one item, find the matching partner, then connect the pair before moving to the next one." />

        <div className="w-full flex flex-col items-center gap-50">
          {/* 🔥 الصور فوق */}
          <div className="grid grid-cols-5 w-full">
            {images.map((img, i) => <div style={{
            borderRadius: 12,
            ...(imageLocked(i) ? {
              boxShadow: "0 0 0 3px #16a34a"
            } : selectedImg === i ? {
              boxShadow: "0 0 0 3px #2563eb",
              backgroundColor: "#dbeafe"
            } : {})
          }} onMouseLeave={() => setPreview(null)} onMouseEnter={() => previewEndpoint("image", i)} onFocus={() => previewEndpoint("image", i)} onKeyUp={activationKeys.onKeyUp} onKeyDown={event => endpointKey(event, "image", i)} aria-disabled={imageLocked(i)} aria-pressed={selectedImg === i} aria-label={`Picture ${i + 1}: ${imageDescriptions[i]} ${imageLocked(i) ? "Correct and locked." : "Matching endpoint."}`} ref={imageEndpoints.current ? el => {
            imageEndpoints.current[i] = el;
          } : null} data-choice={true} tabIndex={selectedSentence !== null ? 0 : selectedImg !== null ? -1 : 0} role={"button"} key={i} onClick={event => {
            chooseEndpoint("image", i, event.detail === 0);
          }} className="relative flex flex-col items-center cursor-pointer transition">
                <img onLoad={() => refreshGeometry(value => value + 1)} alt={imageDescriptions[i]} src={img.img} style={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
              border: selectedImg === i ? "3px solid #6d2980" : "3px solid transparent",
              borderRadius: "12px",
              padding: "4px",
              backgroundColor: selectedImg === i ? "#6d2980" : "transparent"
            }} />
                {showResult && validatedMatches[i] !== undefined && correct[i] !== validatedMatches[i] && <span style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "20px",
              height: "20px",
              background: "#ef4444",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
              border: "2px solid white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              zIndex: 5
            }}>
                      ✕
                    </span>}
                <div ref={el => imageRefs.current[i] = el} className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition z-10" style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#00AEEF",
              transform: selectedImg === i ? "translate(-50%, -50%) scale(1.4)" : "translate(-50%, -50%)"
            }}></div>
              </div>)}
          </div>

          {/* 🔥 الجمل تحت */}
          <div className="grid grid-cols-5 w-full mb-15">
            {sentences.map((sent, i) => <div style={{
            borderRadius: 12,
            ...(textLocked(i) ? {
              boxShadow: "0 0 0 3px #16a34a"
            } : selectedSentence === i ? {
              boxShadow: "0 0 0 3px #2563eb",
              backgroundColor: "#dbeafe"
            } : {})
          }} onMouseLeave={() => setPreview(null)} onMouseEnter={() => previewEndpoint("text", i)} onFocus={() => previewEndpoint("text", i)} onKeyUp={activationKeys.onKeyUp} onKeyDown={event => endpointKey(event, "text", i)} aria-disabled={textLocked(i)} aria-pressed={selectedSentence === i} aria-label={sent.text + ". " + (textLocked(i) ? "Correct and locked." : "Matching endpoint.")} ref={textEndpoints.current ? el => {
            textEndpoints.current[i] = el;
          } : null} data-choice={true} tabIndex={selectedImg !== null ? 0 : selectedSentence !== null ? -1 : 0} role={"button"} key={i} onClick={event => {
            audio.play("word-" + i, wordSounds[i]);
            chooseEndpoint("text", i, event.detail === 0);
          }} className="relative flex flex-col items-center cursor-pointer ">
                {/* 🔥 الدوت */}
                <div ref={el => sentenceRefs.current[i] = el} // 🔥 هون كمان
            className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full z-10 transition" style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#00AEEF"
            }}></div>

                {/* 🔥 البوكس */}
                <div style={{
              ...(audio.activeId === "word-" + i ? {
                boxShadow: "0 0 0 3px #2563eb",
                backgroundColor: "#dbeafe"
              } : {})
            }} className="relative px-4 py-2 rounded-2xl text-sm text-center transition text-[20px]">
                  <span className="font-bold mr-3">{i + 1}</span>
                  {sent.text}{audio.activeId === "word-" + i && <AudioSpeaker />}
                </div>
              </div>)}
          </div>
        </div>
      </div>

      <svg focusable={"false"} aria-hidden={true} className="absolute top-0 left-0 w-full h-full pointer-events-none">{Object.entries(matches).map(([imgId, sentId]) => {
        const coordinates = lineCoordinates(imgId, sentId);
        return coordinates && <line key={imgId} {...coordinates} stroke={validatedMatches[imgId] === correct[imgId] ? "#16a34a" : validatedMatches[imgId] !== undefined ? "#ef4444" : "#6d2980"} strokeWidth="2.5" strokeLinecap="round" />;
      })}{preview && (() => {
        const imgId = selectedImg ?? preview.id,
          sentId = selectedSentence ?? preview.id,
          coordinates = lineCoordinates(imgId, sentId);
        return coordinates && <line {...coordinates} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="7 5" strokeLinecap="round" />;
      })()}</svg>

      <div className="action-buttons-container">
        <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button {...activationKeys} aria-label={"Show Answer"} type={"button"} onClick={showAnswers} className="show-answer-btn">
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
export default Unit4_Page5_Q2;
