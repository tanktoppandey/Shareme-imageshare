import { db } from "./firebase.utils";
import { collection ,addDoc ,getDoc ,doc, setDoc} from "firebase/firestore";
import { async } from "@firebase/util";

export const createUserDocument= async(user)=>{

    const {displayName,email ,photoURL,uid} =user
    
    const Docref= doc(db,'users',uid)
    console.log(Docref)
    const snapShot=await getDoc(Docref)
    console.log(snapShot.exists())
    
    


    if(snapShot.exists())
    {   
        const UserSnapshot= snapShot._document.data.value.mapValue.fields

        return UserSnapshot;
    }
    else{
    try{

    const docRef = await setDoc(Docref,{
        name:displayName,
        Email: email,
        ImageURl:photoURL,
         }
         )

       console.log('document Created with ID' ,Docref.id)
       
    }
   catch(e){
       console.log("An error Occured While Creating user",e ,e.code)
       
   }   
}
}

export const addPinstoFirestore= async(params)=>{
 const  { imageURl,Tittle,Discription, altText ,uid ,name} = params

 const Docref= doc(db,'pins',name)
 console.log(Docref)

 const setDocument = await setDoc(Docref,{
        url:imageURl,
        Tittle:Tittle,
        Discription:Discription,
        altText:altText, 
        user:uid
    }

 )


 
}