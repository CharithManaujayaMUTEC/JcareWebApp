import React from 'react';
import NavBar from '../Components/NavBar';
import { HiBookOpen, HiArrowCircleRight, HiDesktopComputer, HiUserGroup } from "react-icons/hi";
import BackgroundPattern from '../Components/BackgroundPattern';
import FooterSection from '../Components/FooterSection';
import CustomerComments from '../Components/CustomerComments';
import ClientSection from '../Components/ClientSection';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home relative min-h-screen overflow-hidden">
      <NavBar />

      {/* Main content */}
      <div className="relative z-10 bg-gradient-to-r from-white to-purple-500 flex flex-col">
        {/* Background Pattern */}
      <BackgroundPattern count={100} />

        {/* === Hero Section === */}
        <section className="flex justify-center items-center min-h-auto lg:min-h-screen px-4 md:px-6 py-6 md:py-8 lg:py-8">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 lg:px-20">
            {/* Left Column */}
            <div className="flex flex-col justify-center items-center md:items-center text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-Montserrat font-bold">Welcome to</h1>
              <img src="/logo/Logo.png" alt="logo" className="h-auto w-32 md:w-40" />
              <p className="font-normal leading-relaxed max-w-md md:max-w-lg">
                An integrated patient monitoring system designed specifically for hospital staff and visitors to streamline the traditionally time-consuming and error-prone process of manual book recording. This system not only enhances efficiency but also ensures accuracy, accessibility, and security of patient data.
              </p>
              <div className="flex justify-center space-x-3 text-purple-700 text-2xl">
                <HiBookOpen /><HiArrowCircleRight /><HiDesktopComputer />
              </div>
              <div className="flex justify-center space-x-4">
                <Link to="/Signup" className="bg-purple-600 text-white hover:bg-purple-700 font-Montserrat py-2 px-6 rounded-2xl">Sign Up</Link>
                <Link to="/login" className="bg-purple-600 text-white hover:bg-purple-700 font-Montserrat py-2 px-6 rounded-2xl">Sign In</Link>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center items-center relative">
              <img src="/Images/Docs.png" alt="Docs" className="max-h-90 md:max-h-100 lg:max-h-110 object-contain pr-0 md:pt-20" />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-purple-500 to-transparent opacity-70 rounded-3xl"></div>
            </div>
          </div>
        </section>

        {/* === Visit Patient Section === */}
        <section className="flex justify-center items-center min-h-auto lg:min-h-[70vh] px-4 md:px-6 py-6 md:py-8 lg:py-10">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center lg:px-20">
            {/* Left Column - Image */}
            <div className="flex justify-center items-center relative w-full h-64 md:h-80 lg:h-[408px]">
              <img src="/Images/patientvisist.png" alt="Visit Patient" className="w-full h-full object-cover rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500 to-transparent opacity-70 rounded-3xl"></div>
            </div>

            {/* Right Column - Text + Buttons */}
            <div className="flex flex-col justify-center items-center text-center space-y-6">
              <h1 className="text-3xl md:text-5xl font-Montserrat font-bold">Visit Your Patient Easily</h1>
              <p className="font-normal leading-relaxed max-w-md md:max-w-lg">
                Simplify hospital visits with easy scheduling and digital records. Visitors can quickly find available slots, and staff can manage patient appointments efficiently. The system centralizes all records digitally, eliminating errors from manual entries and providing instant access to patient information anytime.
              </p>
              <div className="flex justify-center space-x-3 text-purple-700 text-2xl">
                <HiUserGroup /><HiArrowCircleRight /><HiDesktopComputer />
              </div>
              <div className="flex justify-center space-x-4">
                <Link to="/schedula-a-visit" className="bg-purple-600 text-white hover:bg-purple-700 font-Montserrat py-2 px-6 rounded-2xl">Book a Slot</Link>
              </div>
            </div>
          </div>
        </section>

        {/* === Win-Win Section === */}
        <section className="flex justify-center items-center min-h-auto lg:min-h-[70vh] px-4 md:px-6 py-6 md:py-8 lg:py-10">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center lg:px-20">
            {/* Left Column */}
            <div className="flex flex-col justify-center items-center text-center space-y-6">
              <h1 className="text-3xl md:text-5xl font-Montserrat font-bold">Win-Win for the Staff and the General Public</h1>
              <p className="font-normal leading-relaxed max-w-md md:max-w-lg">
                This hospital management system benefits both medical staff and patients. Staff can easily manage appointments, monitor patient data, and ensure smooth workflow without delays. Patients and visitors enjoy a hassle-free experience with instant access to schedules and services, making every hospital visit efficient, secure, and convenient. By integrating all operations into a single platform, Jcare creates a seamless, transparent, and organized system for everyone involved.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center items-center relative w-full h-64 md:h-80 lg:h-[408px]">
              <img src="/Images/group.png" alt="Group" className="w-full h-full object-cover rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500 to-transparent opacity-70 rounded-3xl"></div>
            </div>
          </div>
        </section>

        {/* === Client Section === */}
        <ClientSection />

        {/* === Customer Comments Section === */}
        <CustomerComments />

        {/* === Footer Section === */}
        <FooterSection />
      </div>
    </div>
  );
};

export default Home;