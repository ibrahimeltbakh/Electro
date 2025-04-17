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



// import React from 'react';
// import hero from "../../assets/Images/WhatsApp Image 2025-04-16 at 23.56.16_c2559278.jpg";

// export default function HeroSection() {
//   return (
//     <div className="relative w-full h-full">
//       <img src={hero} alt="hero" className="w-full   object-cover" />
      
//       <div className="absolute inset-0 bg-black-20 bg-opacity-30 flex items-center justify-start px-8 md:px-16">
//         <div className="text-white max-w-lg space-y-6">
//           <div className="bg-blue-500 text-center text-white px-4 py-2 rounded-md w-max">
//             <h2 className="text-lg md:text-xl font-bold">Special Offer</h2>
//           </div>
//           <div className="space-y-2">
//             <h3 className="text-2xl md:text-4xl font-extrabold">On Mobile Phones</h3>
//             <p className="text-sm md:text-base">Sale Up To 30% Off</p>
//             <p className="text-lg md:text-2xl font-bold">Start From $140.05</p>
//           </div>
//           <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-2 rounded-full">
//             Shop Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






import React from 'react';
import hero from "../../assets/Images/WhatsApp Image 2025-04-16 at 23.56.16_c2559278.jpg";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden object-cover">
      {/* الخلفية */}
      <img src={hero} alt="hero" className="w-full h-full object-cover" />

      {/* التعتيم + النص */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-6 md:px-20">
        <div className="text-white max-w-xl animate-fade-in-up space-y-6">
          {/* العرض الخاص */}
          <div className="bg-blue-600 text-center px-4 py-2 rounded-md shadow-lg w-max animate-bounce-slow">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide">Special Offer</h2>
          </div>

          {/* التفاصيل */}
          <div className="space-y-3">
            <h3 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
              On Mobile Phones
            </h3>
            <p className="text-sm md:text-lg opacity-90">Sale Up To <span className="text-yellow-400 font-semibold">30% Off</span></p>
            <p className="text-xl md:text-2xl font-bold">Start From <span className="text-green-400">$140.05</span></p>
          </div>

          {/* زر الشراء */}
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 transition duration-300 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
