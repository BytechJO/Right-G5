import { useCallback, useEffect, useRef, useState } from "react";
// Owned Unit 3 recordings; queues share one cancellable playback identity.
export function useExerciseAudio() {
  const current = useRef(null);
  const request = useRef(0);
  const [activeId, setActiveId] = useState(null);
  const [error, setError] = useState("");
  const dispose = useCallback(() => {
    const media = current.current; current.current = null;
    if (!media) return;
    media.onplaying = media.onpause = media.onended = media.onerror = null;
    media.pause(); media.remove();
  }, []);
  const cancel = useCallback(() => { request.current++; dispose(); }, [dispose]);
  const stop = useCallback(() => {
    cancel(); setActiveId(null); setError("");
  }, [cancel]);
  const play = useCallback((id, source) => {
    stop();
    const sources = (Array.isArray(source) ? source : [source]).filter(Boolean);
    if (!sources.length) return;
    const token = request.current;
    document.querySelectorAll("audio, video").forEach(media => media.pause());
    const run = index => {
      if (request.current !== token) return;
      const media = new Audio(sources[index]);
      media.hidden = true; media.preload = "none"; current.current = media;
      const owned = () => request.current === token && current.current === media;
      const finish = failed => {
        if (!owned()) return;
        dispose(); setActiveId(null);
        if (failed) setError("Audio could not be played. Please try again.");
      };
      media.onplaying = () => { if (owned()) setActiveId(id); };
      media.onended = () => {
        if (!owned()) return;
        if (index + 1 < sources.length) { dispose(); run(index + 1); }
        else finish(false);
      };
      media.onpause = () => finish(false);
      media.onerror = () => finish(true);
      document.body.appendChild(media);
      try { media.play()?.catch(() => finish(true)); } catch { finish(true); }
    };
    run(0);
  }, [dispose, stop]);
  useEffect(() => {
    const otherPlay = event => {
      if (event.target !== current.current && event.target?.matches?.("audio, video")) stop();
    };
    document.addEventListener("play", otherPlay, true);
    return () => { document.removeEventListener("play", otherPlay, true); cancel(); };
  }, [cancel, stop]);
  return { activeId, error, play, stop };
}
