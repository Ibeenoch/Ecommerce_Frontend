import { Link, useParams } from "react-router-dom";
import companylogo from "../../images/images-9.png";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { emailLink, selectUser, userVerification } from "./authSlice";
import { CircularProgress } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

const PasswordRecovery = () => {
  const [email, setEmail] = useState<string>("");
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { addToast } = useToasts();
  const { status } = useAppSelector(selectUser)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = { email, addToast };
    dispatch(emailLink(data)).then((res: any) => {
       if (res && res.payload && res.payload.message) {
        addToast("Password Recovery Mail Sent", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    });
  };

  const hexcode = '#DEB887'
  

  return (
    <div style={{ background: hexcode, height: '100vh'}} className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <Link to='/'> 
       <div style={{ width: '40px', height: '40px', marginLeft: '40%', borderRadius: '50%' , background: 'red', overflow: 'hidden'}}>
         <img
          className="mx-auto h-10 w-auto"
          src={companylogo}
          alt="Your Company"
        />
       </div>
      
        </Link>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="Email Address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <p className="mt-5 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
            Please enter your email address to continue
          </p>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
             
              {status === "loading" ? (
                <CircularProgress size={25} style={{ color: "white" }} />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;
