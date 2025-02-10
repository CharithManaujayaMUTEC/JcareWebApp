import React, {useState} from 'react'
import logo from './logo/Logo.png'
import Home from '../Pages/Home';

function NavBar(){
    const[isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);}
    console.log(isMenuOpen);
  return (
    <nav className='bg-purple-100 py-2 px-10'>
      <div className='flex items-center justify-between'>
        <div><img src={logo} alt='Jcare' /></div>
        <div className='md:hidden'>
          <button className='text-black' onClick={toggleMenu}>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' >
              <path d='M4 6h16M4 12h16M4 18h16'></path>
            </svg></button>
        </div>
        <ul className='hidden md:flex space-x-10'>
          <li><a href='#' className='text-black font-bold font-Montserrat size-2' >Home</a></li>
          <li><a href='#' className='text-black font-bold font-Montserrat'>About</a></li>
          <li><a href='#' className='text-black font-bold font-Montserrat'>Services</a></li>
          <li><a href='#' className='text-black font-bold font-Montserrat'>Contact</a></li>
        </ul>
      </div>
      {isMenuOpen ? (
        <ul className='md:hidden space-y-3'>
          <li><a href='#' className='text-black font-bold font-Montserrat '>Home</a></li>
          <li><a href='#' className='text-black font-bold font-Montserrat'>About</a></li>
          <li><a href='#' className='text-black font-bold font-Montserrat'>Services</a></li>
          <li><a href='#' className='text-black font-bold font-Montserrat'>Contact</a></li>
        </ul>
      ):null}
    </nav>
  )
}

export default NavBar
