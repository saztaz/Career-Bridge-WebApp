import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuCamera } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import jobAnimation from "../../assets/loginAnimation.gif";
import Avatar from "../../assets/upload.png";
import axios from "axios";
import { apiURL } from "../../Constant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginBG from "../../assets/loginBG.jpg";

const RegistrationPage = () => {
  const navigate = useNavigate();

  // State for image preview
  const [image, setImage] = useState(Avatar);
  const [clicked, setclicked] = useState(false);

  // Handle image change
  const handleClick = () => {
    setclicked(true);
  };

  // Form handling with react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImage(base64Image);
        uploadToImgbb(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToImgbb = async (base64Image) => {
    try {
      const formData = new FormData();
      formData.append("image", base64Image.split(",")[1]); // Remove the data:image/png;base64, part
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: "ed67a942812ea90bf6e8f65a6c43c091",
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data.data.url);
        setValue("profile_img", response.data.data.url);
        toast("Image uploaded!");
      } else {
        toast("Couldn't upload image, please try again!");
      }
    } catch (error) {
      console.error("Error uploading image to imgbb", error);
    }
  };

  const onSubmit = (data) => {
    if (!("profile_img" in data)) {
      if (image !== Avatar) {
        toast("Please wait till the image is being uploaded");
        return;
      }
      toast("Please upload your profile image");
      return;
    }

    if (data["password1"].length < 6) {
      toast("Password length cannot be less than 6");
      return;
    }

    if (data["password1"] !== data["password2"]) {
      toast("The passwords do not match");
      return;
    }

    console.log(data);

    fetch(`${apiURL}/applicant/registration/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          toast("A verification email is sent, please login after verifying");
          navigate("/applicant-login");
          return "ok";
        }
        return null;
      })
      .then((data) => {
        if (data == null)
          toast("Couldn't create an account for you, try again");
        console.log(data);
      });
  };

  return (
    <section
      className="bg-gray-50  min-h-screen flex items-center justify-center"
      style={{
        background: `url(${loginBG})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex items-center justify-center rounded-2xl shadow-lg max-w-3xl p-5 overflow-hidden h-[80vh] bg-opacity-50 backdrop-blur-xl bg-gray-300">
          {/* Left Section - Image */}
          <div className="md:w-1/2 hidden md:block">
            <img
              className="rounded-2xl"
              src={jobAnimation}
              alt="Login Animation"
              style={{ backgroundColor: "white" }}
            />
            <p className="mt-6 text-[#002D74] text-center text-sm">
              Hop into the world of job seeking.
            </p>
          </div>

          {/* Right Section - Form */}
          <div
            className={`w-full  h-screen md:w-1/2 flex flex-col items-center justify-center duration-500 px-8 md:px-16 `}
          >
            {/* Upload Image */}
            <div
              className={`${
                clicked
                  ? "top-[-30rem]"
                  : "top-[6rem]"
              } flex flex-col items-center space-y-3 duration-500 absolute`}
            >
              <img
                className="object-cover w-32 h-32 ring-2 ring-purple-500 p-2 rounded-2xl"
                src={image}
                alt="Avatar"
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <div className="flex space-x-2 items-center justify-center bg-white rounded-md border p-2">
                  <span className="text-lg text-slate-500 font-semibold">
                    Upload Image
                  </span>
                  <LuCamera className="text-slate-500" size={20} />
                </div>
                <input
                  // {...register("profilePicture")}
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              <input
                {...register("name", { required: "Name is required" })}
                className="p-2 rounded-xl border"
                type="text"
                placeholder="Your name"
              />

              <input
                {...register("email", { required: "Email is required" })}
                className="p-2 rounded-xl border w-full"
                type="email"
                placeholder="Email"
              />
              <div className="relative">
                <input
                  {...register("password1", {
                    required: "Password is required",
                  })}
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  placeholder="Password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>

              <div className="relative">
                <input
                  {...register("password2", {
                    required: "Password is required",
                  })}
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  placeholder="Confirm Password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>

              {/* Next Arrow */}
              <div
                onClick={handleClick}
                className="flex  bg-white p-2 rounded-full hover:scale-105 duration-200 cursor-pointer"
              >
                <IoIosArrowDown className="text-slate-500" size={25} />
              </div>
            </div>

            {/* Form */}
            <div
              className={`${
                clicked
                  ? "bottom-2 pb-[5rem] pt-[5rem]"
                  : "absolute-div bottom-[-100rem]"
              } duration-500 absolute`}
            >
              <div
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-[15rem] "
              >
                <div className="flex space-x-3 items-center justify-center">
                  <h2 className="font-bold whitespace-no-wrap text-2xl text-[#002D74] mb-5">
                    Applicant Registration
                  </h2>
                  <div
                    onClick={() => setclicked(false)}
                    className="p-2 bg-white hover:scale-105 cursor-pointer rounded-full"
                  >
                    <IoIosArrowUp className="text-slate-500" size={25} />
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="flex flex-col gap-4">
                  <input
                    {...register("university_name", {
                      required: "University is required",
                    })}
                    className="p-2 rounded-xl border w-full"
                    type="text"
                    placeholder="Your University Name"
                  />

                  <input
                    {...register("major", {
                      required: "Major is required",
                    })}
                    className="p-2 rounded-xl border w-full"
                    type="text"
                    placeholder="Your Major"
                  />

                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="p-2 rounded-xl border w-full"
                    placeholder="Description"
                  ></textarea>

                  <input
                    className="bg-[#002D74] rounded-xl cursor-pointer text-white py-2 hover:scale-105 duration-300"
                    type="submit"
                    value="Register"
                  />
                </div>

                {/* OR Divider */}
                <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                  <hr className="border-gray-400" />
                  <p className="text-center text-sm">OR</p>
                  <hr className="border-gray-400" />
                </div>

                {/* Login Link */}
                <div className="mt-3 space-x-3 text-xs flex justify-between items-center text-[#002D74] mb-4">
                  <p>Already have an account?</p>
                  <button
                    className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                    onClick={() => {
                      navigate("/applicant-login");
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RegistrationPage;
