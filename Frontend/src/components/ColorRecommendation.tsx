import React, { useState } from "react";

const ColorRecommender: React.FC = () => {
   const [image, setImage] = useState<File | null>(null);
   const [colors, setColors] = useState<string[]>([]);

   const fetchColors = async () => {
      if (!image) return;

      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("http://localhost:8000/recommend-colors/", {
         method: "POST",
         body: formData
      });

      const data = await response.json();
      setColors(data.recommended_colors);
   };

   return (
      <div>
         <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
         <button onClick={fetchColors}>Get Color Recommendations</button>
         <ul>
            {colors.map((color, index) => <li key={index}>{color}</li>)}
         </ul>
      </div>
   );
};

export default ColorRecommender;