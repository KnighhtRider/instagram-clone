import React from 'react'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";


function Post({ id, username, userImg, img, caption }) {
  return (
    <div className='flex flex-col bg-white mx-0.5 my-1 rounded-sm lg:px-16 pt-4 min-h-max'>
      
      {/* Header */}
      <div className='flex items-center p-2 '>
        <img src={userImg} 
          className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
          alt='User Image' 
        />
        <p className='flex-1 font-bold'>{username}</p>
        <DotsHorizontalIcon className='h-5' />
      </div>

      {/* img */}
      <div className='w-full relative'>
        <img src={img}
          alt='Post Image'
          className='object-contain h-auto border transition-shadow rounded-lg max-w-full'
        />
      </div>

      {/* Buttons */}
      <div className='flex justify-between px-3 pt-3'>
        <div className='flex space-x-4'>
          <HeartIcon className='btn' />
          <ChatIcon className='btn' />
          <PaperAirplaneIcon className='btn' />
        </div>

        <BookmarkIcon className='btn' />
      </div>



      {/* caption */}
      <p className='p-3 truncate'>
        <span className='font-bold mr-1'>{username}</span>
        {caption}
      </p>

      {/* comments */}

      {/* input box */}
      <form className='flex items-center p-3'>
        <EmojiHappyIcon className='h-7' />
        <input type="text"
          placeholder='Add a comment...' 
          className='border-none flex-1 focus:ring-0 outline-none bg-gray-50' />
        <button className='font-semibold text-blue-400'>Post</button>
      </form>

    </div>
  )
}

export default Post