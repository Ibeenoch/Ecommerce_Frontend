import { FormEvent, useEffect, useState } from "react";
import { StarIcon, PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getAllproduct,
  getAproduct,
  getaProductReviews,
  selectProduct,
  updatetheProductRating,
} from "../ProductSlice";
import ReactImageMagnify from "react-image-magnify";
import pics from "../../../images/download-29.jpeg";
import { addtocart, selectAllCart } from "../../cart/cartSlice";
import { useToasts } from "react-toast-notifications";
import ProductReview from "./ProductReview";
import SimlilarProduct from "./SimlilarProduct";
import { selectUser } from "../../auth/authSlice";
import { format } from "date-fns";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { addToWishlist } from "../../wishlist/wishListSlice";

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { status, product, productReview } = useAppSelector(selectProduct);
  const user = JSON.parse(localStorage.getItem("user") as any);
  const { carts } = useAppSelector(selectAllCart);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const { addToast } = useToasts();

  useEffect(() => {
    dispatch(getAproduct(id));
  }, [dispatch, id]);

  const products = {
    name: "Basic Tee 6-Pack",
    price: "$192",
    href: "#",
    breadcrumbs: [
      product && product.category
        ? product.category
        : { id: 1, name: "Men", href: "#" },
    ],
    images: [
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
        alt: "Two each of gray, white, and black shirts laying flat.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
        alt: "Model wearing plain black basic tee.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
        alt: "Model wearing plain gray basic tee.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
        alt: "Model wearing plain white basic tee.",
      },
    ],
    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "XXS", inStock: false },
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "2XL", inStock: true },
      { name: "3XL", inStock: true },
    ],
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  };
  const reviews = { href: "#", average: 4, totalCount: 117 };

  const [selectedColor, setSelectedColor] = useState(products.colors[0]);
  const [selectedSize, setSelectedSize] = useState(products.sizes[2]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const quantity = 1;
    const data = { ...product, quantity };
    const dataItem = { data, addToast };
    dispatch(addtocart(dataItem));
  };

  // review functions
  const totalOneRatingArr = (arr: any) => {
    const totalOneRating = arr
      .filter((num: any) => num.rating === 1)
      .reduce((acc: any, obj: any) => acc + obj.rating, 0);
    return totalOneRating;
  };

  const totalOnestar = productReview ? totalOneRatingArr(productReview) : 0;

  const totalTwoRatingArr = (arr: any) => {
    const totalTwoRating = arr
      .filter((num: any) => num.rating === 2)
      .reduce((acc: any, obj: any) => acc + obj.rating, 0);
    return totalTwoRating;
  };

  const totalTwostar = productReview ? totalTwoRatingArr(productReview) : 0;

  const totalThreeRatingArr = (arr: any) => {
    const totalThreeRating = arr
      .filter((num: any) => num.rating === 3)
      .reduce((acc: any, obj: any) => acc + obj.rating, 0);
    return totalThreeRating;
  };

  const totalThreestar = productReview ? totalThreeRatingArr(productReview) : 0;

  const totalFourRatingArr = (arr: any) => {
    const totalFourRating = arr
      .filter((num: any) => num.rating === 4)
      .reduce((acc: any, obj: any) => acc + obj.rating, 0);
    return totalFourRating;
  };

  const totalFourstar = productReview ? totalFourRatingArr(productReview) : 0;

  const totalFiveRatingArr = (arr: any) => {
    const totalFiveRating = arr
      .filter((num: any) => num.rating === 5)
      .reduce((acc: any, obj: any) => acc + obj.rating, 0);
    return totalFiveRating;
  };

  const totalFivestar = productReview ? totalFiveRatingArr(productReview) : 0;

  const handleReviewForm = (id: any) => {
    dispatch(getAproduct(id)).then((res: any) => {
      if (res && res.payload && res.payload.id) {
        navigate(`/product/review/form/${id}`);
      }
    });
  };

  const totalRatingGiven =
    totalOnestar +
    totalTwostar +
    totalThreestar +
    totalFourstar +
    totalFivestar;
  const calculateRating = productReview
    ? (totalRatingGiven / productReview.length).toFixed(1)
    : 0;
  const theProductRating = calculateRating ? calculateRating : 0;

  useEffect(() => {
    dispatch(getaProductReviews(id)).then((res: any) => {
      console.log("productres ", res.payload);
      if (res && res.payload !== undefined) {
        if (
          totalOnestar >= 0 &&
          totalTwostar >= 0 &&
          totalThreestar >= 0 &&
          totalFourstar >= 0 &&
          totalFivestar >= 0
        ) {
          const data = {
            productId: id,
            updatedRating: parseInt(theProductRating ? theProductRating : "0"),
          };
          dispatch(updatetheProductRating(data)).then((res: any) => {});
        }
      }
    });
  }, [id]);

  const handleAddCart = (productId: any) => {
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
        dispatch(getAllproduct()).then((res: any) => {});
      });
    });
  };

  const fifthBar = Math.round((totalFivestar / totalRatingGiven) * 10) * 10;
  const fourthBar = Math.round((totalFourstar / totalRatingGiven) * 10) * 10;
  const thirdBar = Math.round((totalThreestar / totalRatingGiven) * 10) * 10;
  const secondBar = Math.round((totalTwostar / totalRatingGiven) * 10) * 10;
  const firstBar = Math.round((totalOnestar / totalRatingGiven) * 10) * 10;

  const handlelogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="bg-white mt-8">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {!Object.keys(products).length || !products.breadcrumbs.length ? (
                <div>No Product Item Available</div>
              ) : (
                products.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))
              )}
              <li className="text-sm">
                <div className="font-medium text-gray-500 hover:text-gray-600">
                  {product.title}
                </div>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}

          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            {/* 1st img div */}
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              {product &&
                product.images &&
                product.images.set &&
                product.images.set[0] && (
                  <img
                    alt="product image"
                    src={
                      product &&
                      product.images &&
                      product.images.set &&
                      product.images.set[0].url
                    }
                    className="h-full w-full object-contain lg:h-full lg:w-full"
                    style={{ zIndex: 30 }}
                  />
                )}
            </div>

            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              {/* 2nd img div */}
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                {product &&
                  product.images &&
                  product.images.set &&
                  product.images.set[1] && (
                    <img
                      alt="product image"
                      src={
                        product &&
                        product.images &&
                        product.images.set &&
                        product.images.set[1].url
                      }
                      className="h-full w-full object-contain lg:h-full lg:w-full"
                      style={{ zIndex: 30 }}
                    />
                  )}
              </div>
              {/* 3rd img div */}
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                {product &&
                  product.images &&
                  product.images.set &&
                  product.images.set[2] && (
                    <img
                      alt="product image"
                      src={
                        product &&
                        product.images &&
                        product.images.set &&
                        product.images.set[2].url
                      }
                      className="h-full w-full object-contain lg:h-full lg:w-full"
                      style={{ zIndex: 30 }}
                    />
                  )}
              </div>
            </div>
            {/* 4th img div */}
            {product &&
            product.images &&
            product.images.set &&
            product.images.set[3] ? (
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                {product &&
                  product.images &&
                  product.images.set &&
                  product.images.set[3] && (
                    <img
                      alt="product image"
                      src={
                        product &&
                        product.images &&
                        product.images.set &&
                        product.images.set[3].url
                      }
                      className="h-full w-full object-contain lg:h-full lg:w-full"
                      style={{ zIndex: 30 }}
                    />
                  )}
              </div>
            ) : (
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                {product &&
                  product.images &&
                  product.images.set &&
                  product.images.set[0] && (
                    <img
                      alt="product image"
                      src={
                        product &&
                        product.images &&
                        product.images.set &&
                        product.images.set[0].url
                      }
                      className="h-full w-full object-contain lg:h-full lg:w-full"
                      style={{ zIndex: 30 }}
                    />
                  )}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <div className="flex text-sm">
                <div
                  onClick={() => handleAddToWishlist(product.id)}
                  className="flex cursor-pointer border border-white bg-red-800 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:opacity-50 hover:text-white dark:hover:bg-red-700 px-4 py-2"
                >
                  <HeartIcon width={30} height={20} /> <div></div>
                </div>

                <div
                  onClick={() => handleAddCart(product.id)}
                  className="flex cursor-pointer border border-white bg-red-800 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:opacity-50 hover:text-white dark:hover:bg-red-700 px-4 py-2"
                >
                  <ShoppingBagIcon width={30} height={20} />{" "}
                  <div>Add To Cart</div>
                </div>
              </div>

              <h2 className="sr-only">Product information</h2>
              <p className="text-2xl tracking-tight text-gray-900">
                <strong> ${product.price}</strong>
              </p>
              <p className="">{product.discountPercentage}% off</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {/* {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))} */}
                    <StarIcon
                      width={20}
                      height={20}
                      color={
                        parseInt(theProductRating ? theProductRating : "0") >= 1
                          ? "orange"
                          : "gray"
                      }
                      fill={
                        parseInt(theProductRating ? theProductRating : "0") >= 1
                          ? "orange"
                          : "gray"
                      }
                    />
                    <StarIcon
                      width={20}
                      height={20}
                      color={
                        parseInt(theProductRating ? theProductRating : "0") >= 2
                          ? "orange"
                          : "gray"
                      }
                      fill={
                        parseInt(theProductRating ? theProductRating : "0") >= 1
                          ? "orange"
                          : "gray"
                      }
                    />
                    <StarIcon
                      width={20}
                      height={20}
                      color={
                        parseInt(theProductRating ? theProductRating : "0") >= 3
                          ? "orange"
                          : "gray"
                      }
                      fill={
                        parseInt(theProductRating ? theProductRating : "0") >= 1
                          ? "orange"
                          : "gray"
                      }
                    />
                    <StarIcon
                      width={20}
                      height={20}
                      color={
                        parseInt(theProductRating ? theProductRating : "0") >= 4
                          ? "orange"
                          : "gray"
                      }
                      fill={
                        parseInt(theProductRating ? theProductRating : "0") >= 1
                          ? "orange"
                          : "gray"
                      }
                    />
                    <StarIcon
                      width={20}
                      height={20}
                      color={
                        parseInt(theProductRating ? theProductRating : "0") >= 5
                          ? "orange"
                          : "gray"
                      }
                      fill={
                        parseInt(theProductRating ? theProductRating : "0") >= 1
                          ? "orange"
                          : "gray"
                      }
                    />
                  </div>
                  <p className="sr-only">
                    {theProductRating ? theProductRating : 0} out of 5 stars
                  </p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {totalRatingGiven ? totalRatingGiven : 0} reviews
                  </a>
                </div>
              </div>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimlilarProduct />
      <>
        {!productReview.length ? (
          <>
            <div>
              <h2 className="font-manrope font-bold text-3xl mt-10 sm:text-4xl leading-10 text-black mb-8 text-center">
                No Customer Reviews &amp; Rating Available
              </h2>
            </div>
          </>
        ) : (
          <>
            <section className="py-24 relative mt-10">
              <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
                <div className="">
                  <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-8 text-center">
                    Customer reviews &amp; rating
                  </h2>
                  <div className="grid grid-cols-12 mb-11">
                    <div className="col-span-12 xl:col-span-4 flex items-center">
                      <div className="box flex flex-col gap-y-4 w-full max-xl:max-w-3xl mx-auto">
                        <div className="flex items-center w-full">
                          <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                            5
                          </p>
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_12042_8589)">
                              <path
                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_12042_8589">
                                <rect width={20} height={20} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>

                          <p className="h-2 w-full sm:min-w-[278px] rounded-[30px]  bg-gray-200 ml-5 mr-3">
                            <span
                              style={{ width: `${fifthBar}%` }}
                              className={`h-full bg-red-800 rounded-[30px] flex`}
                            />
                          </p>
                          <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                            {totalFivestar && totalFivestar}
                          </p>
                        </div>
                        <div className="flex items-center w-full">
                          <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                            4
                          </p>
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_12042_8589)">
                              <path
                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_12042_8589">
                                <rect width={20} height={20} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <p className="h-2 w-full sm:min-w-[278px] rounded-[30px]  bg-gray-200 ml-5 mr-3">
                            <span
                              style={{ width: `${fourthBar}%` }}
                              className={`h-full bg-red-800 rounded-[30px] flex`}
                            />
                          </p>
                          <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                            {totalFourstar && totalFourstar}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                            3
                          </p>
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_12042_8589)">
                              <path
                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_12042_8589">
                                <rect width={20} height={20} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <p className="h-2 w-full sm:min-w-[278px] rounded-[30px]  bg-gray-200 ml-5 mr-3">
                            <span
                              style={{ width: `${thirdBar}%` }}
                              className={`h-full bg-red-800 rounded-[30px] flex`}
                            />
                          </p>
                          <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                            {totalThreestar && totalThreestar}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                            2
                          </p>
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_12042_8589)">
                              <path
                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_12042_8589">
                                <rect width={20} height={20} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <p className="h-2 w-full sm:min-w-[278px] rounded-[30px] bg-gray-200 ml-5 mr-3">
                            <span
                              style={{ width: `${secondBar}%` }}
                              className={`h-full bg-red-800 rounded-[30px] flex`}
                            />
                          </p>
                          <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                            {totalTwostar}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                            1
                          </p>
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_12042_8589)">
                              <path
                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                fill="#FBBF24"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_12042_8589">
                                <rect width={20} height={20} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <p className="h-2 w-full sm:min-w-[278px] rounded-[30px]  bg-gray-200 ml-5 mr-3">
                            <span
                              style={{ width: `${firstBar}%` }}
                              className={`h-full bg-red-800 rounded-[30px] flex`}
                            />
                          </p>
                          <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                            {totalOnestar && totalOneRatingArr}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 max-xl:mt-8 xl:col-span-8 xl:pl-8 w-full min-h-[230px]">
                      <div className="grid grid-cols-12 h-full px-8 max-lg:py-8 rounded-3xl bg-gray-100 w-full max-xl:max-w-3xl max-xl:mx-auto">
                        <div className="col-span-12 md:col-span-8 flex items-center">
                          <div className="flex flex-col sm:flex-row items-center max-lg:justify-center w-full h-full">
                            <div className="sm:pr-3 sm:border-r border-gray-200 flex items-center justify-center flex-col">
                              <h2 className="font-manrope font-bold text-5xl text-black text-center mb-4">
                                {theProductRating}
                              </h2>
                              <div className="flex items-center gap-3 mb-4">
                                <StarIcon
                                  width={28}
                                  height={28}
                                  color={
                                    parseInt(
                                      theProductRating ? theProductRating : "0"
                                    ) >= 1
                                      ? "orange"
                                      : "gray"
                                  }
                                  fill={
                                    parseInt(
                                      theProductRating ? theProductRating : "0"
                                    ) >= 1
                                      ? "orange"
                                      : "gray"
                                  }
                                />
                                <StarIcon
                                  width={28}
                                  height={28}
                                  color={
                                    parseInt(
                                      theProductRating ? theProductRating : "0"
                                    ) >= 2
                                      ? "orange"
                                      : "gray"
                                  }
                                  fill={
                                    parseInt(
                                      theProductRating ? theProductRating : "0"
                                    ) >= 2
                                      ? "orange"
                                      : "gray"
                                  }
                                />
                                <StarIcon
                                  width={28}
                                  height={28}
                                  color={
                                    parseInt(
                                      theProductRating ? theProductRating : "0"
                                    ) >= 3
                                      ? "orange"
                                      : "gray"
                                  }
                                  fill={
                                    parseInt(
                                      theProductRating ? theProductRating : "0"
                                    ) >= 3
                                      ? "orange"
                                      : "gray"
                                  }
                                />
                                <StarIcon
                                  width={28}
                                  height={28}
                                  color={
                                    parseInt(
                                      theProductRating ? theProductRating : "0"
                                    ) >= 4
                                      ? "orange"
                                      : "gray"
                                  }
                                  fill={
                                    parseInt(
                                      theProductRating ? theProductRating : "0"
                                    ) >= 4
                                      ? "orange"
                                      : "gray"
                                  }
                                />
                                <StarIcon
                                  width={28}
                                  height={28}
                                  color={
                                    parseInt(
                                      theProductRating ? theProductRating : "0"
                                    ) >= 5
                                      ? "orange"
                                      : "gray"
                                  }
                                  fill={
                                    parseInt(
                                      theProductRating ? theProductRating : "0"
                                    ) >= 5
                                      ? "orange"
                                      : "gray"
                                  }
                                />
                              </div>
                              <p className="font-normal text-lg leading-8 text-gray-400">
                                {productReview ? productReview.length : 0}{" "}
                                Reviews
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-4 max-lg:mt-8 md:pl-8">
                          <div className="flex items-center flex-col justify-center w-full h-full ">
                            {user && user.id ? (
                              <button
                                onClick={() => handleReviewForm(product.id)}
                                className="rounded-full px-6 py-4 bg-red-800 font-semibold text-lg text-white whitespace-nowrap mb-6 w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-700 hover:shadow-indigo-400"
                              >
                                Write A Review
                              </button>
                            ) : (
                              <button
                                onClick={handlelogin}
                                className="rounded-full px-6 py-4 bg-red-800 font-semibold text-lg text-white whitespace-nowrap mb-6 w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-700 hover:shadow-indigo-400"
                              >
                                Write A Review
                              </button>
                            )}
                            {/* <button className="rounded-full px-6 py-4 bg-white font-semibold text-lg text-indigo-600 whitespace-nowrap w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-100 hover:shadow-indigo-200">
                See All Reviews
              </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {productReview &&
                    productReview.map((review: any) => (
                      <>
                        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                          <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                <img
                                  className="mr-2 w-6 h-6 rounded-full"
                                  src={
                                    review &&
                                    review.user &&
                                    review.user.image &&
                                    review.user.image.url
                                  }
                                  alt=""
                                />
                                {review && review.user && review.user.fullName}
                              </p>
                              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                <div>
                                  <StarIcon
                                    width={15}
                                    height={15}
                                    color={
                                      review && review.rating >= 1
                                        ? "orange"
                                        : "gray"
                                    }
                                    fill={
                                      review && review.rating >= 1
                                        ? "orange"
                                        : "gray"
                                    }
                                  />
                                </div>
                                <div>
                                  <StarIcon
                                    width={15}
                                    height={15}
                                    color={
                                      review && review.rating >= 2
                                        ? "orange"
                                        : "gray"
                                    }
                                    fill={
                                      review && review.rating >= 2
                                        ? "orange"
                                        : "gray"
                                    }
                                  />
                                </div>
                                <div>
                                  <StarIcon
                                    width={15}
                                    height={15}
                                    color={
                                      review && review.rating >= 3
                                        ? "orange"
                                        : "gray"
                                    }
                                    fill={
                                      review && review.rating >= 3
                                        ? "orange"
                                        : "gray"
                                    }
                                  />
                                </div>
                                <div>
                                  <StarIcon
                                    width={15}
                                    color={
                                      review && review.rating >= 4
                                        ? "orange"
                                        : "gray"
                                    }
                                    fill={
                                      review && review.rating >= 4
                                        ? "orange"
                                        : "gray"
                                    }
                                  />
                                </div>
                                <div>
                                  <StarIcon
                                    width={15}
                                    height={15}
                                    color={
                                      review && review.rating >= 5
                                        ? "orange"
                                        : "gray"
                                    }
                                    fill={
                                      review && review.rating >= 5
                                        ? "orange"
                                        : "gray"
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <button
                              id="dropdownremark1Button"
                              data-dropdown-toggle="dropdownremark1"
                              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                              type="button"
                            >
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <time>
                                  {format(
                                    review && review.createdAt,
                                    "MMM. d, yyyy"
                                  )}
                                </time>
                              </p>
                              <span className="sr-only">remark settings</span>
                            </button>
                            {/* Dropdown menu */}
                            <div
                              id="dropdownremark1"
                              className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            >
                              <ul
                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconHorizontalButton"
                              >
                                <li>
                                  <a
                                    href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Remove
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Report
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </footer>
                          <p className="text-gray-500 dark:text-gray-400">
                            {review && review.remark}
                          </p>
                        </article>
                      </>
                    ))}
                </div>
              </div>
            </section>
          </>
        )}
      </>
    </>
  );
};

export default ProductDetail;
