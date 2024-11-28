/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import TelemetryScriptLoader from "@/app/components/Telemetry";
import dynamic from "next/dynamic";

// const TelemetryScriptLoader = import()dynamic

interface LoginValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login Successful!");
        router.push("/account-opening/overview");
      })
      .catch((error) => {
        toast.error(error);
        router.push("/auth/login");
      });
  };

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

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 max-sm:p-5'>
      {/* <TelemetryScriptLoader/> */}
      <Image
        src='/businessman-and-company.png'
        alt='stanbic'
        width={150}
        height={150}
        className='-mt-2 max-sm:-mt-5'
      />

      <div className='w-full max-w-md p-8 bg-white shadow-md rounded-lg dark:border-slate-700'>
        <h2 className='text-2xl font-bold text-center mb-6 text-indigo-600'>
          Continue With Us
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values: LoginValues) => {
            const errors: Partial<LoginValues> = {};
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                values.email
              )
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }
            return errors;
          }}
          onSubmit={(
            values: LoginValues,
            { setSubmitting }: FormikHelpers<LoginValues>
          ) => {
            handleLogin(values.email, values.password);
          }}>
          {({ isSubmitting }) => (
            <Form className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'>
                  Email Address
                </label>
                <Field
                  type='email'
                  name='email'
                  id='email'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Enter your email'
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className='text-red-500 text-xs mt-1'
                />
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <Field
                  type='password'
                  name='password'
                  id='password'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Enter your password'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-red-500 text-xs mt-1'
                />
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <div className='mt-4 text-center'>
          <p className='text-sm text-gray-600'>
            Don’t have an account?{" "}
            <a
              href='/auth/create-account'
              className='text-indigo-600 hover:underline'>
              Register here
            </a>
          </p>
        </div>
      </div>
      <small className='m-2 max-sm:m-5 text-slate-400'>
        Auditing at your footsteps
      </small>
    </div>
  );
};

export default LoginPage;
