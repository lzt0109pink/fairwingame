import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";


import { useStore } from 'reto'
import AppStorages from '../storages/appstorage'

const NavBarItem = ({ title, classprops, click }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`} onClick={click}>{title}</li>
);

const scrollToAnchor = (anchorName) => {
  // 找到锚点
  let anchorElement = document.getElementById(anchorName);
  console.log(anchorElement)
  // 如果对应id的锚点存在，就跳转到锚点
  if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const {
    Lang, BrowserLang, setBrowserLang
  } = useStore(AppStorages)

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {Lang[BrowserLang].menulist.map((item, index) => (
          <NavBarItem key={item + index} title={item} click={()=>{scrollToAnchor(index)}} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          {Lang[BrowserLang].contact}
        </li>
        <li className=" py-2 px-7 mx-4 rounded-full cursor-pointer">

          <div class="group relative" id="dropdown-cta">
            <div class="flex items-center space-x-1" id="dropdown-header">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all duration-500 group-hover:rotate-180" id="icon-arrow-down" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>

            </div>
            <ul class="absolute hidden rounded border bg-white group-hover:block mt-0" id="dropdown-items">
              <li class="p-2 w-20"><a href="#" onClick={() => { setBrowserLang("zh") }} class="text-blue-600 hover:text-red-600">简体中文</a></li>
              <li class="p-2"><a href="#" onClick={() => { setBrowserLang("en") }} class="text-blue-600 hover:text-red-600">English </a></li>
            </ul>
          </div>


        </li>
      </ul>
      <div className="flex relative">


        <div class="group relative mr-5" id="dropdown-cta">
          <div class="flex items-center space-x-1 text-white" id="dropdown-header">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
            </svg>

          </div>
          <ul class="absolute hidden rounded border bg-white group-hover:block mt-0" id="dropdown-items">
            <li class="p-2 w-20"><a href="#" onClick={() => { setBrowserLang("zh") }} class="text-blue-600 hover:text-red-600">简体中文</a></li>
            <li class="p-2"><a href="#" onClick={() => { setBrowserLang("en") }} class="text-blue-600 hover:text-red-600">English </a></li>
          </ul>
        </div>



        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[40vw] h-screen shadow-lg md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {Lang[BrowserLang].menulist.map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" click={()=>{scrollToAnchor(index)}} />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
