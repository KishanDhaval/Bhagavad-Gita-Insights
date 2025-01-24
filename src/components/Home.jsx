import React, { useState, useEffect } from "react";
import VerseDisplay from "./VerseDisplay";

function Home() {
  const [verse, setVerse] = useState(null); // To store the fetched verse
  const [loading, setLoading] = useState(false); // To manage the loading state
  const [activeTab, setActiveTab] = useState("verseOfTheDay"); // Active tab (Verse of the Day, Random Verse, Settings)
  const [language, setLanguage] = useState("hindi"); // Language state (Hindi or English)
  const [chapter, setChapter] = useState(""); // Chapter input state
  const [slok, setSlok] = useState(""); // Slok input state

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

  // Handle Tab Switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Reset verse state when switching tabs
    setVerse(null);

    // Fetch the relevant verse when tab is switched
    if (tab === "randomVerse") {
      handleRandomVerse(); // Fetch the random verse only when this tab is selected
    } else if (tab === "verseOfTheDay") {
      handleVerseOfTheDay(); // Fetch the verse of the day when this tab is selected
    }
  };

  // Handle settings form submission (to set custom Verse of the Day)
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!chapter || !slok) {
        alert("Please enter both chapter and verse.");
        return;
      }
      setLoading(true);
      // Fetch the custom verse based on the user's input
      const response = await fetch(
        `https://vedicscriptures.github.io/slok/${chapter}/${slok}`
      );
      const data = await response.json();
      setVerse(data);

      // Store the custom verse and update Verse of the Day
      localStorage.setItem("verseOfTheDay", JSON.stringify(data));
      localStorage.setItem("verseDate", new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Error fetching custom verse:", error);
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch Verse of the Day on component mount
  useEffect(() => {
    handleVerseOfTheDay();
  }, []); // Empty dependency array means this will only run once when the component mounts

  return (
    <div className="home">
      <h1>Bhagavad Gita Insights</h1>

      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "verseOfTheDay" ? "active" : ""}`}
          onClick={() => handleTabChange("verseOfTheDay")}
        >
          Verse of the Day
        </button>
        <button
          className={`tab-button ${activeTab === "randomVerse" ? "active" : ""}`}
          onClick={() => handleTabChange("randomVerse")}
        >
          Random Verse
        </button>
        <button
          className={`tab-button ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => handleTabChange("settings")}
        >
          Settings
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "verseOfTheDay" && (
        <div className="tab-content">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : verse ? (
            <VerseDisplay verse={verse} language={language} />
          ) : (
            <p>Select an option to display a verse.</p>
          )}
          {!verse && (
            <button onClick={handleVerseOfTheDay}>Get Verse of the Day</button>
          )}
        </div>
      )}

      {activeTab === "randomVerse" && (
        <div className="tab-content">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : verse ? (
            <VerseDisplay verse={verse} language={language} />
          ) : (
            <p>Select an option to display a verse.</p>
          )}
          {!verse && !loading && (
            <button onClick={handleRandomVerse}>Get Random Verse</button>
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="tab-content">
          <h1>Start from a Verse of Your Choice</h1>
          <form className="setting-form" onSubmit={handleSettingsSubmit}>
            <div>
              <input
                type="number"
                id="chapter"
                value={chapter}
                placeholder="chepter, eg : 1"
                onChange={(e) => setChapter(e.target.value)}
                min="1"
                max="18"
                required
              />
            </div>
            <div>
             <input
                type="number"
                id="slok"
                value={slok}
                placeholder="slock, eg : 1"
                onChange={(e) => setSlok(e.target.value)}
                min="1"
                max="20"
                required
              />
            </div>
            <button type="submit">Set Verse</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;
