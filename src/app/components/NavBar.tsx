import React from "react";
// import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar(){
    const router = useRouter();
    return(
        <nav className="z-50 flex flex-row border-t justify-center min-w-full fixed bottom-0 h-14 items-center">
            <ul className="flex flex-row gap-5 p-">
                <button className="bg-white border w-36 h-10 text-center rounded-lg text-indigo-700 focus:outline-none focus:ring-2 focus:ring-slate-300 " onClick={()=>router.push("/auth/create-account")}>Get Started</button>
                <button className="bg-white border w-36 h-10 text-center rounded-lg text-indigo-700 focus:outline-none focus:ring-2 focus:ring-slate-300 " onClick={()=>router.push("/auth/login")}>LogIn</button>
            </ul>
        </nav>
    )
}