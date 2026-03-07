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
      <h2>Gallery Page</h2>

      <div className="images">
        {images.length > 0 ? (
          images.map((img) => (
            <img
              src={img.imageUrl}
              alt={img.description || "Gallery Item"}
              key={img._id || img.id}
            />
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </>
  );
}

export default Gallery;
