import ky from 'ky';

export const checkValidWord = async (enterWord: string) => {
  try {
    const encodedWord = encodeURI(enterWord);
    const result = await ky
      .get(window?.location?.origin + `/api/naver?query=${encodedWord}`)
      .json();
    console.log(result);
    return true;
  } catch (error) {
    console.error(error);
  }
};
// HTTP 에러 발생 => naver에서 http 요청을 막음..? localhost도 안되나
