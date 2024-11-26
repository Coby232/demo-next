/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReceiptPage = () => {
  const router = useRouter();
  const [receiptData, setReceiptData] = useState<{
    serviceType: string;
    timestamp: string;
    details: Record<string, any>;
  } | null>(null);

  useEffect(() => {
    const prevRoute = localStorage.getItem("prevRoute");
    const receiptDetails = localStorage.getItem("receiptDetails");

    if (!prevRoute || !receiptDetails) {
      router.push("/self-service");
      return;
    }

    setReceiptData({
      serviceType: prevRoute.split("/").pop() || "Unknown Service",
      timestamp: new Date().toLocaleString(),
      details: JSON.parse(receiptDetails),
    });
  }, [router]);

  if (!receiptData) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Loading receipt...</p>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8 space-y-6'>
      <h1 className='text-3xl font-bold text-center text-gray-800'>
        Receipt
      </h1>
      <p className='text-center text-gray-600 text-lg'>
        Thank you for using our service.
      </p>

      <div className='border-t pt-4 space-y-4'>
        <p className='text-lg'>
          <strong>Service Type:</strong> {receiptData.serviceType}
        </p>
        <p className='text-lg'>
          <strong>Date & Time:</strong> {receiptData.timestamp}
        </p>
        <div>
          <h2 className='text-lg font-bold'>Details:</h2>
          <ul className='list-disc ml-5 space-y-1'>
            {Object.entries(receiptData.details).map(
              ([key, value]) => (
                <li key={key} className='text-gray-700'>
                  <strong>{key}:</strong> {value}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className='flex justify-center mt-8'>
        <button
          onClick={() => router.push("/self-service")}
          className='px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
          Back to Self-Service
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;
