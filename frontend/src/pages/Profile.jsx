import React, { useEffect, useState } from "react";
import getProfile from "../utils/getProfile";
import { useNavigate } from "react-router-dom";
import { uploadImageRoute } from "../utils/APIRoutes";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function Profile() {
      const data = await getProfile();
      if (!data) {
        navigate("/login");
      }
      setProfile(data);
    }
    Profile();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setIsLoading(true);
      const res = await fetch(uploadImageRoute, {
        method: "post",
        body: formData,
        credentials: "include",
      });
      if (res.ok) {
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {profile.username}
        </h2>

        <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-orange-400 shadow-md">
          <img
            src={
              profile.photo
                ? profile.photo
                : "https://placehold.co/40x40/cccccc/333333?text=?"
            }
            alt="Ảnh đại diện"
            className="w-full h-full object-cover"
          />
        </div>

        <form action="" className="space-y-5" onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200"
          />

          <button
            className={`w-full py-3 rounded-md cursor-pointer text-white font-semibold transition-all duration-300 bg-orange-500 hover:bg-orange-600`}
          >
            {isLoading ? "Uploading" : "Upload new avatar"}
          </button>
        </form>

        <button
          onClick={() => {
            navigate("/");
          }}
          className="w-full cursor-pointer py-2 mt-4 text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50 transition-colors duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
}
