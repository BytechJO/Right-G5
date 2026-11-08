import React from "react";
import { FaVolumeUp } from "react-icons/fa";

export function AudioText({ audio, id, src, label, children, tabIndex = 0 }) {
  const playing = audio.activeId === id;
  const keys = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return (
    <span
      role="button"
      tabIndex={tabIndex}
      data-choice
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        audio.play(id, src);
      }}
      onKeyDown={keys}
      onKeyUp={keys}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: 6,
        boxShadow: playing ? "0 0 0 3px #2563eb" : undefined,
        backgroundColor: playing ? "#dbeafe" : undefined,
      }}
    >
      {children}
      {playing && <AudioSpeaker />}
    </span>
  );
}

export function AudioFeedback({ audio }) {
  return (
    <span className="sr-only" role="status" aria-live="polite">
      {audio.error}
    </span>
  );
}

export function AudioSpeaker() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        top: -10,
        right: -10,
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "white",
        color: "black",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,.25)",
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      <FaVolumeUp size={12} />
    </span>
  );
}
