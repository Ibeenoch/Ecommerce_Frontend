import {
  CameraIcon,
  ChevronDownIcon,
  EyeIcon,
  FunnelIcon,
  HeartIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  StarIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteUser,
  getAUser,
  getAllUser,
  getUserPagination,
  selectUser,
} from "./authSlice";
import {
  alltransactions,
  deleteATransaction,
  getAUserTransaction,
  getpaymentPagination,
  selectCheckout,
} from "../checkout/checkoutSlice";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pics from "../../images/HP Newest Pavilion 15.6_ HD Touchscreen Anti-Glare Laptop__4.jpg";
import { useToasts } from "react-toast-notifications";
import { format } from "date-fns";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import ShippingDetails from "./ShippingDetails";
import {
  deleteproduct,
  getAllproduct,
  getAproduct,
  getPagination,
  selectProduct,
} from "../ProductList/ProductSlice";
import { fetchAllUsersCartAsync } from "../cart/cartSlice";
import {
  deleteOrder,
  getAllOrders,
  getOrderPagination,
  orderUpdate,
  selectOrder,
} from "../order/orderSlice";
import ProductPagination from "./AdminPagination/ProductPagination";
import OrdersPagination from "./AdminPagination/OrdersPagination";
import UsersPagination from "./AdminPagination/UsersPagination";
import PaymentPagination from "./AdminPagination/PaymentPagination";

const Admin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selected1, setSelected1] = useState(true);
  const [selected2, setSelected2] = useState(false);
  const [isproduct, setIsProduct] = useState(true);
  const [isOrder, setIsOrder] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [totalProductCount, setTotalProductCount] = useState<number>(0);
  const [totalOrderCount, setTotalOrderCount] = useState<number>(0);
  const [totalUserCount, setTotalUserCount] = useState<number>(0);
  const [totalPaymentCount, setTotalPaymentCount] = useState<number>(0);
  const [isPayment, setIsPayment] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theStatus, setThestatus] = useState<string[]>([]);
  const [orderIndex, setOrderIndex] = useState<number>(0);
  const { id } = useParams();
  const { allTransactions } = useAppSelector(selectCheckout);
  const { user, users } = useAppSelector(selectUser);
  const { products } = useAppSelector(selectProduct);
  const { orders } = useAppSelector(selectOrder);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(getAllproduct()).then((res: any) => {
      setTotalProductCount(res.payload.length);

      const handlePages = () => {
        const limit = 3;
        const currentPage = 1;
        const data = { limit, currentPage };
        dispatch(getPagination(data) as any).then(() => {});
      };

      handlePages();
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(getAllOrders(token)).then((res: any) => {
      setTotalOrderCount(res.payload.length);
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(getAllUser(token)).then((res: any) => {
      setTotalUserCount(res.payload.length);
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(alltransactions(token)).then((res: any) => {
      setTotalPaymentCount(res.payload.length);
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    const data = {
      id: user && user && user.id,
      token: user && user && user.token,
    };
    dispatch(getAUser(data)).then((res: any) => {
      if (res && res.payload && res.payload.id) {
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllproduct()).then((res: any) => {
      dispatch(
        getAllOrders((res: any) => {
          if (res && res.payload && Array.isArray(res.payload)) {
          }
        })
      );
    });
  }, []);

  const handleEdit = (productId: any) => {
    dispatch(getAproduct(productId)).then((res) => {
      if (res && res.payload) {
        navigate(`/product/update/${productId}`);
      }
    });
  };

  const handleCreateProduct = () => {
    navigate("/product/create");
  };

  const handleStatus = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    const allSelectOption = [...theStatus];
    allSelectOption[index] = e.target.value;
    setThestatus(allSelectOption);
    setOrderIndex(index);
  };
  console.log(theStatus);
  const token = user && user.role === "ADMIN" && user.token;

  const handleDelete = (productId: any) => {
    const getConfirmation = window.confirm(
      "Are you sure you want to delete this product"
    );
    if (getConfirmation) {
      const product = { productId, token };
      dispatch(deleteproduct(product)).then((res: any) => {
        if (res && res.payload && res.payload.id) {
          var checkItem = JSON.parse(localStorage.getItem("cart") as any);
          if (checkItem && Array.isArray(checkItem)) {
            const index = checkItem.findIndex(
              (item) => item.id === res.payload.id
            );
            checkItem.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(checkItem));
            dispatch(fetchAllUsersCartAsync()).then(() => {
              dispatch(getAllproduct()).then(() => {
                addToast("Product Succesfully deleted", {
                  appearance: "success",
                  autoDismiss: true,
                });
              });
            });
          } else {
            checkItem = {};
            localStorage.setItem("cart", JSON.stringify(checkItem));
            dispatch(fetchAllUsersCartAsync()).then(() => {
              dispatch(getAllproduct()).then(() => {
                addToast("Product Succesfully deleted", {
                  appearance: "success",
                  autoDismiss: true,
                });
              });
            });
          }
        }
      });
    }
  };

  const handleOrderDelete = (id: any) => {
    const getConfirmation = window.confirm(
      "Are you sure you want to delete this Order"
    );
    if (getConfirmation) {
      const data = { id, token };
      dispatch(deleteOrder(data)).then((res: any) => {
        if (res && res.payload && res.payload.id) {
          dispatch(getAllOrders(token)).then((res: any) => {
            if (res && res.payload) {
              addToast("Order successfully deleted", {
                appearance: "success",
                autoDismiss: true,
              });
            }
          });
        }
      });
    }
  };

  const handlePaymentDelete = (id: any) => {
    const getConfirmation = window.confirm(
      "Are you sure you want to delete this transaction"
    );
    if (getConfirmation) {
      const data = { id, token };
      dispatch(deleteATransaction(data)).then((res: any) => {
        if (res && res.payload && res.payload.id) {
          addToast("Order successfully deleted", {
            appearance: "success",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handleDeleteUser = (id: any, name: string) => {
    const getConfirmation = window.confirm(
      `Are you sure you want to delete ${name} account?`
    );

    if (getConfirmation) {
      const data = {
        token,
        id,
      };

      dispatch(deleteUser(data)).then((res: any) => {
        if (res && res.payload && res.payload.id) {
          addToast(`${name} account is successfully deleted`, {
            appearance: "info",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handleProductDetails = (productId: any) => {
    dispatch(getAproduct(productId)).then((res) => {
      if (res && res.payload && res.payload.images && res.payload.images.set) {
        navigate(`/product/details/${productId}`);
      }
    });
  };

  const { addToast } = useToasts();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchCategories = (name: string) => {
    //options is an array of objects
    if (name === "All Product") {
      setIsProduct(true);
      setIsUser(false);
      setIsOrder(false);
      setIsPayment(false);

      const handlePages = () => {
        const limit = 3;
        const currentPage = 1;
        const item = { limit, currentPage };
        dispatch(getPagination(item) as any).then(() => {});
      };

      handlePages();
    } else if (name === "All Orders") {
      setIsProduct(false);
      setIsUser(false);
      setIsOrder(true);
      setIsPayment(false);

      const handlePages = () => {
        const limit = 1;
        const currentPage = 1;
        const data = { limit, currentPage };
        const item = { token, data };
        dispatch(getOrderPagination(item) as any).then(() => {});
      };

      handlePages();
    } else if (name === "All Payment") {
      setIsProduct(false);
      setIsUser(false);
      setIsOrder(false);
      setIsPayment(true);

      const handlePages = () => {
        const limit = 1;
        const currentPage = 1;
        const item = { limit, currentPage };
        const data = { token, item };
        dispatch(getpaymentPagination(item) as any).then(() => {});
      };

      handlePages();
    } else if (name === "All Users") {
      setIsProduct(false);
      setIsUser(true);
      setIsOrder(false);
      setIsPayment(false);

      const handlePages = () => {
        const limit = 2;
        const currentPage = 1;
        const item = { limit, currentPage };
        const data = { token, item };
        dispatch(getUserPagination(data) as any).then(() => {});
      };

      handlePages();
    } else {
    }
  };

  const sendUpdate = (id: any) => {
    const status = theStatus[theStatus.length - 1];
    const data = {
      id,
      status,
      token,
    };

    dispatch(orderUpdate(data)).then((res: any) => {
      if (res.payload.id) {
        dispatch(getAllOrders(token));
      }
    });
  };

  const filters = [
    {
      id: "product",
      name: "All Product",
    },
    {
      id: "orders",
      name: "All Orders",
    },
    {
      id: "payment",
      name: "All Payment",
    },
    {
      id: "users",
      name: "All Users",
    },
  ];
  function viewUser(id: any): void {
    navigate(`/profile/${id}`);
    // throw new Error("Function not implemented.");
  }

  return (
    <div>
      <div>
        <div className="mt-14">
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
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-base font-semibold leading-10 text-gray-900">
                          Welcome To Admin Panel
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
                      <form className="border-t border-gray-200">
                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-t hover:text-white border-gray-200 px-4 py-6"
                            onClick={() => fetchCategories(section.name)}
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 flow-root">
                                  <Disclosure.Button className="flex w-full hover:bg-red-800 items-center justify-between bg-white px-2 py-3 text-gray-900 hover:text-white">
                                    <span className="font-medium text-gray-900 hover:text-white">
                                      {section.name}
                                    </span>
                                    <span className="ml-6 flex items-center"></span>
                                  </Disclosure.Button>
                                </h3>
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
              <div className="flex items-baseline justify-between border-b border-gray-200">
                <h1 className="text-base font-semibold text-bold leading-7 text-gray-900">
                  Welcome To Admin Panel
                </h1>

                <div className="flex items-center">
                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-900 hover:text-gray-700 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-900 hover:text-gray-800 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only"></span>
                    <FunnelIcon className="h-6 w-6" aria-hidden="true" />
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
                        onClick={() => fetchCategories(section.name)}
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full hover:bg-red-800 items-center px-4 justify-between bg-white py-3 text-sm text-gray-400 hover:text-white">
                                <span className="font-medium text-gray-900 hover:text-white">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center"></span>
                              </Disclosure.Button>
                            </h3>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-3 bg-white rounded-lg">
                    {/* this is product list Content */}
                    <div className="">
                      <div className="lg:col-span-3 bg-white rounded-lg">
                        {/* head  */}

                        <div className="h-screen dark:bg-white-700 bg-white-200 pt-0">
                          {/* <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg"> */}
                          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                            {/* product list  */}
                            {isproduct ? (
                              <>
                                <div className="flex justify-between pb-4">
                                  <h2 className="text-base px-2 py-2 font-semibold leading-7 text-gray-900">
                                    Lists of All Product
                                  </h2>
                                  <div
                                    onClick={handleCreateProduct}
                                    className="text-sm text-center text-bold text-white cursor-pointer bg-red-800 hover:bg-red-700 hover:text-white px-3 pb-0 pt-1.5 mt-2 ml-2 rounded-full border border-blue-300"
                                  >
                                    <strong>Add Product </strong>
                                  </div>
                                </div>

                                {products &&
                                  products.map((item: any) => (
                                    <div className="border border-gray-300 flex flex-col">
                                      <div
                                        onClick={() =>
                                          handleProductDetails(item.id)
                                        }
                                        className="flex flex-col lg:flex-row justify-between px-4 py-2 w-full hover:bg-red-100 cursor-pointer"
                                      >
                                        <div className="first">
                                          <div className="sm:col-span-3">
                                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                              <strong> title:</strong>{" "}
                                              {item.title}
                                            </div>
                                          </div>

                                          <div className="sm:col-span-3">
                                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                              {" "}
                                              <strong>description:</strong>{" "}
                                              {item.description.slice(0, 40)}
                                            </div>
                                          </div>

                                          <div className="sm:col-span-3">
                                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                              {" "}
                                              <strong>price:</strong>{" "}
                                              {item.price}
                                            </div>
                                          </div>

                                          <div className="sm:col-span-3">
                                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                              {" "}
                                              <strong>Keywords:</strong>{" "}
                                              {item.keywords}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="second">
                                          <div className="sm:col-span-3">
                                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                              {" "}
                                              <strong>
                                                discountPercentage:
                                              </strong>{" "}
                                              {item.discountPercentage}
                                            </div>
                                          </div>

                                          <div className="sm:col-span-3">
                                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                              {" "}
                                              <strong> stock:</strong>{" "}
                                              {item.stock}
                                            </div>
                                          </div>

                                          <div className="sm:col-span-3">
                                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                              {" "}
                                              <strong>brand:</strong>{" "}
                                              {item.brand.name}
                                            </div>
                                          </div>

                                          <div className="sm:col-span-3">
                                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                              {" "}
                                              <strong>category:</strong>{" "}
                                              {item.category.name}
                                            </div>
                                          </div>

                                          <div className="flex justify-between">
                                            {" "}
                                            <div></div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex justify-between px-4 pt-0 pb-2 w-full">
                                        <div
                                          onClick={() => handleEdit(item.id)}
                                        >
                                          <PencilIcon
                                            width="16px"
                                            height="16px"
                                            color="brown"
                                            className="cursor-pointer"
                                          />{" "}
                                        </div>
                                        <TrashIcon
                                          onClick={() => handleDelete(item.id)}
                                          width="16px"
                                          height="16px"
                                          color="red"
                                          className="cursor-pointer"
                                        />{" "}
                                      </div>
                                    </div>
                                  ))}

                                <ProductPagination
                                  totalCount={totalProductCount}
                                />
                              </>
                            ) : isOrder ? (
                              <>
                                <div className="flex justify-between pb-4">
                                  <h2 className="text-base text-center font-bold leading-7 px-2 pt-2 text-gray-900">
                                    Lists of Orders
                                  </h2>
                                </div>

                                {orders &&
                                  orders.map((item: any, index: number) => (
                                    <div className="border border-gray-300 flex flex-col">
                                      <div className="flex flex-col justify-between px-4 py-2 w-full cursor-pointer">
                                        {item.productDetails.map(
                                          (it: any, index: number) => (
                                            <>
                                              <h2 className="text-base border border-bottom-gray-400 font-semibold text-center leading-7 text-gray-900">
                                                #item {index + 1}
                                              </h2>
                                              <div className="sm:col-span-3">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                  <strong>
                                                    Product Name:{" "}
                                                  </strong>
                                                  {it.title}
                                                </div>
                                              </div>

                                              <div className="sm:col-span-3">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                  <strong>
                                                    Price Per Item:{" "}
                                                  </strong>{" "}
                                                  $ ${it.price}
                                                </div>
                                              </div>

                                              <div className="sm:col-span-3">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                  <strong>
                                                    Quantity Purchased:
                                                  </strong>{" "}
                                                  {it.quantity}
                                                </div>
                                              </div>

                                              <div className="sm:col-span-3">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                  <strong>
                                                    Product Brand:{" "}
                                                  </strong>{" "}
                                                  {it.brand.name}
                                                </div>
                                              </div>

                                              <div className="sm:col-span-3">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                  <strong>
                                                    Product Category:
                                                  </strong>{" "}
                                                  {it.category.name}
                                                </div>
                                              </div>
                                            </>
                                          )
                                        )}

                                        <div>
                                          <div
                                            className="orders"
                                            style={{
                                              borderBottom: "2px gray solid",
                                            }}
                                          >
                                            <h2 className="text-base text-center border-b font-semibold leading-7 text-gray-900">
                                              Product Shipping Details
                                            </h2>
                                            <div className="sm:col-span-3">
                                              <div className="block text-sm font-medium leading-6 text-gray-900">
                                                <strong>Ordered By: </strong>
                                                {item &&
                                                  item.shippingDetails &&
                                                  item.shippingDetails.fullName}
                                              </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                              <div className="block text-sm font-medium leading-6 text-gray-900">
                                                <strong>Mobile No: </strong>
                                                {item &&
                                                  item.shippingDetails &&
                                                  item.shippingDetails.phone}
                                              </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                              <div className="block text-sm font-medium leading-6 text-gray-900">
                                                <strong>Email: </strong>
                                                {item &&
                                                  item.shippingDetails &&
                                                  item.shippingDetails.email}
                                              </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                              <div className="block text-sm font-medium leading-6 text-gray-900">
                                                {" "}
                                                <strong>
                                                  Shipping Address:
                                                </strong>{" "}
                                                {item &&
                                                  item.shippingDetails &&
                                                  item.shippingDetails.address}
                                                ,{" "}
                                                {item &&
                                                  item.shippingDetails &&
                                                  item.shippingDetails
                                                    .city}{" "}
                                                ,{" "}
                                                {item &&
                                                  item.shippingDetails &&
                                                  item.shippingDetails
                                                    .state}{" "}
                                                ,{" "}
                                                {item &&
                                                  item.shippingDetails &&
                                                  item.shippingDetails.country}
                                                ,{" "}
                                                {item &&
                                                  item.shippingDetails &&
                                                  item.shippingDetails
                                                    .zipcode}{" "}
                                              </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                              <div className="block text-sm font-medium leading-6 text-gray-900">
                                                <strong>Date Ordered: </strong>
                                                {format(
                                                  new Date(item.createdAt),
                                                  "HH:mm:ss yyyy-MM-dd"
                                                )}
                                              </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                              <div className="flex flex-col lg:flex-row justify-between py-4 block text-sm font-medium leading-6 text-gray-900">
                                                <strong className="text-center lg:text-left">
                                                  Delivery Status:{" "}
                                                </strong>
                                                <select
                                                  className="w-1/8 lg:w-1/6 p-2 border border-red-800 rounded"
                                                  value={
                                                    theStatus
                                                      ? theStatus[0]
                                                      : item.status
                                                  }
                                                  onChange={(e) =>
                                                    handleStatus(e, index)
                                                  }
                                                >
                                                  <option value="PENDING">
                                                    PENDING
                                                  </option>
                                                  <option value="SHIPPED">
                                                    SHIPPED
                                                  </option>
                                                  <option value="DECLINED">
                                                    DECLINED
                                                  </option>
                                                  <option value="DELIVERED">
                                                    DELIVERED
                                                  </option>
                                                </select>
                                                <button
                                                  onClick={() =>
                                                    sendUpdate(item.id)
                                                  }
                                                  className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                  Update Status
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex justify-between px-4 pt-0 pb-2 w-full">
                                        <div></div>
                                        <TrashIcon
                                          onClick={() =>
                                            handleOrderDelete(item.id)
                                          }
                                          width="16px"
                                          height="16px"
                                          color="red"
                                          className="cursor-pointer"
                                        />{" "}
                                      </div>
                                    </div>
                                  ))}

                                <OrdersPagination
                                  totalCount={totalOrderCount}
                                />
                              </>
                            ) : isUser ? (
                              <>
                                <ul
                                  role="list"
                                  className="divide-y divide-gray-100 px-4"
                                >
                                  {users &&
                                    users.map((person: any) => (
                                      <li
                                        key={person.id}
                                        className="flex justify-between gap-x-6 py-5"
                                      >
                                        <div className="flex min-w-0 gap-x-4">
                                          <img
                                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                            src={
                                              person &&
                                              person.image &&
                                              person.image.url
                                            }
                                            alt=""
                                          />
                                          <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                              {person.fullName}
                                            </p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                              {person.email}
                                            </p>
                                            <div
                                              onClick={() =>
                                                viewUser(person.id)
                                              }
                                            >
                                              <EyeIcon
                                                width="16px"
                                                height="16px"
                                                color="brown"
                                                className="cursor-pointer"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                          <p className="text-sm leading-6 text-gray-900">
                                            {person.role}
                                          </p>
                                          {person.createdAt ? (
                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                              Joined since{" "}
                                              <time dateTime={person.createdAt}>
                                                {" "}
                                                {format(
                                                  new Date(person.createdAt),
                                                  "HH:mm:ss yyyy-MM-dd"
                                                )}
                                              </time>
                                            </p>
                                          ) : (
                                            <div className="mt-1 flex items-center gap-x-1.5">
                                              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                              </div>
                                              <p className="text-xs leading-5 text-gray-500">
                                                Just Joined
                                              </p>
                                            </div>
                                          )}
                                          <div
                                            onClick={() =>
                                              handleDeleteUser(
                                                person.id,
                                                person.fullName
                                              )
                                            }
                                          >
                                            <TrashIcon
                                              width="16px"
                                              height="16px"
                                              color="red"
                                              className="cursor-pointer"
                                            />{" "}
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                </ul>

                                <UsersPagination totalCount={totalUserCount} />
                              </>
                            ) : (
                              <>
                                <div className="flex justify-between pb-4">
                                  <h2 className="text-base text-center font-bold leading-7 px-2 pt-2 text-gray-900">
                                    Transactions Made
                                  </h2>
                                </div>

                                {allTransactions &&
                                  allTransactions.map(
                                    (item: any, index: number) => (
                                      <div className="border border-gray-300 flex flex-col">
                                        <div className="flex flex-col justify-between px-4 py-2 w-full cursor-pointer">
                                          <>
                                            <h2 className="text-base border border-bottom-gray-400 font-semibold text-center leading-7 text-gray-900">
                                              #Payment details {index + 1}
                                            </h2>
                                            <div className="sm:col-span-3">
                                              <div className="block text-sm font-medium leading-6 text-gray-900">
                                                <strong>Amount Paid: </strong>
                                                {item.paymentDetails.amount}
                                              </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                              <div className="block text-sm font-medium leading-6 text-gray-900">
                                                <strong>Status: </strong> $
                                                {item.paymentDetails.status}
                                              </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                              <div className="block text-sm font-medium leading-6 text-gray-900">
                                                <strong>Tax Ref:</strong>{" "}
                                                {item.paymentDetails.tx_ref}
                                              </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                              <div className="block text-sm font-medium leading-6 text-gray-900">
                                                <strong>
                                                  Transaction id:{" "}
                                                </strong>{" "}
                                                {
                                                  item.paymentDetails
                                                    .transaction_id
                                                }
                                              </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                              <div className="block text-sm font-medium leading-6 text-gray-900">
                                                <strong>Payment Time:</strong>{" "}
                                                {format(
                                                  new Date(
                                                    item.paymentDetails.created_at
                                                  ),
                                                  "HH:mm:ss yyyy-MM-dd"
                                                )}
                                              </div>
                                            </div>
                                          </>
                                          <div>
                                            <div
                                              className="orders"
                                              style={{
                                                borderBottom: "2px gray solid",
                                              }}
                                            >
                                              <h2 className="text-base text-center border-b font-semibold leading-7 text-gray-900">
                                                Sender Details
                                              </h2>
                                              <div className="sm:col-span-3">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                  <strong>Full Name: </strong>
                                                  {item &&
                                                    item.user &&
                                                    item.user.fullName}
                                                </div>
                                              </div>

                                              <div className="sm:col-span-3">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                  <strong>Phone: </strong>
                                                  {item &&
                                                    item.user &&
                                                    item.user.phone}
                                                </div>
                                              </div>

                                              <div className="sm:col-span-3">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                  <strong>Email: </strong>
                                                  {item &&
                                                    item.user &&
                                                    item.user.email}
                                                </div>
                                              </div>

                                              <div className="sm:col-span-3">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                  {" "}
                                                  <strong>Address:</strong>{" "}
                                                  {item &&
                                                    item.user &&
                                                    item.user.address}
                                                  ,{" "}
                                                  {item &&
                                                    item.user &&
                                                    item.user.city}{" "}
                                                  ,{" "}
                                                  {item &&
                                                    item.user &&
                                                    item.user.state}{" "}
                                                  ,{" "}
                                                  {item &&
                                                    item.user &&
                                                    item.user.country}
                                                  ,{" "}
                                                  {item &&
                                                    item.user &&
                                                    item.user.zipcode}{" "}
                                                </div>
                                              </div>
                                              <div className="sm:col-span-3">
                                                <div className="block text-sm font-medium leading-6 text-gray-900">
                                                  <strong>Date Joined: </strong>
                                                  {format(
                                                    new Date(
                                                      item &&
                                                        item.user &&
                                                        item.user.createdAt
                                                    ),
                                                    "HH:mm:ss yyyy-MM-dd"
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex justify-between px-4 pt-0 pb-2 w-full">
                                          <div></div>
                                          <TrashIcon
                                            onClick={() =>
                                              handlePaymentDelete(item.id)
                                            }
                                            width="16px"
                                            height="16px"
                                            color="red"
                                            className="cursor-pointer"
                                          />{" "}
                                        </div>
                                      </div>
                                    )
                                  )}

                                <PaymentPagination
                                  totalCount={totalPaymentCount}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end of product grid */}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
