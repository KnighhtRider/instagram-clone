import React, { useEffect, useState } from 'react';
import Post from './Post';





// const posts = [
//   {
//     id: '123',
//     username: 'John Doe',
//     userImg: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
//     img: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
//     caption: 'This is DOPE!',
//   },
//   {
//     id: '124',
//     username: 'John Doe',
//     userImg: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
//     img: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
//     caption: ' This is DOPE!',
//   },
//   {
//     id: '123',
//     username: 'John Doe',
//     userImg: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
//     img: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
//     caption: 'This is DOPE!',
//   },
//   {
//     id: '124',
//     username: 'John Doe',
//     userImg: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
//     img: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
//     caption: ' This is DOPE!',
//   },
//   {
//     id: '123',
//     username: 'John Doe',
//     userImg: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
//     img: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
//     caption: 'This is DOPE!',
//   },
//   {
//     id: '124',
//     username: 'John Doe',
//     userImg: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
//     img: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
//     caption: ' This is DOPE!',
//   },
// ]; 


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