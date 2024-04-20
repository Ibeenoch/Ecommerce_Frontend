import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllUsersCartAsync, selectAllCart } from "./cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { selectUser } from "../auth/authSlice";

const Cart = () => {
  const [open, setOpen] = useState(true);
  const { carts } = useAppSelector(selectAllCart);
  const user = JSON.parse(localStorage.getItem('user') as any)
  const { addToast } = useToasts();
  
  const navigate = useNavigate();

  const subTotal = () => {
    const subtotal = carts.reduce(
      (accumulatedSubtotal: any, item: any) =>
        accumulatedSubtotal + item.price * item.quantity,
      0
    );
    return subtotal.toFixed(2);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUsersCartAsync());
  }, []);


  const handleAdd = (id: number): void => {
    const checkItem = JSON.parse(localStorage.getItem("cart") as any);
    if (checkItem.length === 1) {
       console.log('types ', typeof checkItem)
      checkItem[0].quantity++;
      console.log('updated ', checkItem)
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
      if(checkItem[0].quantity === 1){
        return;
      }else{
        checkItem[0].quantity--;
        console.log('updated minus', checkItem)
      localStorage.setItem("cart", JSON.stringify(checkItem));
      dispatch(fetchAllUsersCartAsync());
      }
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
    <>
      <div>
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {carts &&
                  carts.map((cart: any) => (
                    <li key={cart.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={cart && cart.thumbnail && cart.thumbnail.url}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <div>{cart.title}</div>
                            </h3>
                            <p className="ml-4">${cart.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500"></p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Qty {cart.quantity}
                            {/* add or minus qty */}
                            <div className="width-full flex justify-between px-1 py-1 bg-white-600 ">
                              <div
                                onClick={() => handleAdd(cart.id)}
                                className="cursor-pointer bg-red-800 border border-red-800 rounded-md"
                              >
                                <PlusIcon
                                  className="h-4 w-4 z-20 cursor-pointer"
                                  color="white"
                                  fill="white"
                                />
                              </div>
                              <div
                                onClick={() => handleMinus(cart.id)}
                                className="cursor-pointer bg-red-800 border border-red-800 rounded-md ml-5"
                              >
                                <MinusIcon
                                  className="z-20 h-4 w-4"
                                  color="white"
                                  fill="white"
                                />
                              </div>
                            </div>
                          </p>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => handleRemove(cart.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              <TrashIcon color="brown" className="h-6 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${carts && subTotal && subTotal()} </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
             { user ? (
               <Link to={`/checkout/${user.id}`}>
               <div className="flex items-center justify-center rounded-md border border-transparent bg-red-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700">
                 Checkout
               </div>
             </Link>
             ) : (
              <Link to='/login'>
              <div className="flex items-center justify-center rounded-md border border-transparent bg-red-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700">
                Checkout
              </div>
            </Link>
             )}
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-gray-900 hover:text-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
