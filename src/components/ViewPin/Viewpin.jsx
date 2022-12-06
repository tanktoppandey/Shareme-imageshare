import React from 'react'
import './Viewpin.css'
import CancelIcon from '@mui/icons-material/Cancel';

function Viewpin({name ,image ,user ,url ,Discription ,Tittle}) {
 
  console.log(name)
  return (
    <div className='ViewPinContainer'>
      
       <CancelIcon className='cancelIcon' />
       
       <div className='ViewpinInmageContainer'>
         <img src={url}></img>
       </div>
       <div className='ViewpinInfoContainer'>
           <h1>{Tittle}</h1>
           <p> {Discription}</p>
           
           <h1>{name}</h1>
       </div>
    </div>
  )
}

export default Viewpin
