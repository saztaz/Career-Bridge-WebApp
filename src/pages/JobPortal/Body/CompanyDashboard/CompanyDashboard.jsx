import React, { useRef, useState } from "react";
import FormModal from "./FormModal/FormModal";
import PostedJob from "./PostedJob/PostedJob";
import style from "../../../../style";
// import CompanyNav from "../CompanyDashboard/CompanyNav/CompanyNav";
import Navbar from "../../Navbar/Navbar";
import SeeApplicants from "./SeeApplicants/SeeApplicants";
import { apiURL } from "../../../../Constant";
import { useEffect } from "react";
import { loadFromLocalStorage } from "../../../../utils/manageLocalStorage";

const ApplicantDashboard = () => {
  const ref = useRef(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [Applicants, setApplicants] = useState(false);

  const handleClickJob = () => {
    setShowFormModal(true);
    setApplicants(false);
  };
  const handleClickSeepostedjobs = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setApplicants(false);
  };
  const handleClickApplicants = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setApplicants(true);
  };

  // company info
  const [companyInfo, setCompanyData] = useState({
    name: "",
    image: "",
    address: "",
    description: "",
  });
  const [isLoading, setLoading] = useState(true);

  // get profile info
  useEffect(() => {
    let token = loadFromLocalStorage("company");

    fetch(`${apiURL}/company/profile/`, {
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
        setCompanyData(data);
      });
  }, []);

  return (
    <div>
      <div className="w-full  shadow-md top-0 sticky z-50 bg-[#F9FAFB]">
        <div className={`${style.paddingX} ${style.flexCenter}`}>
          <div className={`${style.boxWidth} z-10`}>
            <Navbar />
          </div>
        </div>
      </div>
      {!isLoading ? (
        <section className="pt-10 h-screen overflow-hidden  md:pt-0 sm:pt-16 2xl:pt-16">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid items-center grid-cols-1 md:grid-cols-2">
              <div>
                <div>
                  <h2 className="text-3xl font-bold text-[#3670a3] leading-tight  sm:text-4xl lg:text-5xl">
                    {companyInfo?.name}
                  </h2>
                  <p className="max-w-lg flex flex-col space-y-1  mt-3 text-xl leading-relaxed text-gray-600 md:mt-8 mb-4">
                    <span className="">
                      <span className="font-bold text-[#3670a3]">
                        Address:{" "}
                      </span>
                      <span className="text-[#3670a3]">
                        {companyInfo?.address}
                      </span>
                    </span>
                    <span>
                      <span className="font-bold text-[#3670a3]">
                        Description:{" "}
                      </span>
                      <br />
                      <span className="text-[#3670a3]">
                        {companyInfo?.description}
                      </span>
                    </span>
                  </p>

                  <div
                    onClick={handleClickJob}
                    className="mt-3 font-semibold px-4 py-2 text-lg cursor-pointer inline-block bg-transparent text-[#3670a3] hover:bg-[#3670a3] hover:text-white duration-300 rounded-md border-[#3670a3] border-2"
                  >
                    Post Job
                  </div>
                  <div className="flex space-x-3">
                    <div
                      onClick={handleClickSeepostedjobs}
                      className="mt-3 font-semibold px-4 py-2 text-lg cursor-pointer inline-block bg-transparent text-[#3670a3] hover:bg-[#3670a3] hover:text-white duration-300 rounded-md border-[#3670a3] border-2"
                    >
                      See posted jobs
                    </div>
                    <div
                      onClick={handleClickApplicants}
                      className="mt-3 font-semibold px-4 py-2 text-lg cursor-pointer inline-block bg-transparent text-[#3670a3] hover:bg-[#3670a3] hover:text-white duration-300 rounded-md border-[#3670a3] border-2"
                    >
                      See Applicants
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg"
                  alt=""
                />

                <img
                  className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/business-woman.png"
                  alt=""
                />
              </div>
              {/* FormModal */}
              <FormModal
                isVisible={showFormModal}
                onClose={() => setShowFormModal(false)}
              />
            </div>
          </div>
        </section>
      ) : (
        <div className="flex h-screen w-full">
          <div className="m-auto text-center font-bold text-[1.5rem]">
            <h3 className="text-gray-600">Loading</h3>
          </div>
        </div>
      )}
      <div ref={ref}>{Applicants ? <SeeApplicants /> : <PostedJob />}</div>
    </div>
  );
};

export default ApplicantDashboard;
