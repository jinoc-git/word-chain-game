const prefix =
  process.env.NODE_ENV === 'development'
    ? 'https://localhost:3000'
    : 'https://word-chain-game-mocha.vercel.app';

export const LOGIN_ROUTE = prefix + '/api/login';
export const OPENAI_ROUTE = prefix + '/api/openai';
export const DICTIONARY_ROUTE = prefix + '/api/dictionary';
export const CREATE_ROOM_ROUTE = prefix + '/api/create';
