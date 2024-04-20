import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useEffect,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../auth/authSlice";
import {
  createAProductReview,
  getaProductReviews,
  selectProduct,
  updatetheProductRating,
} from "../ProductSlice";
import { StarIcon } from "@heroicons/react/24/outline";
import { useToasts } from "react-toast-notifications";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProductReviewForm = () => {
  const { addToast } = useToasts();
  const { id } = useParams();
  const navigate = useNavigate();
  const [remark, setRemark] = useState<string>("");
  const ratingRef1 = useRef<HTMLDivElement>(null);
  const ratingRef2 = useRef<HTMLDivElement>(null);
  const ratingRef3 = useRef<HTMLDivElement>(null);
  const ratingRef4 = useRef<HTMLDivElement>(null);
  const ratingRef5 = useRef<HTMLDivElement>(null);
  const [getRatingVal, setGetRatingVal] = useState<any>("");
  const user = JSON.parse(localStorage.getItem("user") as any);
  const { product } = useAppSelector(selectProduct);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRemark(e.target.value);
  };
  const token = user && user.token;
  const userId = user && user.id;
  const productId = product && product.id;

  const handleReviewremark = (e: FormEvent) => {
    e.preventDefault();

    const rating = parseInt(getRatingVal);
    if (!rating) {
      addToast(
        "Please click on the rating icon to rating the product, and add a review about this product",
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
      return;
    }

    const data = {
      remark,
      userId,
      productId,
      rating,
    };
    dispatch(createAProductReview(data)).then((res: any) => {
      if (res && res.payload !== undefined) {
        const data = {
          id,
          updatedRating: rating,
        };

        dispatch(updatetheProductRating(data)).then((res: any) => {
          if (res && res.payload !== undefined) {
            console.log("update rating ", res.payload);
            dispatch(getaProductReviews(productId)).then((res: any) => {
              console.log("get rating ", res.payload);
              if (res && res.payload !== undefined) {
                addToast("Thank You For Your Honest Feedback", {
                  appearance: "info",
                  autoDismiss: true,
                });
                navigate(`/product/review/${productId}`);
              }
            });
          }
        });
      }
    });
  };

  if (!Object.keys(user).length) {
    navigate("/login");
  }
  const handleRatingNumberOne = (e: React.MouseEvent<HTMLDivElement>) => {
    const dataVal = ratingRef1.current?.getAttribute("data-rating-num");
    setGetRatingVal(dataVal);
  };
  const handleRatingNumberTwo = (e: React.MouseEvent<HTMLDivElement>) => {
    const dataVal = ratingRef2.current?.getAttribute("data-rating-num");
    setGetRatingVal(dataVal);
  };
  const handleRatingNumberThree = (e: React.MouseEvent<HTMLDivElement>) => {
    const dataVal = ratingRef3.current?.getAttribute("data-rating-num");
    setGetRatingVal(dataVal);
  };
  const handleRatingNumberFour = (e: React.MouseEvent<HTMLDivElement>) => {
    const dataVal = ratingRef4.current?.getAttribute("data-rating-num");
    setGetRatingVal(dataVal);
  };
  const handleRatingNumberFive = (e: React.MouseEvent<HTMLDivElement>) => {
    const dataVal = ratingRef5.current?.getAttribute("data-rating-num");
    setGetRatingVal(dataVal);
  };

  return (
    <section className="bg-white mt-10 dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            What is your honest feedback about this product?
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleReviewremark}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-lg font-bold text-gray-900 dark:text-white">
              Please Rate This product
            </h2>
          </div>

          <div className="flex justify-around mb-4">
            <div
              ref={ratingRef1}
              className="cursor-pointer"
              onClick={handleRatingNumberOne}
              data-rating-num="1"
            >
              <h2>1 star</h2>
              <StarIcon
                width={25}
                height={25}
                color={getRatingVal >= 1 ? "orange" : "gray"}
                fill={getRatingVal >= 1 ? "orange" : "gray"}
              />
            </div>
            <div
              ref={ratingRef2}
              className="cursor-pointer"
              onClick={handleRatingNumberTwo}
              data-rating-num="2"
            >
              <h2>2 star</h2>
              <StarIcon
                width={25}
                height={25}
                color={getRatingVal >= 2 ? "orange" : "gray"}
                fill={getRatingVal >= 2 ? "orange" : "gray"}
              />
            </div>
            <div
              ref={ratingRef3}
              className="cursor-pointer"
              onClick={handleRatingNumberThree}
              data-rating-num="3"
            >
              <h2>3 star</h2>
              <StarIcon
                width={25}
                height={25}
                color={getRatingVal >= 3 ? "orange" : "gray"}
                fill={getRatingVal >= 3 ? "orange" : "gray"}
              />
            </div>
            <div
              ref={ratingRef4}
              className="cursor-pointer"
              onClick={handleRatingNumberFour}
              data-rating-num="4"
            >
              <h2>4 star</h2>
              <StarIcon
                width={25}
                height={25}
                color={getRatingVal >= 4 ? "orange" : "gray"}
                fill={getRatingVal >= 4 ? "orange" : "gray"}
              />
            </div>
            <div
              ref={ratingRef5}
              className="cursor-pointer"
              onClick={handleRatingNumberFive}
              data-rating-num="5"
            >
              <h2>5 star</h2>
              <StarIcon
                width={25}
                height={25}
                color={getRatingVal >= 5 ? "orange" : "gray"}
                fill={getRatingVal >= 5 ? "orange" : "gray"}
              />
            </div>
          </div>

          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="remark" className="sr-only">
              Your remark
            </label>
            <textarea
              id="remark"
              rows={6}
              onChange={handleChange}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="what is do you think about this product..."
              required
              defaultValue={""}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post remark
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProductReviewForm;
