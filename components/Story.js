import React from 'react';



function Story({ img, username }) {
  return (
    <div>
      <img className='storyPop h-15 w-15 rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer' src={img} alt='' />
      <p className='text-xs w-14 truncate text-center '>{username}</p>
    </div>
  )
}

export default Story