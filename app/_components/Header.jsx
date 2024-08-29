"use client"

// import { Button } from '@/components/ui/button';
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  const {user, isSignedIn}=useUser();
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <div className="flex flex-row items-center ">
        <Image src={"/budget.gif"} alt="logo" width={50} height={50} />
        <span className="text-primary font-bold text-xl">CuanTrack</span>
      </div>
      {isSignedIn? <UserButton/> :
       <Link href={"/dashboard"}>
            <Button className="rounded-xl">Get Started</Button>
        </Link>}
    </div>
  );
}

export default Header;
