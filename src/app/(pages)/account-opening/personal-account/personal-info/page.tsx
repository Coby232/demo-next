/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

interface FormValues {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    maritalStatus: string;
    numberOfDependents: string;
    address: string;
    email: string;
    phoneNumber: string;

}

const Page: React.FC = () => {
    const router = useRouter();

    return (

            <Formik
                initialValues={{
                    fullName: '',
                    dateOfBirth: '',
                    gender: '',
                    nationality: '',
                    maritalStatus: '',
                    numberOfDependents: '',
                    address: '',
                    email: '',
                    phoneNumber: '',

                }}
                validate={(values: FormValues) => {
                    const errors: Partial<FormValues> = {};
                    if (!values.fullName) {
                        errors.fullName = 'Full name is required';
                    }
                    if (!values.dateOfBirth) {
                        errors.dateOfBirth = 'Date of birth is required';
                    }
                    if (!values.gender) {
                        errors.gender = 'Gender is required';
                    }
                    if (!values.nationality) {
                        errors.nationality = 'Nationality is required';
                    }
                    if (!values.maritalStatus) {
                        errors.maritalStatus = 'Marital status is required';
                    }
                    if (values.numberOfDependents && isNaN(Number(values.numberOfDependents))) {
                        errors.numberOfDependents = 'Number of dependents must be a number';
                    }
                    if (!values.address) {
                        errors.address = 'Address is required';
                    }
                    if (!values.email) {
                        errors.email = 'Email is required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.phoneNumber) {
                        errors.phoneNumber = 'Phone number is required';
                    } else if (!/^\d{10}$/i.test(values.phoneNumber)) {
                        errors.phoneNumber = 'Phone number must be 10 digits';
                    }

                    return errors;
                }}
                onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
                    setTimeout(() => {

                        setSubmitting(false);
                        router.push('/account-opening/personal-account/contact-and-address');
                    }, 400);
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
                    <Form onSubmit={handleSubmit} className="space-y-6">
                       
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <Field
                                type="text"
                                name="fullName"
                                id="fullName"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your full name"
                            />
                            <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <Field
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                Gender
                            </label>
                            <Field
                                as="select"
                                name="gender"
                                id="gender"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" label="Select gender" />
                                <option value="male" label="Male" />
                                <option value="female" label="Female" />
                                <option value="other" label="Other" />
                            </Field>
                            <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                                Nationality
                            </label>
                            <Field
                                type="text"
                                name="nationality"
                                id="nationality"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your nationality"
                            />
                            <ErrorMessage name="nationality" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">
                                Marital Status
                            </label>
                            <Field
                                as="select"
                                name="maritalStatus"
                                id="maritalStatus"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" label="Select marital status" />
                                <option value="single" label="Single" />
                                <option value="married" label="Married" />
                                <option value="divorced" label="Divorced" />
                                <option value="widowed" label="Widowed" />
                            </Field>
                            <ErrorMessage name="maritalStatus" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="numberOfDependents" className="block text-sm font-medium text-gray-700">
                                Number of Dependents
                            </label>
                            <Field
                                type="text"
                                name="numberOfDependents"
                                id="numberOfDependents"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter number of dependents"
                            />
                            <ErrorMessage name="numberOfDependents" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <Field
                                as="textarea"
                                name="address"
                                id="address"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your address"
                            />
                            <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
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
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <Field
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your phone number"
                            />
                            <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs mt-1" />
                        </div>



                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            Next
                        </button>
                    </Form>
                )}
            </Formik>
        
    );
};

export default Page;
