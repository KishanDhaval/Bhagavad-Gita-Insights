import React from "react";

function VerseDisplay({ verse, language }) {
  if (!verse) return null;

  const renderTranslationAndExplanation = () => {
    if (language === "hindi") {
      return (
        <>
          <p>
            <strong>Translation (Hindi):</strong> {verse.rams.ht}
          </p>
          <p>
            <strong>Explanation (Hindi):</strong> {verse.rams.hc}
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>
            <strong>Translation (English):</strong> {verse.prabhu.et}
          </p>
          <p>
            <strong>Explanation (English):</strong> {verse.prabhu.ec}
          </p>
        </>
      );
    }
  };

  return (
    <div className="verse-container">
      <h2>Chapter {verse.chapter}, Verse {verse.verse}</h2>
      <p>{verse.slok}</p>
      {renderTranslationAndExplanation()}
    </div>
  );
}

export default VerseDisplay;
