import { Home, Zap, MonitorPlay, CircleUser } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const items = [
    { icon: Zap, label: "Shorts", href: "/shorts" },
  ];

  return (
    <aside className="w-[72px] bg-[#0f0f0f] flex flex-col items-center py-2 gap-1 overflow-y-auto shrink-0 hidden sm:flex z-40 relative">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link key={index} href={item.href} className="flex flex-col items-center justify-center w-16 h-[74px] rounded-lg hover:bg-[#272727] gap-1 p-2">
            <Icon size={24} strokeWidth={1.2} />
            <span className="text-[10px] truncate w-full text-center mt-1">{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
