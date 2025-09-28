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
    <div className=" flex justify-center items-center bg-amber-50  h-screen  ">
      <div className="bg-white rounded-2xl drop-shadow-2xl w-2/3 h-9/12 p-10  flex">
        <div className="w-1/2">
          <img src={react} alt="Icon" className="w-full p-20" />
          <h1 className="text-center">
            <p
              className="underline text-blue-300 cursor-pointer"
              onClick={() => {
                navigate("/register");
              }}
            >
              create an account
            </p>
          </h1>
        </div>

        <div className=" w-1/2 p-10 space-y-8 mt-5">
          <h1 className="text-4xl font-bold ">Sign up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-10  ">
            <label htmlFor="email" className=" border-b-1">
              <input
                className="h-10 w-full outline-none "
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
              className=" border-b-1 flex justify-center items-center"
            >
              <input
                className="h-10 w-full outline-none "
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                onChange={handleChange}
              />
              <p className="cursor-pointer  " onClick={toggleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </p>
            </label>

            <input
              type="submit"
              value={"Login"}
              className="bg-amber-100 w-20 py-2 rounded-sm  cursor-pointer"
            />
            <div>
              <a href="http://localhost:3000/auth/google">
                <FcGoogle size={"20px"} />
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
