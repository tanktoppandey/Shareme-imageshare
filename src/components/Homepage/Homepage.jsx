import React from 'react'
import { Avatar, Link } from '@mui/material'
import './Homepage.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from './logo.png'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { storage } from '../../utils/firebase.utils';
import { ref ,listAll ,uploadBytes, getDownloadURL} from 'firebase/storage';
import { useEffect } from 'react';
import { useState } from 'react';
import Masonry from 'react-masonry-css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase.utils';
import Viewpin from '../ViewPin/Viewpin';
import { doc ,getDoc} from 'firebase/firestore';




function Homepage() {

   const [imageList, setimageList] = useState([])
   const [popup,setpopup]=useState(false)
   const [Viepinpopup,setViewpin] = useState({})
   const {currentUser} =useContext(UserContext)
   console.log(currentUser.uid)
   const reference= ref(storage,'images/')
   console.log(imageList)
   console.log(Viepinpopup)



   useEffect(()=>{
      getDocs(collection(db ,'pins')).then((response)=>{

          response.forEach((item)=>{
            
              setimageList((prev)=>[...prev,item.data()])
})
      })
      
   },[])

   // useEffect(()=>{
   //    listAll(reference).then((response)=>{
   //       response.items.forEach((items)=>{
   //          getDownloadURL(items).then((url)=>{
   //             setimageList((prev)=>[...prev,url])
   //          })
            
   //       }

   //       )
   //    })
   // },[])

//   const {photoURL , displayName}=User

  //console.log(photoURL)

  const ViewPin =async(item)=>{
  console.log(item)
  const  { user ,url ,Discription ,Tittle}= item
  console.log('from viewpin' ,user)
  const Docref =  doc(db,'users',user)
  const snapShot =await getDoc(Docref)
  const {name,ImageURl} = snapShot._document.data.value.mapValue.fields

  const data={
      name:name.stringValue,
      image:ImageURl.stringValue,
      user:user,
      url:url,  
      Discription:Discription,
      Tittle:Tittle
  }
  
  setViewpin(data)
  setpopup(true)
    
}
  return (
    <div>
        {popup?<Viewpin {...Viepinpopup}/>: null}
       
       <div className="NavbarContainer">
             <div className="Navbarleftside">
              <div className="navlinkscontainer">
                    <img src={Logo} alt='logo' />
                    <a href='#'>Home</a>
                    <a href='#'>Trending</a>
              </div>
             </div>

             <div className="divSearchBar">
                 <input type="text"  placeholder='Search'/>
              </div>


             <div className="Navbarrightside">
               {! currentUser?<button>Login</button> :   
                  <>
                       <button><NotificationsIcon /></button>
                       <button><Avatar src={currentUser.photoURL}/></button>
                  </>
                  }

             </div>
            

      </div>
           <div className='PincontainerHome'>

             <Masonry
                     breakpointCols={6}
                     className="my-masonry-grid"
                     columnClassName="my-masonry-grid_column">


                        {
                            imageList.map((items)=>{
                                          return(
                                             <div className="imageContainerHome" id={items} onClick={()=>ViewPin(items)}>
                                                <img src={items.url} alt="" />
                                                <h1>{items.uid}</h1>
                                             </div>     
                              )
                            })

                         }
               </Masonry>

               </div>

              

      
    </div>
  )
}

export default Homepage
