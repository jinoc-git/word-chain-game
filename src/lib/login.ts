import ky from 'ky';

import { LOGIN_ROUTE } from '@/constants/apiRoute';

import type { LoginResponse } from '@/app/api/login/route';

export type loginWithSupabaseArgs = {
  nickname: string;
};

export const loginWithSupabase = async (args: loginWithSupabaseArgs) => {
  const res = await ky.post<LoginResponse>(LOGIN_ROUTE, { json: args }).json();

  // if (res.success) setCookie('wcg_user', res.player.id);

  return res;
};
