import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import { Heart } from "lucide-react";

import Navbar from "../components/Navbar";

import API from "../services/api";
const [comment, setComment] =
  useState("");

function BlogDetails() {

  const { id } = useParams();

  const [blog, setBlog] =
    useState(null);

  useEffect(() => {

    fetchBlog();

  }, []);

  const fetchBlog = async () => {

    try {

      const { data } =
        await API.get(`/blogs/${id}`);

      setBlog(data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!blog) {

    return (
      <div className="bg-black min-h-screen text-white">

        <Navbar />

        <div className="p-10 text-2xl">

          Loading...

        </div>

      </div>
    );
  }

  const handleLike = async () => {

  try {

    const { data } =
      await API.put(
        `/blogs/like/${id}`
      );

    setBlog(data);

  } catch (error) {

    console.log(error);
  }
};

const handleComment =
  async () => {

    try {

      const { data } =
        await API.post(
          `/blogs/comment/${id}`,
          {
            text: comment,
          }
        );

      setBlog(data);

      setComment("");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-bold mb-6 leading-tight">

          {blog.title}

        </h1>

        <div className="flex items-center gap-4 mb-10">

          <img
            src="https://i.pravatar.cc/50"
            alt=""
            className="w-12 h-12 rounded-full"
          />

          <div>

            <p className="font-semibold">

              {
                blog.author?.username ||
                "Unknown Author"
              }

            </p>

            <p className="text-gray-400 text-sm">

              {new Date(
                blog.createdAt
              ).toDateString()}

            </p>

          </div>

        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl shadow-lg">

  <p className="text-lg leading-9 whitespace-pre-wrap text-gray-200">

    {blog.content}

  </p>

</div>


<div className="mt-8">

  <button
    onClick={handleLike}
    className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-2xl transition"
  >

    <Heart />

    <span>

      {blog.likes.length} Likes

    </span>

  </button>
  <div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">

    Comments

  </h2>

  <div className="flex gap-4 mb-8">

    <input
      type="text"
      placeholder="Write a comment..."
      value={comment}
      onChange={(e) =>
        setComment(e.target.value)
      }
      className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
    />

    <button
      onClick={handleComment}
      className="bg-white text-black px-6 rounded-2xl font-semibold"
    >

      Post

    </button>

  </div>

  <div className="flex flex-col gap-5">

    {blog.comments?.map(
      (c) => (

        <div
          key={c._id}
          className="bg-zinc-900 p-5 rounded-2xl"
        >

          <p className="font-semibold mb-2">

            {
              c.user?.username
            }

          </p>

          <p className="text-gray-300">

            {c.text}

          </p>

        </div>
      )
    )}

  </div>

</div>

</div>

      </div>

    </div>
  );
}

export default BlogDetails;