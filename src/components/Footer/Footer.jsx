import { BiLogoMastercard } from "react-icons/bi";
import {
  FaApplePay,
  FaCcPaypal,
  FaFacebook,
  FaGooglePay,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { Link } from "react-router-dom";
// import bgImageLight from "../../../assets/Images/bg4-light.jpg";
// import bgImageDark from "../../../assets/Images/Hero/bg-1.jpg";
// import { useTheme } from "../../../context/ThemeProvider";

const Footer = () => {
//   const { isDark } = useTheme();

  return (
    <footer
      className="w-full"
      style={{
        // backgroundImage: `url(${isDark ? bgImageDark : bgImageLight})`,
        backgroundColor: "black",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <h2 className="text-2xl font-bold text-white mb-4">Electro</h2>
            <p className="text-gray-200 mb-4">
              We have clothes that suit your style and which you’re proud to wear. From women to men.
            </p>
            <div className="flex gap-4 text-white">
              <Link to="/"><FaTwitter /></Link>
              <Link to="/"><FaFacebook /></Link>
              <Link to="/"><FaInstagram /></Link>
            </div>
          </div>

          <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <h5 className="text-white font-semibold mb-3">COMPANY</h5>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/">Features</Link></li>
                <li><Link to="/">Works</Link></li>
                <li><Link to="/">Career</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">HELP</h5>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li><Link to="/">Customer Support</Link></li>
                <li><Link to="/">Delivery Details</Link></li>
                <li><Link to="/">Terms & Conditions</Link></li>
                <li><Link to="/">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">FAQ</h5>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li><Link to="/">Account</Link></li>
                <li><Link to="/">Manage Deliveries</Link></li>
                <li><Link to="/">Orders</Link></li>
                <li><Link to="/">Payments</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">RESOURCES</h5>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li><Link to="/">Free eBooks</Link></li>
                <li><Link to="/">Development Tutorials</Link></li>
                <li><Link to="/">How to - Blog</Link></li>
                <li><Link to="/">Youtube Playlist</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-500" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-200 text-sm">
          <p className="mb-4 md:mb-0">Electro &copy; 2000-2021, All rights reserved</p>
          <div className="flex gap-4 text-xl text-white">
            <RiVisaLine className="text-blue-400" />
            <BiLogoMastercard className="text-yellow-400" />
            <FaCcPaypal className="text-blue-300" />
            <FaApplePay />
            <FaGooglePay />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
