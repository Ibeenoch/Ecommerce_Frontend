import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { fetchAllUsersCartAsync, selectAllCart } from "../cart/cartSlice";
import Cart from "../cart/Cart";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { selectUser } from "../auth/authSlice";
import { addDays, format } from "date-fns";
import {
  atransactionOfAUser,
  getAUserTransaction,
  selectCheckout,
} from "./checkoutSlice";
import { getATransactionforAUser } from "./checkOutApi";

const OrderSuccessPage = () => {
  const [open, setOpen] = useState(true);
  const { carts } = useAppSelector(selectAllCart);
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { aUserTransactions, aUserOrderedProducts, aUserShippingAddress } =
    useAppSelector(selectCheckout);
  const { addToast } = useToasts();
  const { id } = useParams();
  const userId = user && user.id;
  const token = user && user.token;
  useEffect(() => {
    const data = {
      id,
      userId,
      token,
    };

    dispatch(atransactionOfAUser(data))
      .then((res: any) => {
        console.log("fetch the details ", res.payload);
      })
      .then((res: any) => {
        addToast("Thank you for placing from us", {
          appearance: "info",
          autoDismiss: true,
        });
      });

    console.log("data ", data);
  }, []);

  console.log("aUserTransactions ", aUserTransactions);

  const calculateTotal = () => {
    const total =
      aUserTransactions &&
      aUserTransactions.order &&
      aUserTransactions.order.productDetails &&
      aUserTransactions.order.productDetails.reduce(
        (acc: any, cur: any) => acc + cur.price * cur.quantity,
        0
      );
    return total;
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-11">
            Your Order and Payment Successfully Confirmed
          </h2>
          <h6 className="font-medium text-xl leading-8 text-black mb-3">
            Hello, {user.fullName}
          </h6>
          <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
            Your order and payment has been confirmed and be delivered in the
            next 3 days .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-6 border-y border-gray-100 mb-6">
            <div className="box group">
              <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                Set Delivery Date
              </p>
              <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
                {!Object.keys(aUserTransactions).length ? (
                  <></>
                ) : (
                  <>
                    {format(
                      addDays(aUserTransactions.createdAt, 3),
                      "MM dd, yyyy"
                    )}
                  </>
                )}
              </h6>
            </div>
            <div className="box group">
              <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                Order
              </p>
              <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
                {!Object.keys(aUserTransactions).length ? (
                  <></>
                ) : (
                  <>
                    #
                    {aUserTransactions &&
                      aUserTransactions.paymentDetails &&
                      aUserTransactions.paymentDetails.tx_ref}
                  </>
                )}{" "}
              </h6>
            </div>
            <div className="box group">
              <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                Payment Method
              </p>
              <div className="flex">
                <WalletIcon width={30} height={30} fill="brown" color="white" />
                <strong>FlutterWave</strong>
              </div>
            </div>
            <div className="box group">
              <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                Address
              </p>
              <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
                {user.address}
              </h6>
            </div>
          </div>

          {!Object.keys(aUserTransactions).length ? (
            <div>
              Network issues please connect to a good network or refresh the
              browser to continue
            </div>
          ) : (
            <>
              {aUserTransactions &&
                aUserTransactions.order &&
                aUserTransactions.order.productDetails &&
                aUserTransactions.order.productDetails.map((product: any) => (
                  <div className="grid grid-cols-7 w-full pb-6 border-b border-gray-100">
                    <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                      <img
                        src={
                          product && product.thumbnail && product.thumbnail.url
                        }
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                      <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                        <div className="">
                          <h5 className="font-manrope font-semibold text-2xl leading-9 text-black mb-6">
                            {product && product.title}
                          </h5>
                          <p className="font-normal text-xl leading-8 text-gray-500">
                            Quantity :{" "}
                            <span className="text-black font-semibold">
                              {product && product.quantity}
                            </span>
                          </p>
                        </div>
                        <h5 className="font-manrope font-semibold text-3xl leading-10 text-black sm:text-right mt-3">
                          ${product && product.price * product.quantity}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}

          <div className="flex items-center justify-center sm:justify-end w-full my-6">
            <div className=" w-full">
              <div className="flex items-center justify-between mb-6">
                <p className="font-normal text-xl leading-8 text-gray-500">
                  Subtotal
                </p>
                <p className="font-semibold text-xl leading-8 text-gray-900">
                  $240.00
                </p>
              </div>
              <div className="flex items-center justify-between mb-6">
                <p className="font-normal text-xl leading-8 text-gray-500">
                  Shipping Charge
                </p>
                <p className="font-semibold text-xl leading-8 text-gray-900">
                  $12.00
                </p>
              </div>
              <div className="flex items-center justify-between mb-6">
                <p className="font-normal text-xl leading-8 text-gray-500">
                  Taxes
                </p>
                <p className="font-semibold text-xl leading-8 text-gray-900">
                  $5.00
                </p>
              </div>
              <div className="flex items-center justify-between mb-6">
                <p className="font-normal text-xl leading-8 text-gray-500">
                  Discount
                </p>
                <p className="font-semibold text-xl leading-8 text-gray-900">
                  $15.00
                </p>
              </div>
              <div className="flex items-center justify-between py-6 border-y border-gray-100">
                <p className="font-manrope font-semibold text-2xl leading-9 text-gray-900">
                  Total
                </p>
                <p className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                  ${calculateTotal()}
                </p>
              </div>
            </div>
          </div>
          <div className="data ">
            <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
              you'll receive a shipping confirmation email when the items
              shipped successfully.
            </p>
            <h6 className="font-manrope font-bold text-2xl leading-9 text-black mb-3">
              Thank you for shopping with us!
            </h6>
            <p className="font-medium text-xl leading-8 text-gray-800">
              Maven Store
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderSuccessPage;
