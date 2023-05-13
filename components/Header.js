import React from "react";
import Image from "next/image";
import Instagram from "../assets/Instagram.jpeg";
import vivek from '../assets/vivek.jpg'
import logo from "../assets/logo.png";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/solid";

function Header() {
  return (
    <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div className="relative hidden lg:inline-grid w-28 cursor-pointer mt-4">
          <Image src={Instagram} alt="cam-Talk" objectFit="contain" />
        </div>

        <div className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer mt-4">
          <Image src={logo} alt="cam-Talk" objectFit="contain" />
        </div>

        {/* Middle - Search input field */}
        <div className='max-w-xs'>
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none ">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right */}
        <div className='flex items-center justify-end space-x-4'>
          <HomeIcon className='navBtn' />
          <MenuIcon className='h-6 md:hidden cursor-pointer' />
          
          <div className='relative navBtn'>
            <PaperAirplaneIcon className='navBtn rotate-45' />
            <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce text-white'>3</div>
          </div>
          <PlusCircleIcon className='navBtn' />
          <UserGroupIcon className='navBtn' />
          <HeartIcon className='navBtn' />
          <Image src={vivek}
            alt='profile pic'
            className='w-10 h-10 rounded-full cursor-pointer'
          />
        </div>

      </div>
    </div>
  );
}

export default Header;
