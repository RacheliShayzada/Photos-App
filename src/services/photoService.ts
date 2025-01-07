
import { Photo} from './types.ts'

const API_URL = "https://jsonplaceholder.typicode.com/photos";

export const getAllPhotos = async (): Promise<Photo[]> => {
  const cachedPhotos = localStorage.getItem("photos");

  if (cachedPhotos) {
    return JSON.parse(cachedPhotos);
  }

  const response = await fetch(API_URL);
  const data = await response.json();

  localStorage.setItem("photos", JSON.stringify(data.slice(0, 10)));

  return data.slice(0, 10);
};


