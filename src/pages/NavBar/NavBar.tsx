import { ChangeEvent, Fragment, ReactElement, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import icon from '../../images/images-9.png'
import pics from '../../images/images-73.jpeg'
import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllUsersCartAsync, selectAllCart } from "../../features/cart/cartSlice";
import { selectUser } from "../../features/auth/authSlice";
import { getAllproduct, getProductSearchResult } from "../../features/ProductList/ProductSlice";
import { fetchAllUsersWishListAsync, selectAllWishList } from "../../features/wishlist/wishListSlice";

interface Child {
  children: ReactElement;
  isOpen: boolean
}


const NavBar: React.FC<Child> = ({ children, isOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [inputText, setInputText] = useState('');
  const location = useLocation();
  const { carts } = useAppSelector(selectAllCart);
  const { wishlist } = useAppSelector(selectAllWishList);
  const { user } = useAppSelector(selectUser);

  console.log( 'cart ',carts)
  useEffect(() => {
    dispatch(fetchAllUsersCartAsync())
  }, [navigate])

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value) 
  }

  const handleMouseEnter = () => {
    setShowSearch(true)
  }
  const handleMouseLeave = () => {
    setShowSearch(false)
  }

  const handleSearch = () => {
    dispatch(getProductSearchResult(inputText)).then((res) => {
    })
  }
  
  const handleCart = () => {
    dispatch(fetchAllUsersCartAsync()).then((res) => {
     if(res.payload === undefined || res.payload === null){
      return;
     }else{
      navigate('/cart')
     }
      
    })
  }
  
  const handleWishList = () => {
    dispatch(fetchAllUsersWishListAsync()).then((res) => {
     if(res.payload === undefined || res.payload === null){
      return;
     }else{
      navigate('/wishlist')
     }
      
    })
  }

  const handleProfile = () => {
    if(user && user.id){
      navigate(`/profile/${user && user.id}`)
    }else{
      return;
    }
  }

  const navigation = [
    { name: "Marven Store", href: "/", current: true },
    { name: "Team", href: "#", current: false },
  ];

  // const logout= () => {
  //   localStorage.removeItem('user')
  //   navigate('/login')
  // }

  const userNavigation = [
    { name: "Your Profile", href: user ? `/profile/${user && user && user.id}` : '#' },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: '#' },
  ];

  const handleLogoClicked = () => {
    dispatch(getAllproduct()).then((res: any) => {
      navigate('/');
      window.scrollTo(0, 0);
    })
  }

  const hexcode = '#DEB887'

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div  className="min-h-full">
        <Disclosure  as="nav" className="bg-white border-b border-b-red-800 fixed w-full z-50">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div>
                    <div onClick={handleLogoClicked} className="flex-shrink-0 cursor-pointer">
                      <img
                        className="h-8 w-8"
                        src={icon}
                        alt="Your Company"
                      />
                    </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-red-800 text-white"
                                : "text-white-900 hover:bg-red-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                    <div className="flex align-center justify-center">
                      <div className="">
                            <input className="border-none bg-gray-100" type="search" width={30} onChange={(e) => setInputText(e.target.value)} value={inputText}  placeholder="search for a product" onMouseLeave={handleMouseLeave}  onMouseEnter={handleMouseEnter}/> 
                      </div>
                      <div className="cursor-pointer" onMouseLeave={handleMouseLeave}  onMouseEnter={handleMouseEnter} onClick={handleSearch}>
                    <MagnifyingGlassIcon width={18} height={18} color="black" className="mt-3"/>
                      </div>
                      </div>
                  <div className="hidden md:block">
                    
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        onClick={handleWishList}
                        style={{ opacity: (isOpen ? '0.3': '1')}}
                        className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only"></span>
                        <HeartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                          color="black"
                        />
                      </button>
                    
                      <span  style={{ }} className="inline-flex items-center rounded-md z-10 bg-red-50 mb-8 -ml-2 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {wishlist.length}
                      </span>

                      <button
                        type="button"
                        onClick={handleCart}
                        style={{ opacity: (isOpen ? '0.3': '1')}}
                        className="relative rounded-full  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only"></span>
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                          color="black"
                        />
                      </button>
                    
                      <span  style={{ }} className="inline-flex items-center rounded-md z-10 bg-red-50 mb-8 -ml-2 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {carts.length}
                      </span>

                      
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user && user.image && user.image.url ? user.image.url : pics}
                              alt=""
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

<Disclosure.Panel className="md:hidden">
    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        {navigation.map((item) => (
            <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                    item.current ? "bg-white text-gray-900 hover:bg-gray-900 hover:text-white" : "text-gray-900 bg-white hover:bg-gray-900 hover:text-white"
                }`}
                aria-current={item.current ? "page" : undefined}
            >
                {item.name}
            </Disclosure.Button>
        ))}
    </div>
    <div className="border-t border-gray-700 pb-3 pt-4">
        <div className="flex items-center px-5">
            <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user && user?.image && user?.image?.url || pics} alt="" />
            </div>
            <div className="ml-3">
                <div className="text-base font-medium leading-none text-gray-900">{user?.fullName || 'name'}</div>
                <div className="text-sm font-medium leading-none text-gray-900">{user?.email || 'email'}</div>
            </div>
            <button
                onClick={handleWishList}
                type="button"
                className="relative ml-auto flex-shrink-0 rounded-full p-1 text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
                <HeartIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <span className="inline-flex items-center rounded-md z-10 bg-red-50 mb-3 ml-0 px-1.5 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            {wishlist.length}
            </span>

            <button
                onClick={handleCart}
                type="button"
                className="relative ml-auto flex-shrink-0 rounded-full p-1 text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <span className="inline-flex items-center rounded-md z-10 bg-red-50 mb-3 ml-0 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                {carts.length}
            </span>
        </div>
        <div className="mt-3 space-y-1 px-2">
            {userNavigation.map((item) => (
                <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-700 hover:text-white"
                >
                    {item.name}
                </Disclosure.Button>
            ))}
        </div>
    </div>
</Disclosure.Panel>

            </>
          )}
        </Disclosure>

        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              ShoppinPlug
            </h1>
          </div>
        </header> */}
        <main style={{ background: hexcode}}>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default NavBar;
