import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {

    fetchMyBlogs();

  }, []);

  const fetchMyBlogs = async () => {

    try {

      const { data } = await API.get(
        "/blogs/myblogs"
      );

      setBlogs(data);

    } catch (error) {

      console.log(error);
    }
  };

  const deleteBlog = async (id) => {

    try {

      await API.delete(
        `/blogs/${id}`
      );

      fetchMyBlogs();

    } catch (error) {

      console.log(error);
    }
  };

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">

            My Blogs

          </h1>

          <button
            onClick={logout}
            className="bg-red-500 px-5 py-2 rounded-lg"
          >
            Logout
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

              <p className="text-gray-300 mb-6">

                {blog.content}

              </p>

              <div className="flex gap-4">

                <button
                  onClick={() =>
                    deleteBlog(blog._id)
                  }
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

                <Link to={`/edit/${blog._id}`}>

                  <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">

                    Edit

                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Profile;