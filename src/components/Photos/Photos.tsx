import React, { useEffect, useState } from "react";
import { usePhotoStore } from "../../services/photoStore.ts";
import PhotoCard from "../PhotoCard/PhotoCard.tsx";

const Photos = () => {
  const { photos, fetchPhotos, addPhoto, updatePhoto, deletePhoto } = usePhotoStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [titleError, setTitleError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPhotos(); 
  }, [fetchPhotos]);

  const handleAddPhoto = () => {
    let isValid = true;

    if (!newTitle.trim()) {
      setTitleError("Title is required.");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!newUrl.trim()) {
      setUrlError("URL is required.");
      isValid = false;
    } else {
      setUrlError("");
    }

    if (isValid) {
      addPhoto({
        albumId: 1,
        id: Math.random(),
        title: newTitle,
        url: newUrl,
        thumbnailUrl: newUrl,
      });
      setNewTitle("");
      setNewUrl("");
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitleError("");
    setUrlError("");
  };

  const handleDeletePhoto = (id: number) => {
    deletePhoto(id); 
  };

  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Photos</h1>
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button className="add-photo-btn" onClick={handleOpenModal}>
        Add New Photo
      </button>

      <div className={`modal ${isModalOpen ? "" : "hidden"}`}>
        <div className="modal-content">
          <h2>Add a New Photo</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            {titleError && <p className="error-message">{titleError}</p>}
            <input
              type="url"
              placeholder="URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            {urlError && <p className="error-message">{urlError}</p>}
          </div>
          <button onClick={handleAddPhoto}>Save</button>
          <button className="cancel-btn" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>

      <div className="photo-list">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onEdit={updatePhoto} 
            onDelete={handleDeletePhoto} 
          />
        ))}
      </div>
    </div>
  );
};

export default Photos;
