
import useProducts from '@/Hooks/products/useProducts'
import React from 'react'
import Loading from '@/components/Loading/Loading'
import Error from '@/components/Error/Error'
import  useAddToCart  from '@/Hooks/cart/useAddToCart'
export default function ProductsPage() {
    const { addToCart } = useAddToCart()
    const { data, isLoading, isError } = useProducts()

    if (isLoading) return <Loading />
    if (isError) return <Error />
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">المنتجات</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data?.products?.map((product) => (
                    <div key={product._id} className="border rounded-lg p-4 shadow-sm bg-inherit ">
                        <img
                            src={product.imageCover.secure_url}
                            alt={product.title}
                            className="w-full rounded-lg mb-4"
                        />
                        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                        {/* <p className="text-gray-600 mb-2">{product.description}</p> */}
                            <div className="flex justify-between items-center bg-amber-400">
                            <div className="text-lg font-bold text-green-600">{product.price} جنيه</div>
                            <button onClick={() => addToCart(product._id)} className="bg-blue-500  text-white px-4 py-2 rounded hover:bg-blue-600">
                                أضف للسلة
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


