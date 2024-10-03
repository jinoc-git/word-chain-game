export const checkFirstCharacter = (before: string, now: string) => {
  const needCharacter = before.slice(-1);
  const firstCharacter = now.slice(0, 1);

  if (needCharacter === firstCharacter) return true;
  else return false;
};
