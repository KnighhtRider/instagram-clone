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


function Header() {

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
    <div className='shadow-sm border-b bg-white sticky top-0 z-50 pt-1 pb-2 md:pt-0 md:pb-0'>
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">

        {/* Left */}
        <div className="relative hidden lg:inline-grid w-28 cursor-pointer mt-4">
          <Image src={Instagram} alt="cam-Talk" objectFit="contain"
            onClick={() => { router.push('/') }}
          />
        </div>

        <div className="relative lg:hidden w-6 flex-shrink-0 cursor-pointer pt-2">
          <Image src={logo} alt="cam-Talk" objectFit="contain"
            onClick={() => router.push('/')}
          />
        </div>

        {/* Middle - Search input field */}
        <div className='max-w-xs hidden md:inline-grid'>
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none ">
              <SearchIcon className="h-5 w-5 text-gray-500 " />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right Section for lg screen */}
        <div className='flex items-center justify-end space-x-4'>
          <HomeIcon
            className='navBtn cursor-pointer'
            onClick={() => { router.push('/') }}
          />


          <div className='relative h-6 md:hidden cursor-pointer hover:scale-125 transition-all duration-150 ease-out'>
            <HeartIcon className='h-6 md:hidden cursor-pointer hover:scale-125 transition-all duration-150 ease-out' />
            <div className='absolute top-1 -right-0 text-xs w-2 h-2 bg-red-500 rounded-full flex items-center justify-center text-white'></div>
          </div>



          {/* message icon for small screen */}
          <div className='relative h-6 md:hidden cursor-pointer hover:scale-125 transition-all duration-150 ease-out'>
            <PaperAirplaneIcon className='h-6 md:hidden cursor-pointer hover:scale-125 transition-all duration-150 ease-out rotate-45' />
            <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce text-white'>3</div>
          </div>


          {/* <MenuIcon className='h-6 md:hidden cursor-pointer' /> */}

          <div className='relative navBtn'>
            <PaperAirplaneIcon className='navBtn rotate-45 ' />
            <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce text-white'>3</div>
          </div>




          <PlusCircleIcon
            onClick={() => setOpen(true)}
            className='navBtn'

          />



          <UserGroupIcon className='navBtn' />



          <div className='relative navBtn'>
            <HeartIcon className='navBtn' />
            <div className='absolute -right-0 text-xs w-2 h-2 bg-red-500 rounded-full flex items-center justify-center text-white'></div>
          </div>



          <img src={user.Photo ? user.Photo : default_profile}
            alt='profile pic'
            className='hidden md:inline-grid w-10 h-10 rounded-full cursor-pointer'
            onClick={() => {
              router.push('/myprofile')
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default Header;
