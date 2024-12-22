import React from 'react'
import NavBar from "../components/Navbar";
import City from "../pages/citypage";
import CardGrid from '../components/cardgrid';
import Footer from '../components/footer';
import AppStore from "../assets/AppStore.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import SecondPhone from "../assets/SecondPhone.svg";
import DownloadPromo from '../components/DownloadPromo';

function finalcitypage() {
  return (
    <>
        <NavBar/>
        <div className='pt-10'>
            <City/>
            <div className='mt-2'>
                <div className='w-[90%] mx-auto bg-black h-[1px]'></div>
            </div>
        </div>
        <div className='mt-[30px]'>
        <CardGrid/>
        {/* Eighth Division  */}
        <DownloadPromo/>
        <Footer/>
        </div>
    </>
  )
}

export default finalcitypage