import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, className = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsZoomed(false); // reset zoom
    setMousePosition({ x: 50, y: 50 }); // center
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleImageClick = () => {
    setIsZoomed(prev => !prev);
  };

  return (
    <>
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden cursor-zoom-in transition-all duration-300 hover:shadow-lg ${className}`}
        onClick={handleOpenModal}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="bg-white/90 rounded-full p-3 backdrop-blur-sm">
            <span className="text-sm text-gray-700">Click to Zoom</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in">
          {/* Close Button */}
          <Button
            onClick={handleCloseModal}
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Image Area */}
          <div
            className="absolute inset-0 flex items-center justify-center p-8"
            onClick={handleCloseModal}
          >
            <div
              className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-lg shadow-2xl bg-black"
              onClick={(e) => {
                e.stopPropagation();
                handleImageClick();
              }}
              onMouseMove={handleMouseMove}
              style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-auto max-h-[90vh] object-contain transition-transform duration-200 ease-out"
                style={
                  isZoomed
                    ? {
                        transform: `scale(2) translate(${(50 - mousePosition.x)}%, ${(50 - mousePosition.y)}%)`,
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      }
                    : {
                        transform: 'scale(1)',
                        transformOrigin: 'center',
                      }
                }
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              Click image to {isZoomed ? 'zoom out' : 'zoom in'} • Click outside to close
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageZoom;
