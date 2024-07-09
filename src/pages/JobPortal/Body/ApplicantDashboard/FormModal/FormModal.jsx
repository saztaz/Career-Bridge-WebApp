import React from "react";
import { MdLocationPin } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";

const Modal = ({ isVisible, onClose, jobDetails }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0  flex items-center justify-center z-50 bg-opacity-25 backdrop-blur-sm bg-black"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 max-w-md mx-auto rounded-md z-50"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold mt-[1rem]">
            {jobDetails?.title}
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 rounded-md px-2 py-1 cursor-pointer hover:scale-105 duration-500 font-bold text-lg"
          >
            X
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-medium">{jobDetails?.description}</p>
          <p className="text-xs font-medium">
            <span className="font-bold">Job Type:</span>
            <br />
            {jobDetails?.job_type}
          </p>

          <p className="text-xs font-medium">
            <span className="font-bold">Job Duration:</span>
            <br />
            {jobDetails?.job_duration}
          </p>

          <p className="mb-3 flex items-center space-x-1 font-normal text-gray-700 dark:text-gray-400">
            <MdLocationPin className="text-gray" size={20} />
            <span className="text-[0.8rem]">{jobDetails?.company?.address}</span>
          </p>
          <p className="mb-3 flex items-center space-x-1 font-normal text-gray-700 dark:text-gray-400">
            <FaBuilding className="text-gray" size={20} />
            <span className="text-[0.8rem]">{jobDetails?.company?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
