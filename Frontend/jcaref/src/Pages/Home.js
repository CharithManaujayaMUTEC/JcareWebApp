import React from 'react'
import NavBar from '../Components/NavBar';
import Docs from './Images/Docs.png';
import logo from './logo/Logo.png'
import { HiBookOpen } from "react-icons/hi";
import { HiArrowCircleRight } from "react-icons/hi";
import { HiDesktopComputer } from "react-icons/hi";


const Home = () => {
  return (
    <div className='Home'>
      <div>
        <NavBar />
      </div>
      <div className="bg-gradient-to-r from-white to-purple-500 min-h-screen flex flex-col justify-center items-center">
        <section className='flex justify-center px-6 items-center'>
          <div className="container grid grid-cols-2 justify-center items-center px-40">
            <div className='flex flex-col md:justify-center justify-center pt-20 px-20'>
              <div className='text-center md:text-center space-y-4 lg:max-w-[850px] '>
                <h1 className='text-6xl font-Montserrat font-bold'>Welcome to</h1>
              </div>
              <img src={logo} alt='logo' className="object-scale-down h-15 w-25 max-h-10 mt-4"/>   
              <div className='py-5 items-center'>
                <p className='font-light leading-tight max-w-400px text-center'>An integrated patient monitoring system designed specifically for hospital staff and visitors to streamline the traditionally time-consuming and error-prone process of manual book recording. This system not only enhances efficiency by digitizing records but also ensures accuracy, accessibility, and security of patient data, thereby creating a seamless and user-friendly experience for all involved.</p>
              </div>
              <div className='flex justify-center scale-x-150 scale-y-150 space-x-3 py-3'>
                <HiBookOpen className='scale-150'/><HiArrowCircleRight /><HiDesktopComputer className='scale-150' />
              </div>
              <div className='flex justify-center space-x-4 py-3'>
                <button className='bg-purple-600 text-white hover:bg-purple-700 font-Montserrat py-1.5 px-6 rounded-2xl'>Sign Up</button>
                <button className='bg-purple-600 text-white hover:bg-purple-700 font-Montserrat py-1.5 px-6 rounded-2xl'>Sign In</button>
              </div>
            </div>
            <div className=' items-center'>
              <div className='relative items-center'>
                <img src={Docs} alt='Docs' className="object-scale-down h-150%" />
                <div className="absolute inset-x-0 bottom-0 w-4/5 h-1/4 bg-gradient-to-t from-purple-500 to-transparent opacity-70 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </section>
        <section className='flex justify-center px-6 items-center'>
          <div className="container grid grid-cols-2 justify-center items-center px-40">
            <div className=' items-center'>
              <div className='relative items-center'>
                <img src={Docs} alt='Docs' className="object-scale-down h-150%" />
                <div className="absolute inset-x-0 bottom-0 w-4/5 h-1/4 bg-gradient-to-t from-purple-500 to-transparent opacity-70 rounded-3xl"></div>
              </div>
            </div>
            <div className='flex flex-col md:justify-center justify-left pt-20 pl-5 pr-20'>
              <div className='text-center md:text-center space-y-4 lg:max-w-[850px] '>
                <h1 className='text-6xl font-Montserrat font-bold'>Visit Your Patient Easily</h1>
              </div>  
              <div className='py-5 items-center'>
                <p className='font-light leading-tight max-w-400px text-center'>An integrated patient monitoring system designed specifically for hospital staff and visitors to streamline the traditionally time-consuming and error-prone process of manual book recording. This system not only enhances efficiency by digitizing records but also ensures accuracy, accessibility, and security of patient data, thereby creating a seamless and user-friendly experience for all involved.</p>
              </div>
              <div className='flex justify-center scale-x-150 scale-y-150 space-x-3 py-3'>
                <HiBookOpen className='scale-150'/><HiArrowCircleRight /><HiDesktopComputer className='scale-150' />
              </div>
              <div className='flex justify-center space-x-4 py-3'>
                <button className='bg-purple-600 text-white hover:bg-purple-700 font-Montserrat py-1.5 px-6 rounded-2xl'>Sign Up</button>
                <button className='bg-purple-600 text-white hover:bg-purple-700 font-Montserrat py-1.5 px-6 rounded-2xl'>Sign In</button>
              </div>
            </div>

          </div>
        </section>
        <section className='flex justify-center px-6 items-center'>
          <div className="container grid grid-cols-2 justify-center items-center px-40">
            <div className='flex flex-col md:justify-center justify-center pt-20 px-20'>
              <div className='text-center md:text-center space-y-4 lg:max-w-[850px] '>
                <h1 className='text-6xl font-Montserrat font-bold'>Win-Win for the Staff and the General Public</h1>
              </div>
              <div className='py-5 items-center'>
                <p className='font-light leading-tight max-w-400px text-center'>An integrated patient monitoring system designed specifically for hospital staff and visitors to streamline the traditionally time-consuming and error-prone process of manual book recording. This system not only enhances efficiency by digitizing records but also ensures accuracy, accessibility, and security of patient data, thereby creating a seamless and user-friendly experience for all involved.</p>
              </div>
              <div className='flex justify-center scale-x-150 scale-y-150 space-x-3 py-3'>
                <HiBookOpen className='scale-150'/><HiArrowCircleRight /><HiDesktopComputer className='scale-150' />
              </div>
              <div className='flex justify-center space-x-4 py-3'>
                <button className='bg-purple-600 text-white hover:bg-purple-700 font-Montserrat py-1.5 px-6 rounded-2xl'>Sign Up</button>
                <button className='bg-purple-600 text-white hover:bg-purple-700 font-Montserrat py-1.5 px-6 rounded-2xl'>Sign In</button>
              </div>
            </div>
            <div className=' items-center'>
              <div className='relative items-center'>
                <img src={Docs} alt='Docs' className="object-scale-down h-150%" />
                <div className="absolute inset-x-0 bottom-0 w-4/5 h-1/4 bg-gradient-to-t from-purple-500 to-transparent opacity-70 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </section>
        <section className='flex justify-center px-6 items-center pt-4 pb-4'>
              <div className='py-5 items-center'>
                <p className='font-light text-center'>Get your own personalized Hospital Management System from <b>Jcare</b> to optimize and speed up the daily operations with a smooth process.</p>
                <p className='font-light text-center'><b>Contact Us</b></p>
                <p className='font-light text-center'><b>Mail to : charithmanujaya1@gmail.com</b></p>
                <p className='font-light text-center'><b>Call & Text to : +94 76 620 8824</b></p>
              
              </div>    
        </section>
      </div>
    </div>
  );
}

export default Home;