/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

interface FormValues {
    idType: string;
    idNumber: string;
    expirationDate: string;
    document: File | null;
    pepStatus: string;
    foreignTransactions: string;
    riskAssessment: string;
}

const Page: React.FC = () => {
    const router = useRouter();

    return (

            <Formik
                initialValues={{
                    idType: '',
                    idNumber: '',
                    expirationDate: '',
                    document: null,
                    pepStatus: '',
                    foreignTransactions: '',
                    riskAssessment: '',
                }}
                validate={(values: FormValues) => {
                    const errors: Partial<FormValues> = {};
                    if (!values.idType) {
                        errors.idType = 'ID type is required';
                    }
                    if (!values.idNumber) {
                        errors.idNumber = 'ID number is required';
                    }
                    if (!values.expirationDate) {
                        errors.expirationDate = 'Expiration date is required';
                    }
                    if (!values.pepStatus) {
                        errors.pepStatus = 'PEP status is required';
                    }
                    if (!values.foreignTransactions) {
                        errors.foreignTransactions = 'Foreign transaction expectations are required';
                    }
                    if (!values.riskAssessment) {
                        errors.riskAssessment = 'Risk assessment declaration is required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) => {
                    setTimeout(() => {
                      
                        setSubmitting(false);
                        router.push('/account-opening/personal-account/preferences-and-consent'); 
                    }, 400);
                }}
            >
                {({
                    setFieldValue,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <Form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="idType" className="block text-sm font-medium text-gray-700">
                                ID Type
                            </label>
                            <Field
                                as="select"
                                name="idType"
                                id="idType"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" label="Select ID type" />
                                <option value="passport" label="Passport" />
                                <option value="drivers_license" label="Driver’s License" />
                                <option value="national_id" label="National ID" />
                            </Field>
                            <ErrorMessage name="idType" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                                ID Number
                            </label>
                            <Field
                                type="text"
                                name="idNumber"
                                id="idNumber"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your ID number"
                            />
                            <ErrorMessage name="idNumber" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                                Expiration Date
                            </label>
                            <Field
                                type="date"
                                name="expirationDate"
                                id="expirationDate"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <ErrorMessage name="expirationDate" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                                Document Upload
                            </label>
                            <input
                                type="file"
                                id="document"
                                name="document"
                                accept="image/*,application/pdf"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(event) => {
                                    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                                    setFieldValue('document', file);
                                }}
                            />
                            <ErrorMessage name="document" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="pepStatus" className="block text-sm font-medium text-gray-700">
                                Politically Exposed Person (PEP) Status
                            </label>
                            <Field
                                as="select"
                                name="pepStatus"
                                id="pepStatus"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" label="Select PEP status" />
                                <option value="yes" label="Yes" />
                                <option value="no" label="No" />
                            </Field>
                            <ErrorMessage name="pepStatus" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="foreignTransactions" className="block text-sm font-medium text-gray-700">
                                Foreign Transaction Expectations
                            </label>
                            <Field
                                as="textarea"
                                name="foreignTransactions"
                                id="foreignTransactions"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Describe your foreign transaction expectations"
                            />
                            <ErrorMessage name="foreignTransactions" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div>
                            <label htmlFor="riskAssessment" className="block text-sm font-medium text-gray-700">
                                Risk Assessment Declarations
                            </label>
                            <Field
                                as="textarea"
                                name="riskAssessment"
                                id="riskAssessment"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Declare any potential risks (e.g., criminal record)"
                            />
                            <ErrorMessage name="riskAssessment" component="div" className="text-red-500 text-xs mt-1" />
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
