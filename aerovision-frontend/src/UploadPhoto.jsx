import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import UploadSection from './components/UploadSection';
import UploadButton from './components/UploadButton';
import { api } from './services/api';

function UploadPhoto() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageSelect = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedImage(file);
      setError(null);
    } else {
      setError('Please select a valid JPG or PNG image');
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    try {
      const result = await api.uploadImage(selectedImage);
      // Navigate to data table with the analysis result
      navigate('/data', { state: { analysisResult: result } });
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error(err);
    }
  };

  return (
    <main className="flex overflow-hidden flex-col items-center pb-16 bg-white">
      <Navbar />
      <h1 className="mt-24 text-5xl font-bold text-center text-sky-950 max-md:mt-10 max-md:text-4xl">
        上傳廢棄物照片
      </h1>
      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
      <UploadSection onImageSelect={handleImageSelect} selectedImage={selectedImage} />
      <UploadButton onClick={handleUpload} />
    </main>
  );
}

export default UploadPhoto;
