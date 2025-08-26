import { useEffect, useState } from "react";
import react from "../assets/react.svg";
import { registerRoute } from "../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function validate() {
    if (!values.username.trim() || !values.password.trim()) {
      toast.warn("username or password can't be empty");
      return false;
    } else if (values.username.length < 3 || values.password.length < 3) {
      toast.warn("username and password length must be atleast 3 ");
      return false;
    } else if (values.password !== values.confirmPassword) {
      toast.warn("confirm password is not the same as password");
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      const res = await fetch(registerRoute, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.done("regiter successfully");
        navigate("/login");
      } else {
        toast.warn(data.message);
      }
    }
  }
  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }
  function toggleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }
  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  return (
    <div className=" flex justify-center items-center bg-amber-50  h-screen  ">
      <div className="bg-white rounded-2xl drop-shadow-2xl w-2/3 h-9/12 p-10  flex">
        <p
          className="absolute underline text-blue-300 cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}
        >
          Back to Login
        </p>

        <div className="w-1/2">
          <img src={react} alt="Icon" className="w-full p-20" />
        </div>

        <div className=" w-1/2 p-10 space-y-8 mt-5">
          <h1 className="text-4xl font-bold ">Register</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-10  ">
            <label htmlFor="username" className=" border-b-1">
              <input
                className="h-10 w-full outline-none "
                type="text"
                placeholder="Your name"
                name="username"
                id="username"
                onChange={handleChange}
                value={values.username}
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
            <label
              htmlFor="confirmPassword"
              className=" border-b-1 flex justify-center items-center"
            >
              <input
                className="h-10 w-full outline-none "
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleChange}
              />
              <p
                className="cursor-pointer  "
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </p>
            </label>
            <input
              type="submit"
              value={"Register"}
              className="bg-amber-100 w-20 py-2  cursor-pointer"
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
