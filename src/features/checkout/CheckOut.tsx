import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchAllUsersCartAsync, selectAllCart } from "../cart/cartSlice";
import Cart from "../cart/Cart";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { createAddress } from "./checkoutSlice";

interface Chechkout{
  fullName: string
  phone: string
  email: string
  country: string
  state: string
  city: string
  street: string
  zipCode: number
}

const CheckOut = () => {
  const [checkOutForm, setCheckOutForm] = useState<Chechkout>({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    state: '',
    city: '',
    street: '',
    zipCode: 0
  })
  
  const [open, setOpen] = useState(true);
  const { carts } = useAppSelector(selectAllCart);
  const { addToast } = useToasts();
  const products = [
    {
      id: 1,
      name: "Throwback Hip Bag",
      href: "#",
      color: "Salmon",
      price: "$90.00",
      quantity: 1,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
      imageAlt:
        "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
    },
    {
      id: 2,
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt:
        "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    // More products...
  ];

  const navigate = useNavigate();
  const { id } = useParams()

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target.value)
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

  const { fullName, phone, email, street, state, city, country, zipCode } = checkOutForm;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {...checkOutForm, id}
    console.log(data);
    if(data){
      dispatch(createAddress(data)).then((res: any) => {
        console.log('added address: ' ,res, res.payload)
      })
    }

  }

  const addresses = [
    {
      name: "Leslie Alexander",
      street: "44, adejones street",
      city: "ikoyi",
      state: 'Lagos',
      zipcode: "180678",
      phone: "2067568945",
    },
    {
      name: "Michael Foster",
      street: "18, markson avenue",
      city: "Ikeja",
      state: 'Lagos',
      zipcode: "562346",
      phone: "202340945",
    },
   
  ];
 

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
                      type="number"
                      name="phone"
                      id="phone"
                      value={checkOutForm.phone}
                      placeholder="  Phone number"
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
                    htmlFor="street"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street"
                      id="street"
                      value={checkOutForm.street}
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
                    htmlFor="zipCode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="zipCode"
                      id="zipCode"
                      autoComplete="zipCode"
                      placeholder="Zip Code"
                      required
                      value={checkOutForm.zipCode}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
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
                  {addresses.map((address) => (
                    <li
                      key={address.name}
                      className="flex justify-between gap-x-6 px-4 py-5 border-solid border-2 border-gray-300"
                    >
                      <div className="flex min-w-0 gap-x-4">
                      <input
                      name="address"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                        
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                           {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                           Phone: {address.phone}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                           Address: {address.street}
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
                            ZipCode: {address.zipcode}
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
                    Choose the payment method that is okay to you.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
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
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
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
                          className="h-full w-full object-cover object-center"
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

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${carts && subTotal && subTotal()} </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link to="/checkout">
                <div className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                  Checkout
                </div>
              </Link>
            </div>
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
