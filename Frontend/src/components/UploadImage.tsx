import { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [mask, setMask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image); // ✅ Key should match multer middleware

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/segment", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMask(response.data.mask);
    } catch (err) {
      console.error("Upload Error:", err);
      setError("Segmentation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload an Image for Segmentation</h2>
      <label htmlFor="file-upload">Upload Image:</label>
      <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload & Segment"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {mask && (
        <div>
          <h3>Segmentation Mask:</h3>
          <pre>{JSON.stringify(mask, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;