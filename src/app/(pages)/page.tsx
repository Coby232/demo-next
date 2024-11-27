/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React,{useEffect} from "react";
// import { useParams } from "next/navigation";
import NavBar from "../components/NavBar";
import Image from "next/image";
import TelemetryScriptLoader from "../components/Telemetry";

export default function Page() {
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "https://b974-196-50-25-138.ngrok-free.app/static/telemetry-tracker.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    
    //     // Cleanup when component is unmounted
    //     return () => {
    //       document.body.removeChild(script);
    //     };
    //   }, []);
    
    
    return (
        <main className="bg-slate-50 w-full h-screen text-black ">
            <TelemetryScriptLoader/>
            <header className="flex flex-row items-center justify-center h-full p-5">
                <div className="flex flex-row items-center justify-center max-sm:relative">
                    <Image src={"/stanbic.png"} width={200} height={200} alt="hero" quality={100} className="object-contain md:-mr-56" />
                    <Image src={"/3d.png"} width={300} height={300} alt="hero" quality={100} className="md:max-sm:-ml-16 max-sm:absolute max-sm:h-52 max-sm:min-w-fit" />
                </div>
                <div className="-ml-16 max-sm:ml-0">
                    <div className="flex flex-row gap-3 p-5">
                        
                        <div className="flex flex-col gap-1 ">
                            <h1 className="text-xl max-sm:text-lg text-wrap"><strong>Get started with your financial <br /> auditing journey</strong></h1>
                            <p className="text-xs text-slate-600">Expert financial auditing services ensuring accuracy,<br /> compliance, and transparency to identify risks,<br /> improve performance, and safeguard your business.</p>
                        </div>

                    </div>
                </div>

            </header>
            <footer>
                <NavBar />
            </footer>
        </main>
    )
}