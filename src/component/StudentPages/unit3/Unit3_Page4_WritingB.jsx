import React from "react";

const WritingB = () => {
  return (
    <div className="space-y-4 w-full max-w-[900px] mx-auto">
      {/* العنوان */}
      <div className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">B</span>
        <div style={{ display: "block" }}>
          Introduce a friend to one of your parents. Tell about how they look,
          what they are
          <div style={{ marginTop: "4px" }}>
            good at, and what they are like as a person. Use{" "}
            <span className="text-[#00AEEF]">he is</span> and{" "}
            <span className="text-[#00AEEF]">she is</span>. Use the example
          </div>
          <div style={{ marginTop: "4px" }}>below to get started.</div>
        </div>
      </div>

      {/* DIALOG */}
      <div className="flex flex-col gap-8 text-[18px] mt-8 ml-12">
        <div>
          <span className="text-[#00AEEF] font-semibold mr-2">You:</span>
          Mom, can one of my friends come over today?
        </div>

        <div>
          <span className="text-[#00AEEF] font-semibold mr-2">Parent:</span>
          Sure, honey. Who is it?
        </div>

        <div>
          <span className="text-[#00AEEF] font-semibold mr-2">You:</span>
          You haven’t met (him/her) yet. (She/He)’s new at school and loves to
          play soccer.
        </div>

        <div>
          <span className="text-[#00AEEF] font-semibold mr-2">Parent:</span>
          How nice. You two should have fun playing soccer.
        </div>
      </div>
    </div>
  );
};

export default WritingB;
