import React, { useState } from 'react'
import NavBar from './NavBar/NavBar';
import Profile from '../features/auth/Profile';

const ProfilePage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <>
       <NavBar isOpen={isOpen} >
        <Profile/>
       </NavBar>
      </>
      
    )
}

export default ProfilePage
