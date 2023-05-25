import { commentState } from '@/atoms/modalAtom'
import React from 'react'
import { useRecoilState } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'
import { Fragment, useRef, useState } from 'react'




function Comments() {


  const [commentToggle, setCommentToggle] = useRecoilState(commentState);


  return (
    <div className=' fixed inset-0 bg-black-100 bg-opacity-30 backdrop-blur-sm '></div>
  )
}

export default Comments