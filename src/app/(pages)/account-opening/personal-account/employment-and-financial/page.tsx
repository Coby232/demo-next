/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

interface FormValues {
    employmentStatus: string;
    employerName: string;
    occupation: string;
    annualIncome: string;
    sourceOfFunds: string;
    accountUsage: string;
}

const Page: React.FC = () => {
    const router = useRouter();

    return (

            <Formik<FormValues>
                initialValues={{
                    employmentStatus: '',
                    employerName: '',
                    occupation: '',
                    annualIncome: '',
                    sourceOfFunds: '',
                    accountUsage: '',
                }}
                validate={(values) => {
                    const errors: Partial<FormValues> = {};
                    if (!values.employmentStatus) {
                        errors.employmentStatus = 'Employment status is required';
                    }
                    if (values.employmentStatus === 'Employed' && !values.employerName) {
                        errors.employerName = 'Employer name is required for employed individuals';
                    }
                    if (!values.occupation) {
                        errors.occupation = 'Occupation is required';
                    }
                    if (!values.annualIncome) {
                        errors.annualIncome = 'Annual income is required';
                    } else if (isNaN(Number(values.annualIncome))) {
                        errors.annualIncome = 'Annual income must be a valid number';
                    }
                    if (!values.sourceOfFunds) {
                        errors.sourceOfFunds = 'Source of funds is required';
                    }
                    if (!values.accountUsage) {
                        errors.accountUsage = 'Account usage is required';
                    }
                    return errors;
                }}
                onSubmit={async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
                    
                        router.push('/account-opening/personal-account/identification-and-verification'); 
                  
                }}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700">
                                Employment Status
                            </label>
                            <Field
                                as="select"
                                name="employmentStatus"
                                id="employmentStatus"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" label="Select employment status" />
                                <option value="Employed" label="Employed" />
                                <option value="Self-Employed" label="Self-Employed" />
                                <option value="Unemployed" label="Unemployed" />
                                <option value="Student" label="Student" />
                                <option value="Retired" label="Retired" />
                            </Field>
                            <ErrorMessage name="employmentStatus" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="employerName" className="block text-sm font-medium text-gray-700">
                                Employer Name
                            </label>
                            <Field
                                type="text"
                                name="employerName"
                                id="employerName"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your employer's name"
                            />
                            <ErrorMessage name="employerName" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                                Occupation
                            </label>
                            <Field
                                type="text"
                                name="occupation"
                                id="occupation"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your occupation"
                            />
                            <ErrorMessage name="occupation" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">
                                Annual Income
                            </label>
                            <Field
                                type="text"
                                name="annualIncome"
                                id="annualIncome"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your annual income"
                            />
                            <ErrorMessage name="annualIncome" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="sourceOfFunds" className="block text-sm font-medium text-gray-700">
                                Source of Funds
                            </label>
                            <Field
                                as="textarea"
                                name="sourceOfFunds"
                                id="sourceOfFunds"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Explain the source of your funds"
                            />
                            <ErrorMessage name="sourceOfFunds" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="accountUsage" className="block text-sm font-medium text-gray-700">
                                Account Usage
                            </label>
                            <Field
                                as="textarea"
                                name="accountUsage"
                                id="accountUsage"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Describe how you plan to use the account (e.g., personal savings, salary account)"
                            />
                            <ErrorMessage name="accountUsage" component="div" className="text-red-500 text-xs mt-1" />
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
