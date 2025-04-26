import { useState, useEffect } from 'react';

interface FullScreenGalleryProps {
  images: string[];
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

const FullScreenGallery = ({ images, isOpen, initialIndex, onClose }: FullScreenGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, images.length]);
  
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center backdrop-blur-lg">
      <button
        onClick={onClose}
        className="absolute top-40 right-8 z-10 text-white hover:text-gray-300 transition-colors duration-300"
        aria-label="Close gallery"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="absolute top-40 left-4 text-white text-lg md:text-xl">
        {currentIndex + 1} / {images.length}
      </div>
      
      <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
        <img
          src={`data:image/jpeg;base64,${images[currentIndex]}`}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-h-full max-w-full object-contain select-none"
        />
      </div>
      
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={goToPrevious}
          className="bg-black/30 hover:bg-black/60 text-white p-2 md:p-4 rounded-r-lg backdrop-blur-sm transition-colors duration-300"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={goToNext}
          className="bg-black/30 hover:bg-black/60 text-white p-2 md:p-4 rounded-l-lg backdrop-blur-sm transition-colors duration-300"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex space-x-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
              index === currentIndex ? 'border-emerald-400 scale-110' : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={`data:image/jpeg;base64,${img}`}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FullScreenGallery;