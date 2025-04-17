




const NewsLetter = () => {
    return (
      <section className="w-full mt-16 mx-auto py-16 bg-gradient-to-r from-blue-50 to-blue-300">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* النص */}
          <div className="md:w-1/2 space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our <span className="text-blue-600">Newsletter</span>
            </h2>
            <p className="text-gray-600">Get updates by subscribing to our weekly newsletter</p>
          </div>
  
          {/* الفورم */}
          <div className="md:w-1/2">
            <form className="   flex flex-col  sm:flex-row  items-center justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="  w-full sm:w-auto px-4 py-3 rounded-full border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  };
  
  export default NewsLetter;
  