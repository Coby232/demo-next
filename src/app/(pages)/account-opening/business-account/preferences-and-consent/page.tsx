/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

interface FormValues {
    preferredBranch: string;
    debitCard: string;
    onlineBanking: string;
    termsAndConditions: string;
    dataPrivacy: string;
    marketingPreferences: string;
}

const PreferencesPage: React.FC = () => {
    const router = useRouter();

    return (

            <Formik<FormValues>
                initialValues={{
                    preferredBranch: '',
                    debitCard: '',
                    onlineBanking: '',
                    termsAndConditions: '',
                    dataPrivacy: '',
                    marketingPreferences: '',
                }}
                validate={(values) => {
                    const errors: Partial<FormValues> = {};
                    if (!values.preferredBranch) {
                        errors.preferredBranch = 'Preferred branch is required';
                    }
                    if (!values.termsAndConditions) {
                        errors.termsAndConditions = 'You must agree to the Terms and Conditions';
                    }
                    if (!values.dataPrivacy) {
                        errors.dataPrivacy = 'You must agree to the Data Privacy Agreement';
                    }
                    return errors;
                }}
                onSubmit={async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
                   
                        router.push('/account-opening/personal-account/review-and-submit');
                   
                }}
            >
                {({ values, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="preferredBranch" className="block text-sm font-medium text-gray-700">
                                Preferred Branch
                            </label>
                            <Field
                                as="select"
                                name="preferredBranch"
                                id="preferredBranch"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" label="Select your preferred branch" />
                                <option value="branch1" label="Branch 1" />
                                <option value="branch2" label="Branch 2" />
                                <option value="branch3" label="Branch 3" />
                            </Field>
                            <ErrorMessage
                                name="preferredBranch"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        <div className="flex items-center">
                            <Field
                                type="checkbox"
                                name="debitCard"
                                id="debitCard"
                                className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="debitCard" className="text-sm text-gray-700">
                                I would like a debit card
                            </label>
                        </div>

                        <div className="flex items-center">
                            <Field
                                type="checkbox"
                                name="onlineBanking"
                                id="onlineBanking"
                                className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="onlineBanking" className="text-sm text-gray-700">
                                Enroll in online banking
                            </label>
                        </div>

                        <div className="flex items-center">
                            <Field
                                type="checkbox"
                                name="marketingPreferences"
                                id="marketingPreferences"
                                className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="marketingPreferences" className="text-sm text-gray-700">
                                Receive marketing communications
                            </label>
                        </div>

                        <div className="flex items-center">
                            <Field
                                type="checkbox"
                                name="termsAndConditions"
                                id="termsAndConditions"
                                className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="termsAndConditions" className="text-sm text-gray-700">
                                I agree to the <a href="#" className="text-blue-600">Terms and Conditions</a>
                            </label>
                            <ErrorMessage
                                name="termsAndConditions"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        <div className="flex items-center">
                            <Field
                                type="checkbox"
                                name="dataPrivacy"
                                id="dataPrivacy"
                                className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="dataPrivacy" className="text-sm text-gray-700">
                                I agree to the <a href="#" className="text-blue-600">Data Privacy Agreement</a>
                            </label>
                            <ErrorMessage
                                name="dataPrivacy"
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

export default PreferencesPage;
