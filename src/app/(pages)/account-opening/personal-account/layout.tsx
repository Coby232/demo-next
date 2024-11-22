/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { usePathname } from 'next/navigation';

const PersonalAccountOpeningLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const pathname = usePathname();

  const pageTitle = pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) || '';
  
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-2">Open a Personal Bank Account</h1>
      <h2 className='flex flex-row justify-center mb-2 text-sm'>{pageTitle}</h2>
      {children}
    </div>
  )
};

export default PersonalAccountOpeningLayout;
