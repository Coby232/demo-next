"use client";
import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import FormikContext from '@/app/components/FormikContext';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from "uuid"
import toast from 'react-hot-toast';

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const Page: React.FC = () => {
  const router = useRouter();
  const userId = uuidv4();
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Create Your Personal Account</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
        }}
        validate={(values: FormValues) => {
          const errors: Partial<FormValues> = {};
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Password is required';
          } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
          }
          if (!values.firstName) {
            errors.firstName = 'First name is required';
          }
          if (!values.lastName) {
            errors.lastName = 'Last name is required';
          }
          if (!values.phoneNumber) {
            errors.phoneNumber = 'Phone number is required';
          }
          return errors;
        }}
        onSubmit={async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
          try {

            const userCredential = await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            const user = userCredential.user;


            await setDoc(doc(db, "users", user.uid), {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              userId: userId,
              phoneNumber: values.phoneNumber,
              createdAt: new Date(),
            });

            toast.success("Account created successfully!");
            router.push("/account-opening/overview");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            toast.error(error.message); 
            router.push("/auth/create-account");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <FormikContext.Provider
            value={{
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }}
          >
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your first name"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your last name"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <Field
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your phone number"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 mt-6 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Create Account'}
              </button>
            </Form>
          </FormikContext.Provider>
        )}
      </Formik>
    </div>
  )
};

export default Page;
