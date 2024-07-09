import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import Modal from "../ViewDeatilModal.jsx/Modal";

const JobCard = ({ job }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleCardClick = () => {
    setSelectedDetails(job);
    setShowModal(true);
  };

  return (
    <div className="h-[16rem] bg-white p-[2rem] shadow-lg space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex-col flex space-y-2">
          <h1 className="text-[#1E1E1E] text-md font-semibold">{job?.title}</h1>
          <p className="text-xs text-[#5E6368] h-[2rem]">
            {job?.description.length > 30
              ? job?.description.slice(0, 80) + "..."
              : job?.description}
          </p>
          <div className="flex flex-col text-sm text-[#5E6368]">
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
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-5">
        <button
          onClick={handleCardClick}
          className="px-3 py-2 bg-[#04ADE61A] text-[#04ADE6] rounded-xl hover:text-[1.05rem] duration-75"
        >
          View details
        </button>
      </div>

      {/* Modal */}
      {selectedDetails && (
        <Modal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          job={selectedDetails}
        />
      )}
    </div>
  );
};

export default JobCard;
