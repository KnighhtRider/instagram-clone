import React, { useState, useEffect } from 'react'
import Image from 'next/image'
// import default_profile from '../assets/default_profile.webp'
import { useRouter } from 'next/navigation'
// const router = useRouter();

function MiniProfile() {

  const default_profile = 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'

  const router = useRouter();

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
    <div className='flex items-center justify-between mt-14 ml-10'>
      <img src={user.Photo ? user.Photo : default_profile}
        alt='profile pic'
        className=' w-16 h-16 rounded-full border p-[2px] cursor-pointer'
      />

      <div className='flex-1 mx-4'>
        <h2 className='font-bold'>{user.name}</h2>
        <h3 className='text-sm text-gray-400'>{user.userName}</h3>
      </div>

      <button 
        className='text-blue-400 text-sm font-semibold ml-10'
        onClick={() => {
          localStorage.clear()
          router.push('/login')
        }}
        >
          Sign Out
        </button>

    </div>
  )
}

export default MiniProfile