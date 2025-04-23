import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaExpand, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

export default function ProductGallery({
  product,
  selectedImage,
  setSelectedImage,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  const openLightbox = () => {
    setLightboxOpen(true);
    setZoom(1);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
  };
  
  const nextImage = () => {
    if (product.images?.length) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };
  
  const prevImage = () => {
    if (product.images?.length) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };
  
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };
  
  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };
  
  const currentImage = product.images?.[selectedImage]?.secure_url || product.imageCover?.secure_url;

  return (
    <>
      <div className="space-y-4">
        <motion.div 
          className="relative h-96 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center cursor-zoom-in"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          onClick={openLightbox}
        >
          <img
            src={currentImage}
            alt={product.title}
            className="max-w-full max-h-full object-contain mx-auto"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
            <span className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity">
              <FaExpand />
            </span>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-5 gap-2">
          {product.imageCover && (
            <div
              className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                product.images?.length === 0 || selectedImage === -1 
                  ? "border-blue-500" 
                  : "border-transparent hover:border-blue-300"
              }`}
              onClick={() => setSelectedImage(-1)}>
              <img
                src={product.imageCover.secure_url}
                alt={`${product.title} cover`}
                className="w-full h-20 object-cover"
              />
            </div>
          )}
          
          {product.images?.map((image, index) => (
            <motion.div
              key={image._id}
              className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? "border-blue-500" : "border-transparent hover:border-blue-300"
              }`}
              onClick={() => setSelectedImage(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image.secure_url}
                alt={`${product.title} view ${index + 1}`}
                className="w-full h-20 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <div 
              className="relative max-w-7xl max-h-screen p-4 flex flex-col" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Controls */}
              <div className="absolute top-4 right-4 z-10 flex space-x-4">
                <button
                  onClick={() => handleZoomOut()}
                  disabled={zoom <= 1}
                  className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSearch className="text-sm" />-
                </button>
                <button
                  onClick={() => handleZoomIn()}
                  disabled={zoom >= 3}
                  className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSearch className="text-sm" />+
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <FaTimes />
                </button>
              </div>
              
              {/* Main image */}
              <div className="flex-1 overflow-hidden">
                <div className="h-full flex items-center justify-center">
                  <motion.img
                    src={currentImage}
                    alt={product.title}
                    style={{ 
                      transform: `scale(${zoom})`,
                      transition: 'transform 0.2s ease-in-out',
                      maxHeight: '80vh'
                    }}
                    className="object-contain"
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    dragElastic={0.1}
                  />
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="p-4 bg-gray-800 text-white rounded-full hover:bg-gray-700"
                  disabled={product.images?.length <= 1}
                >
                  <FaArrowLeft />
                </button>
                <div className="text-white text-center">
                  {product.images?.length > 0 && (
                    <span>
                      {selectedImage + 1} / {product.images.length}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="p-4 bg-gray-800 text-white rounded-full hover:bg-gray-700"
                  disabled={product.images?.length <= 1}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
