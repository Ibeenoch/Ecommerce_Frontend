import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import companylogo from "../../images/Untitled.jpg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useToasts } from "react-toast-notifications";
import Switch from "react-switch";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { registerUser, selectUser } from "./authSlice";
import { CircularProgress } from "@material-ui/core";

interface Register {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<Register>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passcode, setPasscode] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ischecked, setIsChecked] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const { addToast } = useToasts();
  const { status, user } = useAppSelector(selectUser);

  const handleSwitchElem = (checked: boolean) => {
    setIsChecked(checked);
  };
  console.log("switch: ", ischecked, passcode);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { fullname, email, password, confirmPassword } = formData;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (passwordRegex.test(password)) {
      //continue
      if (confirmPassword !== password) {
        addToast("password do not match!!!", {
          appearance: "warning",
          autoDismiss: true,
        });
      }
      const register = { ...formData, passcode };
      console.log("registeration: ", register);
      dispatch(registerUser(register)).then((res) => {
        console.log('admin signup: ', res, res.payload)
        if(res && res.payload && res.payload.role && res.payload.role === 'ADMIN'){
          addToast("Registered As Admin Successful", {
            appearance: "success",
            autoDismiss: true,
          });
          navigate("/");
        }else if(res && res.payload && res.payload.role && res.payload.role === 'USER'){
          addToast("Registration Successful", {
            appearance: "success",
            autoDismiss: true,
          });
          navigate("/verify/email");
        }else{
          addToast("Registration Failed, Something went wrong", {
            appearance: "error",
            autoDismiss: true,
          });
          return;
        }
        
      });
    } else {
      addToast(
        "the password must be at least 8 character, the password should contain a upper case letter, the password should contain a lower case letter, the password should contain a number, the password should contain a special character e.g Password1!",
        {
          appearance: "warning",
          autoDismiss: true,
        }
      );
    }
  };

  const changeVisibilty = () => {
    setIsShowPassword(!isShowPassword);
  };

  const changeConfirmVisibilty = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-0 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/">
          <img
            className="mx-auto h-10 w-auto"
            src={companylogo}
            alt="Your Company"
          />
        </Link>
        <h2 className="mt-10 text-center text-2xl font-bold leading-4 tracking-tight text-gray-900">
          Sign Up to Maven Store
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="fullname"
                name="fullname"
                type="text"
                onChange={handleChange}
                value={formData.fullname}
                required
                placeholder=" Surname Firstname"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                required
                placeholder="Email Address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={isShowPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div
                onClick={changeVisibilty}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-30"
              >
                {isShowPassword ? (
                  <EyeIcon color="indigo" className="w-4 h-4 z-30" />
                ) : (
                  <EyeSlashIcon color="indigo" className="w-4 h-4 z-30" />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
             
            </div>
            <div className="mt-2 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={isShowConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Your Password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div
                onClick={changeConfirmVisibilty}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-30"
              >
                {isShowConfirmPassword ? (
                  <EyeIcon color="indigo" className="w-4 h-4 z-30" />
                ) : (
                  <EyeSlashIcon color="indigo" className="w-4 h-4 z-30" />
                )}
              </div>
            </div>
          </div>

          <div>
            <Switch onChange={handleSwitchElem} checked={ischecked} />
            <p>
              {ischecked ? (
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="passcode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Enter Admin Passcode
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="passcode"
                      name="passcode"
                      type="passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter Passcode"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <label
                    htmlFor="passcode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    I am not the Admin
                  </label>
                </>
              )}
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {status === "loading" ? (
                <CircularProgress size={25} style={{ color: "white" }} />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <Link to="/login">
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <div className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Please Login in
            </div>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
