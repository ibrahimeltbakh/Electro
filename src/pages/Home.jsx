import React from 'react'
import Banner from '../components/Homepage/Banner/Banner'
import OfferSection from '../components/Homepage/OfferSection/OfferSection'
import OurCustummer from '../components/Homepage/OurCustummer/OurCustummer'
import ProductsPage from './ProductsPage'
import RecentProducts from '@/components/recent Products/RecentProducts'
import CategoriesSlider from '@/components/Sliders/CategoriesSlider'
import BrandSlider from '@/components/Sliders/BrandSlider'
import HeroSection from '@/components/Homepage/HeroSection'
export default function Home() {
  return (
    <>
    <HeroSection />
    <BrandSlider />
    <CategoriesSlider />
      <Banner />
      <OfferSection />
      <RecentProducts  name={'Best Seller'}/>
      <OurCustummer />
      <RecentProducts numberOfProducts={8} start={4} />
      <RecentProducts numberOfProducts={12} start={8} />
      <RecentProducts numberOfProducts={16} start={12} />
      
    </>
  )
}
