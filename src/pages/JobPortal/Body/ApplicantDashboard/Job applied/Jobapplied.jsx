import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Navigation } from "swiper/modules";
import FormModal from "../FormModal/FormModal";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaBuilding } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { loadFromLocalStorage } from "../../../../../utils/manageLocalStorage";
import { apiURL } from "../../../../../Constant";
import { chunkArray } from "../../../../../utils/functions";

const Card = () => {
  const [applications, setApplications] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [infoModal, setInfoFormModal] = useState({});

  const deleteApplication = (job_id) => {
    if (!confirm("Press ok to confirm the application deletion")) {
      return;
    }

    let token = loadFromLocalStorage("company");

    fetch(`${apiURL}/applicant/applied-jobs/${job_id}`, {
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
    let token = loadFromLocalStorage("applicant");

    fetch(`${apiURL}/applicant/applied-jobs/`, {
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
        setApplications(chunkArray(data, 3));
      });
  }, []);

  const handleCardClick = (info) => {
    setShowFormModal(true);
    setInfoFormModal(info);
  };
  return (
    <div className="space-y-5  mt-[3rem]">
      <h1 className="text-4xl font-bold text-center text-[#3670a3]">
        {applications.length === 0
          ? "No Pending applications"
          : "Pending Applications:"}
      </h1>
      <div className="container mx-auto px-4 py-12 shadow-lg">
        <Swiper
          effect={"creative"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
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
          {applications.map((items, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className=" p-6 rounded-lg flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <div className="max-w-xs bg-black border border-gray-200 rounded-lg">
                      <img
                        className="rounded-t-lg w-[20rem] h-[12rem] object-cover"
                        src={item?.job_post?.company?.image}
                        alt="company image"
                      />
                      <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {item?.job_post?.title}
                        </h5>
                        <p className="mb-3 flex items-center space-x-1 font-normal text-gray-700 dark:text-gray-400">
                          <FaBuilding className="text-white" size={20} />
                          <span className="text-[0.8rem]">
                            {item?.job_post?.company?.name}
                          </span>
                        </p>
                        <p className="mb-3 flex items-center space-x-1 font-normal text-gray-700 dark:text-gray-400">
                          <MdLocationPin className="text-white" size={20} />
                          <span className="text-[0.8rem]">
                            {item?.job_post?.company?.address}
                          </span>
                        </p>
                        <div className="flex space-x-2 items-center justify-center">
                          <button
                            className="bg-transparent border-2 border-white hover:border-black hover:text-black text-white font-bold py-2 px-6 rounded-full hover:bg-white"
                            onClick={() => {
                              handleCardClick(item?.job_post);
                            }}
                          >
                            View
                          </button>
                          <button
                            className="bg-transparent border-2 border-white hover:border-black hover:text-black text-white font-bold py-2 px-4 rounded-full hover:bg-white"
                            onClick={() => {
                              deleteApplication(item?.id);
                            }}
                          >
                            Cancel
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
      <FormModal
        isVisible={showFormModal}
        onClose={() => setShowFormModal(false)}
        jobDetails={infoModal}
      />
    </div>
  );
};

export default Card;
