import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const[isVisible,setIsVisible] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { login } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", { email, password });
      console.log("Login response:", res.data.token);
      localStorage.setItem("token", res.data.token);
      const user = await login(res.data.token);
      toast.success("Login successful!", { position: "top-right" });
      // Redirect based on role
      setTimeout(() => {
        if (user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed", {
        position: "top-right",
      });
    }
  };

  const googleLogin = () => {
    window.open(`${process.env.REACT_APP_API_URL}/api/auth/google`, "_self");
  };

  const facebookLogin = () => {
    window.open(`${process.env.REACT_APP_API_URL}/api/auth/facebook`, "_self");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <ToastContainer />
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-xl p-6 sm:p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 text-gray-800"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={onChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 text-gray-800"
            />
            <span
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {isVisible ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </span>
          </div>

          <div className="text-right mt-1">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        {/* <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-sm text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div> */}

        {/* <button
          onClick={googleLogin}
          className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-md mb-3 flex items-center justify-center gap-2"
        >
          <FaGoogle className="w-5 h-5" />
          Continue with Google
        </button> */}

        {/* <button
          onClick={facebookLogin}
          className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2"
        >
          <FaFacebookF className="w-5 h-5" />
          Continue with Facebook
        </button> */}

        <p className="text-center text-sm mt-5 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-gray-900 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
