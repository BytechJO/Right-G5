import { FaRedo,FaArrowUp } from "react-icons/fa";
const Unit5_Page2_ComprehensionB = ({
  enableUnderline,
  handleResetUnderline,
  readingRef,
}) => {
  // 🔄 reset
  const handleReset = () => {
    if (readingRef.current) {
      const underlined =
        readingRef.current.querySelectorAll(".custom-underline");

      underlined.forEach((span) => {
        const parent = span.parentNode;

        while (span.firstChild) {
          parent.insertBefore(span.firstChild, span);
        }

        parent.removeChild(span);
      });
    }

    handleResetUnderline();
  };
  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read  mb-5">
        <span className="ex-A-read" style={{ marginRight: "10px" }}>
          B
        </span>
        Underline other words or phrases in the conversation that help make it
        polite.
      </h5>
      <div className="relative group">
        <div
          onClick={enableUnderline}
          className="mx-auto flex items-center justify-center w-14 h-14 rounded-xl bg-[#B497BD] hover:bg-[#a284ab] cursor-pointer transition shadow-sm"
        >
          <FaArrowUp className="text-white text-xl" />
        </div>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Go to Reading
        </span>
      </div>
      <div className="flex justify-center gap-6 mt-8">
        {/* Reset */}
        <div className="relative group">
          <div
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unit5_Page2_ComprehensionB;
