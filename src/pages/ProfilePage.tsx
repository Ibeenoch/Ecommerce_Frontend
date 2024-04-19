import React, { useState } from 'react'
import NavBar from './NavBar/NavBar';
import UserProfile from '../features/auth/UserProfile';
import Footer from './Footer';

// interface User {
//   name: string;
//   profilePicture: string;
//   bio: string;
//   email: string;
// }

// const mockUser: User = {
//   name: 'John Doe',
//   profilePicture: 'https://via.placeholder.com/150', // Placeholder profile picture URL
//   bio: 'Web Developer with a passion for creating beautiful web applications.',
//   email: 'john.doe@example.com',
// };

const ProfilePage: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <>
       <NavBar isOpen={isOpen} >
            <UserProfile />
       </NavBar>
       <Footer />
      </>
      
    )
}

export default ProfilePage
