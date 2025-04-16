import React from 'react'
import Banner from '../components/Homepage/Banner/Banner'
import OfferSection from '../components/Homepage/OfferSection/OfferSection'
import OurCustummer from '../components/Homepage/OurCustummer/OurCustummer'
import ProductsPage from './ProductsPage'
export default function Home() {
  return (
   <>
   <Banner/>
   <OfferSection/>
   <ProductsPage/>
   <OurCustummer/>
   </>
  )
}
