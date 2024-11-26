"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SelfServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  useEffect(() => {
    const trackData = {
      // tracker_id: tracker_id,
      tracker_id: "950d699d-b8be-419e-ad86-f3bf4e661a08",
      step_name: pageTitle,
      isComplete: false,
    };

    axios.post(
      "https://ef4d-154-161-165-23.ngrok-free.app/track",
      trackData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }, [tracker_id, pageTitle]);

  return (
    <section className='flex flex-col lg:flex-row flex-1 h-screen overflow-hidden'>
      {/* Left Sidebar */}
      <aside className='bg-blue-700 text-white w-full lg:w-2/5 flex flex-col items-center justify-center p-8 max-sm:p-5'>
        <h1 className='text-4xl font-bold mb-4 max-sm:mb-1 max-sm:text-xl'>
          Self Service
        </h1>
        <h2 className='text-xl max-sm:text-base font-medium mb-6 max-sm:mb-3'>
          Financial Auditing and Reporting
        </h2>
        <div className='flex items-center justify-center gap-4'>
          <Image
            src='/stanbic.png'
            alt='stanbic'
            width={120}
            height={120}
            className=''
          />
          <Image
            src='/self-service-hero2.png'
            alt='stanbic'
            width={150}
            height={150}
            className='cover'
          />
        </div>
        <p className='text-center text-sm max-sm:text-xs mt-4 max-sm:mt-2'>
          Your trusted partner for financial services and auditing
          solutions.
        </p>
      </aside>

      <aside className='bg-slate-50 w-full lg:w-3/5 p-10 max-sm:pt-64 lg:p-20 overflow-y-scroll flex flex-col justify-center items-center gap-6'>
        <div className='relative flex flex-col items-center'>
          <div className='relative'>
            <Image
              src='/3d2.png'
              alt='stanbic'
              width={200}
              height={200}
              className='rounded-full'
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <ul className='absolute -top-8 left-1/2 transform -translate-x-1/2 text-center flex gap-4 flex-wrap'>
                <li className='relative left-8'>
                  <Link
                    href='/self-service/loan '
                    className='text-blue-700   bg-white border border-blue-700 rounded-full p-2 shadow hover:bg-blue-700 hover:text-white'>
                    Loan
                  </Link>
                </li>
                <li className='relative min-w-max left-24'>
                  <Link
                    href='/self-service/money-transfer'
                    className='text-blue-700 bg-white border border-blue-700 rounded-full  p-2 shadow hover:bg-blue-700 hover:text-white'>
                    Money Transfer
                  </Link>
                </li>
                <li className='relative right-20 -top-9'>
                  <Link
                    href='/self-service/withdrawal'
                    className='text-blue-700 bg-white border border-blue-700 rounded-full p-2 shadow hover:bg-blue-700 hover:text-white'>
                    Withdrawal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {children}
      </aside>
    </section>
  );
}

export default SelfServiceLayout;
