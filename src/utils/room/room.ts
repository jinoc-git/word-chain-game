import short from 'short-uuid';

export const createRoomId = () => {
  const originCode = short.generate();
  const shortCode = originCode.slice(0, 6).toUpperCase();
  return shortCode;
};

export const checkRoomCode = (code: string) => {
  const regex = /^[A-Z]{6}$/;
  return regex.test(code);
};
