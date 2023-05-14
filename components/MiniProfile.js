import React from 'react'
import Image from 'next/image'
import vivek from '../assets/vivek.jpg'

function MiniProfile() {
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
      <Image src={vivek}
        alt='profile pic'
        className=' w-16 h-16 rounded-full border p-[2px] cursor-pointer'
      />

      <div className='flex-1 mx-4'>
        <h2 className='font-bold'>vivek_thakur012</h2>
        <h3 className='text-sm text-gray-400'>VIVEK THAKUR</h3>
      </div>

      <button className='text-blue-400 text-sm font-semibold ml-10'>Sign Out</button>

    </div>
  )
}

export default MiniProfile