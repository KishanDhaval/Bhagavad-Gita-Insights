import React, { useState } from "react";

function VerseDisplay({ verse, language }) {
  if (!verse) return null;

  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false); // State to toggle explanation visibility

  const renderTranslationAndExplanation = () => {
    if (currentLanguage === "hindi") {
      return (
        <>
          <p>
            <strong>Translation (Hindi):</strong> {verse.rams.ht}
          </p>
          {isExplanationVisible && (
            <p className="explainationP">
              <strong>Explanation (Hindi):</strong> {verse.rams.hc}
            </p>
          )}
        </>
      );
    } else {
      return (
        <>
          <p>
            <strong>Translation (English):</strong> {verse.prabhu.et}
          </p>
          {isExplanationVisible && (
            <p className="explainationP">
              <strong>Explanation (English):</strong> {verse.prabhu.ec}
            </p>
          )}
        </>
      );
    }
  };

  return (
    <div className="verse-container">
      <h2>
        Chapter {verse.chapter}, Verse {verse.verse}
      </h2>
      <p>
        {verse.slok.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>

      <div className="LanguageToggleBtn">
        <select
          onChange={(e) => setCurrentLanguage(e.target.value)}
          value={currentLanguage}
        >
          <option value="hindi">Hindi</option>
          <option value="english">English</option>
        </select>
      </div>

      {renderTranslationAndExplanation()}

      {/* Button to toggle the visibility of the explanation */}
      <button
        className="explainationBtn"
        onClick={() => setIsExplanationVisible(!isExplanationVisible)}
      >
        {isExplanationVisible ? "Hide Explanation" : "Show Explanation"}
      </button>
    </div>
  );
}

export default VerseDisplay;
