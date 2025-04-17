import React from 'react'

import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import BrandsCard from '@/components/Cards/BrandsCard';
import useBrands from '@/Hooks/Brands/useBrands';

export default function Brands() {
    const { data, isLoading, isError } = useBrands();
    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {data?.brands?.map((brand) => (
                <BrandsCard key={brand.id} brand={brand} />
            ))}
        </div>
    )
}
