import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllPhotos } from "./photoService.ts";
import { Photo } from "./types";

interface PhotoStore {
    photos: Photo[];
    setPhotos: (photos: Photo[]) => void;
    addPhoto: (photo: Photo) => void;
    updatePhoto: (id: number, updatedPhoto: Photo) => void;
    deletePhoto: (id: number) => void;
    fetchPhotos: () => void;
}

const customStorage = {
    getItem: (name: string) => {
        const item = localStorage.getItem(name);
        console.log("Getting item from localStorage", name, item); 
        return item ? JSON.parse(item) : null;
    },
    setItem: (name: string, value: any) => {
        console.log("Setting item to localStorage", name, value); 
        localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name: string) => {
        console.log("Removing item from localStorage", name); 
        localStorage.removeItem(name);
    },
};

export const usePhotoStore = create<PhotoStore>()(
    persist(
        (set) => ({
            photos: [], 
            setPhotos: (photos) => set({ photos }),
            addPhoto: (photo) =>
                set((state) => {
                    const updatedPhotos = [...state.photos, photo];
                    localStorage.setItem("photos", JSON.stringify(updatedPhotos)); 
                    return { photos: updatedPhotos };
                }),
            updatePhoto: (id, updatedPhoto) =>
                set((state) => {
                    const updatedPhotos = state.photos.map((photo) =>
                        photo.id === id ? { ...photo, ...updatedPhoto } : photo
                    );
                    localStorage.setItem("photos", JSON.stringify(updatedPhotos));
                    return { photos: updatedPhotos };
                }),
            deletePhoto: (id) =>
                set((state) => {
                    const updatedPhotos = state.photos.filter((photo) => photo.id !== id);
                    localStorage.setItem("photos", JSON.stringify(updatedPhotos)); 
                    return { photos: updatedPhotos };
                }),
            fetchPhotos: async () => {
                const photos = await getAllPhotos();
                set({ photos });
                localStorage.setItem("photos", JSON.stringify(photos)); 
            },
        }),
        {
            name: "photo-storage", 
            storage: customStorage, 
        }
    )
);
