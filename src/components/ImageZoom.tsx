
import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, className = '' }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  return (
    <>
      {/* Thumbnail Image */}
      <div 
        className={`relative overflow-hidden cursor-zoom-in transition-all duration-300 hover:shadow-lg ${className}`}
        onClick={handleImageClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ cursor: isHovering ? 'zoom-in' : 'default' }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Zoom Indicator */}
        {isHovering && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-200">
            <div className="bg-white/90 rounded-full p-3 backdrop-blur-sm">
              <ZoomIn className="h-6 w-6 text-gray-700" />
            </div>
          </div>
        )}
      </div>

      {/* Zoomed Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in">
          {/* Close Button */}
          <Button
            onClick={handleCloseZoom}
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Zoomed Image Container */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-8 cursor-zoom-out"
            onClick={handleCloseZoom}
          >
            <div 
              className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-lg shadow-2xl cursor-zoom-in"
              onClick={(e) => e.stopPropagation()}
              onMouseMove={handleMouseMove}
              style={{ cursor: 'zoom-in' }}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain transition-transform duration-200 ease-out"
                style={{
                  transform: `scale(2) translate(${(50 - mousePosition.x) * 0.5}%, ${(50 - mousePosition.y) * 0.5}%)`,
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                }}
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              Move mouse to pan • Click anywhere to close
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageZoom;
