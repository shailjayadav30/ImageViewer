import React, { useState, useEffect } from "react";

interface ImageViewerProps {
  src?: string;
  initialZoomLevel: number;
  initialRotation: number;
  onPan: (position: { x: number; y: number }) => void;
  onImageChange?: (newSrc: string) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  src: externalSrc,
  initialZoomLevel = 1,
  initialRotation = 0,
  onPan,
  onImageChange,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(initialZoomLevel);
  const [rotation, setRotation] = useState<number>(initialRotation);

  const displayedImage = uploadedImage || externalSrc;

  useEffect(() => {
    setZoomLevel(initialZoomLevel);
  }, [initialZoomLevel]);

  useEffect(() => {
    setRotation(initialRotation);
  }, [initialRotation]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        setPosition({ x: 0, y: 0 });
        onImageChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;

    setPosition({ x: newX, y: newY });
    onPan({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];

    const newX = touch.clientX - startPos.x;
    const newY = touch.clientY - startPos.y;

    setPosition({ x: newX, y: newY });
    onPan({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      <div className="relative w-full h-[300px] md:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
        <div
          className="w-full h-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {displayedImage && (
            <img
              src={displayedImage}
              alt="Slide view"
              className="w-full h-full object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
                cursor: isDragging ? "grabbing" : "grab",
              }}
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
