import React, { useEffect, useState } from 'react';
import Post from './Post';







function Posts() {

  const [posts, postsData] = useState([])

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


  return (
    <div>
     
     {posts.map((post) => (
       <Post 
        key={post.id} 
        id={post.id}
        username={post.postedBy.name}
        userImg={post.photo}
        img={post.photo}
        caption={post.caption}
       />
     ))}
    </div>
  );
}

export default Posts