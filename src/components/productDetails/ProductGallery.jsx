import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaExpand, FaArrowLeft, FaArrowRight, FaTimes, FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function ProductGallery({
  product,
  selectedImage,
  setSelectedImage,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  
  useEffect(() => {
    setImageLoaded(false);
    const newImageUrl = product.images?.[selectedImage]?.secure_url || product.imageCover?.secure_url;
    setCurrentImageUrl(newImageUrl);
  }, [product, selectedImage]);
  
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

  return (
    <>
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 aspect-square flex items-center justify-center group">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <motion.img
            src={currentImageUrl}
            alt={product.title}
            className={`max-w-full max-h-full object-contain z-10 transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.9 }}
            transition={{ duration: 0.5 }}
          />
          
          {product.images?.length > 1 && (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-gray-800/70 flex items-center justify-center text-gray-700 dark:text-gray-200 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white dark:hover:bg-gray-800"
              >
                <FaAngleLeft className="text-lg" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-gray-800/70 flex items-center justify-center text-gray-700 dark:text-gray-200 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white dark:hover:bg-gray-800"
              >
                <FaAngleRight className="text-lg" />
              </button>
            </>
          )}
          
          <button
            onClick={openLightbox}
            className="absolute bottom-4 right-4 p-3 rounded-full bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white dark:hover:bg-gray-800"
          >
            <FaExpand />
          </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {product.imageCover && (
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                product.images?.length === 0 || selectedImage === -1 
                  ? "ring-2 ring-blue-500 shadow-md shadow-blue-500/20" 
                  : "ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-blue-400 dark:hover:ring-blue-500"
              }`}
              onClick={() => setSelectedImage(-1)}
            >
              <img
                src={product.imageCover.secure_url}
                alt={`${product.title} cover`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </motion.button>
          )}
          
          {product.images?.map((image, index) => (
            <motion.button
              key={image._id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                selectedImage === index 
                  ? "ring-2 ring-blue-500 shadow-md shadow-blue-500/20" 
                  : "ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-blue-400 dark:hover:ring-blue-500"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.secure_url}
                alt={`${product.title} view ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </motion.button>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <div 
              className="relative max-w-7xl max-h-screen p-6 flex flex-col" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10 flex space-x-4">
                <button
                  onClick={() => handleZoomOut()}
                  disabled={zoom <= 1}
                  className="p-3 bg-gray-800/70 backdrop-blur-sm text-white rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaSearch className="text-sm" />-
                </button>
                <button
                  onClick={() => handleZoomIn()}
                  disabled={zoom >= 3}
                  className="p-3 bg-gray-800/70 backdrop-blur-sm text-white rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaSearch className="text-sm" />+
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-3 bg-red-600/80 backdrop-blur-sm text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <div className="h-full flex items-center justify-center">
                  <motion.img
                    src={currentImageUrl}
                    alt={product.title}
                    style={{ 
                      transform: `scale(${zoom})`,
                      transition: 'transform 0.3s ease-out',
                      maxHeight: '80vh'
                    }}
                    className="object-contain"
                    drag={zoom > 1}
                    dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                    dragElastic={0.1}
                  />
                </div>
              </div>
              
              {product.images?.length > 1 && (
                <div className="flex justify-between mt-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="p-4 bg-gray-800/70 backdrop-blur-sm text-white rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <FaArrowLeft />
                  </motion.button>
                  
                  <div className="text-white text-center">
                    <span className="px-4 py-2 rounded-full bg-gray-800/70 backdrop-blur-sm">
                      {selectedImage + 1} / {product.images.length}
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="p-4 bg-gray-800/70 backdrop-blur-sm text-white rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <FaArrowRight />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
