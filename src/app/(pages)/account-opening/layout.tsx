import React from 'react';
import Image from 'next/image';

function AccountOpeningLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <section className="flex flex-col lg:flex-row flex-1 h-screen overflow-hidden">

            <aside className="bg-blue-700 text-white w-full lg:w-2/5 flex flex-col items-center justify-center p-8">
                <h1 className="text-4xl font-bold mb-4">Overview</h1>
                <h2 className="text-xl font-medium mb-6">Financial Auditing and Reporting</h2>
                <Image src="/stanbic.png" alt="stanbic" width={120} height={120} className="" />
                <p className="text-center text-sm mt-4">
                    Your trusted partner for financial services and auditing solutions.
                </p>
            </aside>
            <aside className='bg-slate-50 w-full lg:w-3/5 p-6 overflow-y-scroll'>
                {children}
            </aside>
        </section>
    )
}

export default AccountOpeningLayout
