/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React,{useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";
import { usePathname } from "next/navigation";
import TelemetryScriptLoader from "@/app/components/Telemetry";

const overview = [
    {
        title: "Personal Account",
        description: "Manage your personal finances with ease by opening an account.",
        link: "/account-opening/personal-account/personal-info",
    }, 
    {
        title: "Business Account",
        description: "Open a business account today on our platform to manage finances efficiently.",
        link: "/account-opening/business-account",
    },
    {
        title: "Financial Insights Self Service",
        description: "Access tools and analytics to gain insights into your financial health.",
        link: "/self-service/",
    },
    {
        title: "Auditing Services",
        description: "Ensure compliance and transparency with our auditing services.",
        link: "#",
    },
];

function Page() {
     const pathname = usePathname();

     const pageTitle =
       pathname
         .split("/")
         .pop()
         ?.replace(/-/g, " ")
         .replace(/\b\w/g, (char) => char.toUpperCase()) || "";

     const tracker_id = document.cookie
       .split("; ")
       .find((row) => row.startsWith("tracker_id="))
       ?.split("=")[1];

       const trackerID = `${pathname.split("tracker_id=")}`

    //    useEffect(() => {
    //      const trackData = {
    //        // tracker_id: tracker_id,
    //        tracker_id: trackerID,
    //        step_name: pageTitle,
    //        isComplete: false,
    //      };

    //    axios.post(
    //      "https://8798-154-161-43-193.ngrok-free.app/track",
    //      trackData,
    //      {
    //        headers: {
    //          "Content-Type": "application/json",
    //        },
    //      }
    //    );
    //  });

    return (
      <>
      <TelemetryScriptLoader/>
        <h3 className='text-2xl font-semibold mb-6 text-blue-700'>
          Services
        </h3>
        <ul className='space-y-4 flex flex-col justify-between'>
          {overview.map((item, index) => (
            <li
              key={index}
              className='bg-white w-full border rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-300'>
              <h4 className='text-lg font-semibold text-blue-600 mb-2'>
                {item.title}
              </h4>
              <p className='text-gray-600 mb-3'>{item.description}</p>
              <Link
                href={item.link}
                className='text-blue-500 font-medium hover:underline'>
                Proceed
              </Link>
            </li>
          ))}
          <footer className=' flex flex-row justify-center text-slate-400 '>
            {/* <Image
              src='/footer-indicator.webp'
              alt='stanbic'
              width={100}
              height={100}
              className='mt-12ew '
            /> */}
           <small className='mt-10'>Copyright © 2024</small> 
          </footer>
        </ul>
      </>
    );
}

export default Page;
