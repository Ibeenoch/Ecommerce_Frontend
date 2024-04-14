import {
  CameraIcon,
  ChevronDownIcon,
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
import { getAUser, selectUser } from "./authSlice";
import { getAUserTransaction, selectCheckout } from "../checkout/checkoutSlice";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pics from "../../images/HP Newest Pavilion 15.6_ HD Touchscreen Anti-Glare Laptop__4.jpg";
import { useToasts } from "react-toast-notifications";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import ShippingDetails from "./ShippingDetails";
import {
  deleteproduct,
  getAllproduct,
  getAproduct,
  selectProduct,
} from "../ProductList/ProductSlice";
import { fetchAllUsersCartAsync } from "../cart/cartSlice";
import { getAllOrders, selectOrder } from "../order/orderSlice";

const Admin = () => {
  const dispatch = useAppDispatch();
  const [selected1, setSelected1] = useState(true);
  const [selected2, setSelected2] = useState(false);
  const [isproduct, setIsProduct] = useState(true);
  const [isOrder, setIsOrder] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theStatus, setThestatus] = useState<string[]>([]);

  const { id } = useParams();
  const { checkoutInfo, aUserTransactions, aUserOrderedProducts } =
    useAppSelector(selectCheckout);
  const { user } = useAppSelector(selectUser);
  const { products } = useAppSelector(selectProduct);
  const { orders } = useAppSelector(selectOrder);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const data = {
      id: user && user && user.id,
      token: user && user && user.token,
    };
    dispatch(getAUser(data)).then((res: any) => {
      if (res && res.payload && res.payload.id) {
        console.log("user fetch: ", res, res.payload);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllproduct()).then((res: any) => {});
  }, []);
  console.log("get products result: ", products);

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
    setThestatus(allSelectOption)
  }

  console.log('status selected: ', theStatus)
  const token = user && user.token;

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

  const handleProductDetails = (productId: any) => {
    dispatch(getAproduct(productId)).then((res) => {
      console.log("product res: ", res);
      if (res && res.payload && res.payload.images && res.payload.images.set) {
        console.log(
          "product resent: ",
          res.payload.images.set,
          res.payload.images.set[0]
        );
        navigate(`/product/details/${productId}`);
      }
    });
  };

  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchCategories = (name: string) => {
    //options is an array of objects
    if (name === "All Product") {
      console.log("all product");
      setIsProduct(true);
      setIsUser(false);
      setIsOrder(false);
      setIsPayment(false);
      dispatch(getAllproduct()).then((res: any) => {
        console.log("product res: ", res);
      });
    } else if (name === "All Orders") {
      setIsProduct(false);
      setIsUser(false);
      setIsOrder(true);
      setIsPayment(false);
      dispatch(getAllOrders(token)).then((res: any) => {
        console.log("all orders: ", res);
      });
    } else if (name === "All Payment") {
      setIsProduct(false);
      setIsUser(false);
      setIsOrder(false);
      setIsPayment(true);
      console.log("all payment");
    } else if (name === "All Users") {
      setIsProduct(false);
      setIsUser(true);
      setIsOrder(false);
      setIsPayment(false);
      console.log("all user");
    } else {
      console.log("none");
    }
  };

  console.log(
    "product: ",
    isproduct,
    "user: ",
    isUser,
    "order: ",
    isOrder,
    "payment: ",
    isPayment
  );

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
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">
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
                            className="border-t border-gray-200 px-4 py-6"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                    <span
                                      onClick={() =>
                                        fetchCategories(section.name)
                                      }
                                      className="font-medium text-gray-900"
                                    >
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
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                  Welcome To Admin Panel
                </h1>

                <div className="flex items-center">
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
                    <span className="sr-only"></span>
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
                              <Disclosure.Button className="flex w-full items-center px-4 justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span
                                  className="font-medium text-gray-900"
                                  onClick={() => fetchCategories(section.name)}
                                >
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
                      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
                        {/* head  */}

                        <div className="h-screen dark:bg-white-700 bg-white-200 pt-0">
                          {/* <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg"> */}
                          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                            {/* product list  */}
                            {isproduct ? (
                              <>
                                <div className="flex justify-between pb-4">
                                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                    Lists of All Product
                                  </h2>
                                  <div
                                    onClick={handleCreateProduct}
                                    className="text-xl text-bold text-sky-800 cursor-pointer bg-indigo px-6 rounded-full border border-blue-300"
                                  >
                                    <strong>Add Product</strong>{" "}
                                  </div>
                                </div>

                                {products &&
                                  products.map((item: any) => (
                                    <div className="border border-gray-300 flex flex-col">
                                      <div
                                        onClick={() =>
                                          handleProductDetails(item.id)
                                        }
                                        className="flex justify-between px-4 py-2 w-full cursor-pointer"
                                      >
                                        <div className="first">
                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-lg font-poppins text-center">
                                              {" "}
                                              <strong> title:</strong>{" "}
                                              {item.title}
                                            </div>
                                          </div>

                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-lg font-poppins text-center">
                                              {" "}
                                              <strong>description:</strong>{" "}
                                              {item.description.slice(0, 40)}
                                            </div>
                                          </div>

                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-lg font-poppins text-center">
                                              {" "}
                                              <strong>price:</strong>{" "}
                                              {item.price}
                                            </div>
                                          </div>

                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-lg font-poppins text-center">
                                              {" "}
                                              <strong>Keywords:</strong>{" "}
                                              {item.keywords}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="second">
                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-lg  font-poppins text-center">
                                              {" "}
                                              <strong>
                                                discountPercentage:
                                              </strong>{" "}
                                              {item.discountPercentage}
                                            </div>
                                          </div>

                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-lg font-poppins text-center">
                                              {" "}
                                              <strong> stock:</strong>{" "}
                                              {item.stock}
                                            </div>
                                          </div>

                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-lg font-poppins text-center">
                                              {" "}
                                              <strong>brand:</strong>{" "}
                                              {item.brand.name}
                                            </div>
                                          </div>

                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-lg  font-poppins text-center">
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
                                            width="26px"
                                            height="26px"
                                            color="blue"
                                            className="cursor-pointer"
                                          />{" "}
                                        </div>
                                        <TrashIcon
                                          onClick={() => handleDelete(item.id)}
                                          width="26px"
                                          height="26px"
                                          color="red"
                                          className="cursor-pointer"
                                        />{" "}
                                      </div>
                                    </div>
                                  ))}
                              </>
                            ) : isOrder ? (
                              <>
                                <div className="flex justify-between pb-4">
                                  <h2 className="text-2xl font-bold text-center tracking-tight text-gray-900">
                                    Lists of Orders
                                  </h2>
                                </div>

                                {orders &&
                                  orders.map((item: any, index: number) => (
                                    <div className="border border-gray-300 flex flex-col">
                                      <div className="flex flex-col justify-between px-4 py-2 w-full cursor-pointer">
                                        {item.productDetails.map((it: any, index: number) => (
                                          <>
                                            <h3 className="flex text-xl py-2 text-bold justify-center">
                                              <strong>
                                              #item {index + 1} 
                                              </strong>
                                            </h3>
                                            <div className="flex items-center my-1">
                                              <div className="ml-6 truncate text-lg font-poppins text-center">
                                                <strong>Product Name: </strong>
                                                {it.title}
                                              </div>
                                            </div>

                                            <div className="flex items-center my-1">
                                              <div className="ml-6 truncate text-lg font-poppins text-center">
                                                <strong>
                                                  Price Per Item:{" "}
                                                </strong>{" "}
                                                $ ${it.price}
                                              </div>
                                            </div>

                                            <div className="flex items-center my-1">
                                              <div className="ml-6 truncate text-lg font-poppins text-center">
                                                <strong>
                                                  Quantity Purchased:
                                                </strong>{" "}
                                                {it.quantity}
                                              </div>
                                            </div>

                                            <div className="flex items-center my-1">
                                              <div className="ml-6 truncate text-lg font-poppins text-center">
                                                <strong>Product Brand: </strong>{" "}
                                                {it.brand.name}
                                              </div>
                                            </div>

                                            <div className="flex items-center my-1">
                                              <div className="ml-6 truncate text-lg font-poppins text-center">
                                                <strong>
                                                  Product Category:
                                                </strong>{" "}
                                                {it.category.name}
                                              </div>
                                            </div>
                                          </>
                                        ))}

                                        <div>
                                          <div
                                            className="orders"
                                            style={{
                                              borderBottom: "2px gray solid",
                                            }}
                                          >
                                            <h3 className="flex text-xl py-2 text-bold justify-center">
                                              {" "}
                                              <strong>
                                                Product Shipping Details
                                              </strong>{" "}
                                            </h3>
                                            <div className="flex items-center my-1">
                                              <div className="ml-6 truncate text-lg  font-poppins text-center">
                                                <strong>Ordered By: </strong>
                                                {item && item.shippingDetails && item.shippingDetails.fullName}
                                              </div>
                                            </div>

                                            <div className="flex items-center my-1">
                                              <div className="ml-6 truncate text-lg  font-poppins text-center">
                                                <strong>Mobile No: </strong>
                                                {item && item.shippingDetails && item.shippingDetails.phone}
                                              </div>
                                            </div>

                                            <div className="flex items-center my-1">
                                              <div className="ml-6 truncate text-lg  font-poppins text-center">
                                                <strong>Email: </strong>
                                                {item && item.shippingDetails && item.shippingDetails.email}
                                              </div>
                                            </div>

                                            <div className="flex items-center my-1">
                                              <div className="ml-6 truncate text-lg font-poppins text-center">
                                                {" "}
                                                <strong>
                                                  Shipping Address:
                                                </strong>{" "}
                                                {item && item.shippingDetails && item.shippingDetails.address},{" "}
                                                {item && item.shippingDetails && item.shippingDetails.city} ,{" "}
                                                {item && item.shippingDetails && item.shippingDetails.state} ,{" "}
                                                {item && item.shippingDetails && item.shippingDetails.country},{" "}
                                                {item && item.shippingDetails && item.shippingDetails.zipcode}{" "}
                                              </div>
                                            </div>
                                            <div className="flex items-center my-1">
                                              <div className="ml-6 truncate text-lg  font-poppins text-center">
                                                <strong>Delivery Status: </strong>
                                                <select value={theStatus[index]} onChange={(e) =>handleStatus(e, index)} >
                                                  <option value="PENDING">PENDING</option>
                                                  <option value="SHIPPED">SHIPPED</option>
                                                  <option value="DECLINED">DECLINED</option>
                                                  <option value="DELIVERED">DELIVERED</option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex justify-between px-4 pt-0 pb-2 w-full">
                                        <div
                                        >
                                         
                                        </div>
                                        <TrashIcon
                                          onClick={() => handleDelete(item.id)}
                                          width="26px"
                                          height="26px"
                                          color="red"
                                          className="cursor-pointer"
                                        />{" "}
                                      </div>
                                    </div>
                                  ))}
                              </>
                            ) : isUser ? (
                              <div>user</div>
                            ) : (
                              <div>payment</div>
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
