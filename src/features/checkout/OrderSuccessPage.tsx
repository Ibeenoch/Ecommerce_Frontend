import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { fetchAllUsersCartAsync, selectAllCart } from "../cart/cartSlice";
import Cart from "../cart/Cart";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate } from "react-router-dom";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const OrderSuccessPage = () => {
  const [open, setOpen] = useState(true);
  const { carts } = useAppSelector(selectAllCart);
  const { addToast } = useToasts();
  
  
  useEffect(() => {
    localStorage.removeItem('cart');
    addToast('Thank you for placing from us', {
      appearance: 'info',
      autoDismiss: true
    })
  }, []);

 
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Payment Successfully Made!!!
      </h2>
      <p>
        please notice that your order will be delivered to you within 3 working days
      </p>
    </div>

    <Link to="/">
      <div className="flex justify-center mt-10">
        <button className="flex justify-center align-center rounded-md bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700">
          Continue Shopping
        </button>
      </div>
    </Link>
  </div>
  );
};

export default OrderSuccessPage;
