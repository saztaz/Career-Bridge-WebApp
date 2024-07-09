import jobAnimation from "../../assets/loginAnimation.gif";
import { useForm } from "react-hook-form";
import React from "react";
import { apiURL } from "../../Constant";
import {
  removeFromLocalStorage,
  storeInLocalStorage,
} from "../../utils/manageLocalStorage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginBG from "../../assets/loginBG.jpg";

const LoginPageCompany = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    removeFromLocalStorage("company");
    removeFromLocalStorage("applicant");

    fetch(`${apiURL}/rest-auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        toast("credentials were incorrect!");
        return null;
      })
      .then((data) => {
        if (data == null) return;

        storeInLocalStorage("applicant", data["key"]);
        navigate("/applicantdashboard");
      });
  };

  return (
    <section
      className="bg-gray-50 min-h-screen flex items-center justify-center"
      style={{
        background: `url(${loginBG})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* login container */}
      <div className="flex rounded-2xl shadow-lg max-w-3xl p-5 items-center bg-opacity-50 backdrop-blur-xl bg-gray-300">
        {/* image */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src={jobAnimation}
            alt="Login"
            style={{ backgroundColor: "white" }}
          />
          <p className="mt-6 text-[#002D74] text-center text-sm">
            Hop in the world of job seeking.
          </p>
        </div>
        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-1/2 px-8 md:px-16 w-full flex flex-col "
        >
          <h2 className="font-bold text-[1.4rem] text-[#002D74] mb-6">
            Applicant Login
          </h2>

          <div className="flex flex-col gap-4">
            <input
              {...register("email", { required: "Email is required" })}
              className="p-2 rounded-xl border w-full"
              type="email"
              placeholder="Your Email"
            />
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                className="p-2 rounded-xl border w-full"
                type="password"
                placeholder="Password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>

            {/* Submit  */}
            <input
              className="bg-[#002D74] rounded-xl cursor-pointer text-white py-2 hover:scale-105 duration-300"
              type="submit"
              value="Login"
            />
          </div>

          {/* OR */}
          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          {/* Login Link */}
          <div className="mt-3 space-x-3 text-xs flex justify-between items-center text-[#002D74] mb-4">
            <p>Don't have an account?</p>
            <button
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              onClick={() => {
                navigate("/applicant-registration");
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPageCompany;
