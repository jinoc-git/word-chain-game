import short from 'short-uuid';

export const createRoomId = () => {
  const originCode = short.generate();
  const shortCode = originCode.slice(0, 6).toUpperCase();
  return shortCode;
};
