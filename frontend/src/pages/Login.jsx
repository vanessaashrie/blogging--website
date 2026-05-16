import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const endpoint = isSignup
        ? "/auth/register"
        : "/auth/login";

      const response = await API.post(
        endpoint,
        formData
      );

      console.log(response.data);

      // save token

      localStorage.setItem(
        "token",
        response.data.token
      );

      // redirect

      navigate("/home");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="bg-zinc-900 p-10 rounded-2xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">

          {isSignup
            ? "Create Account"
            : "Welcome Back"}

        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          {isSignup && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="p-3 rounded-lg bg-zinc-800 outline-none"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="p-3 rounded-lg bg-zinc-800 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-3 rounded-lg bg-zinc-800 outline-none"
          />

          <button className="bg-white text-black p-3 rounded-lg font-semibold">

            {isSignup ? "Signup" : "Login"}

          </button>

        </form>

        <p
          onClick={() => setIsSignup(!isSignup)}
          className="mt-6 text-center cursor-pointer text-gray-400"
        >

          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

        </p>

      </div>

    </div>
  );
}

export default Login;