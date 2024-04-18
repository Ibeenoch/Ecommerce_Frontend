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
  
  const navigate = useNavigate();


  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUsersCartAsync());
  }, []);

  const handleAdd = (id: number): void => {
    const checkItem = JSON.parse(localStorage.getItem("cart") as any);

    if (checkItem.length === 1) {
      checkItem.quantity++;
      localStorage.setItem("cart", JSON.stringify(checkItem));
      dispatch(fetchAllUsersCartAsync());
    } else {
      if (checkItem && Array.isArray(checkItem)) {
        const index = checkItem.findIndex((item: any) => item.id === id);
        checkItem[index].quantity++;
        localStorage.setItem("cart", JSON.stringify(checkItem));
        dispatch(fetchAllUsersCartAsync());
      }
    }
  };
  const handleMinus = (id: number): void => {
    const checkItem = JSON.parse(localStorage.getItem("cart") as any);

    if (checkItem.length === 1) {
      return;
    } else {
      if (checkItem && Array.isArray(checkItem)) {
        const index = checkItem.findIndex((item: any) => item.id === id);
        if (checkItem[index].quantity === 1) {
          return;
        }
        checkItem[index].quantity--;
        localStorage.setItem("cart", JSON.stringify(checkItem));
        dispatch(fetchAllUsersCartAsync());
      }
    }
  };

  const handleRemove = (id: any) => {
    var checkItem = JSON.parse(localStorage.getItem("cart") as any);
    if (checkItem && Array.isArray(checkItem)) {
      const index = checkItem.findIndex((item) => item.id === id);
      checkItem.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(checkItem));
      dispatch(fetchAllUsersCartAsync());
    } else {
      checkItem = {};
      localStorage.setItem("cart", JSON.stringify(checkItem));
      dispatch(fetchAllUsersCartAsync()).then(() => {
        navigate("/");
      });
    }
  };

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
