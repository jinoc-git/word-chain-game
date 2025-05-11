import { INIT_WORDS } from '@/constants/initWords';

export const getRandomFirstWord = () => {
  const randomIdx = Math.floor(Math.random() * 14);

  return INIT_WORDS[randomIdx];
};
