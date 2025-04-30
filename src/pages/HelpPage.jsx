import React from 'react';
import FaqAccordion from "@/components/Profile/FaqAccordion";
import { motion } from "framer-motion";

const HelpPage = () => {
  return (
    <div className="min-h-screen  bg-white dark:bg-gray-800  flex flex-col items-center py-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8">Hello. What can we help you with?</h1>

      {/* Action Cards Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-sm font-semibold text-gray-500 mb-4">SOME THINGS YOU CAN DO HERE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Your Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3zm6 6H3v12h6V9zm12 0h-6v12h6V9z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg text-gray-500 font-semibold">Your Orders</h3>
              <p className="text-gray-500">Track packages</p>
              <p className="text-gray-500">Edit or cancel orders</p>
            </div>
          </div>

          {/* Card 2: Returns & Refunds */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg text-gray-500 font-semibold">Returns & Refunds</h3>
              <p className="text-gray-500">Return or exchange items</p>
              <p className="text-gray-500">Print return mailing labels</p>
            </div>
          </div>

          {/* Card 3: Account Settings */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg text-gray-500 font-semibold">Account Settings</h3>
              <p className="text-gray-500">Change email or password</p>
              <p className="text-gray-500">Update login information</p>
            </div>
          </div>

          {/* Card 4: Manage Prime */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg text-gray-500 font-semibold">Manage Prime</h3>
              <p className="text-gray-500">View your benefits</p>
              <p className="text-gray-500">Membership</p>
            </div>
          </div>

          {/* Card 5: Payment Settings */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg text-gray-500 font-semibold">Payment Settings</h3>
              <p className="text-gray-500">Add or edit payment methods</p>
            </div>
          </div>

          {/* Card 6: Contact Us */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg text-gray-500 font-semibold">Contact Us</h3>
              <p className="text-gray-500">Contact our customer service via</p>
              <p className="text-gray-500">phone or chat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-sm font-semibold text-gray-500 mb-4">FIND MORE SOLUTIONS</h2>
        <div className="relative">
          <input
            type="text"
            placeholder='Type something like, "question about a charge"'
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
        <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Frequently Asked Questions
        </h2>
        <FaqAccordion />
      </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;