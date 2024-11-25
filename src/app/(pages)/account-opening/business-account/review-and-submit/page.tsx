/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';

interface FormValues {
    fullName: string;
    dateOfBirth: string;
    address: string;
    email: string;
    phoneNumber: string;
    accountType: string;
    preferredBranch: string;
    debitCard: boolean;
    onlineBanking: boolean;
    termsAndConditions: boolean;
    dataPrivacy: boolean;
}

const ReviewPage: React.FC = () => {
    const router = useRouter();

    const handleSubmit = async () => {
        
  
        // router.push('/account-opening/personal-account/review-and-submit');
    };

    return (


            <Formik
                initialValues={{
                    fullName: '',
                    dateOfBirth: '',
                    address: '',
                    email: '',
                    phoneNumber: '',
                    accountType: '',
                    preferredBranch: '',
                    debitCard: '',
                    onlineBanking: '',
                    termsAndConditions: '',
                    dataPrivacy: '',
                }}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form>
                        
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Personal Information</h3>
                            <div>
                                <strong>Full Name:</strong> {values.fullName}
                            </div>
                            <div>
                                <strong>Date of Birth:</strong> {values.dateOfBirth}
                            </div>
                            <div>
                                <strong>Address:</strong> {values.address}
                            </div>
                            <div>
                                <strong>Email:</strong> {values.email}
                            </div>
                            <div>
                                <strong>Phone Number:</strong> {values.phoneNumber}
                            </div>
                            <div>
                                <strong>Account Type:</strong> {values.accountType}
                            </div>
                        </div>

                        <div className="space-y-4 mt-6">
                            <h3 className="text-lg font-semibold">Preferences and Consent</h3>
                            <div>
                                <strong>Preferred Branch:</strong> {values.preferredBranch}
                            </div>
                            <div>
                                <strong>Debit Card:</strong> {values.debitCard ? 'Yes' : 'No'}
                            </div>
                            <div>
                                <strong>Online Banking Enrollment:</strong> {values.onlineBanking ? 'Yes' : 'No'}
                            </div>
                            <div>
                                <strong>Terms and Conditions:</strong> {values.termsAndConditions ? 'Agreed' : 'Not Agreed'}
                            </div>
                            <div>
                                <strong>Data Privacy Agreement:</strong> {values.dataPrivacy ? 'Agreed' : 'Not Agreed'}
                            </div>
                        </div>

                        
                        <div className="mt-6 text-center">
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                Submit Application
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
      
    );
};

export default ReviewPage;
