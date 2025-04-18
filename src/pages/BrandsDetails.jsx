import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { GetBrandById } from '@/Hooks/Brands/getBrandsFn'
export default function BrandsDetails() {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['brand', id],
    queryFn: () => GetBrandById(id)
  })
  return (<>
    <h2 className='text-2xl font-bold text-center my-4'>Brands Details</h2>
    <div className='container mx-auto'>
        <h2 className='text-2xl font-bold text-center my-4'>Brands Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            <div className='col-span-1'>
                <img src={data?.brand.image.secure_url} alt={data?.brand.name} className='w-full h-full object-cover' />
            </div>
        </div>
    </div>
    </>
  )
}
