"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FilePlus2, Home, Library } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide the navigation bar on the Editor page for maximum focus
  if (pathname === "/editor") return null;

  const navItems = [
    { 
      name: "Create", 
      href: "/create", 
      icon: FilePlus2 
    },
    { 
      name: "home", 
      href: "/", 
      icon: Home 
    },
    { 
      name: "saved papers", 
      href: "/saved-papers", 
      icon: Library 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-slate-200 z-50 pb-safe">
      <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="relative flex flex-col items-center justify-center w-16 h-full gap-1"
            >
              {/* Active Indicator Pill */}
              <div className={`absolute top-2 w-12 h-1 rounded-full transition-all duration-300 ${isActive ? "bg-blue-600" : "bg-transparent"}`} />
              
              <Icon 
                className={`w-6 h-6 transition-all duration-300 ${
                  isActive 
                    ? "text-blue-600 translate-y-1" 
                    : "text-slate-400 hover:text-slate-600"
                }`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span 
                className={`text-[10px] font-bold transition-all duration-300 ${
                  isActive 
                    ? "text-blue-600 opacity-100 translate-y-1" 
                    : "text-slate-400 opacity-0 translate-y-2"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}