import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import API from "../services/api";

function EditBlog() {

  const navigate = useNavigate();

  const { id } = useParams();

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

      await API.put(
        `/blogs/${id}`,
        blogData
      );

      navigate("/profile");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-8">

          Edit Blog

        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >

          <input
            type="text"
            name="title"
            placeholder="New Title"
            onChange={handleChange}
            className="p-4 rounded-xl bg-zinc-900 outline-none"
          />

          <textarea
            name="content"
            rows="10"
            placeholder="New Content"
            onChange={handleChange}
            className="p-4 rounded-xl bg-zinc-900 outline-none"
          />

          <button className="bg-white text-black p-4 rounded-xl font-semibold">

            Update Blog

          </button>

        </form>

      </div>

    </div>
  );
}

export default EditBlog;