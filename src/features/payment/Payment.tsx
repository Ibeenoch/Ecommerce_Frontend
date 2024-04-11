import React from 'react'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchAllUsersCartAsync, selectAllCart } from "../cart/cartSlice";
import Cart from "../cart/Cart";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { createAddress, selectCheckout } from "../checkout/checkoutSlice";

interface Chechkout{
  fullName: string
  phone: string
  email: string
  amount: number
}
const Payment = () => {
    const [checkOutForm, setCheckOutForm] = useState<Chechkout>({
        fullName: '',
        phone: '',
        email: '',
        amount: 0
      })
      
      const [open, setOpen] = useState(true);
      const { carts } = useAppSelector(selectAllCart);
      const { addToast } = useToasts();
      const { checkoutInfo } = useAppSelector(selectCheckout)
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
    
      const { fullName, phone, email, amount } = checkOutForm;
    
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

           
              <div className="sm:col-span-2">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    autoComplete="amount"
                    placeholder="Amount"
                    required
                    value={checkOutForm.amount}
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

         
          </div>
        </div>
      </form>
    </div>
      
    </div>
  )
}

export default Payment
