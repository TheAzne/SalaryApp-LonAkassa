import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <Link to="/">
        <h1 className="w-auto text-4xl font-bold text-[#ffffff] pb-5">RKNA</h1>
      </Link>
      <ul className='hidden md:flex text-[20px]'>
        <li className='p-4'><a href='/'>Hem</a></li>
        {/* <li className='p-4'><a href='/about'>Om Oss</a></li>
        <li className='p-4'><a href='/kontakt'>Kontakt</a></li> */}
      </ul>
      <div onClick={handleNav} className='block md:hidden justify-end'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
    </div>
  );
};

export default Navbar;