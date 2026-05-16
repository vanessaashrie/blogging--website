import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import API from "../services/api";

function UserProfile() {

  const { id } = useParams();

  const [user, setUser] =
    useState(null);

  const [blogs, setBlogs] =
    useState([]);

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser = async () => {

    try {

      const userRes =
        await API.get(
          `/auth/user/${id}`
        );

      setUser(userRes.data);

      const blogsRes =
        await API.get("/blogs");

      const userBlogs =
        blogsRes.data.filter(
          (blog) =>
            blog.author?._id === id
        );

      setBlogs(userBlogs);

    } catch (error) {

      console.log(error);
    }
  };

  const handleFollow =
    async () => {

      try {

        await API.put(
          `/auth/follow/${id}`
        );

        fetchUser();

      } catch (error) {

        console.log(error);
      }
    };

  if (!user) {

    return (
      <div className="bg-black min-h-screen text-white">

        <Navbar />

        <div className="p-10">

          Loading...

        </div>

      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        <div className="bg-zinc-900 rounded-3xl p-8 mb-10">

          <div className="flex items-center gap-6">

            <img
              src="https://i.pravatar.cc/100"
              alt=""
              className="w-24 h-24 rounded-full"
            />

            <div>

              <h1 className="text-4xl font-bold">

                {user.username}

              </h1>

              <p className="text-gray-400 mt-2">

                {user.followers.length}
                {" "}Followers

              </p>

            </div>

          </div>

          <button
            onClick={handleFollow}
            className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >

            Follow / Unfollow

          </button>

        </div>

        <div className="flex flex-col gap-6">

          {blogs.map((blog) => (

            <div
              key={blog._id}
              className="bg-zinc-900 p-6 rounded-2xl"
            >

              <h1 className="text-3xl font-bold mb-4">

                {blog.title}

              </h1>

              <p className="text-gray-300">

                {blog.content}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default UserProfile;