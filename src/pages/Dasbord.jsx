import { Sparkle, Search, Menu, X } from "lucide-react";
import React, { useState } from "react";
import Home from "../component/dasbord/Home";
import Send_munny from "../component/dasbord/Send_munny";
import TransactionHistory from "../component/dasbord/TransactionHistory";
import Settings from "../component/dasbord/Settings";
import { useSelector } from "react-redux";
import RequestPage from "../component/dasbord/RequestPage";


const Dasbord = () => {
  const user = useSelector((state)=>state.Calluser.user)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activechat, setactivechat] = useState("HOME")

  return (
    <div className="w-full min-h-screen bg-gray-700">
      {/* Header Section */}
      <header className="w-full h-20 bg-[#5A7ACD] flex justify-between items-center px-4 relative">
        {/* Logo Section */}
        <div className="flex gap-2 items-center text-xl sm:text-2xl font-bold">
          <span>
            <Sparkle size={40} className="sm:w-[50px] sm:h-[50px]" />
          </span>
          <span className="text-sm sm:text-base md:text-xl whitespace-nowrap">
            BANKING APP
          </span>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex w-2/6 h-full justify-center items-center px-5">
          <div className="w-full h-1/2 rounded-[5px] border-2 border-gray-900 flex items-center px-3 gap-2 bg-transparent">
            <span>
              <Search size={20} />
            </span>
            <input
              type="text"
              placeholder="Search items..."
              className="h-full w-full outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        {/* Mobile Menu Icons */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-blue-600 rounded-full transition-colors"
          >
            <Search size={24} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-blue-600 rounded-full transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search Bar - Shows when search icon is clicked */}
        {isSearchOpen && (
          <div className="absolute top-20 left-0 w-full bg-[#5A7ACD] p-4 md:hidden shadow-lg">
            <div className="w-full h-10 rounded-[5px] border-2 border-gray-900 flex items-center px-3 gap-2 bg-white">
              <span>
                <Search size={20} />
              </span>
              <input
                type="text"
                placeholder="Search items..."
                className="h-full w-full outline-none text-sm"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="h-[calc(100vh-80px)] w-full flex flex-col md:flex-row relative">
        {/* Mobile Sidebar Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Sidebar - Responsive */}
        <div
          className={`
            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0
            fixed md:relative
            top-20 md:top-0
            left-0
            w-4/5 sm:w-3/5 md:w-1/5
            h-[calc(100vh-80px)] md:h-full
            bg-white p-5 
            flex flex-col gap-5
            transition-transform duration-300 ease-in-out
            z-30
            overflow-y-auto
            shadow-lg md:shadow-none
          `}
        >
          {/* Profile Section */}
          <div className="flex flex-col items-center justify-start font-bold gap-2 pt-2">
            <div className="h-20 w-20 sm:h-25 sm:w-25 bg-red-500 rounded-full overflow-hidden">
              <img
                src="https://img.freepik.com/free-photo/confident-entrepreneur-looking-camera-with-arms-folded-smiling_1098-18840.jpg?semt=ais_rp_progressive&w=740&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm sm:text-base text-center">
              {user?.name || "Maruf Mursalin"}
            </span>
            <span className="text-xs sm:text-sm text-gray-600 text-center break-all px-2">
              {user?.email || "marufmursalin28@gmail.com"}
            </span>
          </div>

          {/* Navigation Menu */}
          {["HOME","Request", "SEND MONEY", "TRANSACTION HISTORY", "SETTINGS"].map(
            (item, index) => (
              <div
                key={index}
                className="w-full h-12 sm:h-14 bg-gray-400 rounded-[10px] flex items-center justify-start font-bold text-white hover:bg-gray-600 transition-colors cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false)
                  setactivechat(item)
                }}
              >
                <span className="ml-3 text-sm sm:text-base">{item}</span>
              </div>
            ),
          )}
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-4/5 h-full bg-gray-700 overflow-y-auto">
           {activechat === "HOME" && <Home setActivechat={setactivechat} />}
           {activechat === "Request" && <RequestPage />}
           {activechat === "SEND MONEY" && <Send_munny setActivechat={setactivechat} />}
           {activechat === "TRANSACTION HISTORY" && <TransactionHistory />}
           {activechat === "SETTINGS" && < Settings/>}
          {/* <Home /> */}
          {/* <Send_munny /> */}
        </div>
      </div>
    </div>
  );
};

export default Dasbord;
