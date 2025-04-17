// import React from 'react'
// import { Link } from 'react-router-dom'
// export default function BrandsCard({brand}) {
//   return (
//     <Link to={`/brands/${brand._id}`} className="block">
//     <div>
//         <img src={brand.image.secure_url} alt={brand.name} />
//         <h2>{brand.name}</h2>
//     </div>
//     </Link>
//   )
// }


import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandsCard({ brand }) {
  return (
    <Link to={`/brands/${brand._id}`} className="block">
      <div className="group relative overflow-hidden rounded-xl shadow-md bg-white transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="overflow-hidden">
          <img
            src={brand.image.secure_url}
            alt={brand.name}
            className="w-full h-40 object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="text-center py-3 bg-gradient-to-r from-teal-100 to-teal-50">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
            {brand.name}
          </h2>
        </div>
      </div>
    </Link>
  );
}
