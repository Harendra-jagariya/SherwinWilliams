// src/app/page.tsx
import UploadImage from '../components/UploadImage';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">AI Virtual Painter</h1>
      <UploadImage />
    </main>
  );
}