import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import companylogo from "../../images/images-9.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useToasts } from "react-toast-notifications";
import Switch from "react-switch";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { getAUser, loginUser, registerUser, selectUser } from "./authSlice";
import { CircularProgress } from "@material-ui/core";

interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
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

  const { email, password } = formData;
  
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setIsClicked(true)
    if(password) {

      const login = { ...formData, passcode };
      dispatch(loginUser(login)).then((res: any) => {
        if(res && res.payload && res.payload === undefined){        
          setIsClicked(false);
          return;
        }else if(res && res.payload && res.payload.role && res.payload.role === 'ADMIN') {      
          addToast("Successfully Login As Admin", {
            appearance: "success",
            autoDismiss: true,
          });
          setIsClicked(false);
          navigate(`/`);

        }else if(res && res.payload && res.payload.role && res.payload.role === 'USER') {
          const data = {
            id: res && res.payload && res.payload.id,
            token: res && res.payload && res.payload.token,
          };
          setIsClicked(false);
          console.log('data ', data)
         if(data){
          addToast("Successfully Login As User", {
            appearance: "success",
            autoDismiss: true,
          });
          setIsClicked(false);
          navigate("/");

         }

        } else if( res && res.payload && res.payload === 'user does not exist'){
          setIsClicked(false);
          addToast("user does not exist", {
            appearance: "error",
            autoDismiss: true,
          });
        }else if( res && res.payload && res.payload === 'password does not match!'){
          setIsClicked(false);
          addToast("password does not match!", {
            appearance: "error",
            autoDismiss: true,
          });
        }
        else{
          setIsClicked(false);
          return;
        }
        

      });
    } else {
      setIsClicked(false);
      return;
    }
  };

  const changeVisibilty = () => {
    setIsShowPassword(!isShowPassword);
  };

  const changeConfirmVisibilty = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

useEffect(() => {
  
  addToast("Please login to continue", {
    appearance: 'info',
    autoDismiss: true,
  });

}, [])

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center mt-12 px-6 py-1 lg:px-8">
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
          Login to Maven Store Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegister}>
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

          <div className="flex justify-between px-4">
            <div>
              <Switch onChange={handleSwitchElem} height={16} handleDiameter={20} offHandleColor="#991B1B" onHandleColor="#991B1B" checked={ischecked} />
              <p>
                {ischecked ? (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="passcode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Enter Admin Passcode
                      </label>
                    </div>
                    <div className="mt-2 ">
                      <input
                        id="passcode"
                        name="passcode"
                        type="passcode"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        placeholder="Enter Passcode"
                        className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            <div className="text-sm">
              <Link to='/password/link'
                className="font-semibold text-gray-900 hover:text-gray-700"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isClicked && status === "loading" ? (
                <CircularProgress size={25} style={{ color: "brown" }} />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        <Link to="/register">
          <p className="mt-10 text-center text-sm text-gray-900">
            Not a member?{" "}
            <div className="font-semibold leading-6 text-gray-900 hover:text-gray-700">
              Start a 14 day free trial
            </div>
          </p>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Login;
