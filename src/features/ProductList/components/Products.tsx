import React, { useState, Fragment, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { deleteproduct, getAllproduct, getAproduct, selectProduct, sortproductAsc, sortproductDesc, sortproductNewest, sortproductRated } from "../ProductSlice";
import ReactImageMagnify from "react-image-magnify";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import pics from "../../../images/Apple 2022 MacBook Air Laptop 1.jpg";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  HeartIcon,
  ShoppingBagIcon,
  StarIcon, 
  PencilIcon,
  TrashIcon
} from "@heroicons/react/20/solid";
import Pagination from "./Pagination";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./product.css";
import { addtocart } from "../../cart/cartSlice";
import { useToasts } from 'react-toast-notifications'
import ProductReview from "./ProductReview";

interface ItogglePopup {
    isOpen: boolean;
    togglePopup: () => void
  }
const Products: React.FC<ItogglePopup> = ({ isOpen, togglePopup }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts()
  const [incrementAmount, setIncrementAmount] = useState<string>("2");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [theAdmin, setTheAdmin] = useState<boolean>(false);
  const { status, products, product } = useAppSelector(selectProduct);

  
  const imageProps = {
    width: "100%",
    height: "100%",
    zoomWidth: 500,
    img: products[0]?.thumbnail.url,
  };
  const handleAddToCart = (productId: any) => {
    const quantity = 1;
    dispatch(getAproduct(productId)).then((res) => {
      console.log('response product ', res.payload)
      const receive = res.payload
      const data = {...receive, quantity};
      console.log('cart added: ', data)
      const dataitem = {data, addToast}
      dispatch(addtocart(dataitem))
    })
   
  }

  const handleSort = (option: any) => {
    if(option === 'Price: Low to High'){
      console.log('price asc')
      dispatch(sortproductAsc())
    }else if(option === 'Price: High to Low'){
      console.log('price desc')
      dispatch(sortproductDesc())
    }else if(option === 'Newest'){
      dispatch(sortproductNewest())
    }else if(option === 'Best Rating'){
      dispatch(sortproductRated())
    }
  }
  useEffect(() => {
    dispatch(getAllproduct());
  }, [dispatch, navigate]);

const handleProductDetails = (productId: any) => {
dispatch(getAproduct(productId)).then((res) => {
  console.log('product res: ', res)
  if(res && res.payload && res.payload.images && res.payload.images.set){
    console.log('product resent: ', res.payload.images.set, res.payload.images.set[0])
    navigate(`/product/details/${productId}`)
  }
})
}

const handleEdit = (productId: any) => {
  dispatch(getAproduct(productId)).then((res) => {
    if(res && res.payload){
      navigate(`/product/create/${productId}`)
    }
  })

};

const handleDelete = (productId: any) => {
 const getConfirmation = window.confirm('Are you sure you want to delete this product')
  if(getConfirmation){
    dispatch(deleteproduct(productId))
  }
}

  const incrementValue = Number(incrementAmount) || 0;
  const sortOptions = [
  //  { name: "Most Popular", current: true },
    { name: "Best Rating", current: false },
    { name: "Newest", current: false },
    { name: "Price: Low to High", current: false },
    { name: "Price: High to Low",  current: false },
  ];

  const filters = [
    {
      id: "product",
      name: "Product",
      options: [
        { value: "white", label: "White", checked: false },
        { value: "beige", label: "Beige", checked: false },
        { value: "blue", label: "Blue", checked: true },
        { value: "brown", label: "Brown", checked: false },
        { value: "green", label: "Green", checked: false },
        { value: "purple", label: "Purple", checked: false },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "new-arrivals", label: "New Arrivals", checked: false },
        { value: "sale", label: "Sale", checked: false },
        { value: "travel", label: "Travel", checked: true },
        { value: "organization", label: "Organization", checked: false },
        { value: "accessories", label: "Accessories", checked: false },
      ],
    },
    {
      id: "brand",
      name: "Brand",
      options: [
        { value: "2l", label: "2L", checked: false },
        { value: "6l", label: "6L", checked: false },
        { value: "12l", label: "12L", checked: false },
        { value: "18l", label: "18L", checked: false },
        { value: "20l", label: "20L", checked: false },
        { value: "40l", label: "40L", checked: true },
      ],
    },
  ];

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }


  return (
    <div>
      <div>
        <div className="">
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Filters
                        </h2>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className="mt-4 border-t border-gray-200">
                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-t border-gray-200 px-4 py-6"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section.name}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Top Selling
                </h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <div
                                style={{cursor: 'pointer'}}
                                onClick={() => handleSort(option.name)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </div>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    {/* this is product list Content */}
                    <div className="">
                      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                          Top Selling
                        </h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 px-4  py-5 lg:grid-cols-3 xl:gap-x-8">
                          {products.map((product: any) => (
                            <div
                              key={product.id}
                              className="group relative"
                              style={{
                                border: "1px white solid",
                                padding: "4px",
                                background: "white",
                              }}
                            >
                              <div className="w-full md:w-64 h-64 contain">
                                {theAdmin ? ( 
                                  // edit product
                                <div className="flex justify-between">
                                  <div onClick={() => handleEdit(product.id)} className="icon1 z-30 cursor-pointer">
                                    <PencilIcon 
                                    className="h-4 w-4 z-30 cursor-pointer"
                                        aria-hidden="true"
                                        color="blue"/>
                                  </div>
                                  {/* update product */}

                                <div onClick={() => handleDelete(product.id)} className="icon2 z-30 cursor-pointer">
                                    <TrashIcon 
                                    className="h-4 w-4 z-30 cursor-pointer"
                                    aria-hidden="true"
                                    color="red"
                                    />
                                  </div>
                                </div> ) : (
                                  <div
                                  className="parent-img-div"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderRadius: "0.7px",
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="relative border-none rounded-full bg-white-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                  >  
                                   <button
                                      id="popup-trigger"
                                      className="text-gray-500 hover:text-gray-900"
                                      onClick={togglePopup}
                                    >                                  
                                    <div className="flex border-none" style={{ opacity: (isOpen ? '0.99' : '1')}}>
                                      <StarIcon
                                        className="h-4 w-4 z-30 cursor-pointer"
                                        aria-hidden="true"
                                        color="yellow"
                                      />
                                      <StarIcon
                                        className="h-4 w-4 z-30 cursor-pointer"
                                        aria-hidden="true"
                                        color="yellow"
                                      />
                                      <StarIcon
                                        className="h-4 w-4 z-30 cursor-pointer"
                                        aria-hidden="true"
                                        color="yellow"
                                      />
                                      <StarIcon
                                        className="h-4 w-4 z-30 cursor-pointer"
                                        aria-hidden="true"
                                        color="yellow"
                                      />
                                      <StarIcon
                                        className="h-4 w-4 z-30 cursor-pointer opacity-40"
                                        aria-hidden="true"
                                        color="gray"
                                      />
                                    </div>
                                    </button> 
                                  {/* Popup */}
                                  {isOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                      {/* Popup content */}
                                      <div className="bg-white p-8 max-w-md rounded shadow-lg">
                                        {/* Add your popup content here */}
                                        <ProductReview />
                                        {/* Close button */}
                                        <button
                                          id="popup-close"
                                          className="mt-4 text-gray-500 hover:text-gray-900"
                                          onClick={togglePopup}
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                  </button>

                                  <button
                                    type="button"
                                    style={{ opacity: (isOpen ? '0.2' : '1')}}
                                    className="relative border-none rounded-full z-30 cursor-pointer bg-white-800 p-1 text-gray-400 hover:text-cyan focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                  >
                                    <HeartIcon
                                      className="h-4 w-4 border-none"
                                      aria-hidden="true"
                                      color="red"
                                    />
                                  </button>
                                </div>
                                )}

                                <div  onClick={ () => handleProductDetails(product.id)}>
                                  <ReactImageMagnify
                                    {...{
                                      smallImage: {
                                        alt: "Wristwatch by Ted Baker London",
                                        isFluidWidth: true,
                                        src: product.thumbnail.url
                                          ? product.thumbnail.url
                                          : pics,
                                        width: 100,
                                        height: 100,
                                      },
                                      largeImage: {
                                        src: product.thumbnail.url
                                          ? product.thumbnail.url
                                          : pics,
                                        width: 220,
                                        height: 340,
                                      },
                                      enlargedImagePosition: "over",
                                      imageStyle: {
                                        background: "red",
                                      },
                                      lensStyle: {
                                        backgroundColor: "rgba(0,0,0,.4",
                                      },
                                    }}
                                    className="h-full w-full object-contain lg:h-full lg:w-full product-img"
                                    style={{ zIndex: 30, opacity: ( isOpen ? '0.1' : '1')}}
                                  />
                                </div>
                                <div
                                  className="mt-4 flex justify-between"
                                  style={{
                                    borderTop: "0.5px midnightblue solid",
                                  }}
                                >
                                <div onClick={ () => handleProductDetails(product.id)}>
                                    <div>
                                      <h3 className="text-sm text-gray-700">
                                        <div>
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0"
                                          />
                                          <strong>{product.title}</strong>
                                          <p className="text-sm font-medium text-gray-900">
                                            ${product.price}      %{product.discount} discount
                                          </p>
                                        </div>
                                      </h3>
                                    </div>
                                  </div>

                                  <button
                                  onClick={() => handleAddToCart(product.id)}
                                    type="button"
                                    className="relative rounded-full bg-white-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                  >
                                    <ShoppingBagIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                      color="midnightblue"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>

        <Pagination />
      </div>
    </div>
  );
};

export default Products;
