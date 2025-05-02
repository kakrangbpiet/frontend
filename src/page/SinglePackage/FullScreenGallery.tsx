import { useState, useEffect } from 'react';

interface MediaItem {
  awsUrl: string;
  type: 'image' | 'video';
}

interface FullScreenGalleryProps {
  images: string[];
  videos: MediaItem[];
  isOpen: boolean;
  initialMedia: { type: 'image' | 'video'; index: number };
  onClose: () => void;
}

const FullScreenGallery = ({
  images,
  videos,
  isOpen,
  initialMedia,
  onClose
}: FullScreenGalleryProps) => {
  const [currentMedia, setCurrentMedia] = useState(initialMedia);
  const allMedia = [
    ...images.map(img => ({ awsUrl: img, type: 'image' as const })),
    ...videos
  ];

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
  }, [isOpen, currentMedia, allMedia.length]);

  useEffect(() => {
    setCurrentMedia(initialMedia);
  }, [initialMedia]);

  const goToPrevious = () => {
    setCurrentMedia(prev => {
      const newIndex = prev.index === 0 ? allMedia.length - 1 : prev.index - 1;
      return {
        type: allMedia[newIndex].type,
        index: newIndex
      };
    });
  };

  const goToNext = () => {
    setCurrentMedia(prev => {
      const newIndex = prev.index === allMedia.length - 1 ? 0 : prev.index + 1;
      return {
        type: allMedia[newIndex].type,
        index: newIndex
      };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-xl">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-32 right-6 z-10 p-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
        aria-label="Close gallery"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* Counter */}
      <div className="absolute top-32 left-6 text-white/80 text-lg">
        {currentMedia.index + 1} / {allMedia.length}
      </div>

      {/* Media display */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
        {allMedia[currentMedia.index].type === 'image' ? (
          <img
            src={`${allMedia[currentMedia.index]}`}
            alt={`Gallery image ${currentMedia.index + 1}`}
            className="max-h-[90vh] max-w-full object-contain select-none rounded-lg shadow-2xl"
            draggable="false"
          />
        ) : (
          <video
            src={`${allMedia[currentMedia.index].awsUrl}`}
            className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
            autoPlay
            loop
            muted
            controls
            playsInline
          />
        )}
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center px-2 md:px-4">
        <button
          onClick={goToPrevious}
          className="p-3 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
          aria-label="Previous media"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center px-2 md:px-4">
        <button
          onClick={goToNext}
          className="p-3 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
          aria-label="Next media"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex overflow-x-auto space-x-2 px-3 py-2 bg-black/50 backdrop-blur-md rounded-xl shadow-lg max-w-[90vw] scrollbar-hide">
        {allMedia.map((media, index) => (
          <button
            key={index}
            onClick={() => setCurrentMedia({ type: media.type, index })}
            className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 ${index === currentMedia.index
              ? 'border-emerald-400 scale-110 shadow-lg'
              : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
              }`}
          >
            {media.type === 'image' ? (
              <img
                src={`${media.awsUrl}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 z-100 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <video
                  src={`${media?.awsUrl}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            )}
          </button>
        ))}
        {/* Close button */}
        <button
          onClick={onClose}
          className=" right-6 z-10 p-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
          aria-label="Close gallery"
        >
          Close
        </button>
      </div>

    </div>
  );
};

export default FullScreenGallery;