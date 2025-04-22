import React from "react";

export default function ProductGallery({
  product,
  selectedImage,
  setSelectedImage,
}) {
  return (
    <div className="space-y-4">
      <div className="relative h-96 rounded-lg overflow-hidden">
        <img
          src={
            product.images?.[selectedImage]?.secure_url ||
            product.imageCover?.secure_url
          }
          alt={product.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {product.images?.map((image, index) => (
          <div
            key={image._id}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
              selectedImage === index ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(index)}>
            <img
              src={image.secure_url}
              alt={`${product.title} view ${index + 1}`}
              className="w-full h-20 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
