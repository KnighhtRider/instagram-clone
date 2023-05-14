import React from 'react';
import Post from './Post';


const posts = [
  {
    id: '123',
    username: 'John Doe',
    userImg: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
    img: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
    caption: 'This is DOPE!',
  },
  {
    id: '124',
    username: 'John Doe',
    userImg: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
    img: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
    caption: ' This is DOPE!',
  },
  {
    id: '123',
    username: 'John Doe',
    userImg: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
    img: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
    caption: 'This is DOPE!',
  },
  {
    id: '124',
    username: 'John Doe',
    userImg: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
    img: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
    caption: ' This is DOPE!',
  },
  {
    id: '123',
    username: 'John Doe',
    userImg: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
    img: 'https://c4.wallpaperflare.com/wallpaper/1000/316/848/spider-man-2018-game-wallpaper-preview.jpg',
    caption: 'This is DOPE!',
  },
  {
    id: '124',
    username: 'John Doe',
    userImg: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
    img: 'https://c4.wallpaperflare.com/wallpaper/24/975/637/groot-marvel-comics-baby-groot-hd-wallpaper-preview.jpg',
    caption: ' This is DOPE!',
  },
]; 


function Posts() {
  return (
    <div>
     
     {posts.map((post) => (
       <Post 
        key={post.id} 
        id={post.id}
        username={post.username}
        userImg={post.userImg}
        img={post.img}
        caption={post.caption}
       />
     ))}
    </div>
  );
}

export default Posts