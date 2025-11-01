import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-[#e2e8f0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-3xl p-8 relative animate-pulse overflow-hidden">
      {/* same background blobs */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#007aff]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#60a5fa]/10 rounded-full blur-3xl"></div>

      {/* shimmer animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cbd5e1]/30 to-transparent animate-[shimmer_1.5s_infinite]"></div>

      {/* title skeletons */}
      <div className="h-8 w-2/3 bg-[#e5e9f0]/70 rounded-lg mx-auto mb-2"></div>
      <div className="h-4 w-1/2 bg-[#e5e9f0]/70 rounded-lg mx-auto mb-8"></div>

      {/* input field skeletons */}
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="mb-5">
          <div className="h-4 w-1/3 bg-[#e3e8f3]/80 rounded-md mb-2"></div>
          <div className="h-10 w-full bg-[#e3e8f3]/80 rounded-xl shadow-inner"></div>
        </div>
      ))}

      {/* select + file skeleton */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 h-10 bg-[#e3e8f3]/80 rounded-xl shadow-inner"></div>
        <div className="flex-1 h-10 bg-[#e3e8f3]/80 rounded-xl shadow-inner"></div>
      </div>

      {/* button skeleton */}
      <div className="w-full h-10 bg-[#d0dcf4]/90 rounded-xl shadow-md mb-5"></div>

      {/* footer skeleton */}
      <div className="h-3 w-2/3 bg-[#e3e8f3]/70 rounded-md mx-auto"></div>
      
    </div>
  );
};

export default SkeletonLoader;