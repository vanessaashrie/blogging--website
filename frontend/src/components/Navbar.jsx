import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-zinc-950 border-b border-zinc-800 px-10 py-4 flex justify-between items-center">

      <Link
        to="/home"
        className="text-3xl font-bold"
      >
        Blogify
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/home">
          Home
        </Link>

        <Link to="/create">
          Write
        </Link>

        <Link to="/profile">

          <img
            src="https://i.pravatar.cc/40"
            alt=""
            className="w-10 h-10 rounded-full"
          />

        </Link>

      </div>

    </div>
  );
}

export default Navbar;