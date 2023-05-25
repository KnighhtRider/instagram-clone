import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Comments from './Comments';
import Image from "next/image";
// import default_profile from '../assets/default_profile.webp'
import Link from 'next/link';

function Posts() {

  const default_profile = 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'

  const [posts, postsData] = useState([]);
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  // const [items, setItems] = useState([])

  useEffect(() => {
    // Perform localStorage action
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    /* Fetch all posts */
    fetch("http://localhost:5000/createpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => postsData(result))
      .catch((err) => console.log(err));
  }, []);

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((post) => {
          if (post._id == result._id) {
            return result;
          } else {
            return post;
          }
        });
        postsData(newData);
        console.log(result);
      });
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((post) => {
          if (post._id == result._id) {
            return result;
          } else {
            return post;
          }
        });
        postsData(newData);
        console.log(result);
      });
  };

  /* comment function */
  const makeComment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((post) => {
          if (post._id == result._id) {
            return result;
          } else {
            return post;
          }
        });
        postsData(newData);
        console.log(result);
      });
  };

  return (
    <div>
      {posts.map((post) => (
        <div className="flex flex-col bg-white mx-0.5 my-1 rounded-sm lg:px-16 pt-4 min-h-max">
          {/* Header */}
          <div className=" items-center p-2 flow-root">
            <img
              src={post.postedBy.Photo ? post.postedBy.Photo : default_profile}
              className="rounded-full h-12 w-12 object-contain border p-1 mr-3 float-left"
              alt="User Image"
            />
            <Link href={`/profile/${post.postedBy._id}`}>
            <p className="font-bold cursor-pointer mt-2">
              {post.postedBy.userName}
            </p>
            </Link>
            <DotsHorizontalIcon className="h-5 float-right cursor-pointer " />
          </div>

          {/* img */}
          <div className="w-full relative">
            <img
              src={post.photo}
              alt="Post Image"
              className="object-contain h-auto border transition-shadow rounded-lg max-w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between px-3 pt-3">
            <div className="flex space-x-4">
              {post.likes.includes(
                JSON.parse(localStorage.getItem("user"))._id
              ) ? (
                <HeartIconFilled
                  className="btn"
                  onClick={() => {
                    unlikePost(post._id);
                  }}
                />
              ) : (
                <HeartIcon
                  className="btn"
                  onClick={() => {
                    likePost(post._id);
                  }}
                />
              )}

              <ChatIcon className="btn" />
              <PaperAirplaneIcon className="btn" />
            </div>

            <BookmarkIcon className="btn" />
          </div>

          <p className="flex justify-between px-3 pt-3">
            {post.likes.length} Likes
          </p>

          {/* caption */}
          <p className="px-3 truncate">
            <span className="font-bold mr-1">{post.postedBy.userName}</span>
            {post.caption}
          </p>
          
          <div className="px-3 border-none flex-1 focus:ring-0 outline-none cursor-pointer"
          
          >
            <p className=" text-gray-600">View all 10 comments</p>
          </div>

          {/* comments */}

          {/* input box */}
          <div className="flex items-center px-3">
            <EmojiHappyIcon className="h-7" />
            <input
              type="text"
              placeholder="Add a comment..."
              className="border-none flex-1 focus:ring-0 outline-none bg-gray-50"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              className="font-semibold text-blue-400 hover:text-blue-600"
              onClick={() => makeComment(comment, post._id)}
            >
              Post
            </button>
          </div>
        </div>
      ))}

      {/* show comments Section */}
    </div>
  );
}

export default Posts;
