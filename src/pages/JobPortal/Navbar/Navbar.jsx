import React, { useLayoutEffect, useRef, useState } from "react";
import Logo from "../../../assets/loginAnimation.gif";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
// Gsap
import gsap from "gsap";
import {
  existsInLocalStorage,
  removeFromLocalStorage,
} from "../../../utils/manageLocalStorage";
import Profile from "../../../assets/profile.png";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ animation }) => {
  // Gsap
  const comp = useRef(null);

  useLayoutEffect(() => {
    if (animation) {
      const ctx = gsap.context(() => {
        gsap.from("#headlineLogo", {
          y: -40,
          opacity: 0,
          delay: 0.4,
        });
        gsap.from("#navitems #navitem", {
          y: -40,
          opacity: 0,
          delay: 0.4,
          stagger: 0.1,
        });
      }, comp);

      return () => ctx.revert();
    }
  }, []);
  // Main
  const [openClose, setopenClose] = useState(true);
  const navigate = useNavigate();
  return (
    <div
      ref={comp}
      className="interfont flex items-center justify-between p-3 "
    >
      <div
        id="headlineLogo"
        className="rounded-full flex items-center justify-between space-x-2"
      >
        <img
          onClick={() => {
            navigate("/");
          }}
          className="w-[2.7rem] h-[2.7rem] cursor-pointer"
          src={Logo}
          alt="Logo"
        />
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center justify-center space-x-1 text-xl font-bold cursor-pointer"
        >
          <span className="text-[#9773df]">Career</span>
          <span>Bridge</span>
        </h1>
      </div>
      {/* pc */}
      <div
        id="navitems"
        className="links hidden md:flex items-center text-[#404040]  space-x-8 font-md"
      >
        <div
          id="navitem"
          onClick={() => {
            navigate("/");
          }}
          className="nav-item  cursor-pointer font-semibold"
        >
          Home
        </div>

        {existsInLocalStorage("company") ? (
          <>
            <div
              id="navitem"
              onClick={() => {
                navigate("/companyDashboard");
              }}
              className="nav-item  cursor-pointer font-semibold"
            >
              Dashboard
            </div>
            <div
              id="navitem"
              onClick={() => {
                navigate("/Companyprofile");
              }}
              className="cursor-pointer"
            >
              <img
                className="rounded-full w-[3rem] h-[3rem] object-cover"
                src={Profile}
                alt=""
              />
            </div>
            <div
              id="navitem"
              onClick={() => {
                removeFromLocalStorage("applicant");
                removeFromLocalStorage("company");
                location.reload();
                location.href = "/";
              }}
              className="cursor-pointer text-[#273491]"
            >
              <FaSignOutAlt size={30} />
            </div>
          </>
        ) : existsInLocalStorage("applicant") ? (
          <>
            <div
              id="navitem"
              onClick={() => {
                navigate("/applicantdashboard");
              }}
              className="nav-item  cursor-pointer font-semibold"
            >
              Dashboard
            </div>
            <div
              id="navitem"
              onClick={() => {
                navigate("/jobs");
              }}
              className="nav-item  cursor-pointer font-semibold"
            >
              Find jobs
            </div>
            <div
              id="navitem"
              onClick={() => {
                navigate("/ApplicantProfile");
              }}
              className="cursor-pointer"
            >
              <img
                className="rounded-full w-[3rem] h-[3rem] object-cover"
                src={Profile}
                alt=""
              />
            </div>
            <div
              id="navitem"
              onClick={() => {
                removeFromLocalStorage("applicant");
                removeFromLocalStorage("company");
                location.href = "/";
              }}
              className="cursor-pointer text-[#273491]"
            >
              <FaSignOutAlt size={30} />
            </div>
          </>
        ) : (
          <>
            <div
              id="navitem"
              onClick={() => {
                navigate("/job-api");
              }}
              className="nav-item  cursor-pointer font-semibold"
            >
              More Jobs
            </div>
            <div
              id="navitem"
              onClick={() => {
                navigate("/applicant-login");
              }}
              className="bg-[#181e6f] text-white px-4 py-2 rounded-lg cursor-pointer font-semibold hover:bg-[#2d39a6]"
            >
              Applicant Login
            </div>
            <div
              id="navitem"
              onClick={() => {
                navigate("/company-login");
              }}
              className="bg-[#181e6f] text-white px-4 py-2 rounded-lg cursor-pointer font-semibold hover:bg-[#2d39a6]"
            >
              Company Login
            </div>
          </>
        )}

        {/* <div className="nav-item  cursor-pointer font-semibold">Contact Us</div> */}
      </div>
      {/* Mobile */}
      <div className="block md:hidden cursor-pointer">
        <div onClick={() => setopenClose((prev) => !prev)}>
          <GiHamburgerMenu />
        </div>
        <div
          className={`${
            openClose ? "hidden" : "flex"
          } custom879:hidden flex-col bg-[#F9FAFB] h-screen items-start flex-1  space-y-4 fixed top-[4rem] overflow-x-hidden right-0 min-w-[9.5rem] p-4 sidebar`}
        >
          <div
            onClick={() => {
              navigate("/");
            }}
            className="nav-item  cursor-pointer font-semibold"
          >
            Home
          </div>
          {existsInLocalStorage("company") ? (
            <>
              <div
                onClick={() => {
                  navigate("/companyDashboard");
                }}
                className="nav-item  cursor-pointer font-semibold"
              >
                Dashboard
              </div>
              <div
                onClick={() => {
                  navigate("/Companyprofile");
                }}
                className="nav-item  cursor-pointer font-semibold"
              >
                Profile
              </div>
            </>
          ) : existsInLocalStorage("applicant") ? (
            <>
              <div
                onClick={() => {
                  navigate("/applicantdashboard");
                }}
                className="nav-item  cursor-pointer font-semibold"
              >
                Dashboard
              </div>
              <div
                onClick={() => {
                  navigate("/ApplicantProfile");
                }}
                className="nav-item  cursor-pointer font-semibold"
              >
                Profile
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  navigate("/applicant-login");
                }}
                className="nav-item  cursor-pointer font-semibold"
              >
                Applicant Login
              </div>
              <div
                onClick={() => {
                  navigate("/company-login");
                }}
                className="nav-item  cursor-pointer font-semibold"
              >
                Company Login
              </div>
              <div
                onClick={() => {
                  navigate("/job-api");
                }}
                className="nav-item cursor-pointer font-semibold"
              >
                More Jobs
              </div>
            </>
          )}
          {/* <div className="nav-item  cursor-pointer font-semibold">
            Contact Us
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
