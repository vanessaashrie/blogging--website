import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import API from "../services/api";

function Home() {

  const [blogs, setBlogs] =
    useState([]);

  useEffect(() => {

    fetchBlogs();

  }, []);

  const fetchBlogs = async () => {

    try {

      const { data } =
        await API.get("/blogs/feed");

      setBlogs(data);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-2">

              Your Feed

            </h1>

            <p className="text-gray-400">

              Read blogs from creators

            </p>

          </div>

          <Link to="/create">

            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">

              Write Blog

            </button>

          </Link>

        </div>

        <div className="flex flex-col gap-8">

          {blogs.map((blog) => (
            console.log(blog.author),

            <div
              key={blog._id}
              className="bg-zinc-900 hover:bg-zinc-800 transition duration-300 p-8 rounded-3xl shadow-lg"
            >

              <Link to={`/blog/${blog._id}`}>

                <h1 className="text-4xl font-bold mb-4 hover:text-gray-300 transition">

                  {blog.title}

                </h1>

              </Link>

              <Link
                to={`/user/${blog.author?._id}`}
              >

                <p className="text-sm text-gray-400 mb-5 hover:text-white cursor-pointer transition">

                  By {blog.author?.username}

                </p>

              </Link>

              <p className="text-gray-300 text-lg leading-8 line-clamp-3">

                {blog.content}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;