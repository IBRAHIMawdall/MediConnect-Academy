"use client";

import { useState, useRef, useEffect } from 'react';

export function AnimatedHero() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      // Start from 50% of the video to avoid intro text
      video.currentTime = video.duration * 0.5;
      video.play().catch(console.error);
    };

    const handleTimeUpdate = () => {
      // When video reaches 85%, smoothly loop back to 50% for continuous motion
      if (video.currentTime >= video.duration * 0.85) {
        video.currentTime = video.duration * 0.5;
      }
    };

    const handleEnded = () => {
      // If video ends, restart from 50%
      video.currentTime = video.duration * 0.5;
      video.play().catch(console.error);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
        >
          <source src="/af40c147-5145-428e-a761-1c030c950feb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Fallback Background for video error */}
      {videoError && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234f46e5;stop-opacity:1" /><stop offset="50%" style="stop-color:%237c3aed;stop-opacity:1" /><stop offset="100%" style="stop-color:%23db2777;stop-opacity:1" /></linearGradient><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23bg)"/><rect width="100%" height="100%" fill="url(%23grid)"/><circle cx="200" cy="150" r="3" fill="rgba(255,255,255,0.3)"/><circle cx="800" cy="200" r="2" fill="rgba(255,255,255,0.4)"/><circle cx="400" cy="300" r="4" fill="rgba(255,255,255,0.2)"/><circle cx="1000" cy="400" r="3" fill="rgba(255,255,255,0.3)"/><circle cx="300" cy="500" r="2" fill="rgba(255,255,255,0.4)"/><circle cx="700" cy="600" r="3" fill="rgba(255,255,255,0.2)"/></svg>')`
          }}
        />
      )}
      

      











    </div>
  );
}
