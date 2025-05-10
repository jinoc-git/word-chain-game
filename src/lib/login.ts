import ky from 'ky';

import { LOGIN_ROUTE } from '@/constants/apiRoute';

import type { LoginResponse } from '@/app/api/login/route';

export const loginWithSupabase = async (nickname: string) => {
  const res = await ky.post<LoginResponse>(LOGIN_ROUTE, { json: { nickname } }).json();

  return res;
};
