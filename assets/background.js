console.log("Background script running...");chrome.runtime.onInstalled.addListener(()=>{chrome.storage.local.set({verseOfTheDay:null})});
