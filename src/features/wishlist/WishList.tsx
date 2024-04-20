import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { selectUser } from "../auth/authSlice";
import { fetchAllUsersWishListAsync, selectAllWishList } from "./wishListSlice";
import { addtocart, fetchAllUsersCartAsync } from "../cart/cartSlice";
import { getAproduct } from "../ProductList/ProductSlice";

const WishList = () => {
  const [open, setOpen] = useState(true);
  const { wishlist } = useAppSelector(selectAllWishList);
  const { user } = useAppSelector(selectUser);
  const { addToast } = useToasts();

  const navigate = useNavigate();

  const subTotal = () => {
    const subtotal = wishlist.reduce(
      (accumulatedSubtotal: any, item: any) =>
        accumulatedSubtotal + item.price * item.quantity,
      0
    );
    return subtotal.toFixed(2);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUsersWishListAsync());
  }, []);

  const handleAddCart = (productId: any) => {
    const quantity = 1;
    dispatch(getAproduct(productId)).then((res) => {
      const receive = res.payload;
      const data = { ...receive, quantity };
      const dataitem = { data, addToast };
      dispatch(addtocart(dataitem));
    });
  };

  const handleMinus = (id: number): void => {
    const checkItem = JSON.parse(localStorage.getItem("wishlist") as any);

    if (checkItem.length === 1) {
      return;
    } else {
      if (checkItem && Array.isArray(checkItem)) {
        const index = checkItem.findIndex((item: any) => item.id === id);
        if (checkItem[index].quantity === 1) {
          return;
        }
        checkItem[index].quantity--;
        localStorage.setItem("wishlist", JSON.stringify(checkItem));
        dispatch(fetchAllUsersWishListAsync());
      }
    }
  };

  const handleRemove = (id: any) => {
    var checkItem = JSON.parse(localStorage.getItem("wishlist") as any);
    if (checkItem && Array.isArray(checkItem)) {
      const index = checkItem.findIndex((item) => item.id === id);
      checkItem.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(checkItem));
      dispatch(fetchAllUsersWishListAsync());
    } else {
      checkItem = {};
      localStorage.setItem("wishlist", JSON.stringify(checkItem));
      dispatch(fetchAllUsersWishListAsync()).then(() => {
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
                {wishlist &&
                  wishlist.map((wish: any) => (
                    <li key={wish.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={wish && wish.thumbnail && wish.thumbnail.url}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <div>{wish.title}</div>
                            </h3>
                            <p className="ml-4">${wish.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500"></p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div
                            onClick={() => handleAddCart(wish.id)}
                            className="flex cursor-pointer rounded-full bg-red-800 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:opacity-50 hover:text-white dark:hover:bg-red-700 px-4 py-2"
                          >
                            <ShoppingBagIcon width={30} height={20} />{" "}
                            <div>Add To Cart</div>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => handleRemove(wish.id)}
                              className="font-medium text-red-800 hover:text-red-700"
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
              <p>${wishlist && subTotal && subTotal()} </p>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <Link to="/">
                  <button
                    type="button"
                    className="flex cursor-pointer rounded-full bg-red-800 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:opacity-50 hover:text-white dark:hover:bg-red-700 px-4 py-2"
                    onClick={() => setOpen(false)}
                  >
                    <strong> Continue Shopping</strong>
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

export default WishList;
