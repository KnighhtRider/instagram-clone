import React, { useState, useEffect } from 'react'
import Header from './Header'
import vivek from '../assets/vivek.jpg'
import Image from "next/image";

function MyProfile() {


  const [posts, setPosts] = useState([])

  useEffect(() => {


    /* Fetch all posts */
    fetch('http://localhost:5000/myprofile', {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result)
      })
      .catch(err => console.log(err))


  }, [])


  return (
    <div>

      <Header />

      <main className="bg-gray-100 bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
              {/* <!-- profile image --> */}
              <Image src={vivek} alt='profile' className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-pink-600 p-1" />
            </div>

            {/* <!-- profile meta --> */}
            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  mrtravlerrr_
                </h2>

                {/* <!-- badge --> */}
                <span className="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
                  <i className="fas fa-check text-white text-xs absolute inset-x-0
                               ml-1 mt-px"></i>
                </span>

                {/* <!-- follow button --> */}
                <a href="#" className="bg-blue-500 px-2 py-1 
                        text-white font-semibold text-sm rounded block text-center 
                        sm:inline-block">Follow</a>
              </div>

              {/* <!-- post, following, followers list for medium screens --> */}
              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">136</span>
                  posts
                </li>

                <li>
                  <span className="font-semibold">40.5k</span>
                  followers
                </li>
                <li>
                  <span className="font-semibold">302</span>
                  following
                </li>
              </ul>

              {/* <!-- user meta form medium screens --> */}
              <div className="hidden md:block">
                <h1 className="font-semibold">Mr Travlerrr...</h1>
                <span>Travel, Nature and Music</span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>

            </div>

            {/* <!-- user meta form small screens --> */}
            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">Mr Travlerrr...</h1>
              <span>Travel, Nature and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>

          </header>

          {/* <!-- posts --> */}

          <div className="px-px md:px-3">

            {/* <!-- user following for mobile only --> */}
            <ul className="flex md:hidden justify-around space-x-8 border-t 
                  text-center p-2 text-gray-600 leading-snug text-sm">
              <li>
                <span className="font-semibold text-gray-800 block">136</span>
                posts
              </li>

              <li>
                <span className="font-semibold text-gray-800 block">40.5k</span>
                followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">302</span>
                following
              </li>
            </ul>

            {/* <!-- insta freatures --> */}
            <ul className="flex items-center justify-around md:justify-center space-x-12  
                      uppercase tracking-widest font-semibold text-xs text-gray-600
                      border-t">
              {/* <!-- posts tab is active --> */}
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
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
                        <img src={post.photo} className="w-full h-full absolute left-0 top-0 object-cover" alt="image" />

                        <i className="fas fa-square absolute right-0 top-0 m-1"></i>
                        {/* <!-- overlay--> */}
                        <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                  left-0 top-0 hidden">
                          <div className="flex justify-center items-center 
                                      space-x-4 h-full">
                            <span className="p-2">
                              <i className="fas fa-heart"></i>
                              412K
                            </span>

                            <span className="p-2">
                              <i className="fas fa-comment"></i>
                              2,909
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
    </div>
  )
}

export default MyProfile