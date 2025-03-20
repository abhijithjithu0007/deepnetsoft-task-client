import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function ContactSection() {
  return (
    <div className="bg-black text-white p-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="border border-white rounded-lg px-8 py-10 text-center w-full md:w-1/3 h-48 flex flex-col justify-center">
          <h2 className="text-blue-400 font-bold text-lg mb-3">
            CONNECT WITH US
          </h2>
          <p className="flex items-center justify-center gap-2 text-gray-300">
            <FaPhoneAlt className="text-yellow-500" /> +91 9567184340
          </p>
          <p className="flex items-center justify-center gap-2 mt-2 text-gray-300">
            <FaEnvelope className="text-yellow-500" /> info@deepnetsoft.com
          </p>
        </div>

        <div className="relative border border-white rounded-lg px-8 py-10 text-center w-full md:w-1/3 h-48 flex flex-col justify-center">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black px-3">
            <img
              src="/assets/Logo.png"
              alt="Deep Net Soft Logo"
              className="w-14"
            />
          </div>
          <h1 className="text-xl font-bold mt-4">
            <span className="text-3xl text-blue-400">DEEP</span>{" "}
            <span className="text-3xl text-yellow-500">NET</span>{" "}
            <span className="text-3xl text-gray-300">SOFT</span>
          </h1>
          <div className="flex justify-center gap-4 mt-3 text-gray-400">
            <FaFacebook
              className="cursor-pointer hover:text-blue-500 transition"
              size={20}
            />
            <FaTwitter
              className="cursor-pointer hover:text-blue-400 transition"
              size={20}
            />
            <FaYoutube
              className="cursor-pointer hover:text-red-500 transition"
              size={20}
            />
            <FaInstagram
              className="cursor-pointer hover:text-pink-500 transition"
              size={20}
            />
          </div>
        </div>

        <div className="border border-white rounded-lg px-8 py-10 text-center w-full md:w-1/3 h-48 flex flex-col justify-center">
          <h2 className="text-blue-400 font-bold text-lg mb-3">FIND US</h2>
          <p className="flex items-center justify-center gap-2 text-gray-300">
            <FaMapMarkerAlt className="text-yellow-500" /> First Floor, Geo
            Infopark, Infopark EXPY, Kakkanad
          </p>
        </div>
      </div>
    </div>
  );
}
