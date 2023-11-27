import React from 'react';
import './ImageViewer.css'
const ImageViewer = ({ imageUrl }) => {
  return (
    <div className="image-viewer">
      <h2>Image Viewer</h2>
      {imageUrl ? (
        <div className="image-container">
          <img src={imageUrl} alt="Image" />
        </div>
      ) : (
        <p>No image URL provided.</p>
      )}
    </div>
  );
};

export default ImageViewer;
