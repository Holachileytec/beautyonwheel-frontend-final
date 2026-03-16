import React, { useEffect, useState } from "react";
import api from "../config/api";
import "../Styles/gallery.css";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await api.get("/api/beauticians/getAllGallery");
        const data = res.data.galleryItems || res.data;
        setImages(Array.isArray(data) ? data : []);
        console.log("Galerry data", res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    getAllImages();
  }, []);

  if (loading) return <div>Loading gallery...</div>;

  return (
    <>
      <h2 className="text-center">Gallery</h2>

      <div className="images">
        {images.length > 0 ? (
          images.map((img) => (
            <div className="d-flex flex-column p-5">
              {/* <img
                src={`http://localhost:5000${img.imageUrl}`}
                alt={img.description || "Gallery Item"}
                key={img._id || img.id}
              /> */}
              <img
                src={`${import.meta.env.VITE_API_URL || "https://beautyplug.com.ng"}${img.imageUrl}`}
                alt={img.description || "Gallery Item"}
                key={img._id || img.id}
              />
              <p className="px-3">{img.description}</p>
            </div>
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </>
  );
}

export default Gallery;
