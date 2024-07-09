import React, { useState } from "react";
import { BsFillSignpostFill } from "react-icons/bs";
import { loadFromLocalStorage } from "../../../../../utils/manageLocalStorage";
import { apiURL } from "../../../../../Constant";
import { toast } from "react-toastify";

const Modal = ({ isVisible, onClose }) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    job_type: "On-site",
    job_duration: "Full-Time",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox input
    if (type === "checkbox") {
      setJobData({ ...jobData, [name]: checked });
    } else {
      setJobData({ ...jobData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Data:", jobData);

    let token = loadFromLocalStorage("company");

    fetch(`${apiURL}/company/job-post/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(jobData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data == null) return;
        toast("Successfully created the job post");
        location.reload();
      });

    // Clear form fields
    setJobData({
      name: "",
      location: "",
      description: "",
      job_type: "On-site",
      job_duration: "Full-Time",
    });

    // Close the modal
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-25 backdrop-blur-sm bg-black p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 w-[50vw] max-w-[30rem] min-w-[10rem] mx-auto rounded-md z-50"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#3670A3]">Post Job</h2>
          <button
            onClick={onClose}
            className="text-red-500 rounded-md px-2 py-1 cursor-pointer hover:scale-105 duration-500 font-bold text-lg"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-sm text-[#3670A3]">
              Job Title
            </label>
            <input
              type="text"
              id="name"
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="description" className="text-sm text-[#3670A3]">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              required
            />
          </div>

          <div className="flex flex-col  mb-4">
            <div className="flex items-center space-x-5 ">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="job_type"
                  value="On-site"
                  checked={jobData.job_type === "On-site"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                On-site
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="job_type"
                  value="Remote"
                  onChange={handleInputChange}
                  className="mr-2"
                  checked={jobData.job_type === "Remote"}
                />
                Remote
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="job_duration"
                  value="Full-Time"
                  checked={jobData.job_duration === "Full-Time"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Full Time
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="job_duration"
                  value="Part-Time"
                  checked={jobData.job_duration === "Part-Time"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Part Time
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 mt-[4rem]">
            <button
              type="submit"
              className="bg-[#3670A3] flex items-center justify-center hover:bg-[#5e93c2] rounded-md px-3 py-2 cursor-pointer text-md font-semibold text-white space-x-2"
            >
              <BsFillSignpostFill size={25} />
              <span>Post Job</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
