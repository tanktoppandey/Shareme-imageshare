import { createContext ,useId,useState } from "react";
import { Authstatechangelistner } from "../utils/firebase.utils";
import { useEffect } from "react";

export const UserContext= createContext()


export const UserContextProvider=({children})=>{
    const [currentUser, SetUser]= useState({})
    const  value={currentUser,SetUser}


    useEffect(()=>{
        Authstatechangelistner((user)=>{
          console.log(user)
          if(user){
          SetUser(user)
        }

        //unsubscribe later unsubscribe = Authstatechangelistener  , return unsubscribe;
        })
    },[])

    return(
        <UserContext.Provider value={value}>
              {children}
        </UserContext.Provider>
    )
    

}