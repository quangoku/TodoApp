import { useEffect, useState } from "react";
import react from "../assets/react.svg";
import { loginRoute, profileRoute } from "../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function getPhoto() {
      const res = await fetch(profileRoute, {
        method: "get",
        credentials: "include",
      });
      if (res.ok) {
        navigate("/");
      }
    }
    getPhoto();
  }, []);

  function validate() {
    if (!values.email.trim() || !values.password.trim()) {
      toast.warn("email or password can't be empty");
      return false;
    } else if (values.email.length < 3 || values.password.length < 3) {
      toast.warn("email and password length must be at least 3");
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      const res = await fetch(loginRoute, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.warn(data.message);
      } else {
        toast.success("login successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  }
  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  return (
    <div className="flex justify-center items-center bg-amber-50 min-h-screen p-4">
      <div className="bg-white rounded-2xl drop-shadow-2xl w-full md:w-2/3 md:h-9/12 p-6 md:p-10 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 order-2 md:order-1 p-0 md:p-10">
          <img src={react} alt="Icon" className="w-full p-10 hidden md:block" />

          <h1 className="text-center mt-4 md:mt-0">
            <p
              className="underline text-blue-300 cursor-pointer text-sm md:text-base"
              onClick={() => {
                navigate("/register");
              }}
            >
              create an account
            </p>
          </h1>
        </div>

        <div className="w-full md:w-1/2 p-5 md:p-10 space-y-5 md:space-y-8 mt-0 md:mt-5 order-1 md:order-2">
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
            Sign up
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:gap-10"
          >
            <label htmlFor="email" className="border-b-1">
              <input
                className="h-10 w-full outline-none"
                type="text"
                placeholder="Email"
                name="email"
                id="email"
                onChange={handleChange}
                value={values.email}
              />
            </label>
            <label
              htmlFor="password"
              className="border-b-1 flex justify-center items-center"
            >
              <input
                className="h-10 w-full outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                onChange={handleChange}
              />
              <p
                className="cursor-pointer text-sm"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </p>
            </label>

            <div className="flex justify-center md:justify-start">
              <input
                type="submit"
                value={"Login"}
                className="bg-amber-100 w-full max-w-[80px] py-2 rounded-sm cursor-pointer hover:bg-amber-200 transition"
              />
            </div>

            <div className="flex justify-center md:justify-start">
              <a href="http://localhost:3000/auth/google" className="block">
                <FcGoogle size={"24px"} />
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
