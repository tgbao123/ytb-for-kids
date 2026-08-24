'use client';

import { Menu, Search, Mic, Plus, Bell, User, Cast } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ParentalModal from "./ParentalModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="h-[56px] flex items-center justify-between px-2 sm:px-4 bg-[#0f0f0f] sticky top-0 z-50">
        <div className="flex items-center gap-1 sm:gap-4">
          <button className="p-2 hover:bg-[#272727] rounded-full text-white hidden sm:block">
            <Menu size={24} strokeWidth={1.5} />
          </button>
          <Link href="/" className="flex items-center gap-1 pl-2 sm:pl-0">
            <div className="w-8 h-5 bg-[#ff0000] rounded-[6px] flex items-center justify-center">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
            </div>
            <span className="text-xl font-bold tracking-tighter text-white font-sans" style={{ letterSpacing: '-1px' }}>YouTube<sup className="text-[10px] text-[#aaaaaa] ml-1 font-normal tracking-normal hidden sm:inline">VN</sup></span>
          </Link>
        </div>

        {/* Center Search - hidden on mobile */}
        <div className="flex-1 max-w-[720px] items-center gap-4 ml-10 hidden md:flex">
          <div className="flex flex-1 items-center bg-[#121212] border border-[#303030] rounded-full overflow-hidden ml-8">
            <div className="px-4">
               <Search size={20} className="text-[#888]" />
            </div>
            <input 
              type="text" 
              placeholder="Tìm kiếm" 
              className="flex-1 bg-transparent py-2 px-0 text-white focus:outline-none focus:pl-4 text-base"
            />
            <button className="px-5 py-2 bg-[#222222] border-l border-[#303030] hover:bg-[#303030] text-white">
              <Search size={20} strokeWidth={1.5} />
            </button>
          </div>
          <button className="p-2.5 bg-[#181818] hover:bg-[#272727] rounded-full shrink-0 text-white">
            <Mic size={20} />
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-1 sm:gap-4 shrink-0">
          <button className="p-2 hover:bg-[#272727] rounded-full text-white transition block md:hidden">
            <Cast size={20} strokeWidth={1.5} />
          </button>
          <button className="p-2 hover:bg-[#272727] rounded-full text-white transition block md:hidden">
            <Search size={20} strokeWidth={1.5} />
          </button>
          
          <button className="hidden sm:flex items-center gap-2 bg-[#272727] hover:bg-[#3f3f3f] px-3 py-1.5 rounded-full text-sm font-medium text-white transition">
            <Plus size={20} /> Tạo
          </button>
          <button className="p-2 hover:bg-[#272727] rounded-full text-white transition">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
          </button>
          <button onClick={() => setIsModalOpen(true)} className="p-1 hover:bg-[#272727] rounded-full transition ml-1 sm:ml-0">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-700 rounded-full flex items-center justify-center text-white">
              <User size={16} className="sm:w-5 sm:h-5" />
            </div>
          </button>
        </div>
      </header>
      
      <ParentalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
