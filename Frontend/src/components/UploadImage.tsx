"use client"
import { useState } from "react";

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch("http://localhost:8000/upload/", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;