import React from "react";
import { AudioSpeaker } from "./ExerciseAudioText";
// Each supplied recording is independent; no invented clipping or timestamps.
export function PassageAudio({
  audio,
  id,
  text,
  sources,
  starts
}) {
  const offsets = starts.map(prefix => text.indexOf(prefix));
  return <>{sources.map((src, index) => {
      const segmentId = id + "-" + index,
        part = text.slice(offsets[index], offsets[index + 1] ?? text.length),
        playing = audio.activeId === segmentId;
      const keys = event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "keydown" && !event.repeat) audio.play(segmentId, src);
      };
      return <span key={segmentId} role="button" tabIndex={0} data-choice data-sentence-audio={segmentId} aria-label={"Hear: " + part.trim()} onClick={event => {
        event.stopPropagation();
        audio.play(segmentId, src);
      }} onKeyDown={keys} onKeyUp={keys} style={{
        position: "relative",
        borderRadius: 6,
        cursor: "pointer",
        ...(playing ? {
          boxShadow: "0 0 0 3px #2563eb",
          backgroundColor: "#dbeafe"
        } : {})
      }}>{part}{playing && <AudioSpeaker />}</span>;
    })}</>;
}
