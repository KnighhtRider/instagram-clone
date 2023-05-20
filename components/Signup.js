import React, { useEffect } from 'react'

function Signup() {

  const fetchData = async() => {
    const respose = await fetch("http://localhost:3000")
    const data = await respose.json()
    console.log(data);
  }

  useEffect(() => {
    fetchData()
  }, [])
  


  return (
    <div className="h-screen flex flex-row justify-center items-center">
      <div className=" bg-gray-100 flex flex-col justify-center items-center lg:col-span-1">
        <div className="bg-white border w-80 pt-8 flex items-center flex-col mb-3">
          <h1 class="bg-no-repeat instagram-logo"></h1>
          <p className='text-center text-base px-5 pt-5 font-semibold text-gray-500'>Sign up to see photos and videos from your friends.</p>

          <button className="mt-4 flex bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded w-64 justify-center">
            <div className="bg-no-repeat facebook-logo mr-1 mt-1"></div>
            <span className='font-normal'>
              Log in with Facebook
            </span>
          </button>

          <div className="flex justify-evenly space-x-2 w-64 mt-4">
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
            <span className="flex-none uppercase text-xs text-gray-400 font-semibold">
              or
            </span>
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
          </div>

          <form className="mt-8 w-64 flex flex-col">
            <input
              autofocus
              className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
              id="email"
              placeholder="Mobile number or Email"
              type="text"
            />
            <input
              autofocus
              className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
              id="full-name"
              placeholder="Full Name"
              type="text"
            />
            <input
              autofocus
              className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
              id="username"
              placeholder="Username"
              type="text"
            />
            <input
              autofocus
              className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
              id="password"
              placeholder="Password"
              type="password"
            ></input>
            <a className=" text-sm text-center bg-blue-300 text-white py-1 rounded font-medium">
              Sign up
            </a>
          </form>
        </div>
        <div class="bg-white border border-gray-300 text-center w-80 py-4">
          <span class="text-sm">Have an account?</span>
          <a class="text-blue-500 text-sm font-semibold"> Log in</a>
        </div>
        <div class="mt-3 text-center">
          <span class="text-xs">Get the app</span>
          <div class="flex mt-3 space-x-2">
            <div class="bg-no-repeat apple-store-logo"></div>
            <div class="bg-no-repeat google-store-logo"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup