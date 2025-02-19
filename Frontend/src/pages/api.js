const API_BASE_URL = "http://127.0.0.1:8000"; // Update if backend URL changes

export async function uploadImage(file) {
   const formData = new FormData();
   formData.append("file", file);

   const response = await fetch(`${API_BASE_URL}/upload/`, {
      method: "POST",
      body: formData,
   });

   return response.json();
}

export async function segmentWalls(file) {
   const formData = new FormData();
   formData.append("file", file);

   const response = await fetch(`${API_BASE_URL}/segment/`, {
      method: "POST",
      body: formData,
   });

   return response.blob(); // Returns segmented mask image
}

export async function getRecommendedColors(file) {
   const formData = new FormData();
   formData.append("file", file);

   const response = await fetch(`${API_BASE_URL}/recommend-colors/`, {
      method: "POST",
      body: formData,
   });

   return response.json(); // Returns recommended colors
}

export async function applyPaint(file, color) {
   const formData = new FormData();
   formData.append("file", file);
   formData.append("color", color);

   const response = await fetch(`${API_BASE_URL}/apply-color/`, {
      method: "POST",
      body: formData,
   });

   return response.blob(); // Returns painted image
}