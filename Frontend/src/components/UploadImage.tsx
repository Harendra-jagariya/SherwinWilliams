// src/components/UploadImage.tsx
'use client';

import { useState } from 'react';

const UploadImage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Send the image to the backend API
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/process-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded"
          className="max-w-full h-auto rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default UploadImage;