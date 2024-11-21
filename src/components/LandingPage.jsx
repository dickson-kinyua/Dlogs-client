import { useEffect, useState } from "react";

export const LandingPage = () => {

  const [posts, setPosts] = useState([])


  useEffect(() => {
    fetch("http://localhost:5000/allPosts", {
      method: "GET"
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        setPosts(data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <ul className="flex flex-col gap-10 mt-16 ">

      {
        posts.map(post => {
          return (

            <li key={post._id}>
              <p>{post.title}</p>
              {/* <img src="coding.jpg" alt="coding image" /> */}
              <p>By: {post.author}</p>
              <p>{post.date}</p>
              <div className="">
                <button className="mt-2">Like❤<span>1 Likes</span></button>
                <button className="ml-6">Comment</button>
              </div>

            </li>
          )
        })
      }





    </ul>
  );
};
