import React, { useState } from "react";
import style from "../../../../../style";
// import ApplicantNavbar from "../ApplicantNavbar/ApplicantNavbar";
import Navbar from "../../../Navbar/Navbar";
import { LuCamera } from "react-icons/lu";
import { IoSave } from "react-icons/io5";
import { loadFromLocalStorage } from "../../../../../utils/manageLocalStorage";
import { apiURL } from "../../../../../Constant";
import { useEffect } from "react";
import axios from "axios";
import { removeFromLocalStorage } from "../../../../../utils/manageLocalStorage";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const ApplicantProfile = () => {
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    university_name: "",
    major: "",
    description: "",
    profile_img: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        uploadToImgbb(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(formData);

  // upload to imgbb API
  const uploadToImgbb = async (base64Image) => {
    try {
      const _formData = new FormData();
      _formData.append("image", base64Image.split(",")[1]);
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        _formData,
        {
          params: {
            key: "ed67a942812ea90bf6e8f65a6c43c091",
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data.data.url);
        setFormData({ ...formData, profile_img: response.data.data.url });
        toast("Image uploaded!");
      } else {
        toast("Couldn't upload image, please try again!");
      }
    } catch (error) {
      console.error("Error uploading image to imgbb", error);
    }
  };

  // update profile info
  const updateProfile = () => {
    let token = loadFromLocalStorage("applicant");

    console.log("submitting data:", formData);
    setIsEditing(false);
    fetch(`${apiURL}/applicant/profile/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data == null) return;
        setIsEditing(true);      
        toast("Successfully updated profile");
      });
  };

  // get profile info
  useEffect(() => {
    let token = loadFromLocalStorage("applicant");

    fetch(`${apiURL}/applicant/profile/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        // console.log(data);
        if (data == null) return;
        setLoading(false);
        setFormData(data);
        setImage(data?.profile_img);
      });
  }, []);

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <div className="w-full shadow-md top-0 sticky z-50 bg-[#F9FAFB]">
        <div className={`${style.paddingX} ${style.flexCenter}`}>
          <div className={`${style.boxWidth} z-10`}>
            <Navbar />
          </div>
        </div>
      </div>
      {!isLoading ? (
        <form className="mx-auto mt-8 max-w-[30rem]">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <img
                className="object-cover w-20 h-20 rounded-full ring-2 ring-[#9773DF] cursor-pointer"
                src={image}
                alt="Avatar"
              />
              <label
                htmlFor="fileInput"
                className="absolute bottom-0 right-0 cursor-pointer"
              >
                <div className="p-1 bg-[#9773DF] rounded-full">
                  <LuCamera size={20} className="text-white" />
                </div>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  className={`bg-violet-100 border border-violet-200 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                    isEditing ? "" : "cursor-not-allowed"
                  }`}
                  readOnly={!isEditing}
                />
              </div>

              <div>
                <label
                  htmlFor="university"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  University
                </label>
                <input
                  type="text"
                  id="university"
                  name="university_name"
                  value={formData?.university_name}
                  onChange={handleChange}
                  className={`bg-violet-100 border border-violet-200 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                    isEditing ? "" : "cursor-not-allowed"
                  }`}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label
                  htmlFor="major"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Major
                </label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData?.major}
                  onChange={handleChange}
                  className={`bg-violet-100 border border-violet-200 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                    isEditing ? "" : "cursor-not-allowed"
                  }`}
                  readOnly={!isEditing}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData?.description}
                  onChange={handleChange}
                  className={`bg-violet-100 border border-violet-200 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                    isEditing ? "" : "cursor-not-allowed"
                  }`}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <button
                type="button"
                onClick={() => {
                  updateProfile();
                }}
                className="bg-[#9773DF] flex items-center justify-center space-x-3 hover:bg-[#a782f0] rounded-md px-4 py-2 cursor-pointer hover:scale-105 duration-300 text-md font-semibold text-white"
              >
                <IoSave size={17} />
                <span>Save Changes</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  removeFromLocalStorage("applicant");
                  navigate("/");
                }}
                className="ml-4 bg-[#9773DF] flex items-center justify-center space-x-3 hover:bg-[#a782f0] rounded-md px-4 py-2 cursor-pointer hover:scale-105 duration-300 text-md font-semibold text-white"
              >
                <FaSignOutAlt size={17} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex h-screen w-full">
          <div className="m-auto text-center font-bold text-[1.5rem]">
            <h3 className="text-gray-600">Loading</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantProfile;
