import { create } from 'zustand';
import { Tables } from '../database.types';
import { persist } from 'zustand/middleware';

export type User = Tables<'Users'>;
export type UserStore = {
  userInfo: User;
  login: (userInfo: User) => void;
  logout: () => void;
};

export const defaultState = { id: '', nickname: '', email: '', created_at: '' };

// zustand 스토어 생성
export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      // user 초기값
      userInfo: defaultState,

      // 로그인 시 user 정보 저장
      login: (userInfo: User) => {
        set({ userInfo: userInfo });
      },
      // 로그아웃 시 저장되어있는 user 정보 초기화
      logout: () => {
        set({ userInfo: defaultState });
      }
    }),
    {
      name: 'userStorage'
    }
  )
);
