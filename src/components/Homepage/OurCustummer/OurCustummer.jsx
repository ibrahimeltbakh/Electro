import React from 'react';
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
        title: "Excellent Service !",
        review: "I Found Exactly What I Needed, And The Support Team Was Super Helpful, Will Definitely Shop Here Again!"
    },
    {
        id: 2,
        name: "Mohammed",
        image: customer2,
        rating: 5,
        title: "Excellent Service !",
        review: "It's Easy To Navigate, Checkout Was Simple, And My Order Arrived Earlier Than Expected."
    },
    {
        id: 3,
        name: "Ibrahim",
        image: "/images/customers/hazem.jpg",
        rating: 5,
        title: "Excellent Service !",
        review: "The Always Impressed By The Variety And The Quality, It's Now My Go-To Store For Electronics."
    },
    {
        id: 4,
        name: "fouda",
        image: "/images/customers/hana.jpg",
        rating: 5,
        title: "Excellent Service !",
        review: "I Found Exactly What I Needed, And The Support Team Was Super Helpful, Will Definitely Shop Here Again!"
    },
    {
        id: 5,
        name: "Duaa",
        image: "/images/customers/salma.jpg",
        rating: 5,
        title: "Excellent Service !",
        review: "They Helped Me Resolve My Issue With My Order Quickly And Professionally. Truly Appreciate The Help."
    },
    {
        id: 6,
        name: "Ashraf",
        image: "/images/customers/farouk.jpg",
        rating: 5,
        title: "Excellent Service !",
        review: "I Found Exactly What I Needed, And The Support Team Was Super Helpful, Will Definitely Shop Here Again!"
    }
];

const OurCustummer = () => {
    return (
        <section className="our-customers">
            <div className="container">
                <h2 className="section-title">What Our Customers Say</h2>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="testimonial-card">
                            <div className="customer-image">
                                <img src={testimonial.image} alt={testimonial.name} />
                            </div>
                            <h3 className="customer-name">{testimonial.name}</h3>
                            <h4 className="testimonial-title">{testimonial.title}</h4>
                            <div className="rating">
                                {[...Array(testimonial.rating)].map((_, index) => (
                                    <span key={index} className="star">⭐</span>
                                ))}
                            </div>
                            <p className="testimonial-text">{testimonial.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurCustummer;
