import React, { useState } from 'react';
import './Camera.css';
import {uploadFile} from "C:/eye-ai/eye-ai-front/firebaseConfig";
import {v4} from 'uuid';


export function Camera() {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);

    try {
      const response = await fetch('https://flask-app-fe7pjbfdsq-ew.a.run.app/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al subir el archivo');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setMedia(url);
      setMediaType(file.type.startsWith('image') ? 'image' : 'video');

      // Guardar la imagen en Firebase Storage

      if (file.type.startsWith('image')) {

          uploadFile(blob, v4());
        
        }
      
      

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMedia(null);
    setMediaType('');
  };

  return (
    <div>
      <div className="media-show">
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          media && (
            mediaType === 'image' ? (
              <img src={media} alt="Uploaded media" className="media-content" />
            ) : (
              <video
                src={media}
                controls
                autoPlay
                muted
                className="media-content"
                onError={(e) => console.error('Error al reproducir el video:', e)}
              >
                Tu navegador no soporta el elemento de video.
              </video>
            )
          )
        )}
      </div>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleUpload}
        onClick={handleClear}
        style={{ display: 'none' }}
        id="upload-input"
      />
      <div className="button-container">
        <button
          className="boton"
          onClick={() => document.getElementById('upload-input').click()}
        >
          Sube tu imagen o tu video ⬆
        </button>
        <button
          className="boton-clear"
          onClick={handleClear}
        >
          Borrar
        </button>
      </div>
    </div>
  );
}