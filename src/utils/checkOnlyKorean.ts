const checkOnlyKorean = (text: string) => {
  const koreaRegex = /^[가-힣]+$/;
  return koreaRegex.test(text);
};

export default checkOnlyKorean;
