/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { usePathname } from "next/navigation";

// Reusable TelemetryScriptLoader Component

const TelemetryScriptLoader = () => {
const pathname = usePathname();
  useEffect(() => {
    const backendURL = 'https://b974-196-50-25-138.ngrok-free.app/static/telemetry-tracker.js'
    const script = document.createElement('script');
    script.src = backendURL;
    script.async = true;
    document.body.appendChild(script);

  
    return () => {
      document.body.removeChild(script);
    };
  },[pathname]);

  return null; 
};

export default TelemetryScriptLoader;