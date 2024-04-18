import { useEffect, useState } from 'react'
import NavBar from './NavBar/NavBar'
import Products from '../features/ProductList/components/Products'
import { useAppDispatch } from '../app/hooks';
import { getAllproduct } from '../features/ProductList/ProductSlice';
import Footer from './Footer';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

const Home = () => {
  const { addToast } = useToasts();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const getUser = JSON.parse(localStorage.getItem('user') as any)
  const gettoken = getUser && getUser.token;
  const token = JSON.stringify(gettoken);
 

// useEffect(() => {
// const isTokenExpired = (token: any) => {
//   if(!token){
//     addToast('Session expiry please login to continue',
//       {
//         appearance: 'info',
//         autoDismiss: true,
//       }
//     )
//     localStorage.removeItem('user');
//     navigate('/login');
//   }
//   const decodeToken = jwtDecode(token);
//   const currentTime = Math.floor(Date.now()/1000);
//   const expiryTime = decodeToken?.exp;
// console.log(currentTime, expiryTime);


//   if(expiryTime){
//    console.log(currentTime > expiryTime);
//      if(currentTime > expiryTime){
//       addToast('Session expiry please login to continue',
//       {
//         appearance: 'info',
//         autoDismiss: true,
//       }
//     )
//       localStorage.removeItem('user');
//       navigate('/login')
//      }else{
//       navigate('/')
//      }
//   }else{
//     addToast('Session expiry please login to continue',
//       {
//         appearance: 'info',
//         autoDismiss: true,
//       }
//     )
//     navigate('/login')
//   }
// }

// }, [])


  return (
    <>
     <NavBar isOpen={isOpen} >
     <Products isOpen={isOpen} togglePopup={togglePopup} />
     </NavBar>
     <Footer />
    </>
   
    
  )
}

export default Home
