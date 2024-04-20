import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import companylogo from "../../images/images-9.png";
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
  const [isClicked, setIsClicked] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const { addToast } = useToasts();
  const { status, user } = useAppSelector(selectUser);

  const handleSwitchElem = (checked: boolean) => {
    setIsChecked(checked);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { fullname, email, password, confirmPassword } = formData;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@_!#$%^&*(),.?":{}|<>]).{8,}$/;

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    console.log('testing ', passwordRegex.test(password))
    setIsClicked(true)
    if (passwordRegex.test(password)) {
      //continue
      if (confirmPassword !== password) {
        addToast("password do not match!!!", {
          appearance: "warning",
          autoDismiss: true,
        });
        setIsChecked(false);
      }
      const register = { ...formData, passcode };
      dispatch(registerUser(register)).then((res) => {
        if(res && res.payload && res.payload === 'user already exist'){
          addToast("user already exist", {
            appearance: "warning",
            autoDismiss: true,
          });
          setIsChecked(false);
        }else if(res && res.payload && res.payload.role && res.payload.role === 'ADMIN'){
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
          setIsChecked(false);
          return;
        }
        
      });
    } else {
      addToast(
        "Password must be eight characters including one uppercase letter, one special character and alphanumeric characters e.g Password1!",
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
    <div className="flex min-h-full flex-1 flex-col mt-12 justify-center px-6 py-1 lg:px-8">
      <div className="shadow-lg">
      <div className="sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
      <Link to='/'> 
       <div style={{ width: '40px', height: '40px', marginLeft: '40%', borderRadius: '50%' , background: 'red', overflow: 'hidden'}}>
         <img
          className="mx-auto h-10 w-auto"
          src={companylogo}
          alt="Your Company"
        />
       </div>
      
        </Link>
        <h2 className="mt-5 text-center text-lg font-bold leading-4 tracking-tight text-gray-900">
          Sign Up to Maven Store
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
              <div
                onClick={changeVisibilty}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-30"
              >
                {isShowPassword ? (
                  <EyeIcon color="brown" className="w-4 h-4 z-30" />
                ) : (
                  <EyeSlashIcon color="brown" className="w-4 h-4 z-30" />
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
              <div
                onClick={changeConfirmVisibilty}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-30"
              >
                {isShowConfirmPassword ? (
                  <EyeIcon color="brown" className="w-4 h-4 z-30" />
                ) : (
                  <EyeSlashIcon color="brown" className="w-4 h-4 z-30" />
                )}
              </div>
            </div>
          </div>

          <div>
            <Switch onChange={handleSwitchElem}  height={16} handleDiameter={20} offHandleColor="#991B1B" onHandleColor="#991B1B" checked={ischecked} />
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
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
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
              className="flex w-full justify-center rounded-md bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              { isClicked && status === "loading" ? (
                <CircularProgress size={25} style={{ color: "white" }} />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <Link to="/login">
          <p className="mt-10 text-center text-sm text-gray-900">
            Already a member?{" "}
            <div className="font-semibold leading-6 text-gray-900 hover:text-gray-500">
              Please Login in
            </div>
          </p>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default SignUp;
