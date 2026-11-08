import React from "react";
import { AudioSpeaker } from "./ExerciseAudioText";

// Only Unit 2 and Review 1–2 use these sentence-level listening controls.
export function SentenceGroup({ audio, id, src, label, children, tabIndex = 0, style, ...props }) {
  const playing = audio.activeId === id;
  const keys = (event) => {
    if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return (
    <div {...props} role="group" aria-roledescription="sentence audio" aria-label={label}
      aria-keyshortcuts="Enter Space" tabIndex={tabIndex} data-choice data-sentence-audio={id}
      onKeyDown={keys} onKeyUp={keys}
      onClick={(event) => {
        const control = event.target.closest?.('input, textarea, select, button, a, [role="button"], [data-choice]');
        if (control && control !== event.currentTarget) return;
        event.stopPropagation();
        audio.play(id, src);
      }}
      style={{ ...style, position: style?.position || "relative", borderRadius: style?.borderRadius || 6,
        boxShadow: playing ? "0 0 0 3px #2563eb" : style?.boxShadow,
        backgroundColor: playing ? "#dbeafe" : style?.backgroundColor }}>
      {children}
      {playing && <AudioSpeaker />}
    </div>
  );
}

// A sentence may cross the story's fixed visual lines. Only its first part is
// a Tab stop; every part shares one playback identity and highlights together.
export function SentencePart({ audio, id, src, label, children, first = false, tabIndex = 0 }) {
  const playing = audio.activeId === id;
  const keys = (event) => {
    if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault(); event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return <span role={first ? "button" : undefined} tabIndex={first ? tabIndex : undefined}
    aria-label={first ? label : undefined} data-choice={first ? true : undefined}
    data-sentence-part={id} onKeyDown={first ? keys : undefined} onKeyUp={first ? keys : undefined}
    onClick={(event) => { event.stopPropagation(); audio.play(id, src); }}
    style={{position:"relative",cursor:"pointer",borderRadius:6,
      boxShadow:playing?"0 0 0 3px #2563eb":undefined,backgroundColor:playing?"#dbeafe":undefined}}>
    {children}{first && playing && <AudioSpeaker />}
  </span>;
}
