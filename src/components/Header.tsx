import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Taxes from './Taxes.tsx';
import Akassa from './Akassa.tsx';

const Header = () => {

    const navigate = useNavigate();

    const navigateToTaxes = () => {
        navigate('./Taxes')
    }

    const navigateToAkassa = () => {
        navigate('./Akassa')
    }

    return (
        <div className='text-white h-screen flex justify-center items-start pt-20 '>
            <div className='text-center flex gap-4 '>
                <button onClick={navigateToTaxes} className='bg-[#ffffff] w-full sm:w-[200px] md:py-4 rounded-md font-medium my-5 text-black'>Räkna ut lön</button>
                <button onClick={navigateToAkassa} className='bg-[#ffffff] w-full sm:w-[200px] md:py-4 rounded-md font-medium my-5  text-black'>Räkna ut Akassa</button>
            </div>
            <Routes>
                <Route path="./Taxes.tsx" element={<Taxes />} />
                <Route path="./Akassa.tsx" element={<Akassa />} />
            </Routes>
        </div>

    );
};


export default Header;