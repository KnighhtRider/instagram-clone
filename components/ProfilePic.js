import React, { useEffect, useState, useRef } from 'react'

function ProfilePic({ changeProfile }) {

  const hiddenFileInput = useRef(null)
  const [image, setImage] = useState('') 
  const [url, setUrl] = useState('')

  /* posting image to cloudinary */
  const postDetails = async () => {


    const data = new FormData();

    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "fantacloud")

    fetch("https://api.cloudinary.com/v1_1/fantacloud/image/upload", {
      method: 'post',
      body: data
    }).then((res) => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch((err) => console.log(err))
  }


  const postPic = () => {
     /* Saving profile pic to mongodb */
      fetch("http://localhost:5000/uploadProfilePic", {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        pic: url
      })
    }).then(res => res.json())
    .then((data) => {
      console.log(data);
      changeProfile()
      window.location.reload();
    })
      .catch(err => console.log(err))

  }


  const handleClick = () => {
    hiddenFileInput.current.click()
  }


  useEffect(() => {
    if(image) {
      postDetails()
    }
  }, [image])


  useEffect(() => {
    
    if(url) {
      postPic()
    }
  }, [url])

  return (
    <div className='darkBg absolute'>
      <div className=' changePic centered text-center p-6'>
        <div>
          <h2 className=' font-bold md:text-2xl text-black text-sm '>Change Profile Photo</h2>
        </div>
        <div className=' justify-center items-center font-bold border-gray border-t-2 mt-3'>
          <button className='text-blue-500 md:text-2xl text-black text-sm'
            onClick={handleClick}
          >Upload Photo</button>
          <input 
            type='file' 
            ref={hiddenFileInput} 
            accept='image/*' 
            className=' hidden' 
            onChange={(e) => setImage(e.target.files[0])}  
          />
        </div>
        <div>
          <button className='font-bold text-red-500 border-gray border-t-2 mt-3 w-full md:text-2xl text-black text-sm'
            onClick={() => {
              setUrl(null)
              postPic()
            }}
          >Remove Current Photo</button>
        </div>
        <div>
          <button className='text-black-400 border-gray border-t-2 mt-3 w-full md:text-2xl text-black text-sm'
            onClick={changeProfile} 
          >Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePic