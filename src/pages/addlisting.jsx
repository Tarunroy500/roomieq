import PageImg from "../assets/addlisting.png";
import Footer from '../components/footer';
import Navbar from "../components/Navbar";
import DownloadPromo from "../components/DownloadPromo";
import { Link } from "react-router-dom";

function AddListing() {

  return (
    <div className="sm:h-[1600px] h-[1200px] relative bg-white">
      {/* Header with Logo and Buttons */}
      <Navbar />
      {/* overlay */}


      <div className="">
        <img src={PageImg} alt="" className="relative top-[150px]" />
        <Link to={"/addrooms"} className="absolute w-[340px] h-[420px] bg-transparent top-[600px] left-[110px] hidden sm:block cursor-pointer"></Link>
        <Link to={"/addroommate"} className="absolute w-[340px] h-[420px] bg-transparent top-[600px] left-[550px] hidden sm:block cursor-pointer"></Link>
        <Link to={"/addhostel"} className="absolute w-[340px] h-[420px] bg-transparent top-[600px] left-[1000px] hidden sm:block cursor-pointer"></Link>
        <Link to={"/addbhojanalay"} className="absolute w-[340px] h-[420px] bg-transparent top-[1080px] left-[770px] hidden sm:block cursor-pointer"></Link>
        <Link to={"/addoffice"} className="absolute w-[340px] h-[420px] bg-transparent top-[1080px] left-[330px] hidden sm:block cursor-pointer"></Link>
        <Link to={"/addrooms"} className="cursor-pointer bg-transparent relative h-[110px] w-[70px] top-[-140px] left-[40px]"></Link>
        <Link to={"/addroommate"} className="cursor-pointer bg-transparent relative h-[110px] w-[70px] top-[-140px] left-[80px]"></Link>
        <Link to={"/addhostel"} className="cursor-pointer bg-transparent relative h-[110px] w-[70px] top-[-140px] left-[130px]"></Link>
        <Link to={"/addbhojanalay"} className="cursor-pointer bg-transparent relative h-[110px] w-[70px] left-[-110px] top-[-10px]"></Link>
        <Link to={"/addoffice"} className="cursor-pointer bg-transparent relative h-[110px] w-[70px] left-[-70px] top-[-10px]"></Link>
      </div>

      {/* Eighth Division  */}
      <DownloadPromo/>

        <Footer/>
    </div>
  );
}

export default AddListing;
