const prefix =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
    ? 'https://localhost:3000'
    : 'https://word-chain-game-mocha.vercel.app';

export const LOGIN_ROUTE = '/api/login';
export const OPENAI_ROUTE = '/api/openai';
export const DICTIONARY_ROUTE = '/api/dictionary';
export const CREATE_ROOM_ROUTE = prefix + '/api/create';
export const JOIN_ROOM_ROUTE = prefix + '/api/join';
