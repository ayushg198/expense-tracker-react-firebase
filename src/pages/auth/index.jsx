import { Navigate, useNavigate } from 'react-router-dom';
import {auth,provider} from '../../config/firebase-config'
import {signInWithPopup} from 'firebase/auth'
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import "./style.css";




export const Auth=()=>{
   
    const navigate=useNavigate();
    const {isAuth}=useGetUserInfo();

    const signInWithGoogle=async()=>{
        const result= await signInWithPopup(auth,provider)
        const authInfo ={
            userID:result.user.uid,
            name: result.user.displayName,
            profilePhoto: result.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem("auth",JSON.stringify(authInfo));
        navigate('/expense-tracker');
    };
    if(isAuth){
        return <Navigate to="/expense-tracker"/>
    }
    return(
        <div className="login-page">
         <p>Sign In With Google To Continue</p>
         <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    );
}