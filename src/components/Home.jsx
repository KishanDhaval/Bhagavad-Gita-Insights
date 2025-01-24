import React, { useState, useEffect } from "react";
import VerseDisplay from "./VerseDisplay";

function Home() {
  const [verse, setVerse] = useState(null); // To store the fetched verse
  const [loading, setLoading] = useState(false); // To manage the loading state
  const [language, setLanguage] = useState("english"); // Language state (Hindi or English)

  // Fetch Verse of the Day (Persistent for the Day)
  const handleVerseOfTheDay = async () => {
    try {
      setLoading(true);
      const storedDate = localStorage.getItem("verseDate");
      const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)

      // Check if a verse is already stored for today
      if (storedDate === today) {
        const storedVerse = JSON.parse(localStorage.getItem("verseOfTheDay"));
        setVerse(storedVerse);
      } else {
        // Fetch a new verse for the day
        const response = await fetch("https://vedicscriptures.github.io/slok/1/1");
        const data = await response.json();
        setVerse(data);

        // Store the verse and date in localStorage
        localStorage.setItem("verseOfTheDay", JSON.stringify(data));
        localStorage.setItem("verseDate", today);
      }
    } catch (error) {
      console.error("Error fetching Verse of the Day:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a Random Verse
  const handleRandomVerse = async () => {
    try {
      setLoading(true);
      const randomChapter = Math.floor(Math.random() * 18) + 1; // Bhagavad Gita has 18 chapters
      const randomVerse = Math.floor(Math.random() * 20) + 1; // Assuming 20 verses per chapter
      const response = await fetch(
        `https://vedicscriptures.github.io/slok/${randomChapter}/${randomVerse}`
      );
      const data = await response.json();
      setVerse(data);
    } catch (error) {
      console.error("Error fetching Random Verse:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open Settings (Navigate or Modal)
  const handleSettings = () => {
    alert("Settings will be implemented here!");
    // For now, this is just a placeholder. You can navigate to a new page or open a modal here.
  };

  // Change language handler
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="home">
      <h1>Bhagavad Gita</h1>

      {/* Language Selection */}
      <div>
        <label>
          Language: 
          <select onChange={handleLanguageChange} value={language}>
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
          </select>
        </label>
      </div>

      {/* Display the Verse */}
      {loading ? (
        <p>Loading...</p>
      ) : verse ? (
        <VerseDisplay verse={verse} language={language} />
      ) : (
        <p>Select an option to display a verse.</p>
      )}

      {/* Action Buttons */}
      <button onClick={handleVerseOfTheDay}>Verse of the Day</button>
      <button onClick={handleRandomVerse}>Get Random Verse</button>
      <button onClick={handleSettings}>Settings</button>
    </div>
  );
}

export default Home;
