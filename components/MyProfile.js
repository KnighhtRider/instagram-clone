import React, { useState, useEffect } from 'react'
import Header from './Header'

import ProfilePic from './ProfilePic';
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from 'react-icons/fa';
import PostDetail from './PostDetail';
import MobileNavbar from './MobileNavbar';

function MyProfile() {

  const default_profile = 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'

  const [posts, setPosts] = useState([])
  const [user, setUser] = useState('')
  const [changePic, setChangePic] = useState(false)

  /* To Delete post */
  const [show, setShow] = useState(false)
  const [pics, setPics] = useState([])




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
        setPosts(result.posts)
        setUser(result.user)
      })
      .catch(err => console.log(err))


  }, [])


  /* To Change Profile Pic */
  const changeProfile = () => {
    if (changePic) {
      setChangePic(false)
    } else {
      setChangePic(true)
    }
  }


  /* To show and hide post */
  const toggleDetails = (posts) => {
    if (show) {
      setShow(false)
    } else {
      setShow(true)
      setPics(posts)
    }
  }


  return (
    <div>
      <Header />
      <main className="bg-gray-100 bg-opacity-25 relative">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
              {/* <!-- profile image --> */}
              <img
                src={user.Photo ? user.Photo : default_profile}
                alt='profile'
                className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1 cursor-pointer"
                onClick={changeProfile}
              />

            </div>

            {/* <!-- profile meta --> */}
            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="md:text-3xl text-2xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  {user.userName}
                </h2>

                {/* <!-- badge --> */}
                <span className="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
                  <i className="fas fa-check text-white text-xs absolute inset-x-0
                               ml-1 mt-px"></i>
                </span>
              </div>

              {/* <!-- post, following, followers list for medium screens --> */}
              <ul className="hidden md:flex space-x-8 mb-4">
                <li key='18'>
                  <span className="font-semibold">{posts ? posts.length : '0'} </span>
                  posts
                </li>

                <li key='19'>
                  <span className="font-semibold">{user.followers ? user.followers.length : '0'} </span>
                  followers
                </li>
                <li key='23'>
                  <span className="font-semibold">{user.following ? user.following.length : '0'} </span>
                  following
                </li>
              </ul>

              {/* <!-- user meta form medium screens --> */}
              <div className="hidden md:block">
                <h1 className="font-semibold">{user.name}</h1>
                <span>Travel, Nature and Music.</span>
                <p>(Jamian)</p>
              </div>

            </div>

            {/* <!-- user meta form small screens --> */}
            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">{user.name}</h1>
              <span>Travel, Nature and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>

          </header>

          {/* <!-- posts --> */}

          <div className="px-px md:px-3">

            {/* <!-- user following for mobile only --> */}
            <ul className="flex md:hidden justify-around space-x-8 border-t 
                  text-center p-2 text-gray-600 leading-snug text-sm">
              <li key='14'>
                <span className="font-semibold text-gray-800 block">{posts.length}</span>
                posts
              </li>

              <li key='15'>
                <span className="font-semibold text-gray-800 block">{user.followers ? user.followers.length : '0'} </span>
                followers
              </li>
              <li key='16'>
                <span className="font-semibold text-gray-800 block">{user.following ? user.following.length : '0'} </span>
                following
              </li>
            </ul>

            {/* <!-- insta freatures --> */}
            <ul className="flex items-center justify-around md:justify-center space-x-12  
                      uppercase tracking-widest font-semibold text-xs text-gray-600
                      border-t">
              {/* <!-- posts tab is active --> */}
              <li key='17' className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="inline-block p-3" href="#">
                  <i className="fas fa-th-large text-xl md:text-xs"></i>
                  <span className="hidden md:inline">post</span>
                </a>
              </li>

            </ul>

            {/* <!-- flexbox grid --> */}

            <div className="flex flex-wrap -mx-px md:-mx-3">
              {/* <!-- post --> */}
              {
                posts.map((post) => {
                  return (
                    <div className="w-1/3 p-px md:px-3">
                      {/* <!-- post 1--> */}
                      <div className="post bg-gray-100 text-white relative pb-full md:mb-6">
                        {/* <!-- post image--> */}
                        <img src={post.photo} className="w-full h-full absolute left-0 top-0 object-cover" alt="image"

                        />

                        {/* <i className="fas fa-square absolute right-0 top-0 m-1"></i> */}
                        {/* <!-- overlay--> */}
                        <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                  left-0 top-0 hidden"
                          onClick={() => {
                            toggleDetails(post)
                          }}
                        >
                          <div className="flex justify-center items-center 
                                      space-x-4 h-full">
                            <span className="p-2">
                              <AiFillHeart /> {post.likes.length}
                            </span>

                            <span className="p-2">
                              <FaComment /> {post.comments.length}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  )
                })
              }
            </div>

          </div>
        </div>

      </main>
      {
        changePic &&
        <ProfilePic changeProfile={changeProfile} />
      }

      {show &&
        <PostDetail item={pics} toggleDetails = {toggleDetails} />
      }

      <MobileNavbar />

    </div>
  )
}

export default MyProfile