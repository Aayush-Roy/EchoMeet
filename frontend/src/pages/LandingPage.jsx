import { motion } from "framer-motion";
import { Header } from "./Header";
import videoAppImage from "../assets/screen.jpg"; // Replace with your actual image path
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <Header />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between  text-center md:text-left py-20 px-6">
        
        {/* Left: Text Section */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <motion.h1 
            className="text-5xl font-extrabold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Connect with the World Instantly
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0">
            Experience high-quality video calls with friends, family, and colleagues. 
            Start a call in just one click!
          </p>
          <Link to={"/auth"}>
  <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700">
    Start a Call
  </button>
</Link>

        </div>

        {/* Right: Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img 
            src={videoAppImage}
            alt="Video Calling App" 
            className="w-full  rounded-lg shadow-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
