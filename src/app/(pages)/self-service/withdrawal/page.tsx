/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const WithdrawalPage = () => {
  const initialValues = {
    accountNumber: '',
    amount: '',
  };

  const validationSchema = Yup.object({
    accountNumber: Yup.string().required('Account number is required'),
    amount: Yup.number().required('Withdrawal amount is required').positive('Amount must be positive'),
  });

  const onSubmit = (values: any) => {
    alert('Withdrawal request submitted: ' + JSON.stringify(values, null, 2));
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Withdrawal Request</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="space-y-6">
            <div>
              <label htmlFor="accountNumber" className="text-lg font-medium text-gray-700">Account Number</label>
              <Field
                type="text"
                id="accountNumber"
                name="accountNumber"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter account number"
              />
              <ErrorMessage name="accountNumber" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="amount" className="text-lg font-medium text-gray-700">Withdrawal Amount</label>
              <Field
                type="number"
                id="amount"
                name="amount"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter withdrawal amount"
              />
              <ErrorMessage name="amount" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Submit Withdrawal
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default WithdrawalPage;
