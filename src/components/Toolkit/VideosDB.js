import axios from "axios";

export const getVideos = async (token) => {
  const response = await fetch("http://localhost:8000/cat-videos/videos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
export const deleteVideoByID =async (token,videoId) => {
  const response = await fetch("http://localhost:8000/cat-videos/videos/"+videoId, {
    method:"DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
export const updateVideoByID = () => {};
export const getMyVideos = async (token) => {
  const response = await fetch("http://localhost:8000/cat-videos/myvideos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
export const getCategories = async (token) => {
  const response = await fetch("http://localhost:8000/cat-videos/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
export const uploadVideo = (
  file,
  thumbnail,
  name,
  description,
  category,
  userId,
  token
) => {
  console.log(file, thumbnail, description, category, userId, token);
  const formData = new FormData();
  console.log(file);
  formData.append("file", file);
  formData.append("thumbnail", thumbnail);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("userId", userId);
  axios
    .post("http://localhost:8000/cat-videos/upload", formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      alert("The file is successfully uploaded");
    })
    .catch((error) => {
      console.log(error);
    });
};
