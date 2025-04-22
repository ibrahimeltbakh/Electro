import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaUserCircle } from 'react-icons/fa';
import './OurCustummer.css';
// import customer1 from '../../../assets/Images/customer1.jpg'
import customer2 from '../../../assets/Images/customer2.jpg'
// import customer3 from '../../../assets/Images/customer3.jpg'
// import customer4 from '../../../assets/Images/customer4.jpg'
// import customer5 from '../../../assets/Images/customer5.jpg'
// import customer6 from '../../../assets/Images/customer6.jpg'


const testimonials = [
    {
        id: 1,
        name: "Ahmed",
        image: "/images/customers/mohammed.jpg",
        rating: 5,
        title: "Excellent Service!",
        review: "I found exactly what I needed, and the support team was super helpful. Will definitely shop here again!",
        role: "Regular Customer"
    },
    {
        id: 2,
        name: "Mohammed",
        image: customer2,
        rating: 5,
        title: "Smooth Experience",
        review: "It's easy to navigate, checkout was simple, and my order arrived earlier than expected.",
        role: "Verified Buyer"
    },
    {
        id: 3,
        name: "Ibrahim",
        image: "/images/customers/hazem.jpg",
        rating: 5,
        title: "Great Selection",
        review: "Always impressed by the variety and the quality. It's now my go-to store for electronics.",
        role: "Tech Enthusiast"
    },
    {
        id: 4,
        name: "A.Fouda",
        image: "/images/customers/hana.jpg",
        rating: 4,
        title: "Helpful Support",
        review: "Customer service went above and beyond to help me find the right product for my needs.",
        role: "New Customer"
    },
    {
        id: 5,
        name: "Doaa",
        image: "/images/customers/salma.jpg",
        rating: 5,
        title: "Quick Resolution",
        review: "They helped me resolve my issue with my order quickly and professionally. Truly appreciate the help.",
        role: "Loyal Customer"
    },
    {
        id: 6,
        name: "Ashraf",
        image: "/images/customers/farouk.jpg",
        rating: 5,
        title: "Reliable Delivery",
        review: "Products are always well-packaged and delivery is consistently on time. Highly recommended!",
        role: "Frequent Shopper"
    }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const OurCustummer = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our customers have to say about their shopping experience with us.
                    </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full"
                        >
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center">
                                        <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                                            {testimonial.image ? (
                                                <img 
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                            ) : null}
                                            <FaUserCircle 
                                                className="w-full h-full text-gray-400 absolute top-0 left-0" 
                                                style={{display: testimonial.image ? 'none' : 'block'}}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <FaQuoteLeft className="text-blue-500 text-opacity-20 text-2xl" />
                                </div>
                                
                                <div className="mb-3">
                                    <div className="flex items-center mb-1">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar 
                                                key={index} 
                                                className={`${
                                                    index < testimonial.rating 
                                                        ? 'text-yellow-400' 
                                                        : 'text-gray-300 dark:text-gray-600'
                                                } w-4 h-4`} 
                                            />
                                        ))}
                                    </div>
                                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                                        {testimonial.title}
                                    </h4>
                                </div>
                                
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    "{testimonial.review}"
                                </p>
                            </div>
                            
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Verified Purchase • 2 {testimonial.id % 2 === 0 ? 'weeks' : 'months'} ago
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurCustummer;
