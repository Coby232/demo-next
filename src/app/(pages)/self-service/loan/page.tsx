/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";

const LoanPage = () => {
  const initialValues = {
    amount: '',
    term: '',
    interestRate: '',
  };

  const validationSchema = Yup.object({
    amount: Yup.number().required('Loan amount is required').positive('Amount must be positive'),
    term: Yup.number().required('Loan term is required').min(1, 'Term must be at least 1 month'),
    interestRate: Yup.number().required('Interest rate is required').positive('Rate must be positive'),
  });

const router = useRouter();
  const handleSubmit = (serviceDetails: any) => {
    localStorage.setItem("prevRoute", "/self-service/loan");
    localStorage.setItem(
      "receiptDetails",
      JSON.stringify(serviceDetails)
    );
    router.push("/self-service/receipt");
  };

  return (
    <div className="max-w-xl min-w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Apply for a Loan</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="space-y-6">
            <div>
              <label htmlFor="amount" className="text-lg font-medium text-gray-700">Loan Amount</label>
              <Field
                type="number"
                id="amount"
                name="amount"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter loan amount"
              />
              <ErrorMessage name="amount" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="term" className="text-lg font-medium text-gray-700">Loan Term (months)</label>
              <Field
                type="number"
                id="term"
                name="term"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter loan term"
              />
              <ErrorMessage name="term" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="interestRate" className="text-lg font-medium text-gray-700">Interest Rate (%)</label>
              <Field
                type="number"
                id="interestRate"
                name="interestRate"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter interest rate"
              />
              <ErrorMessage name="interestRate" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Submit Loan Request
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoanPage;
