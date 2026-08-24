'use client';

import { Home, Zap, MonitorPlay, CircleUser } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();
  
  const items = [
    { icon: Zap, label: "Shorts", href: "/shorts" },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-[#0f0f0f] border-t border-[#272727] flex items-center justify-around pb-safe sm:hidden z-50">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link 
            key={index} 
            href={item.href} 
            className="flex flex-col items-center justify-center p-2 w-full h-14 text-white"
          >
            <Icon size={24} strokeWidth={isActive ? 2 : 1.2} fill={isActive ? 'white' : 'none'} />
            <span className="text-[10px] mt-1 truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
