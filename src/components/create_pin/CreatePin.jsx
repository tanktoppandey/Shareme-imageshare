import React from 'react'
import './CreatePin.css'
import { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { storage  } from '../../utils/firebase.utils';
import { ref  ,uploadBytes ,getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid'
import { addPinstoFirestore } from '../../utils/firebase-firestore.utils';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useEffect } from 'react';


const formfields ={
    Tittle:'',
    Discription:'',
    altText:''
  }

const AppPintoFirebase = async(Params)=>{
  
  const {pinImage,Tittle,Discription,altText,uid ,name} = Params
  const refence= ref(storage,`images/pin${ pinImage.name + v4()}`)
  uploadBytes(refence,pinImage).then((snapshot) => {
    
    getDownloadURL(snapshot.ref).then((url)=>{
      
      addPinstoFirestore({
        name:name,
        imageURl:url,
        Tittle:Tittle,
        Discription:Discription,
        altText:altText,
        uid:uid
    
      })
    
    })

    console.log('Uploaded a blob or file!');
  });

 
  

}

function CreatePin() {
  const {currentUser} =useContext(UserContext)
  const [uploadImg,setuploadImg] = useState()
  const [uploadImgFb ,setUpload] = useState()
  const [formValue,setformValue]=useState(formfields)
  const uid=currentUser.uid
  console.log(currentUser)
  console.log(uid)

  useEffect(()=>{
    
  },[currentUser])
 
  

  const {Tittle,Discription,altText} = formValue


  


  const onChangesetImage = (e)=>{
    console.log(e.target.files)
    setuploadImg(URL.createObjectURL(e.target.files[0]))
    setUpload(e.target.files[0])
    
    console.log(uploadImg)
  }

  const  onClickRemoveImage = async()=>{
    setuploadImg(undefined);
    return;
  }

  const formOnchangeHandler=(e)=>{
    const {name, value} = e.target

    setformValue({...formValue, [name]:value})
    console.log(formValue)


  }

  const postPin = ()=>{
    uploadImg&&Tittle!==''?AppPintoFirebase({

        name: `${uid+Tittle+ v4()}`,
        uid:uid,
        pinImage:uploadImgFb,
        Tittle:Tittle,
        Discription:Discription,
        altText:altText,
        
      }): alert('fieldsMissing image and tittle are required fields')

  }

  return (
    <div className='CreatePin'>
        <div className="CreatPintop">
            <button>DELETE</button>
            <button onClick={postPin}>SAVE</button>


        </div>
        <div className="pinInfo">
            <div className="AddimageContainer">
            {uploadImg?<>
                <button onClick={onClickRemoveImage}>
                    <CancelIcon className='Removeupload'/> 
                </button>
                <img src={uploadImg} alt="" /></>: <>  
                <input type="file"  accept="image/*" onChange={onChangesetImage}></input>
                </>}
            </div>
            <div className="addpinDiscription">
                <form onSubmit={()=>{}}>
                    <input type='text' placeholder='Title' onChange={formOnchangeHandler} name='Tittle' required>

                    </input>
                    <input type='text' placeholder='Discription'  onChange={formOnchangeHandler} name='Discription'></input>
                    <input type='text' placeholder='Add alt text' onChange={formOnchangeHandler} name='altText'></input>  
                </form>

            </div>
        </div>
      
    </div>
  )
}

export default CreatePin
