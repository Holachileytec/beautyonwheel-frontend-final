import React from "react"
import { useEffect, useState } from "react"
import api from "../config/api"
import "../Styles/gallery.css"
function Gallery() {
const [image,setImage]=useState([])

useEffect(()=>{
const getAllImages=async()=>{
    try{
        const res = await api.get("/api/gallery/all-items")
        setImage(res.data.galleryItems || [])
    }catch(err){
        console.log("An error occured", err)
        setImage([])
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
