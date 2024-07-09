import React, { forwardRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Navigation } from "swiper/modules";
import FormModal from "../../ApplicantDashboard/FormModal/FormModal";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MdLocationPin } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { useEffect } from "react";
import { apiURL } from "../../../../../Constant";
import { loadFromLocalStorage } from "../../../../../utils/manageLocalStorage";
import { chunkArray } from "../../../../../utils/functions";
import EditFormModal from "../EditFormModal/EditFormModal";

const Card = () => {
  const [form, setform] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [modalJob, setModalJob] = useState({});

  const handleCardClick = (job) => {
    setModalJob(job);
    setform(true);
  };

  const deleteJob = (job_id) => {
    if (!confirm("Press ok to confirm the job post deletion")) {
      return;
    }

    let token = loadFromLocalStorage("company");

    fetch(`${apiURL}/company/job-post/${job_id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        console.log(data);
        if (data == null) return;
        location.reload();
      });
  };

  // get profile info
  useEffect(() => {
    let token = loadFromLocalStorage("company");

    fetch(`${apiURL}/company/job-post/`, {
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
        console.log(data);
        if (data == null) return;
        console.log(chunkArray(data, 3));
        setJobs(chunkArray(data, 3));
      });
  }, []);

  return (
    <div className="space-y-5 bg-[#F9FAFB] mt-[3rem]">
      <h1 className="text-4xl font-bold text-center text-[#3670a3]">
        Posted Jobs
      </h1>
      <div className="container mx-auto px-4 py-12 shadow-lg">
        <Swiper
          effect={"creative"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerEdit={"auto"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-120%", 0, -500],
            },
            next: {
              shadow: true,
              translate: ["120%", 0, -500],
            },
          }}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[EffectCreative, Pagination, Navigation]}
          className="swiper_container"
        >
          {jobs.map((items, index) => (
            <SwiperSlide>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className=" p-6 rounded-lg flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <div className="max-w-xs bg-black border border-gray-200 rounded-lg">
                      <img
                        className="rounded-t-lg w-[20rem] h-[12rem] object-cover"
                        src={item.company.image}
                        alt={item.title}
                      />
                      <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {item?.title}
                        </h5>
                        <p className="mb-3 flex items-center space-x-1 font-normal text-gray-700 dark:text-gray-400">
                          <FaBuilding className="text-white" size={20} />
                          <span className="text-[0.8rem]">
                            {item.company?.name}
                          </span>
                        </p>
                        <p className="mb-3 flex items-center space-x-1 font-normal text-gray-700 dark:text-gray-400">
                          <MdLocationPin className="text-white" size={20} />
                          <span className="text-[0.8rem]">
                            {item.company?.address}
                          </span>
                        </p>
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => {
                              handleCardClick(item);
                            }}
                            className="bg-transparent border-2 border-white hover:border-black hover:text-black text-white font-bold py-2 px-6 rounded-full hover:bg-white"
                          >
                            Edit
                          </button>
                          <button
                            className="bg-transparent border-2 border-white hover:border-black hover:text-black text-white font-bold py-2 px-4 rounded-full hover:bg-white"
                            onClick={() => {
                              deleteJob(item?.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* FormModal */}
      <EditFormModal
       isVisible={form}
       onClose={() => setform(false)}
       jobDetails={modalJob}
      />
      {/* <FormModal
       
      /> */}
    </div>
  );
};

export default Card;
