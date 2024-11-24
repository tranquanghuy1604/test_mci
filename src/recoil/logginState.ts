import { atom } from 'recoil';

export const loggedState = atom({
  key: 'logged',
  default: typeof window !== 'undefined' && localStorage.getItem('logged') === 'true',
});
