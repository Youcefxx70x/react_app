import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Logout=()=>{
    const navigate=useNavigate();

    useEffect(()=>{
        const handleLogout=async()=>{
            try{
                await signOut(auth);
                navigate('/')
            }
            catch(error){
                console.error(error);
            }
        }
        handleLogout()

    },[])

    return(
        <div>
            Loging Out...
        </div>)


}