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
import Comments from "./Comments";
import { GrClose } from "react-icons/gr";
import Link from "next/link";

function Posts() {
  const default_profile =
    "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

  const [posts, postsData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

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

  /* To show and hide comments */
  const toggleComment = (post) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(post);
      console.log(item.comments);
    }
  };

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
        setComment("");
        console.log(result);
      });
  };

  return (
    <div>
      {posts.map((post) => (
        <div className=" flex flex-col bg-white rounded-sm pt-4 md:px-16">
          {/* Header */}
          <div className=" items-center flow-root">
            <img
              src={post.postedBy.Photo ? post.postedBy.Photo : default_profile}
              className="rounded-full h-12 w-12 object-contain border p-1 mr-3 float-left flex"
              alt="User Image"
            />
            <Link href={`/profile/${post.postedBy._id}`}>
              <span className="font-bold cursor-pointer mt-2">
                {post.postedBy.userName}
              </span>
            </Link>
            <DotsHorizontalIcon className="h-6 float-right cursor-pointer" />
          </div>

          {/* img */}
          <div className=" relative ">
            <img
              src={post.photo}
              alt="Post Image"
              className=" border transition-shadow rounded-lg"
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

              <ChatIcon className="btn" 
              onClick={() => toggleComment(post)}
              />
              <PaperAirplaneIcon className="btn rotate-45" />
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

          <div className="px-3 border-none flex-1 focus:ring-0 outline-none cursor-pointer">
            <p className=" text-gray-600" onClick={() => toggleComment(post)}>
              View all {post.comments.length} comments
            </p>
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

      {show && (
        <div className="show-comment z-10 -top-10 md:top-0">
          <div className="comment-container">
            <div className="post-pic hidden md:inline-grid">
              <img src={item.photo} className="overflow-hidden h-full" />
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
                <EmojiHappyIcon className="md:inline-grid h-7 flex" />
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
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div
            className="close-comment cursor-pointer top-16 right-16 md:top-[18%] md:right-[16%]"
            onClick={() => toggleComment()}
          >
            <GrClose className=" w-8 h-8 md:w-10 md:h-10 font-bold cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
