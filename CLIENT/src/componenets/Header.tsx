import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holiday.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="flex  bg-white items-center text-blue-600 py-3 font-bold px-3 hover:bg-gray-100 hover:text-gray-500"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};
