import { useEffect, useState } from 'react'
import NavBar from './NavBar/NavBar'
import Products from '../features/ProductList/components/Products'
import { useAppDispatch } from '../app/hooks';
import { getAllproduct } from '../features/ProductList/ProductSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
     <NavBar isOpen={isOpen} >
     <Products isOpen={isOpen} togglePopup={togglePopup} />
     </NavBar>
    </>
   
    
  )
}

export default Home
