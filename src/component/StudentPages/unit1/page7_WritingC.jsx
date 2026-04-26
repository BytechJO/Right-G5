import React, { useState, useEffect } from "react";

const WritingC = ({ resetTrigger }) => {
  const [text, setText] = useState("");

  // 🔄 reset
  useEffect(() => {
    if (resetTrigger) {
      setText("");
    }
  }, [resetTrigger]);

  return (
    <div>
      <h5 className="header-title-page8-read pb-2.5">
        <span className="ex-A-read" style={{ marginRight: "10px" }}>
          C
        </span>
        In your notebook, write a paragraph about your topic.
      </h5>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-[120px] border border-gray-300 p-2 mt-3 outline-none"
        placeholder="Write your paragraph here..."
      />
    </div>
  );
};

export default WritingC;
