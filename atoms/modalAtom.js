import { atom } from "recoil";
import { React } from 'react';
import { RecoilEnv } from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

const modalState = atom({
  key: 'state',
  default: false,
})

const modalCaption = atom({
  key: 'caption',
  default: '',
})

const modalUrl = atom({
  key: 'url',
  default: '',
})

const commentState = atom({
  key: 'state',
  default: false,
})

export {
  modalState,
  modalCaption,
  modalUrl,
  commentState,

}