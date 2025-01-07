
import React, { useState } from "react";
import { Photo } from "../../services/types.ts";
import '../Photos/Photos.css'

interface PhotoCardProps {
  photo: Photo;
  onEdit: (id: number, updatedPhoto: Photo) => void;
  onDelete: (id: number) => void; 
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(photo.title);
  const [updatedUrl, setUpdatedUrl] = useState(photo.url);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (updatedTitle && updatedUrl) {
      onEdit(photo.id, { ...photo, title: updatedTitle, url: updatedUrl });
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedTitle(photo.title);
    setUpdatedUrl(photo.url);
  };

  const handleDeleteClick = () => {
    onDelete(photo.id); // קריאה לפונקציה למחוק את התמונה
  };

  return (
    <div className="photo-card">
      <img src={photo.thumbnailUrl} alt={photo.title} />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <input
            type="url"
            value={updatedUrl}
            onChange={(e) => setUpdatedUrl(e.target.value)}
          />
          <br />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{photo.title}</h3>
          <p>{photo.url.length > 30 ? `${photo.url.substring(0, 30)}...` : photo.url}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
      <br />
      <button className="delete-btn" onClick={handleDeleteClick}>
        🗑️
      </button> 
    </div>
  );
};

export default PhotoCard;
