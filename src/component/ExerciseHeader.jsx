import React, { useEffect, useState } from "react";
import SquirrelGif from "../assets/Squirrel_1164_1433px.gif";

const ExerciseHeader = ({
  sectionLetter,
  questionNumber,
  title,
  subTitle,
  isWorkbook = false,
  showSquirrel = true,
  isReview = false,
}) => {
  const [gifSrc, setGifSrc] = useState(SquirrelGif);

  useEffect(() => {
    setGifSrc(`${SquirrelGif}?restart=${Date.now()}`);
  }, [sectionLetter, questionNumber, title, subTitle]);

  // الكلاس بيتضاف فقط لما isReview = true
  const reviewClass = isReview ? " is-review" : "";

  return (
    <div
      className="header-title-page8"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        ...(isWorkbook ? { color: "#6d2980" } : {}),
      }}
    >
      {showSquirrel && (
        <img
          src={gifSrc}
          alt="An animated squirrel"
          style={{
            height: "100px",
            width: "auto",
            objectFit: "contain",
            flexShrink: 0,
          }}
        />
      )}

      <div
        className="header-title-page8"
        style={{
          display: "grid",
          gridTemplateColumns: `
            ${sectionLetter ? "auto" : ""}
            ${questionNumber ? "auto" : ""}
            1fr
          `,
          columnGap: "8px",
          rowGap: "8px",
          alignItems: "start",
          ...(isWorkbook ? { color: "#6d2980" } : {}),
        }}
      >
        {sectionLetter && (
          <span
            className={`ex-A${reviewClass}`}
            style={
              isReview
                ? {
                    backgroundColor: "white",
                    color: "#6d2980",
                  }
                : isWorkbook
                  ? {
                      backgroundColor: "#a785b2",
                      color: "white",
                    }
                  : undefined
            }
          >
            {sectionLetter}
          </span>
        )}

        {questionNumber && (
          <span
            className={`number-of-q${reviewClass}`}
            style={isWorkbook ? { color: "#6d2980" } : undefined}
          >
            {questionNumber}
          </span>
        )}

        <header
          className={`header-title-page8${reviewClass}`}
          style={{ margin: 0, ...(isWorkbook ? { color: "#6d2980" } : {}) }}
        >
          {title}
        </header>

        {subTitle && (
          <p
            className="sub-header"
            style={{
              gridColumn: "-2 / -1",
              margin: 0,
              fontSize: "22px",
              fontWeight: "600",
              ...(isWorkbook ? { color: "#6d2980" } : {}),
            }}
          >
            {subTitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExerciseHeader;
