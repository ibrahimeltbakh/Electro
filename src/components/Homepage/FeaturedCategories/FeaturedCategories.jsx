import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCategories from '@/Hooks/category/usecatergories';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import useProducts from '@/Hooks/products/useProducts';

const FeaturedCategories = () => {
  const { data, isLoading, isError } = useCategories();
  const {data:products} = useProducts()
  console.log('Products:', products);
  console.log('Categories:', data);

  if (isError) {
    return <Error />;
  }
  
  if (isLoading) {
    return <Loading />;
  }
  
  // Get first 6 categories to display
  const featuredCategories = data?.categories?.slice(0, 6) || [];
  
  // Define different background colors for categories
  const bgColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-pink-500',
    'from-green-500 to-teal-500',
    'from-orange-400 to-red-500',
    'from-cyan-500 to-blue-500',
    'from-indigo-500 to-purple-500'
  ];
  
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-3">Featured Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products across various categories. We've curated the best selection just for you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              className="rounded-xl overflow-hidden relative group"
            >
              <Link to={`/category/${category._id}`}>
                <div className={`h-60 bg-gradient-to-br ${bgColors[index % bgColors.length]} relative overflow-hidden`}>
                  {/* Category Image */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img 
                      src={category.image.secure_url} 
                      alt={category.name}
                      className="max-h-full max-w-full object-contain transform transition-transform duration-500 group-hover:scale-110 filter brightness-110"
                    />
                  </div>
                  
                  {/* Category Details */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-white text-sm">
                        {/* git the number of plrodut related to category */}
                        {
                          products?.products?.filter(product => product.category._id === category._id).length || 0
                        } Products
                      </span>
                      <span className="text-white text-sm font-medium group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center">
                        Shop Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link to="/categories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center transition-colors"
            >
              View All Categories
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedCategories; 