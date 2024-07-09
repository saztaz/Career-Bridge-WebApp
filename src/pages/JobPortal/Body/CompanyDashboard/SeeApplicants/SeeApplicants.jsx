import React, { forwardRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Navigation } from "swiper/modules";
import Applicantsmodal from "../ApplicantsModal/ApplicantsModal";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { loadFromLocalStorage } from "../../../../../utils/manageLocalStorage";
import { apiURL } from "../../../../../Constant";
import { chunkArray } from "../../../../../utils/functions";

const SeeApplicants = () => {
  const [form, setform] = useState(false);
  const [applications, setApplications] = useState([]);
  const [applicationModal, setApplicationModal] = useState({});

  const handleCardClick = (application) => {
    setApplicationModal(application);
    setform(true);
  };

  // get profile info
  useEffect(() => {
    let token = loadFromLocalStorage("company");

    fetch(`${apiURL}/company/applicants/`, {
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

  return (
    <div className="space-y-5 bg-[#F9FAFB] mt-[3rem]">
      <h1 className="text-4xl font-bold text-center text-[#3670a3]">
        {applications.length === 0 ? "No Applicants" : "Applicants:"}
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
                        src={item?.applicant?.profile_img}
                        alt="applicant image"
                      />
                      <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {item?.applicant?.name}
                        </h5>
                        <p className="mb-3 flex items-center space-x-1 font-normal text-gray-700 dark:text-gray-400">
                          <FaGraduationCap className="text-white" size={20} />
                          <span>{item?.applicant?.university_name}</span>
                        </p>
                        <p className="mb-3 flex items-center space-x-1 font-normal text-[0.7rem] text-gray-700 dark:text-gray-400">
                          <FaBook className="text-white" size={15} />
                          <span>{item?.applicant?.major}</span>
                        </p>
                        <div className="flex items-center justify-center space-x-3 mt-5">
                          <button
                            onClick={() => {
                              handleCardClick(item);
                            }}
                            className="bg-transparent border-2 border-white hover:border-black hover:text-black text-white font-bold py-2 px-6 rounded-full hover:bg-white w-full mx-4"
                          >
                            View
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
      <Applicantsmodal
        isVisible={form}
        onClose={() => setform(false)}
        applicantDetails={applicationModal}
      />
    </div>
  );
};

export default SeeApplicants;
