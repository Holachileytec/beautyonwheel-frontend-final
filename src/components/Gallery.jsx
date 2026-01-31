import React from "react"
import { useEffect, useState } from "react"
import "../Styles/gallery.css"
function Gallery() {
const [image,setImage]=useState([])

useEffect(()=>{
const getAllImages=async()=>{
    try{
        const res = await axios.get("http://localhost:8000/api/gallery/all-items")
        setImage(res.data.galleryItems)
    }catch(err){
        console.log("An error occured", err)
    }
}
getAllImages()
},[])



    return (
        <>
            <div className="images">
                {image.map((img)=>{
                     <img src={img.imageUrl} alt={img.description} key={img._id}/>
                })}


               
            </div>




        </>
    )
};

export default Gallery;
