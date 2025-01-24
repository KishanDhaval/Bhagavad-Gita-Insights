export const saveToLocalStorage = (key, value) => {
    chrome.storage.local.set({ [key]: value });
  };
  
  export const getFromLocalStorage = (key) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => resolve(result[key]));
    });
  };
  