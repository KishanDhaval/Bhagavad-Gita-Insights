import React, { useState } from "react";
import { saveToLocalStorage } from "../utils/storage";

function Settings() {
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");

  const handleSave = () => {
    saveToLocalStorage("startChapter", chapter);
    saveToLocalStorage("startVerse", verse);
    alert("Settings saved!");
  };

  return (
    <div>
      <h2>Settings</h2>
      <input
        type="number"
        placeholder="Starting Chapter"
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
      />
      <input
        type="number"
        placeholder="Starting Verse"
        value={verse}
        onChange={(e) => setVerse(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Settings;
