import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchAllUsersCartAsync, selectAllCart } from "../cart/cartSlice";
import pics from "../../images/Untitled.jpg";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { createAddress, selectCheckout, transactionmade } from "./checkoutSlice";
import { useFlutterwave, closePaymentModal, FlutterWaveButton } from 'flutterwave-react-v3'
import { selectUser } from "../auth/authSlice";



interface Chechkout{
  fullName: string
  phone: string
  email: string
  country: string
  state: string
  city: string
  address: string
  zipcode: number
}

const CheckOut = () => {
  const [checkOutForm, setCheckOutForm] = useState<Chechkout>({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    state: '',
    city: '',
    address: '',
    zipcode: 0
  })
  const [open, setOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [addressSelected, setAddressSelected] = useState<number>(0);
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const { carts } = useAppSelector(selectAllCart);
  const { addToast } = useToasts();
  const { checkoutInfo } = useAppSelector(selectCheckout)
  const { user } = useAppSelector(selectUser)
  
const handleSelectedAddress = (e: ChangeEvent<HTMLInputElement>, index: number) => {
  setSelectedOption(e.target.value)
 setAddressSelected(index)
}
 

const handleSelectedPayment = (e: ChangeEvent<HTMLInputElement>) => {
  setSelectedOption2(e.target.value)
 // console.log(e.target.value, selectedOption2)
}
console.log('addressof him ', selectedOption2, checkoutInfo[addressSelected])
  const navigate = useNavigate();
  const { id } = useParams()

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckOutForm({...checkOutForm, [name]:value})
  }

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

  const { fullName, phone, email, address, state, city, country, zipcode } = checkOutForm;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {...checkOutForm, id}
    if(data){
      dispatch(createAddress(data)).then((res: any) => {
        console.log('added address: ' ,res, res.payload)
      })
    }

  }

  

const amount = carts && subTotal && subTotal();
const emailAddress = checkoutInfo && checkoutInfo[0] && checkoutInfo[0].email;
const phoneNo = checkoutInfo && checkoutInfo[0] && checkoutInfo[0].phone;
const name = checkoutInfo && checkoutInfo[0] && checkoutInfo[0].fullName;

  const config = {
    public_key: "FLWPUBK_TEST-802764ac81ba56b562f679249112ef7c-X",
    tx_ref: 'mx-' + Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: emailAddress,
      phone_number: phoneNo,
      name: name,
    },
    customizations: {
      title: "Payment for items",
      description: "Payment for items in cart",
      logo: pics,
     },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const informUser = () => {
    addToast('Please Select an existing address and online payment method to pay online', {
      appearance: 'error',
      autoDismiss: true,
    })
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 px-4">
      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12 bg-white px-6">

            <div className="py-6 border-gray-900/10 pb-2">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive your order.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={checkOutForm.fullName}
                      placeholder="Full Name"
                      required
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone 
                  </label>
                  <div className="mt-2">
                    <input
                      type="telephone"
                      name="phone"
                      id="phone"
                      value={checkOutForm.phone}
                      placeholder=" Phone number"
                      required
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
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
                      value={checkOutForm.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={checkOutForm.country}
                      placeholder="Country"
                      required
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={checkOutForm.address}
                      onChange={handleChange}
                      placeholder="Street Address"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={checkOutForm.city}
                      onChange={handleChange}
                      placeholder="city"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={checkOutForm.state}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="zipcode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="zipcode"
                      id="zipcode"
                      autoComplete="zipcode"
                      placeholder="Zip Code"
                      required
                      value={checkOutForm.zipcode}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-end gap-x-6">
             
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add New Address
              </button>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Existing Address
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                choose from existing address.
              </p>

              <div className="mt-1 space-y-10">
                <ul role="list" className="">
                  {checkoutInfo && checkoutInfo.map((address: Chechkout, index: number) => (
                    <li
                      key={address.fullName}
                      className="flex justify-between gap-x-6 px-4 py-5 border-solid border-2 border-gray-300"
                    >
                      <div className="flex min-w-0 gap-x-4">
                      <input
                      name={`address${index}`}
                        type="radio"
                        value={`address${index}`}
                        defaultChecked
                        checked={selectedOption === `address${index}`}
                        onChange={(e) => handleSelectedAddress(e, index)}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                        
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                           {address.fullName}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                           Phone: {address.phone}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                           Address: {address.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex min-w-0 gap-x-4">
                        
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.state}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                             {address.city}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            zipcode: {address.zipcode}
                          </p>
                        </div>
                      </div>
                      
                    </li>
                  ))}
                </ul>

                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Method
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose the payment method that is okay with you.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        name="push-notifications"
                        type="radio"
                        value="cash"
                        checked={selectedOption === "cash"}
                        onChange={handleSelectedPayment}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Pay on Delivery
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        name="onlinepayment"
                        type="radio"
                        value="onlinepayment"
                        checked={selectedOption === "onlinepayment"}
                        onChange={handleSelectedPayment}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Online Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="lg:col-span-2">
        {/* cart */}
        <div className="mx-auto bg-white max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
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
                                className="cursor-pointer bg-indigo-500 border border-indigo-500 rounded-md"
                              >
                                <PlusIcon
                                  className="h-4 w-4 z-20 cursor-pointer"
                                  color="white"
                                />
                              </div>
                              <div
                                onClick={() => handleMinus(cart.id)}
                                className="cursor-pointer bg-indigo-500 border border-indigo-500 rounded-md ml-5"
                              >
                                <MinusIcon
                                  className="z-20 h-4 w-4"
                                  color="white"
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
                              <TrashIcon color="indigo" className="h-6 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
{/* when a order is successful we save to database */}
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${carts && subTotal && subTotal()} </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
           { addressSelected  > -1 && selectedOption2 === 'onlinepayment' ? (
             <div onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response);
                  if(response.status === "successful"){
                    const shippingDetails = checkoutInfo[addressSelected]
                    const details = {
                    user,
                    shippingDetails,
                    carts,
                    response
                  }
                  dispatch(transactionmade(details)).then((res) => {
                    console.log('payment response: ', res)
                    if(res && res.payload && res.payload.status && res.payload.status==="SUCCESSFUL"){
                      localStorage.removeItem('cart')
                      navigate('/order/success')
                    }
                  })
                  closePaymentModal()
                  }
                  
                },
                onClose: () => {
          
                }
              })
            }} className="mt-6 cursor-pointer">
                <div className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                  Pay Now
                </div>
            </div>
           ) : (
             <div onClick={informUser} className="mt-6 cursor-pointer bg-gray-500">
                <div className="flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                  Pay Now
                </div>
            </div>
           )}
           
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
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
    </div>
  );
};

export default CheckOut;
