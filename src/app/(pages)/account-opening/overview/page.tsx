/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const overview = [
    {
        title: "Business Account",
        description: "Open a business account today on our platform to manage finances efficiently.",
        link: "/account-opening/business-account",
    },
    {
        title: "Personal Account",
        description: "Manage your personal finances with ease by opening an account.",
        link: "/account-opening/personal-account/person-info",
    },
    {
        title: "Financial Insights",
        description: "Access tools and analytics to gain insights into your financial health.",
        link: "#",
    },
    {
        title: "Auditing Services",
        description: "Ensure compliance and transparency with our auditing services.",
        link: "#",
    },
];

function Page() {

    return (
        <>
            <h3 className="text-2xl font-semibold mb-6 text-blue-700">Services</h3>
            <ul className="space-y-4">
                {overview.map((item, index) => (
                    <li
                        key={index}
                        className="bg-white w-full border rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-300"
                    >
                        <h4 className="text-lg font-semibold text-blue-600 mb-2" >{item.title}</h4>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        <Link
                            href={item.link}
                            className="text-blue-500 font-medium hover:underline"
                        >
                            Read more
                        </Link>
                    </li>
                ))}
            </ul>

        </>
    );
}

export default Page;
