import React, { useEffect, useState } from "react";
import Image from "next/image";
import Instagram from "../assets/Instagram.jpeg";
import logo from "../assets/logo.png";
import { useRouter } from "next/navigation";

import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";

function MobileNavbar() {

  const default_profile = 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'

  const router = useRouter()

  const [open, setOpen] = useRecoilState(modalState);
  const [user, setUser] = useState('')

  useEffect(() => {


    /* Fetch all posts */
    fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem('user'))._id}`, {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setUser(result.user)
      })
      .catch(err => console.log(err))


  }, [])



  return (

    <div className="fixed bottom-0 w-full left-0 z-50 h-10 pt-1 bg-white border-t border-gray-200 md:hidden  dark:border-gray-600">

      <div className='flex items-center justify-center space-x-14 '>

        <div className=" ">
          <HomeIcon
            className='h-6 hover:scale-125 transition-all duration-150 ease-out cursor-pointer'
            onClick={() => { router.push('/') }}
          />
        </div>

        <div>
          <SearchIcon className='h-6 hover:scale-125 transition-all duration-150 ease-out cursor-pointer' />
        </div>

        <div>
          <PlusCircleIcon
            onClick={() => setOpen(true)}
            className='h-6 hover:scale-125 transition-all duration-150 ease-out cursor-pointer'

          />
        </div>

        <div>
          <img src={user.Photo ? user.Photo : default_profile}
            alt='profile pic'
            className='w-8 h-8 rounded-full cursor-pointer'
            onClick={() => {
              router.push('/myprofile')
            }}
          />
        </div>

      </div>

      

    </div>

  )
}

export default MobileNavbar