import React from 'react'
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { GrClose } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';


function PostDetail({ item, toggleDetails }) {

  const router = useRouter();

  const default_profile = 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'


  /* Toast functions */
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)


  const removePost = (postId) => {
    if (window.confirm('Do you really want to delete this post ? ')) {
      fetch(`http://localhost:5000/deletepost/${postId}`, {
        method: 'delete',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          notifyB(result.message)
          toggleDetails()
          router.push('/')
        })
    }
  }



  return (

    <div className="show-comment z-10">
      <div className="comment-container">
        <div className="post-pic hidden md:inline-grid">
          <img src={item.photo} className="w-[700px] h-full" />
        </div>
        <div className="details">
          {/* post Header */}
          <div className="card-header border-b-gray-300 border">
            <div className="card-pic">
              <img
                src={item.postedBy.Photo ? item.postedBy.Photo : default_profile}
                className="rounded-full h-12 w-12 object-contain border p-1 mr-3 float-left"
                alt="User Image"
              />
            </div>
            <h5 className="font-bold cursor-pointer mt-2">
              {item.postedBy.userName}
            </h5>
            <div className=' absolute top-4 right-3 '
              onClick={() => {
                removePost(item._id)
              }}
            >
              <RiDeleteBinLine className='w-6 h-6 font-bold cursor-pointer' />
            </div>
          </div>

          {/* comment Section */}
          <div className="comment-section border-b-gray-300 border overflow-y-scroll">
            {item.comments.map((comment) => {
              return (
                <div className="comment flex">
                  <div className=" items-center">
                    <img
                      src={comment.postedBy.Photo ? comment.postedBy.Photo : default_profile}
                      className="rounded-full h-10 w-10 object-contain border p-1 mx-2 mr-3 float-left flex"
                      alt="User Image"
                    />
                  </div>
                  <div className=" ">
                    <span className="commenter font-bold mr-1">
                      {comment.postedBy.userName}
                    </span>
                    <p className="comment-text antialiased font-sans">{comment.comment}</p>
                    <p className=" mt-2"></p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* post content */}
          <div className="post-content">
            <p className="justify-between px-3 pt-3">
              {item.likes.length} Likes
            </p>
            <p className=" px-3 mr-1 block">{item.caption}</p>
          </div>

          {/* Add Comment */}
          <div className="flex items-center px-3">
            <EmojiHappyIcon className="h-7 flex" />
            <input
              type="text"
              placeholder="Add a comment..."
              className="border-none flex-1 focus:ring-0 outline-none bg-gray-50"
            // value={comment}
            // onChange={(e) => {
            //   setComment(e.target.value);
            // }}
            />
            <button
              className="font-semibold text-blue-400 hover:text-blue-600"
            // onClick={() => {
            //   makeComment(comment, item._id);
            //   toggleComment();
            // }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div
        className="close-comment cursor-pointer"
        onClick={() => toggleDetails()}
      >
        <GrClose className="w-10 h-10 font-bold cursor-pointer" />
      </div>
    </div>
  )
}

export default PostDetail