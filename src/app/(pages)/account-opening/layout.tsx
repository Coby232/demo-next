"use client";
import React,{useEffect} from 'react';
import Image from 'next/image';
import axios from "axios";
import { usePathname } from 'next/navigation';

function AccountOpeningLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    const pageTitle = pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) || '';
    
    const tracker_id = document.cookie
    .split("; ")
    .find((row) => row.startsWith("tracker_id="))
    ?.split("=")[1];
    
    useEffect(() => {
      const trackData = {
        tracker_id: tracker_id,
      //   tracker_id:"950d699d-b8be-419e-ad86-f3bf4e661a08", 
        step_name: pageTitle,
        isComplete:  false,
      };
  
  
      axios
        .post("https://ef4d-154-161-165-23.ngrok-free.app/track", trackData, {
          headers: {
            "Content-Type": "application/json",
          },
        })})
    return (
        <section className="flex flex-col lg:flex-row flex-1 h-screen overflow-hidden ">

            <aside className="bg-blue-700 text-white w-full lg:w-2/5   flex flex-col items-center justify-center p-8 max-sm:p-5">
                <h1 className="text-4xl font-bold mb-4 max-sm:mb-1 max-sm:text-xl">Overview</h1>
                <h2 className="text-xl max-sm:text-base font-medium mb-6 max-sm:mb-3">Financial Auditing and Reporting</h2>
                <Image src="/stanbic.png" alt="stanbic" width={120} height={120} className="" />
                <p className="text-center text-sm max-sm:text-xs mt-4 max-sm:mt-2">
                    Your trusted partner for financial services and auditing solutions.
                </p>
            </aside>
            <aside className='bg-slate-50 w-full lg:w-3/5 p-6 overflow-y-scroll'>
                {children}
            </aside>
        </section>
    )
}

export default AccountOpeningLayout
