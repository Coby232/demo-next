// show all th e self services available to the user
"use client";
import React,{useEffect} from "react";
import Link from "next/link";
import axios from "axios";
import { usePathname } from 'next/navigation';

export default function SelfServiceLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
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
        <section className="flex flex-col ">
            <ul className="flex flex-col pb-5">
                <Link href={"/self-service/loan"}>Loan</Link>
                <Link href={"/self-service/money-transfer"}>Money Transfer</Link>
                <Link href={"/self-service/withdrawal"}>Withdrawal</Link>
            </ul>
            {children}
        </section>
    )
}

