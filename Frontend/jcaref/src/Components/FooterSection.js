import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Jcare</h2>
          <p className="text-sm leading-relaxed">
            Jcare is a next-gen hospital management system designed to streamline appointments, patient monitoring, and medical records for both staff and patients. Efficiency, security, and convenience in one platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#features" className="hover:underline">Features</a></li>
            <li><a href="#patients" className="hover:underline">Patients</a></li>
            <li><a href="#staff" className="hover:underline">Staff</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-sm mb-2"><b>Email:</b> support@jcare.com</p>
          <p className="text-sm mb-2"><b>Phone:</b> +94 76 620 8824</p>
          <p className="text-sm"><b>Address:</b> 123 Health St, Colombo, Sri Lanka</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="bg-white text-purple-600 p-2 rounded-full hover:bg-gray-100 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-white text-purple-600 p-2 rounded-full hover:bg-gray-100 transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-white text-purple-600 p-2 rounded-full hover:bg-gray-100 transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="bg-white text-purple-600 p-2 rounded-full hover:bg-gray-100 transition">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-white/30 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Jcare. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;