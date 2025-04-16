import React from 'react'
import Banner from '../components/Homepage/Banner/Banner'
import OfferSection from '../components/Homepage/OfferSection/OfferSection'
import OurCustummer from '../components/Homepage/OurCustummer/OurCustummer'
import ProductsPage from './ProductsPage'
import RecentProducts from '@/components/recent Products/RecentProducts'
export default function Home() {
  return (
   <>
   <Banner/>
   <OfferSection/>
   <RecentProducts numberOfProducts={4}/>
   <OurCustummer/>
   </>
  )
}
