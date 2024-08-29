import { UserButton } from '@clerk/nextjs'
import {  LayoutDashboard, LucideBanknote, LucideCoffee, PiggyBank, ReceiptText } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function SideNav() {
    const menuList=[
        {
            id:1,
            name:'Dashboard',
            Icon: LayoutDashboard
        },
        {
            id:2,
            name:'Keuangan',
            Icon: LucideBanknote
        },
        {
            id:3,
            name:'Pengeluaran',
            Icon: ReceiptText
        },
        // {
        //     id:4,
        //     name:'Buy Me Coffee',
        //     Icon: LucideCoffee
        // },
    ]


  return (
    <div className="h-screen p-5 border shadow-sm mb5">
        <Image src={"/budget.gif"} alt="logo" width={150} height={150} />
      <span className="text-primary font-extrabold text-3xl ">Cuan Tracker</span>

      <div className="mt-10">
         {menuList.map((menu,index)=> (
            <h2 className="flex gap-2 items-center text-gray-500 font-medium p-6 cursor-pointer rounded-md hover:text-primary hover:bg-blue-200">
                <menu.Icon/>
                {menu.name}
            </h2>
         ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton/>
        Profile
      </div>
    </div>
  )
}

export default SideNav