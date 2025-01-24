console.log("Background script running...");

// Example: Set initial data
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ verseOfTheDay: null });
});
