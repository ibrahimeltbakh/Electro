import React from 'react'
import { Link } from 'react-router-dom'

export default function CategoriesCard({ category }) {
    return (
        <Link to={`/categories/${category._id}`} className="block">
            <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="aspect-w-16 aspect-h-9 w-full">
                    <img
                        src={category.image.secure_url}
                        alt={category.name}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h2 className="text-white text-xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {category.name}
                        </h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}
