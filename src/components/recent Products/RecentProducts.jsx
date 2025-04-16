import useProducts from '@/Hooks/products/useProducts'
import React from 'react'
import Loading from '@/components/Loading/Loading'
import Error from '@/components/Error/Error'
import useAddToCart from '@/Hooks/cart/useAddToCart'
import { FaHeart, FaExchangeAlt, FaEye } from 'react-icons/fa'
import usePostData from '@/Hooks/wishList/usePostData'

const RecentProducts = ({ numberOfProducts, start }) => {

  const { data, isLoading, isError, error } = useProducts();
  const { mutate } = useAddToCart()
  const mutation = usePostData()

 
    if (isError) {
      return (
        <>
          <div><Error /></div>
        </>
      );
    }
    if (isLoading) {
      return (
        <>
          <div><Loading /></div>
        </>
      );
    }
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.products?.map((product, index) => (
            index >= start && index < numberOfProducts && <div key={product._id} className="border rounded-lg p-4 shadow-md bg-white relative flex flex-col justify-between min-h-[400px]">

              {/* Badge */}
              <div className="absolute top-2 left-2">
                {product.discount ? (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">-{product.discount}%</span>
                ) : (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">NEW</span>
                )}
              </div>

              {/* صورة المنتج */}
              <img
                src={product.imageCover.secure_url}
                alt={product.title}
                className="w-full h-48 object-contain rounded-lg mb-4"
              />

              {/* أيقونات */}
              <div className="flex justify-center gap-3 mb-2 text-gray-600">
                <FaHeart onClick={() => mutation?.mutate(product._id)} className="cursor-pointer hover:text-red-500" />
                <FaExchangeAlt className="cursor-pointer hover:text-blue-500" />
                <FaEye className="cursor-pointer hover:text-green-500" />
              </div>

              {/* عنوان وتقييم */}
              <h2 className="text-lg font-semibold mb-1 text-center">{product.title}</h2>
              <div className="flex justify-center text-yellow-400 mb-2">
                {'★'.repeat(5)}
              </div>

              {/* السعر */}
              <div className="flex justify-center items-center gap-2 mb-4">
                <span className="text-lg font-bold text-green-600">${product.price}</span>
                <span className="text-sm line-through text-gray-500">${product.oldPrice || 50.99}</span>
              </div>

              {/* زر السلة في الأسفل */}
              <button
                onClick={() => mutate({ productId: product._id })}
                className="mt-auto w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                ADD TO CART
              </button>
            </div>

          ))}
        </div>
      </div>
    );
  };

  export default RecentProducts;
