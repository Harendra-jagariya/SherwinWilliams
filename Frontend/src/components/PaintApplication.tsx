import { useState } from "react";
import Image from 'next/image';
import { applyPaint } from "../pages/api";

interface PaintApplicationProps {
   file: File;
   selectedColor: string;
}

export default function PaintApplication({ file, selectedColor }: PaintApplicationProps) {
   const [paintedImage, setPaintedImage] = useState<string | null>(null);

   const handleApplyPaint = async () => {
      if (!file || !selectedColor) return alert("Upload image & select color");

      const responseBlob = await applyPaint(file, selectedColor);
      setPaintedImage(URL.createObjectURL(responseBlob));
   };

   return (
      <div>
         <button onClick={handleApplyPaint}>Apply Color</button>

         {paintedImage && <Image src={paintedImage} alt="Painted Wall" layout="responsive" width={500} height={500} />}
      </div>
   );
}