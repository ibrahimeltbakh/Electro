import React from 'react'
import Banner from '../components/Homepage/Banner/Banner'
import OfferSection from '../components/Homepage/OfferSection/OfferSection'
import OurCustummer from '../components/Homepage/OurCustummer/OurCustummer'
import ProductsPage from './ProductsPage'
import RecentProducts from '@/components/recent Products/RecentProducts'
export default function Home() {
  return (
    <>
      <Banner />
      <OfferSection />
      <RecentProducts numberOfProducts={4} start={0} />
      <OurCustummer />
      <RecentProducts numberOfProducts={8} start={4} />
      <RecentProducts numberOfProducts={12} start={8} />
      <RecentProducts numberOfProducts={16} start={12} />
    </>
  )
}
