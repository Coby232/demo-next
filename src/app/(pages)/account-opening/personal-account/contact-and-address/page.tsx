/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

interface FormValues {
    residentialAddress: string;
    mailingAddress: string;
    phoneNumber: string;
    emailAddress: string;
    useSameAddress: boolean;
}

const Page: React.FC = () => {
    const router = useRouter();

    return (

            <Formik<FormValues>
                initialValues={{
                    residentialAddress: '',
                    mailingAddress: '',
                    phoneNumber: '',
                    emailAddress: '',
                    useSameAddress: false,
                }}
                validate={(values) => {
                    const errors: Partial<FormValues> = {};
                    if (!values.residentialAddress) {
                        errors.residentialAddress = 'Residential address is required';
                    }
                    if (!values.useSameAddress && !values.mailingAddress) {
                        errors.mailingAddress = 'Mailing address is required if different from residential address';
                    }
                    if (!values.phoneNumber) {
                        errors.phoneNumber = 'Phone number is required';
                    } else if (!/^\d{10}$/i.test(values.phoneNumber)) {
                        errors.phoneNumber = 'Phone number must be 10 digits';
                    }
                    if (!values.emailAddress) {
                        errors.emailAddress = 'Email address is required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailAddress)
                    ) {
                        errors.emailAddress = 'Invalid email address';
                    }
                    return errors;
                }}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onSubmit={async (values, { setSubmitting }: FormikHelpers<FormValues>) => {
                 
                        router.push('/account-opening/personal-account/employment-and-financial'); 
                 
                }}
            >
                {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
                    <Form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="residentialAddress" className="block text-sm font-medium text-gray-700">
                                Residential Address
                            </label>
                            <Field
                                as="textarea"
                                name="residentialAddress"
                                id="residentialAddress"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your residential address"
                            />
                            <ErrorMessage
                                name="residentialAddress"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <Field
                                    type="checkbox"
                                    name="useSameAddress"
                                    className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={(e:any) => {
                                        setFieldValue('useSameAddress', e.target.checked);
                                        if (e.target.checked) {
                                            setFieldValue('mailingAddress', values.residentialAddress);
                                        }
                                    }}
                                />
                                Use residential address as mailing address
                            </label>
                        </div>

                        {!values.useSameAddress && (
                            <div>
                                <label htmlFor="mailingAddress" className="block text-sm font-medium text-gray-700">
                                    Mailing Address
                                </label>
                                <Field
                                    as="textarea"
                                    name="mailingAddress"
                                    id="mailingAddress"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your mailing address"
                                />
                                <ErrorMessage
                                    name="mailingAddress"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                        )}

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
                            <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        <div>
                            <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <Field
                                type="email"
                                name="emailAddress"
                                id="emailAddress"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your email address"
                            />
                            <ErrorMessage
                                name="emailAddress"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
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
