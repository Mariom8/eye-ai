import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { getLastImages } from "C:/eye-ai/eye-ai-front/firebaseConfig";

export function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await getLastImages();
      setImages(urls);
    };

    const intervalId = setInterval(fetchImages, 5000);

    return () => clearInterval(intervalId);

    fetchImages();
  }, []);

  return (
    <div>
      <h1 className="titulo">Ultimas imágenes</h1>
      <div className="gallery">
        {images.map((src, index) => (
          <div className="gallery-item" key={index}>
            <img src={src} alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
