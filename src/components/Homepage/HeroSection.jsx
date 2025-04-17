// import React from 'react'
// import hero from "../../assets/Images/WhatsApp Image 2025-04-16 at 23.56.16_c2559278.jpg"
// export default function HeroSection() {
//     return (
//         <div className='relative '>
//             <img
//                 src={hero} alt="hero" className=' w-full h-full object-cover' />
//             <div className='absolute top-20 left-0 w-full h-full'>

//                     <div className=" p-8 rounded-lg  max-w-md w-70">
//                         <div className="bg-blue-500 text-center text-white p-2 rounded mb-6">
//                             <h2 className="text-xl font-bold">Special Offer</h2>
//                         </div>
//                         <div className=" space-y-4">
//                             <h3 className="text-2xl font-bold">On Mobile Phones</h3>
//                             <p className="">Sale Up To 30% Off</p>
//                             <p className="text-xl font-bold">Start From $140.05</p>
//                             <div className="mt-6">
//                                 <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white-600 transition duration-300">
//                                     Shop Now
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

       





//     )
// }



import React from 'react';
import hero from "../../assets/Images/WhatsApp Image 2025-04-16 at 23.56.16_c2559278.jpg";

export default function HeroSection() {
  return (
    <div className="relative w-full h-full">
      <img src={hero} alt="hero" className="w-full   object-cover" />
      
      <div className="absolute inset-0 bg-black-20 bg-opacity-30 flex items-center justify-start px-8 md:px-16">
        <div className="text-white max-w-lg space-y-6">
          <div className="bg-blue-500 text-center text-white px-4 py-2 rounded-md w-max">
            <h2 className="text-lg md:text-xl font-bold">Special Offer</h2>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl md:text-4xl font-extrabold">On Mobile Phones</h3>
            <p className="text-sm md:text-base">Sale Up To 30% Off</p>
            <p className="text-lg md:text-2xl font-bold">Start From $140.05</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-2 rounded-full">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
