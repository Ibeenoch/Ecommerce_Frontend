import React, { useState, Fragment, useEffect, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  deleteproduct,
  fetchABrand,
  fetchAllBrands,
  fetchAllCategories,
  getACategory,
  getAllproduct,
  getAproduct,
  getaProductReviews,
  selectProduct,
  similarproduct,
  sortproductAsc,
  sortproductDesc,
  sortproductNewest,
  sortproductRated,
} from "../ProductSlice";
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
  TrashIcon,
} from "@heroicons/react/20/solid";
import Pagination from "./Pagination";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./product.css";
import { addtocart, fetchAllUsersCartAsync } from "../../cart/cartSlice";
import { useToasts } from "react-toast-notifications";
import ProductReview from "./ProductReview";
import { selectUser } from "../../auth/authSlice";
import Loading from "../../../Loading";
import LoadingPage from "../../../pages/LoadingPage";
import { addToWishlist, selectAllWishList } from "../../wishlist/wishListSlice";
import Carousel from "./Carousel";

interface ItogglePopup {
  isOpen: boolean;
  togglePopup: () => void;
}
const Products: React.FC<ItogglePopup> = ({ isOpen, togglePopup }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [getCategoryName, setGetCategoryName] = useState<string>("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [theAdmin, setTheAdmin] = useState<boolean>(false);
  const [wishlistUpdate, setWishlistUpdate] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { status, products, product, categories, category, brands, brand } =
    useAppSelector(selectProduct);
  const { user } = useAppSelector(selectUser);
  const { wishlist } = useAppSelector(selectAllWishList);

  const token = user && user && user.token;

  const imageProps = {
    width: "100%",
    height: "100%",
    zoomWidth: 500,
    img: products[0]?.thumbnail.url,
  };
  const handleAddToCart = (productId: any) => {
    const quantity = 1;
    dispatch(getAproduct(productId)).then((res) => {
      const receive = res.payload;
      const data = { ...receive, quantity };
      const dataitem = { data, addToast };
      dispatch(addtocart(dataitem));
    });
  };
  const handleAddToWishlist = (productId: any) => {
   
    const quantity = 1;
    dispatch(getAproduct(productId)).then((res: any) => {
      const receive = res.payload;
      const data = { ...receive, quantity };
      const dataitem = { data, addToast };
      dispatch(addToWishlist(dataitem)).then((res: any) => {
        dispatch(getAllproduct()).then((res: any) => {
          
        })
      })
    });
  };


  const handleSort = (option: any) => {
    if (option === "Price: Low to High") {
      dispatch(sortproductAsc());
    } else if (option === "Price: High to Low") {
      dispatch(sortproductDesc());
    } else if (option === "Newest") {
      dispatch(sortproductNewest());
    } else if (option === "Best Rating") {
      dispatch(sortproductRated());
    }
  };
  useEffect(() => {
    dispatch(getAllproduct()).then((res: any) => {
        setTotalCount(res.payload.length)
    })
  }, [dispatch, navigate]);

  const handleProductDetails = (productId: any) => {
    dispatch(getAproduct(productId)).then((res) => {
      if (res && res.payload && res.payload.category) {
        const data = {
          category: res && res.payload && res.payload.category && res.payload.category.name,
          brand: res && res.payload && res.payload.brand && res.payload.brand.name,
        }
       dispatch(similarproduct(data)).then((res: any) => {
        if(res && res.payload && res.payload !== undefined){
            dispatch(getaProductReviews(productId)).then((res: any) => {
              console.log('products review ', res.payload)
              navigate(`/product/details/${productId}`);
            })
        }
       })
      }
    });
  };

  const handleEdit = (productId: any) => {
    dispatch(getAproduct(productId)).then((res) => {
      if (res && res.payload) {
        navigate(`/product/update/${productId}`);
      }
    });
  };

  const handleDelete = (productId: any) => {
    const getConfirmation = window.confirm(
      "Are you sure you want to delete this product"
    );
    if (getConfirmation) {
      const product = {productId, token}
      dispatch(deleteproduct(product)).then((res) => {
        if(res && res.payload && res.payload.id){
          var checkItem = JSON.parse(localStorage.getItem("cart") as any);
          if (checkItem && Array.isArray(checkItem)) {
            const index = checkItem.findIndex((item) => item.id === res.payload.id);
            checkItem.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(checkItem));
            dispatch(fetchAllUsersCartAsync()).then(() => {
              dispatch(getAllproduct()).then(() => {
                addToast('Product Succesfully deleted', {
                  appearance: 'success',
                  autoDismiss: true,
                })
              })
            })
          } else {
            checkItem = {};
            localStorage.setItem("cart", JSON.stringify(checkItem));
            dispatch(fetchAllUsersCartAsync()).then(() => {
              dispatch(getAllproduct()).then(() => {
                addToast('Product Succesfully deleted', {
                  appearance: 'success',
                  autoDismiss: true,
                })
              })
            });
          }
         
        }
      })
    }
  };

  const handleCategoryOrBrand = (filter: string, name: string) => {
    if (filter === "Category") {
      dispatch(getACategory(name));
    }

    if (filter === "Brand") {
      dispatch(fetchABrand(name));
    }
  };

  const sortOptions = [
    //  { name: "Most Popular", current: true },
    { name: "Best Rating", current: false },
    { name: "Newest", current: false },
    { name: "Price: Low to High", current: false },
    { name: "Price: High to Low", current: false },
  ];

  const fetchCategories = (name: string) => {
    //options is an array of objects
    if (name === "Product") {
    } else if (name === "Category") {
      dispatch(fetchAllCategories()).then((res) => {
      });
    } else {
      dispatch(fetchAllBrands()).then((res) => {
      });
    }
  };

  const getwishlist = JSON.parse(localStorage.getItem('wishlist') as any)


  const handleProductReview = (id: any) => {
    dispatch(getAproduct(id)).then((res) => {
      if (res && res.payload && res.payload.id) {
       
        navigate(`/product/review/${id}`);
      }
    });
  }

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories && Array.isArray(categories) && categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands && Array.isArray(brands) && brands,
    },
  ];

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
     <>
      {/* <Carousel /> */}

      <div style={{  }}>
     
      <div>
        <div >
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
                                  <Disclosure.Button className="flex w-full items-center bg-white hover:bg-red-700 justify-between bg-white px-2 py-3 text-gray-400 hover:text-white">
                                    <span
                                      onClick={() =>
                                        fetchCategories(section.name)
                                      }
                                      className="font-medium text-gray-900 hover:text-white"
                                    >
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
                                          onClick={() =>
                                            fetchCategories(section.name)
                                          }
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options.map(
                                      (option: any, optionIdx: any) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            type="checkbox"
                                            onChange={() =>
                                              handleCategoryOrBrand(
                                                section.name,
                                                option.name
                                              )
                                            }
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                          >
                                            {option.name}
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
                  Filter
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
                      <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <div
                                  style={{ cursor: "pointer" }}
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
                    <span className="sr-only">Filters By</span>
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

                <div className="grid grid-cols-1 gap-x-3 gap-y-4 lg:grid-cols-4">
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
                              <Disclosure.Button className="flex w-full px-3 hover:bg-red-700 items-center justify-between bg-white py-3 text-sm text-gray-900 hover:text-white">
                                <span
                                  className="font-medium hover:text-white"
                                  onClick={() => fetchCategories(section.name)}
                                >
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
                                      onClick={() =>
                                        fetchCategories(section.name)
                                      }
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6 hover:bg-indigo-300">
                              <div className="space-y-4">
                                {section.options.map(
                                  (option: any, optionIdx: any) => (
                                    <div
                                      key={option.id}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.name}
                                        type="checkbox"
                                        // defaultChecked={option.checked}
                                        onChange={() =>
                                          handleCategoryOrBrand(
                                            section.name,
                                            option.name
                                          )
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option.name}
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

                  {/* Product grid */}
                  <div className="lg:col-span-3 rounded-lg">
                    {/* this is product list Content class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"*/}
                    <div className="">
                      <div >
                        <h2 className="text-2xl font-bold tracking-tight p-4 text-gray-900">
                          Top Selling
                        </h2>

                        <div className="mt-1 grid grid-cols-1 gap-x-1 gap-y-3 sm:grid-cols-3 px-1  py-2 lg:grid-cols-3 xl:gap-x-4">
                          {products && Array.isArray(products) ? products.map((product: any, index: number) => (
                            <div
                              key={product.id}
                              className="group relative shadow-2xl rounded-lg"
                              style={{
                                border: "1px white solid",
                                padding: "5px",
                                background: "white",
                                
                              }}
                            >
                              <div className="w-full md:w-64 h-64 contain">
                                {user &&
                                user &&
                                user.role &&
                                user.role !== "ADMIN" ? (
                                  // edit product
                                  <div className="flex justify-between">
                                    <div
                                      onClick={() => handleEdit(product.id)}
                                      className="icon1 z-30 cursor-pointer"
                                    >
                                      <PencilIcon
                                        className="h-4 w-4 z-30 cursor-pointer"
                                        aria-hidden="true"
                                        color="blue"
                                      />
                                    </div>
                                    {/* update product */}

                                    <div
                                      onClick={() => handleDelete(product.id)}
                                      className="icon2 z-30 cursor-pointer"
                                    >
                                      <TrashIcon
                                        className="h-4 w-4 z-30 cursor-pointer"
                                        aria-hidden="true"
                                        color="red"
                                      />
                                    </div>
                                  </div>
                                ) : (
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
                                        
                                      >
                                        <div
                                        onClick={() => handleProductReview(product.id)}
                                          className="flex border-none cursor-pointer"
                                          style={{
                                            opacity: isOpen ? "0.99" : "1", cursor: 'pointer'
                                          }}
                                        >
                                          <StarIcon
                                            className="h-4 w-4 z-30 cursor-pointer"
                                            aria-hidden="true"
                                            color={product && product.rating && product.rating >=1 ? "yellow" : "gray"}
                                            fill={product && product.rating && product.rating >=1 ? "yellow" : "gray"}
                                          />
                                          <StarIcon
                                            className="h-4 w-4 z-30 cursor-pointer"
                                            aria-hidden="true"
                                            color={product && product.rating && product.rating >=2 ? "yellow" : "gray"}
                                            fill={product && product.rating && product.rating >=2 ? "yellow" : "gray"}
                                          />
                                          <StarIcon
                                            className="h-4 w-4 z-30 cursor-pointer"
                                            aria-hidden="true"
                                            color={product && product.rating && product.rating >=3 ? "yellow" : "gray"}
                                            fill={product && product.rating && product.rating >=3 ? "yellow" : "gray"}
                                          />
                                          <StarIcon
                                            className="h-4 w-4 z-30 cursor-pointer"
                                            aria-hidden="true"
                                            color={product && product.rating && product.rating >=4 ? "yellow" : "gray"}
                                            fill={product && product.rating && product.rating >=4 ? "yellow" : "gray"}
                                          />
                                          <StarIcon
                                            className="h-4 w-4 z-30 cursor-pointer"
                                            aria-hidden="true"
                                            color={product && product.rating && product.rating >=5 ? "yellow" : "gray"}
                                            fill={product && product.rating && product.rating >=5 ? "yellow" : "gray"}
                                          />
                                        </div>
                                      </button>
                                      {/* Popup */}
                                  
                                    </button>

                                    <div
                                      onClick={() => handleAddToWishlist(product.id)}
                                      style={{ opacity: isOpen ? "0.2" : "1" }}
                                      className={`relative border-none rounded-full z-30 cursor-pointer bg-white-800 p-1 text-gray-400 hover:text-cyan focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}>
                                      
                                      <HeartIcon
                                        className="h-4 w-4 border-none"
                                        aria-hidden="true"
                                        color={ getwishlist.find((it: any) => it.id === product.id) ? 'red': 'gray'}
                                      />
                                    </div>
                                  </div>
                                )}

                                <div
                                  className="py-1"
                                  style={{
                                    width: "300px",
                                    height: "200px",
                                    overflow: "hidden",
                                  }}
                                  onClick={() =>
                                    handleProductDetails(product.id)
                                  }
                                >
                                  <img
                                    src={product.thumbnail.url
                                      ? product.thumbnail.url
                                      : pics}
                                    alt=""
                                   
                                    style={{ objectPosition: 'center'}}
                                    className="object-contain object-center w-[70%] h-full"
                                  />
                                 
                                </div>
                      
                                <div
                                  className="mt-4 flex justify-between elem"
                                  style={{
                                    borderTop: "0.5px gray solid",
                                  }}
                                >
                                  <div
                                    onClick={() =>
                                      handleProductDetails(product.id)
                                    }
                                  >
                                    <div>
                                      <h3 className="text-sm text-gray-900">
                                        <div>
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0"
                                          />
                                          <strong>{product.title}</strong>
                                          <p className="text-sm font-medium text-gray-900">
                                            <strong>${product.price}</strong>
                                          </p>
                                        </div>
                                      </h3>
                                    </div>
                                  </div>

                                  <div
                                    onClick={() => handleAddToCart(product.id)}
                                    className="relative cursor-pointer rounded-full bg-white-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                  >
                                    <ShoppingBagIcon
                                      className="h-5 w-5 text-red-800"
                                      aria-hidden="true"
                                      
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )) : (
                            <div
                              key={product.id}
                              className="group relative shadow-xl"
                              style={{
                                border: "1px white solid",
                                padding: "5px",
                                background: "white",
                                
                              }}
                            >
                              <div className="w-full md:w-64 h-64 contain">
                                {user &&
                                user &&
                                user.role &&
                                user.role !== "ADMIN" ? (
                                  // edit product
                                  <div className="flex justify-between">
                                    <div
                                      onClick={() => handleEdit(product.id)}
                                      className="icon1 z-30 cursor-pointer"
                                    >
                                      <PencilIcon
                                        className="h-4 w-4 z-30 cursor-pointer"
                                        aria-hidden="true"
                                        color="blue"
                                      />
                                    </div>
                                    {/* update product */}

                                    <div
                                      onClick={() => handleDelete(product.id)}
                                      className="icon2 z-30 cursor-pointer"
                                    >
                                      <TrashIcon
                                        className="h-4 w-4 z-30 cursor-pointer"
                                        aria-hidden="true"
                                        color="red"
                                      />
                                    </div>
                                  </div>
                                ) : (
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
                                        
                                      >
                                        <div
                                        onClick={() => handleProductReview(product.id)}
                                          className="flex border-none cursor-pointer"
                                          style={{
                                            opacity: isOpen ? "0.99" : "1", cursor: 'pointer'
                                          }}
                                        >
                                          <StarIcon
                                            className="h-4 w-4 z-30 cursor-pointer"
                                            aria-hidden="true"
                                            color={product && product.rating && product.rating >=1 ? "yellow" : "gray"}
                                            fill={product && product.rating && product.rating >=1 ? "yellow" : "gray"}
                                          />
                                          <StarIcon
                                            className="h-4 w-4 z-30 cursor-pointer"
                                            aria-hidden="true"
                                            color={product && product.rating && product.rating >=2 ? "yellow" : "gray"}
                                            fill={product && product.rating && product.rating >=2 ? "yellow" : "gray"}
                                          />
                                          <StarIcon
                                            className="h-4 w-4 z-30 cursor-pointer"
                                            aria-hidden="true"
                                            color={product && product.rating && product.rating >=3 ? "yellow" : "gray"}
                                            fill={product && product.rating && product.rating >=3 ? "yellow" : "gray"}
                                          />
                                          <StarIcon
                                            className="h-4 w-4 z-30 cursor-pointer"
                                            aria-hidden="true"
                                            color={product && product.rating && product.rating >=4 ? "yellow" : "gray"}
                                            fill={product && product.rating && product.rating >=4 ? "yellow" : "gray"}
                                          />
                                          <StarIcon
                                            className="h-4 w-4 z-30 cursor-pointer"
                                            aria-hidden="true"
                                            color={product && product.rating && product.rating >=5 ? "yellow" : "gray"}
                                            fill={product && product.rating && product.rating >=5 ? "yellow" : "gray"}
                                          />
                                        </div>
                                      </button>
                                      {/* Popup */}
                                  
                                    </button>

                                    <div
                                      onClick={() => handleAddToWishlist(product.id)}
                                      style={{ opacity: isOpen ? "0.2" : "1" }}
                                      className={`relative border-none rounded-full z-30 cursor-pointer bg-white-800 p-1 text-gray-400 hover:text-cyan focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}>
                                      
                                      <HeartIcon
                                        className="h-4 w-4 border-none"
                                        aria-hidden="true"
                                        color={ getwishlist.find((it: any) => it.id === product.id) ? 'brown': 'gray'}
                                        fill={ getwishlist.find((it: any) => it.id === product.id) ? 'brown': 'gray'}
                                      />
                                    </div>
                                  </div>
                                )}

                                <div
                                  className="py-1"
                                  style={{
                                    width: "300px",
                                    height: "200px",
                                    overflow: "hidden",
                                  }}
                                  onClick={() =>
                                    handleProductDetails(product.id)
                                  }
                                >
                                  <img
                                    src={product.thumbnail.url
                                      ? product.thumbnail.url
                                      : pics}
                                    alt=""
                                   
                                    style={{ objectPosition: 'center'}}
                                    className="object-contain object-center w-[70%] h-full"
                                  />
                                 
                                </div>
                      
                                <div
                                  className="mt-4 flex justify-between elem"
                                  style={{
                                    borderTop: "0.5px gray solid",
                                  }}
                                >
                                  <div
                                    onClick={() =>
                                      handleProductDetails(product.id)
                                    }
                                  >
                                    <div>
                                      <h3 className="text-sm text-gray-900">
                                        <div>
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0"
                                          />
                                          <strong>{product.title}</strong>
                                          <p className="text-sm font-medium text-gray-900">
                                            <strong>${product.price}</strong>
                                          </p>
                                        </div>
                                      </h3>
                                    </div>
                                  </div>

                                  <div
                                    onClick={() => handleAddToCart(product.id)}
                                    className="relative cursor-pointer rounded-full bg-white-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                  >
                                    <ShoppingBagIcon
                                      className="h-5 w-5 text-gray-900"
                                      aria-hidden="true"
                                      
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            // end of product 
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>

        <Pagination totalCount={totalCount}/>
      </div>
    </div>
      </>
  );
};

export default Products;
