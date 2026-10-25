import { cloneElement, isValidElement, useMemo, useState } from "react";

const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, "");

export const readingText = (node) => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(readingText).join("");
  if (isValidElement(node)) return node.type === "br" ? "\n" : readingText(node.props.children);
  return "";
};

export const createNarrationIndex = (data) => {
  let offset = 0;
  const words = (data?.segments || []).flatMap((segment) => segment.words || [])
    .filter((word) => word.text.trim() && Number.isFinite(word.start_time) &&
      Number.isFinite(word.end_time) && word.end_time >= word.start_time)
    .map((word) => {
      const normalized = normalize(word.text);
      const entry = { ...word, normalized, from: offset, to: offset + normalized.length };
      offset = entry.to;
      return entry;
    }).filter((word) => word.normalized);
  return { words, text: words.map((word) => word.normalized).join("") };
};

// Aliases align only the user-approved printed/transcript differences. Never edit text.
export const createReadingTrack = (node, narration, from = 0, aliases = []) => {
  const text = readingText(node);
  const tokens = [...text.matchAll(/\S+/g)].map((match) => ({
    text: match[0], from: match.index, to: match.index + match[0].length,
    normalized: normalize(match[0]),
  }));
  for (const { printed, spoken, whole = false } of aliases) {
    if (whole && tokens.length !== printed.length) continue;
    for (let i = 0; i <= tokens.length - printed.length; i += 1) {
      if (printed.every((word, j) => tokens[i + j].normalized === normalize(word))) {
        printed.forEach((_, j) => { tokens[i + j].normalized = normalize(spoken[j]); });
      }
    }
  }
  const sentences = [];
  const unmatched = [];
  let cursor = from;
  let first = 0;
  tokens.forEach((token, last) => {
    if (!/[.!?][\u201d\u2019"')]*$/.test(token.text) && last !== tokens.length - 1) return;
    const parts = tokens.slice(first, last + 1);
    first = last + 1;
    const needle = parts.map((part) => part.normalized).join("");
    if (!needle) return;
    let found = narration.text.indexOf(needle, cursor);
    while (found !== -1 && (!narration.words.some((word) => word.from === found) ||
      !narration.words.some((word) => word.to === found + needle.length))) {
      found = narration.text.indexOf(needle, found + 1);
    }
    if (found === -1) { unmatched.push(text.slice(parts[0].from, token.to)); return; }
    let position = found;
    const mapped = parts.map((part) => {
      const begin = position;
      position += part.normalized.length;
      // An extra printed article uses the preceding verified word's timing.
      const overlaps = narration.words.filter((word) => part.normalized.length
        ? word.from < position && word.to > begin
        : word.from < begin && word.to >= begin);
      return { ...part, start: overlaps[0]?.start_time, end: overlaps.at(-1)?.end_time };
    });
    const timed = mapped.filter((part) => part.start !== undefined);
    if (timed.length) {
      sentences.push({ start: timed[0].start, end: timed.at(-1).end, words: mapped });
      cursor = found + needle.length;
    }
  });
  return { node, text, sentences, next: cursor, unmatched };
};

// Slice the existing React content without discarding underlines, colors or line breaks.
const sliceContent = (node, from, to) => {
  if (from >= to || node == null || typeof node === "boolean") return null;
  if (typeof node === "string" || typeof node === "number") return String(node).slice(from, to);
  if (Array.isArray(node)) {
    let offset = 0;
    return node.map((child, index) => {
      const size = readingText(child).length;
      const result = sliceContent(child, Math.max(0, from - offset), Math.min(size, to - offset));
      offset += size;
      return isValidElement(result) ? cloneElement(result, { key: child.key ?? index }) : result;
    });
  }
  if (isValidElement(node)) {
    if (node.type === "br") return from === 0 && to > 0 ? node : null;
    return cloneElement(node, {}, sliceContent(node.props.children, from, to));
  }
  return null;
};

export const renderReadingTrack = (track, time) => {
  const sentence = time == null ? null : track.sentences.find(({ start, end }) =>
    time >= start && time < end);
  const readWords = sentence?.words.filter((word) => word.start !== undefined && time >= word.start);
  if (!readWords?.length) return track.node;
  const first = readWords[0].from;
  const last = readWords.at(-1).to;
  return (
    <>
      {sliceContent(track.node, 0, first)}
      <span style={{ backgroundColor: "#892EA3", color: "#fff", borderRadius: "4px" }}>
        {sliceContent(track.node, first, last)}
      </span>
      {sliceContent(track.node, last, track.text.length)}
    </>
  );
};

export const useReadingHighlight = (wordTimings, aliases = [], enabled = true) => {
  const [position, setPosition] = useState(null);
  const narration = useMemo(() => createNarrationIndex(wordTimings), [wordTimings]);
  const currentTime = position && position.source === wordTimings ? position.time : null;
  let cursor = 0;
  const highlight = (node) => {
    if (!wordTimings || !enabled) return node;
    const track = createReadingTrack(node, narration, cursor, aliases);
    cursor = track.next;
    return renderReadingTrack(track, currentTime);
  };
  const onTimeUpdate = (time) => {
    if (wordTimings && enabled && Number.isFinite(time)) setPosition({ source: wordTimings, time });
  };
  return { highlight, onTimeUpdate };
};


