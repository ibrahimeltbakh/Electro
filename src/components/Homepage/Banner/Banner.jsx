import Aos from "aos";
import { useEffect } from "react";
import banner1 from "../../../assets/Images/Banner/Screenshot 2025-04-15 172239.png";
import banner2 from "../../../assets/Images/Banner/Screenshot 2025-04-15 172617.png";
import "./Banner.css";
import { Link } from "react-router-dom";
// import "aos/dist/aos.css";

const Banner = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-out-sine',
      delay: 100,
    });
  }, []);

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <div className="relative magical-container" data-aos="flip-right">
              <div className="magical-glow"></div>
              <Link to="/shop">
              <img src={banner1} className="w-full rounded-xl magical-image" alt="" />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative magical-container" data-aos="flip-left">
              <div className="magical-glow"></div>
              <Link to="/shop">
                <img src={banner2} className="w-full rounded-xl magical-image" alt="electronics" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
