export interface UserType {
  id: string;
  nickname: string;
}

export interface AuthContextType {
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => void;
}
