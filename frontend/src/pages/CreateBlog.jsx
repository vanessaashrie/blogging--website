import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import API from "../services/api";

function CreateBlog() {

  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/blogs",
        blogData
      );

      navigate("/home");

    } catch (error) {

      console.log(error);

      alert("Failed to create blog");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-8">
          Write a Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            onChange={handleChange}
            className="p-4 rounded-xl bg-zinc-900 outline-none text-xl"
          />

          <textarea
            name="content"
            rows="12"
            placeholder="Write your thoughts..."
            onChange={handleChange}
            className="p-4 rounded-xl bg-zinc-900 outline-none resize-none"
          />

          <button className="bg-white text-black p-4 rounded-xl font-semibold hover:bg-gray-300 transition">

            Publish Blog

          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateBlog;