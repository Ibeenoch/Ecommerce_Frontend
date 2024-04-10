import { Link, useParams } from "react-router-dom";
import companylogo from "../../images/Untitled.jpg";

import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { userVerification } from "./authSlice";

const Verification = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch()

    useEffect(()=> {
      dispatch(userVerification(id))
    }, [])

  return (
    <div>
        {id ? (<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={companylogo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Email Verification Successfully
          </h2>
        </div>

        <Link to="/">
          <div className="flex justify-center mt-10">
            <button className="flex justify-center align-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Proceed to Home Page
            </button>
          </div>
        </Link>
      </div>) : (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={companylogo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Your Account is Successfully Created
          </h2>
          <p className="mt-5 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
            A message has been send to your email,  please verify your email address to continue
          </p>
        </div>

       
      </div>
      )}
            
    </div>
  );
};

export default Verification;
