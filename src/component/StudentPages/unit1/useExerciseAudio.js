import { useCallback, useEffect, useRef, useState } from "react";

// Unit 1 only. Mounted media participate in the existing player's pause coordination.
export function useExerciseAudio() {
  const current = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [error, setError] = useState("");
  const dispose = useCallback(() => {
    const media = current.current;
    current.current = null;
    if (!media) return;
    media.onplaying = media.onpause = media.onended = media.onerror = null;
    media.pause();
    media.remove();
  }, []);
  const stop = useCallback(() => {
    dispose();
    setActiveId(null);
    setError("");
  }, [dispose]);
  const play = useCallback((id, src) => {
    stop();
    if (!src) return;
    document.querySelectorAll("audio, video").forEach(media => media.pause());
    const media = new Audio(src);
    media.hidden = true;
    media.preload = "none";
    current.current = media;
    const finish = (failed = false) => {
      if (current.current !== media) return;
      dispose();
      setActiveId(null);
      if (failed) setError("Audio could not be played. Please try again.");
    };
    media.onplaying = () => {
      if (current.current === media) setActiveId(id);
    };
    media.onpause = media.onended = () => finish();
    media.onerror = () => finish(true);
    document.body.appendChild(media);
    try {
      const pending = media.play();
      pending?.catch(() => finish(true));
    } catch {
      finish(true);
    }
  }, [dispose, stop]);
  useEffect(() => {
    const otherPlay = event => {
      if (event.target !== current.current && event.target?.matches?.("audio, video")) stop();
    };
    document.addEventListener("play", otherPlay, true);
    return () => {
      document.removeEventListener("play", otherPlay, true);
      dispose();
    };
  }, [dispose, stop]);
  return { activeId, error, play, stop };
}

