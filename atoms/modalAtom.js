import { atom } from "recoil";
import { React } from 'react';

export const modalState = atom({
  key: 'modalState',
  default: false,
})