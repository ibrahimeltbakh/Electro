import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { GetBrandById } from '@/Hooks/Brands/getBrandsFn'
import ProductCard from '@/components/Cards/ProductCard'
import useProducts from '@/Hooks/products/useProducts'

export default function BrandsDetails() {
    const [brand, setBrand] = useState([])
    const { data, isLoading, error } = useProducts()
    console.log(data)
    const  {id}  = useParams()
    console.log(id)
  
    useEffect(() => {
        if (data?.products) {
            console.log("URL Parameter id:", id);
            
            // Log all brand names to see what you're trying to match against
            const allBrands = data.products.map(product => product?.brand?.name);
            console.log("Available brand names:", allBrands);
            
            const filtered = data.products.filter(
                (product) => product?.brand?.name?.toLowerCase() === id?.toLowerCase()
            );
            
            console.log("Filtered results:", filtered);
            setBrand(filtered);
        }
        }, [data, id]);
   

    return (<>
        <h2 className='text-2xl font-bold text-center my-4'>Brands Details</h2>
        <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4'>
            {brand?.map((product) => (
                <ProductCard  product={product} />
            ))}
        </div>
    </>
    )
}
