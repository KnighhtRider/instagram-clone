import React, { useState } from 'react'
import Image from "next/image";
import slider from '../assets/slider-login.png';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';


function Login() {

  /* for navigation to other page*/
  const router = useRouter();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /* Toast functions */
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  const postData = () => {

    /* Regex Checking email */
    if(!emailRegex.test(email)) {
      notifyA('Invalid Email')
      return
    }
    
    /* Sending data to server */
    fetch('http://localhost:5000/login', {
      method:'post',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email: email,
        password: password
      })
    }).then((res) => res.json())
    .then((data) => {
      if(data.error) {
        notifyA(data.error)
      } else {
        notifyB("Logged in Successfully");
        // console.log(data);
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/')
      }
      console.log(data)
    })

  }



  return (
    <div className="h-screen flex flex-row justify-center items-center">
      <div className="hidden lg:inline-grid">
        <Image 
          className="h-[600px] w-[450px]"
          src={slider} 
        />
        

      </div>
      <div className=" bg-gray-100 flex flex-col justify-center items-center lg:col-span-1">
        <div className="bg-white border w-80 pt-8 flex items-center flex-col mb-3">
          <h1 class="bg-no-repeat instagram-logo"></h1>
          <div className="mt-8 w-64 flex flex-col">
            <input
              autofocus
              className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
              id="email"
              placeholder="Phone number, username, or email"
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <input
              autofocus
              className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />

            <input className="mt-4 flex bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded w-64 justify-center cursor-pointer"
              type='submit' id='submit-btn' value='Log in'
              onClick={() => { postData() }}
            />

          </div>
          <div className="flex justify-evenly space-x-2 w-64 mt-4">
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
            <span className="flex-none uppercase text-xs text-gray-400 font-semibold">
              or
            </span>
            <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
          </div>

          <button className="mt-4 flex">
            <div className="bg-no-repeat facebook-logo mr-1"></div>
            <span className="text-xs text-blue-900 font-semibold">
              Log in with Facebook
            </span>
          </button>

          <a className="text-xs text-blue-900 mt-4 cursor-pointer mb-4">
            Forgot password?
          </a>
        </div>
        <div class="bg-white border border-gray-300 text-center w-80 py-4">
          <span class="text-sm"
            
          >Don't have an account?</span>
          <a class="text-blue-500 text-sm font-semibold cursor-pointer ml-2 hover:text-blue-700"
            onClick={() => router.push('/signup')}
          >Sign up</a>
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
  );
}

export default Login;
