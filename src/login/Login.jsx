import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import videoLoginPage from './share.mp4'
import './Login.css'
import { Signinwithgoogle} from '../utils/firebase.utils';
import { async } from '@firebase/util';
import { createUserDocument ,CheckuserDoc } from '../utils/firebase-firestore.utils';
import { useContext ,useState} from 'react';
import { UserContext } from '../context/UserContext';




function Login() {

  const {User,SetUser} = useContext(UserContext)

  console.log(User)
  

  const OnclickHandle= async(e)=>{

    try{
    const response = await Signinwithgoogle()
    console.log(response.user)
    createUserDocument(response.user)
    
  }
    catch(error){
    
     console.log("encountered an error while signing in with google ",error.code," ", error)
  
    }
  }
  
  return (
    <div>
         <div className="logincontainer">
            <video src={videoLoginPage} loop autoPlay muted/>
            <div className="loginBtncontainer">
                <button onClick={OnclickHandle}>
                    <GoogleIcon />
                    <h3>Taking Souls</h3>
                </button>
            </div>
         </div>
    </div>
  )
}

export default Login
