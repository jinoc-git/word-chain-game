import type { UserType } from '@/types/auth.type';

export const isUserType = (obj: any): obj is UserType => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.keys(obj).length === 2 &&
    'nickname' in obj &&
    typeof obj.name === 'string' &&
    'id' in obj &&
    typeof obj.age === 'string'
  );
};
