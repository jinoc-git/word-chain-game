import ky from 'ky';

export const postWordToAIAndGetNextWord = async (lastWord: string) => {
  try {
    const res = await ky
      .post(window?.location?.origin + `/api/openai`, {
        json: { word: lastWord },
      })
      .json();

    return res;
  } catch (error) {
    console.error(error);
  }
};
