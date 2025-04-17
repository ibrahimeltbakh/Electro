import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bgImageLight from "../../../assets/Images/hotdeal.png";
import bgImageDark from "../../../assets/Images/hotdeal_dark.png";


const OfferSection = () => {
const them =localStorage.getItem("vite-ui-theme");


  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateCountdown = useCallback(() => {
    const targetDate = new Date("may 1, 2025").getTime();
    const now = new Date().getTime();
    let difference = targetDate - now;

    if (difference < 0) {
      const fifteenDaysInMilliseconds = 15 * 24 * 60 * 60 * 1000;
      difference += fifteenDaysInMilliseconds;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  }, []);

  useEffect(() => {
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [calculateCountdown]);

  return (
    <section id="hot-deal" className="relative container rounded-lg ">
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${them=="dark" ? bgImageDark : bgImageLight})`,
      
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
            <p className="text-white text-lg font-light px-6 py-2 rounded-b-full absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-600">
              DEAL OF THE DAY
            </p>
            <ul className="flex justify-center space-x-2 mb-10 mt-12">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <li
                  key={unit}
                  className="relative text-center w-20 h-20 bg-black/60 rounded-full flex flex-col justify-center items-center text-white"
                >
                  <h3 className="text-2xl font-bold">{value}</h3>
                  <span className="uppercase text-xs">
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
            <h2 className="text-white text-3xl font-bold uppercase mb-2">
              Hot Deal This Week
            </h2>
            <p className="text-white text-2xl uppercase mb-6">
              New Collection Up to 50% OFF
            </p>
            <Link
              to="/shop"
              className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
