import React from 'react';

export const BackgroundLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#070E1C] text-slate-100 relative overflow-hidden font-sans selection:bg-orange-500 selection:text-white">
      
      {/* 🌟 Ambient Electric Lighting Glows */}
      {/* Top Left - Cyan Tech Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px] pointer-events-none" />
      
      {/* Center Right - Orange EV Energy Glow */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Bottom Left - Deep Blue Ambient Glow */}
      <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* 📐 Subtle High-Tech Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 💡 Top Accent Cyber Line */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-orange-500 to-blue-600" />

      {/* Main Page Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};