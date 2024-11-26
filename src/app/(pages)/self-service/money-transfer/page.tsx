/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";

const MoneyTransferPage = () => {
  const initialValues = {
    senderAccount: '',
    receiverAccount: '',
    amount: '',
  };

  const validationSchema = Yup.object({
    senderAccount: Yup.string().required('Sender account is required'),
    receiverAccount: Yup.string().required('Receiver account is required'),
    amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
  });


const router = useRouter();
const handleSubmit = (serviceDetails: any) => {
  localStorage.setItem("prevRoute", "/self-service/money-transfer");
  localStorage.setItem(
    "receiptDetails",
    JSON.stringify(serviceDetails)
  );
  router.push("/self-service/receipt");
};

  return (
    <div className='max-w-xl min-w-full mx-auto p-8 bg-white shadow-lg rounded-lg'>
      <h1 className='text-3xl font-semibold text-center text-gray-800 mb-6'>
        Money Transfer
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form>
          <div className='space-y-6'>
            <div>
              <label
                htmlFor='senderAccount'
                className='text-lg font-medium text-gray-700'>
                Sender Account
              </label>
              <Field
                type='text'
                id='senderAccount'
                name='senderAccount'
                className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
                placeholder='Enter sender account number'
              />
              <ErrorMessage
                name='senderAccount'
                component='div'
                className='text-red-500 text-sm mt-1'
              />
            </div>

            <div>
              <label
                htmlFor='receiverAccount'
                className='text-lg font-medium text-gray-700'>
                Receiver Account
              </label>
              <Field
                type='text'
                id='receiverAccount'
                name='receiverAccount'
                className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
                placeholder='Enter receiver account number'
              />
              <ErrorMessage
                name='receiverAccount'
                component='div'
                className='text-red-500 text-sm mt-1'
              />
            </div>

            <div>
              <label
                htmlFor='amount'
                className='text-lg font-medium text-gray-700'>
                Amount
              </label>
              <Field
                type='number'
                id='amount'
                name='amount'
                className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
                placeholder='Enter transfer amount'
              />
              <ErrorMessage
                name='amount'
                component='div'
                className='text-red-500 text-sm mt-1'
              />
            </div>
          </div>

          <div className='mt-8 flex justify-center'>
            <button
              type='submit'
              className='w-full sm:w-auto bg-green-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'>
              Transfer Money
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MoneyTransferPage;
