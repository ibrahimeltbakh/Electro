import React from 'react'
import Banner from '../components/Homepage/Banner/Banner'
import OfferSection from '../components/Homepage/OfferSection/OfferSection'
import OurCustummer from '../components/Homepage/OurCustummer/OurCustummer'
import RecentProducts from '@/components/Homepage/recent Products/RecentProducts'
import CategoriesSlider from '@/components/Homepage/Sliders/CategoriesSlider'
import BrandSlider from '@/components/Homepage/Sliders/BrandSlider'
import HeroSection from '@/components/Homepage/HeroSection'
import { motion } from 'framer-motion'
import FeaturedProductsSlider from '@/components/FeaturedProducts/FeaturedProductsSlider'
import BestSellerProducts from '@/components/BestSeller/BestSellerProducts'
import HotDeals from '@/components/Deals/HotDeals'
import DealOfTheDay from '@/components/Homepage/DealOfTheDay/DealOfTheDay'
import FeaturedCategories from '@/components/Homepage/FeaturedCategories/FeaturedCategories'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      
      <div className="space-y-0">
        <section>
          <CategoriesSlider />
        </section>
        
        <section>
          <DealOfTheDay />
        </section>
        
        <section>
          <FeaturedCategories />
        </section>
        
        <section>
          <BrandSlider />
        </section>
        
        <section className="bg-gray-50 dark:bg-gray-900">
          <FeaturedProductsSlider />
        </section>
        
        <section>
          <HotDeals />
        </section>
        
        <section className="bg-white dark:bg-gray-800">
          <Banner />
        </section>
        
        <section className="bg-gray-50 dark:bg-gray-900">
          <BestSellerProducts />
        </section>
        
        <section>
          <OfferSection />
        </section>
        
        <section className="bg-white dark:bg-gray-800">
          <RecentProducts numberOfProducts={6} start={8} name={'New Arrivals'} showSlider={true} />
        </section>
        
        <section className="bg-gray-50 dark:bg-gray-900">
          <OurCustummer />
        </section>
        
        <section className="bg-white dark:bg-gray-800">
          <RecentProducts numberOfProducts={6} start={12} name={'Popular Items'} showSlider={true} />
        </section>
      </div>
    </motion.div>
  )
}