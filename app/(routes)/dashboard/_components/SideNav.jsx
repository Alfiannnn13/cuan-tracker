"use client";

import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  LucideBanknote,
  LucideCoffee,
  PiggyBank,
  ReceiptText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      Icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Keuangan",
      Icon: LucideBanknote,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Pengeluaran",
      Icon: ReceiptText,
      path: "/dashboard/expense",
    },
    // {
    //     id:4,
    //     name:'Buy Me Coffee',
    //     Icon: LucideCoffee
    // },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image src={"/budget.gif"} alt="logo" width={100} height={100} />
      <span className="text-primary font-extrabold text-3xl ">
        Cuan Tracker
      </span>

      <div className="mt-10">
        {menuList.map((menu, index) => (
          <Link href={menu.path}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-200 
                ${path == menu.path && "text-primary bg-blue-200"}
                `}
            >
              <menu.Icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;
