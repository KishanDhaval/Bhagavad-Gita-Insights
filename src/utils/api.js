import axios from "axios";

const BASE_URL = "https://vedicscriptures.github.io/slok";

export const getChapterVerse = async (chapter, verse) => {
  const response = await axios.get(`${BASE_URL}/${chapter}/${verse}`);
  return response.data;
};

export const getChapters = async () => {
  const response = await axios.get(`${BASE_URL}/chapters`);
  return response.data;
};
