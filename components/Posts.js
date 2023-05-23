import React, { useEffect, useState } from 'react';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";







function Posts() {

  const [posts, postsData] = useState([])

  const [user, setUser] = useState('')
  
  useEffect(() => {
    // Perform localStorage action
    setUser(JSON.parse(localStorage.getItem('user')))
    
  }, [])



  useEffect(() => {

    /* Fetch all posts */
    fetch('http://localhost:5000', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },

    }).then((res) => res.json())
    .then((result) => postsData(result))
    .catch(err => console.log(err))

  }, [])

  const likePost = (id) => {
    fetch('http://localhost:5000/like', {
      method:'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
    .then((result) => {
      const newData = posts.map((post) => {
        if(post._id == result._id) {
          return result
        } else {
          return post
        }
      })
      postsData(newData)
      console.log(result)
    })

  }

  const unlikePost = (id) => {
    fetch('http://localhost:5000/unlike', {
      method:'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
    .then((result) => {
      const newData = posts.map((post) => {
        if(post._id == result._id) {
          return result
        } else {
          return post
        }
      })
      postsData(newData)
      console.log(result)
    })
  }


  return (
    <div>
     
     {posts.map((post) => (
       <div className='flex flex-col bg-white mx-0.5 my-1 rounded-sm lg:px-16 pt-4 min-h-max'>
      
       {/* Header */}
       <div className='flex items-center p-2 '>
         <img src={post.photo} 
           className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
           alt='User Image' 
         />
         <p className='flex-1 font-bold'>{post.postedBy.userName}</p>
         <DotsHorizontalIcon className='h-5' />
       </div>
 
       {/* img */}
       <div className='w-full relative'>
         <img src={post.photo}
           alt='Post Image'
           className='object-contain h-auto border transition-shadow rounded-lg max-w-full'
         />
       </div>
 
       {/* Buttons */}
       <div className='flex justify-between px-3 pt-3'>
         <div className='flex space-x-4'>


          {
            post.likes.includes(JSON.parse(localStorage.getItem('user'))._id) ?
            (
              <HeartIconFilled
                className='btn' 
                onClick={() => {unlikePost(post._id)}}
              />
            )
            :
            (
              <HeartIcon
                className='btn' 
                onClick={() => {likePost(post._id)}}
              />
            )
          }
          
           <ChatIcon className='btn' />
           <PaperAirplaneIcon className='btn' />
         </div>
 
         <BookmarkIcon className='btn' />
       </div>
 
       <p className='flex justify-between px-3 pt-3'>{post.likes.length} Likes</p>
 
       {/* caption */}
       <p className='p-3 truncate'>
         <span className='font-bold mr-1'>{post.postedBy.userName}</span>
         {post.caption}
       </p>
 
       {/* comments */}
 
       {/* input box */}
       <div className='flex items-center p-3'>
         <EmojiHappyIcon className='h-7' />
         <input type="text"
           placeholder='Add a comment...' 
           className='border-none flex-1 focus:ring-0 outline-none bg-gray-50' />
         <button className='font-semibold text-blue-400'>Post</button>
       </div>
 
     </div>
     ))}
    </div>
  );
}

export default Posts