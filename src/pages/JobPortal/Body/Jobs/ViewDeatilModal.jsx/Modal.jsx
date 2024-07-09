import React from "react";
import { BsFillSignpostFill } from "react-icons/bs";
import { convertTimeFormat } from "../../../../../utils/functions";
import { FaClock } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { LuCamera } from "react-icons/lu";
import uploadImg from "../../../../../assets/upload.png";
import { useState } from "react";
import axios from "axios";
import { loadFromLocalStorage } from "../../../../../utils/manageLocalStorage";
import { apiURL } from "../../../../../Constant";
import { toast } from "react-toastify";

const Modal = ({ isVisible, onClose, job }) => {
  if (!isVisible) {
    return null;
  }
  const [formData, setFormData] = useState({
    description: "",
    cv: "",
  });

  const [image, setImage] = useState(uploadImg);
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
        setFormData({ ...formData, cv: response.data.data.url });
        toast("Image uploaded!");
      } else {
        toast("Couldn't upload image, please try again!");
      }
    } catch (error) {
      console.error("Error uploading image to imgbb", error);
    }
  };

  const apply = (e) => {
    if (formData["cv"] === "") {
      if (image !== uploadImg) {
        toast("Please wait till the image is being uploaded");
        return;
      }
      toast("Please upload the CV");
      return;
    }

    if (formData["description"] === "") {
      toast("Description cannot be empty");
      return;
    }

    let token = loadFromLocalStorage("applicant");

    console.log("submitting data:", { ...formData, job_post: job?.id });

    fetch(`${apiURL}/applicant/all-jobs/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ...formData, job_post: job?.id }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.text();
      })
      .then((data) => {
        console.log(data);
        if (data == null) return;
        toast("Successfully Applied!");
        location.reload();
      });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-25 backdrop-blur-sm bg-black"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 w-[70vw] max-w-[40rem] min-w-[25rem] mx-auto rounded-md z-50"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold"></h2>
          <button
            onClick={onClose}
            className="text-red-500 rounded-md px-2 py-1 cursor-pointer hover:scale-105 duration-500 font-bold text-lg"
          >
            X
          </button>
        </div>

        <div className="flex h-[70vh] overflow-y-scroll">
          <div className="flex flex-col pl-2 pr-8">
            <h2 className="text-xl font-semibold mb-6">Fill this form</h2>

            <div className="relative w-20">
              <img
                className="object-cover w-20 h-20 rounded-md ring-2 ring-[#9773DF] cursor-pointer p-1"
                src={image}
                alt="Avatar"
              />
              <label
                htmlFor="fileInput"
                className="absolute bottom-[-.12rem] right-[-.12rem] cursor-pointer"
              >
                <div className="p-1 bg-[#9773DF] rounded-md opacity-80">
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
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 mt-2 w-[10rem]"
            >
              Upload your CV
            </label>

            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 mt-6 w-[5rem]"
              >
                Description
              </label>
              <textarea
                type="text"
                id="name"
                name="description"
                placeholder="Enter desciption about you for this job"
                value={formData?.description}
                onChange={handleChange}
                className={`bg-violet-100 border border-violet-200 outline-none text-gray-900 text-sm rounded-lg block w-[13rem] h-[8rem] p-2.5 overflow-hidden`}
              />
            </div>
          </div>

          {/* <div className="block w-[10rem]"></div> */}

          <div>
            <h2 className="text-xl font-semibold">{job?.title}</h2>
            <img
              src={job?.company?.image}
              alt="company image"
              className="w-[14rem] mb-6"
            />
            <div className="space-y-4">
              <p className="text-xs font-medium">{job?.description}</p>
            </div>
            <div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-md font-bold">{job.salary}</span>
              </div>
              <h6 className="flex">
                <span className="mr-3">
                  <MdWork className="text-[#5E6368]" />
                </span>
                {job?.job_type}
              </h6>
              <h6 className="flex">
                <span className="mr-3">
                  <MdLocationPin className="text-[#5E6368]" />
                </span>
                {job?.company?.address}
              </h6>
              <h6 className="flex">
                <span className="mr-3">
                  <FaClock className="text-[#5E6368]" />
                </span>
                {job?.job_duration}
              </h6>
              <h6 className="flex">
                <span className="mr-3">
                  <FaBuilding className="text-[#5E6368]" />
                </span>
                {job?.company?.name}
              </h6>
              <div>
                <span className="text-xs text-[#5E6368] mt-[1rem] block">
                  Posted On: {"  "}
                  {convertTimeFormat(job.posted_on)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-4">
          <button
            type="button"
            className="bg-[#76c3ed] flex items-center justify-center hover:bg-[#69afd4] rounded-md px-3 py-2 cursor-pointer text-md font-semibold text-white"
            onClick={apply}
          >
            <BsFillSignpostFill size={25} />
            <span>Apply Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
