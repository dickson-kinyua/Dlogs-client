import { useState } from "react";

export const NewPost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const newPostFn = async (e) => {
    e.preventDefault();
    const postData = { title, author, description, date };

    try {
      const response = await fetch("http://localhost:5000/newPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        return;
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10">
      <p className="mb-8">Create a new post</p>
      <form onSubmit={newPostFn} className="flex flex-col gap-5">
        <label htmlFor="title">Title</label>
        <input
          value={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-200 p-4"
          type="text"
        />
        <label>Author</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="bg-gray-200 p-4"
          type="text"
        />
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-200 p-4"
        ></textarea>
        <input type="file" src="" alt="" />
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-200 p-4"
          type="date"
          name=""
          id=""
        />
        <button className="bg-orange-500 p-3" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};
