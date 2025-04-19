import React from 'react'
import CategoriesCard from '../components/Cards/CategoriesCard'
import useCategories from '../Hooks/category/usecatergories'
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
export default function Categories() {
  const { data, isLoading, isError } = useCategories();
  console.log(data)
  if (isLoading) return <Loading />;
  if (isError) return <Error/>;

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {data?.categories?.map((category) => (
            <CategoriesCard key={category.id} category={category} />
        ))}
    </div>
  )
}
