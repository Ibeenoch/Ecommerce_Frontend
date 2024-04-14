import React, { ReactElement, ReactNode } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from './authSlice'
import LoginPage from '../../pages/LoginPage'
interface Children {
    child: ReactElement | any
}
const ProtectedRoute: React.FC<Children> = ({ child }) => {
    const { user } = useAppSelector(selectUser)
    if(user && user.id){
        return (
            child
        )
    }else{
        return (
            <LoginPage />
        )
    }
}

export default ProtectedRoute
