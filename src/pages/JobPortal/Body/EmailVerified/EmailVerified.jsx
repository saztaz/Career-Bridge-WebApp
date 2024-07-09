import React, { useEffect } from "react";
import HeroHome from "../Home/HeroHome/HeroHome";
import Navbar from "../../Navbar/Navbar";
import AboutUs from "../Home/AboutUs/AboutUs";
import PostJobs from "../Home/PostJobs/PostJobs";
import Card from "../Home/Card/Card";
import styles from "../../../../style";
const EmailVerified = () => {
  useEffect(() => {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 12, spread: 360, ticks: 160, zIndex: 10 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="interfont bg-[#F9FAFB]">
      {/* Navbar */}
      <div className="w-full  shadow-md top-0 sticky z-50 bg-[#F9FAFB]">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth} z-10`}>
            <Navbar animation={true} />
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="flex h-screen w-full">
        <div className="m-auto text-center font-bold text-gray-600">
          <h1 className="text-[2rem] mt-[-8rem]">
            Your Email has been Verified!
          </h1>
          <span className="text-[1rem]">
            You can now login with your verified account!
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;
