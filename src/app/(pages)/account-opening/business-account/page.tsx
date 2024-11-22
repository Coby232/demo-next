/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';

interface FormValues {
  businessName: string;
  registrationNumber: string;
  businessAddress: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  accountType: string;
}

const BusinessAccountOpening: React.FC = () => (
  <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 className="text-2xl font-semibold text-center mb-6">Open a Business Bank Account</h1>
    <Formik
      initialValues={{
        businessName: '',
        registrationNumber: '',
        businessAddress: '',
        contactPerson: '',
        email: '',
        phoneNumber: '',
        accountType: '',
      }}
      validate={(values: FormValues) => {
        const errors: Partial<FormValues> = {};
        if (!values.businessName) {
          errors.businessName = 'Business name is required';
        }
        if (!values.registrationNumber) {
          errors.registrationNumber = 'Registration number is required';
        }
        if (!values.businessAddress) {
          errors.businessAddress = 'Business address is required';
        }
        if (!values.contactPerson) {
          errors.contactPerson = 'Contact person is required';
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
        if (!values.accountType) {
          errors.accountType = 'Account type is required';
        }
        return errors;
      }}
      onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setTimeout(() => {
          alert('Business account application submitted successfully!');
          setSubmitting(false);
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
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <Field
              type="text"
              name="businessName"
              id="businessName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your business name"
            />
            <ErrorMessage name="businessName" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div>
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
              Registration Number
            </label>
            <Field
              type="text"
              name="registrationNumber"
              id="registrationNumber"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter registration number"
            />
            <ErrorMessage name="registrationNumber" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div>
            <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700">
              Business Address
            </label>
            <Field
              as="textarea"
              name="businessAddress"
              id="businessAddress"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your business address"
            />
            <ErrorMessage name="businessAddress" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
              Contact Person Name
            </label>
            <Field
              type="text"
              name="contactPerson"
              id="contactPerson"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter contact person name"
            />
            <ErrorMessage name="contactPerson" component="div" className="text-red-500 text-xs mt-1" />
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

          <div>
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <Field
              as="select"
              name="accountType"
              id="accountType"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" label="Select account type" />
              <option value="business_savings" label="Business Savings Account" />
              <option value="business_current" label="Business Current Account" />
              <option value="corporate_fixed" label="Corporate Fixed Deposit Account" />
            </Field>
            <ErrorMessage name="accountType" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default BusinessAccountOpening;
