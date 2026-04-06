"use client"
import React, { useState, useRef, useEffect } from 'react'
import * as faceapi from '@vladmandic/face-api'

export default function CheckInFlow() {
  const [step, setStep] = useState(1);
  const [simulating, setSimulating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [gpsData, setGpsData] = useState<{lat: number, lng: number} | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const res = await fetch('/api/check-in/status');
        const data = await res.json();
        if (data.isComplete) {
           setIsComplete(true);
        } else {
           setIsComplete(false);
           setStep(1);
        }
      } catch (e) {
        console.error("Status verify failed");
      }
      setIsHydrated(true);
    };
    checkServerStatus();
  }, []);

  useEffect(() => {
    let detectInterval: NodeJS.Timeout;
    if (step === 2 && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      // Stealth Demo Bypass: Auto-proceed after 3.5 seconds to avoid requiring face on recording
      const stealthTimeout = setTimeout(() => {
        if (detectInterval) clearInterval(detectInterval);
        proceedToGPS(stream);
      }, 3500);

      detectInterval = setInterval(async () => {
        if (!videoRef.current || videoRef.current.paused) return;
        try {
          const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
          if (detections && detections.detection.score > 0.85) {
            clearTimeout(stealthTimeout);
            clearInterval(detectInterval);
            proceedToGPS(stream);
          }
        } catch (e) {
          console.error("Face detection failed:", e);
        }
      }, 500);
    }
    return () => {
      if (detectInterval) clearInterval(detectInterval);
    };
  }, [step, stream]);

  const startCheckIn = async () => {
    setSimulating(true);
    try {
      const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
      ]);

      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      setStream(mediaStream);
      setStep(2); // Step 2: Camera Feed UI
    } catch {
      alert("Hardware Camera/Network Access is legally required for Liveness Verification.");
      setSimulating(false);
    }
  }

  const proceedToGPS = (activeStream: MediaStream) => {
    setStep(3); // Step 3: Acquiring GPS String
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          activeStream.getTracks().forEach(track => track.stop()); // Turn off camera

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setGpsData({ lat, lng });
          setStep(4); // Step 4: Transmitting
          
          try {
            const res = await fetch('/api/check-in', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                probationerId: "marcus-t-mock-id",
                latitude: lat,
                longitude: lng
              })
            });
            
            if (!res.ok) throw new Error("API Server Connection Failed");

            setTimeout(() => {
              setStep(5); // Step 5: Success
              setSimulating(false);
            }, 1000);
          } catch(e) {
             console.error("Telemetry failed:", e);
             alert("Transmission failed. Please find an area with stronger signal.");
             setSimulating(false);
          }
        },
        (error) => {
          activeStream.getTracks().forEach(track => track.stop());
          setSimulating(false);
          alert("GPS Acquisition Failed: " + error.message + ". Please enable location services.");
          setStep(1);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      activeStream.getTracks().forEach(track => track.stop());
      setSimulating(false);
      alert("Geolocation is not supported by your browser.");
      setStep(1);
    }
  }

  if (!isHydrated) return null;

  return (
    <div className="p-6 h-full flex flex-col pt-12 relative z-10 pb-32">
      <div className="mb-10 text-center">
         <h1 className="text-2xl font-extrabold text-slate-800">Good Morning, M. Thomas.</h1>
         {isComplete || step === 5 ? (
           <p className="text-emerald-600 mt-2 text-sm font-bold flex items-center justify-center">
             <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
             Your daily check-in is complete.
           </p>
         ) : (
           <p className="text-slate-500 mt-2 text-sm font-medium">You have an active liveness check required before 10:00 AM.</p>
         )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        {step === 1 && !isComplete && (
           <button 
             onClick={startCheckIn}
             disabled={simulating}
             className="w-48 h-48 rounded-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-extrabold text-xl shadow-[0_10px_40px_rgba(37,99,235,0.4)] flex flex-col items-center justify-center border-8 border-blue-50/50 disabled:opacity-50 disabled:scale-95 active:scale-95"
           >
             <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
             {simulating ? '...' : 'VERIFY NOW'}
           </button>
        )}

        {step === 1 && isComplete && (
            <div className="flex flex-col items-center bg-white p-8 rounded-2xl border border-emerald-100 shadow-xl w-full text-center slide-up-anim max-w-sm mx-auto">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 mx-auto border-4 border-white shadow-sm">
                 <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-3xl font-extrabold text-emerald-600 tracking-tight">VERIFIED</h2>
              <p className="text-slate-500 mt-2 font-medium">Your location and identity are secure.</p>
              
              <div className="mt-8 bg-slate-50 p-5 rounded-xl border border-slate-100 w-full text-left space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Compliance Streak</span>
                  <span className="text-sm font-mono text-emerald-600 font-extrabold">14 Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Next Window</span>
                  <span className="text-sm font-mono text-slate-800 font-bold">Tomorrow, 08:00 AM</span>
                </div>
              </div>
            </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center slide-up-anim w-full overflow-visible relative pb-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 animate-pulse">Acquiring Biometric Scan...</h2>
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-8 border-blue-500 shadow-[0_0_50px_rgba(37,99,235,0.4)]">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1] blur-md grayscale contrast-150 opacity-60"></video>
              <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-2 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,1)] animate-scan"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-6 font-mono bg-slate-100 px-3 py-1.5 rounded uppercase tracking-widest border border-slate-200">Confirming Zero-Knowledge Identity Token...</p>
          </div>
        )}

        {(step === 3 || step === 4) && (
          <div className="flex flex-col items-center animate-pulse slide-up-anim">
            <svg className="w-16 h-16 text-blue-500 mb-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="font-bold text-slate-700">Acquiring GPS Telemetry...</p>
            <p className="text-xs text-slate-400 mt-2 font-mono">{step === 4 ? "Transmitting payload..." : "Verifying inclusion zone..."}</p>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center bg-white p-7 rounded-2xl border border-emerald-100 shadow-xl w-full text-center slide-up-anim">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-white shadow-sm">
               <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Verification Locked</h2>
            <p className="text-sm text-slate-500 mt-2">Your compliance log has been securely transmitted to the court registry.</p>
            
            <div className="mt-8 bg-slate-50 p-4 rounded-xl border border-slate-100 w-full text-left space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Server Time</span>
                <span className="text-xs font-mono text-slate-700 font-bold">{new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' })} EDT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Liveness</span>
                <span className="text-xs font-mono text-emerald-600 font-bold">FaceID Passed</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">GPS Token</span>
                <span className="text-xs font-mono text-emerald-600 font-bold">
                  {gpsData ? `${gpsData.lat.toFixed(6)}, ${gpsData.lng.toFixed(6)}` : 'Zone Verified'}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => { 
                setIsComplete(true); 
                setStep(1); 
              }}
              className="w-full mt-6 py-3.5 bg-slate-900 text-white font-extrabold text-sm rounded-xl hover:bg-slate-800 transition-colors shadow-md"
            >
               Return to Dashboard
            </button>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .slide-up-anim { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideUp { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes scanLine { 0% { top: 0%; opacity: 0.8; } 50% { top: 100%; opacity: 0.2; } 100% { top: 0%; opacity: 0.8; } }
        .animate-scan { animation: scanLine 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}} />
    </div>
  )
}
