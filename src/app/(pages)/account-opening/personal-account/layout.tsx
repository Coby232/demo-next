/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { usePathname } from 'next/navigation';
import axios from "axios";

const PersonalAccountOpeningLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const pathname = usePathname();

  const pageTitle = pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) || '';
  const tracker_id = document.cookie
    .split("; ")
    .find((row) => row.startsWith("tracker_id="))
    ?.split("=")[1];
    
  useEffect(() => {
    const trackData = {
      tracker_id: tracker_id,
      // tracker_id:"950d699d-b8be-419e-ad86-f3bf4e661a08", --for testing
      step_name: pageTitle,
      isComplete: pathname.includes("review-and-submit") ? true : false,
    };


    axios
      .post("https://ef4d-154-161-165-23.ngrok-free.app/track", trackData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    // .then((

    // ) => {
    //   console.log("Tracking data sent successfully:");
    // })
    // .catch((error) => {
    //   if (error.response) {

    //     console.error(
    //       "Failed to track step:",
    //       error.response.status,
    //       error.response.statusText
    //     );
    //   } else if (error.request) {

    //     console.error("No response received from server:", error.request);
    //   } else {

    //     console.error("Error sending tracking data:", error.message);
    //   }
    // });
  }, [pathname, pageTitle]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-2">Open a Personal Bank Account</h1>
      <h2 className='flex flex-row justify-center mb-2 text-sm'>{pageTitle}</h2>
      {children}
    </div>
  )
};

export default PersonalAccountOpeningLayout;
