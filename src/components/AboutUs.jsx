import React from 'react';

export default function AboutUs({ onNavigateBack }) {
  // Leadership Team Data
  const leaders = [
    {
      name: "Abhi Ram",
      role: "Chief Executive Officer (CEO)",
      experience: "9+ Years in EV Industry",
      certifications: ["ASDC Certified Trainer", "NSDC Certified Master Trainer"],
      bio: "Former lead at top global EV MNCs across multiple countries. Specialist in commercial vehicle high-voltage powertrain operations, fleet maintenance, and building nationwide technical talent pipelines.",
      badgeColor: "border-orange-500/30 text-orange-400 bg-orange-500/10"
    },
    {
      name: "PurnaChandra Rao",
      role: "Managing Director (MD)",
      experience: "12+ Years in EV Industry",
      certifications: ["CTDS Certified Specialist", "NSDC Master Technical Trainer"],
      bio: "Veteran automotive engineer with extensive experience in global EV MNCs. Spearheads corporate staffing partnerships, technical curriculum design, and state-of-the-art diagnostic lab installations.",
      badgeColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
    },
    {
      name: "Dileep M",
      role: "Chief Technology Officer (CTO)",
      experience: "8+ Years in IT Industry",
      certifications: ["Digital Marketing Strategist", "Enterprise IT Systems Architect"],
      bio: "Tech leader with deep expertise across major IT multinational corporations. Leads E Visionary's digital infrastructure, automated portal ecosystem, and data-driven marketing strategies.",
      badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
    }
  ];

  // 🎯 Student Value Pillars (Attraction Highlights)
  const studentHighlights = [
    {
      badge: "ADVANCED TECHNICAL LEVEL",
      title: "Level 4/5 Industrial EV Curriculum",
      desc: "Forget outdated textbook theory. Work on advanced high-voltage (HV) distribution units, CAN bus telemetry, thermal runaway mitigation, and live battery pack diagnostics.",
      icon: "⚡"
    },
    {
      badge: "80% PRACTICAL HANDS-ON",
      title: "Real Diagnostic Machinery & Rigs",
      desc: "Train directly on heavy vehicle lift bays, commercial EV bus/truck chassis, BMS scanner tools, and motor controller tuning stations in our Anantapur center.",
      icon: "🔧"
    },
    {
      badge: "100% CONFIRMED PLACEMENT",
      title: "Guaranteed Career Pipeline",
      desc: "Complete your training and transition directly into confirmed job interviews across top EV OEMs, fleet networks, and battery manufacturers across India.",
      icon: "🎯"
    },
    {
      badge: "DIRECT MENTORSHIP",
      title: "Learn From Global MNC Trainers",
      desc: "Get taught directly by ASDC & NSDC certified master trainers with 9+ to 12+ years of field experience in top international EV companies.",
      icon: "🎓"
    }
  ];

  // Core B2B Capability Pillars
  const corporatePillars = [
    {
      title: "Commercial EV Fleet Operations",
      desc: "Deep domain expertise in EV Trucks & Buses, focusing on field issue resolution, service operations, and maximizing fleet uptime.",
      icon: "🚌"
    },
    {
      title: "Specialized Staffing & Payroll",
      desc: "End-to-end manpower solutions for OEMs and fleet networks, allowing corporate partners to focus entirely on core business growth.",
      icon: "💼"
    },
    {
      title: "Advanced Diagnostics & Safety",
      desc: "Comprehensive practical training on HV & LV systems, battery management systems (BMS), thermal runaway prevention, and CAN bus logging.",
      icon: "⚡"
    }
  ];

  return (
    <div className="min-h-screen bg-[#070E1C] text-slate-100 relative overflow-x-hidden font-sans selection:bg-orange-500 selection:text-white pt-28 pb-16">
      
      {/* 🌟 Ambient Lighting Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* 📐 Subtle High-Tech Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 space-y-16">
        
        {/* 🚀 Hero Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          {onNavigateBack && (
            <button 
              onClick={onNavigateBack}
              className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl mb-4"
            >
              ← Back to Main Portal
            </button>
          )}
          
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full text-xs text-orange-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse"></span>
            Regd Partnership Firm [No. 42 of 2026] • Anantapur, AP
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Bridging India’s Commercial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400">
              Electric Mobility Skill Gap.
            </span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            M/S <strong className="text-white"><span className="text-orange-400">EV</span>ISIONARY SOLUTIONS INDIA</strong> is a premier technical training and specialized staffing organization dedicated to empowering commercial vehicle operations, EV buses, and trucks across India.
          </p>
        </div>

        {/* 🎓 STUDENT CAREER ADVANTAGE BLOCK */}
        <section className="bg-gradient-to-b from-slate-900/90 to-slate-950/80 border border-orange-500/30 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Accent */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
              Why Students Choose Us
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white pt-2">
              Master Future EV Tech & Get Placed ⚡
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              We don't just teach theory—we build industry-ready diagnostic specialists through advanced practical exposure and guaranteed job interview pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studentHighlights.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-orange-500/40 transition-all duration-300 shadow-lg group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-black text-white group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Guaranteed Placement Banner inside Student Section */}
          <div className="bg-gradient-to-r from-emerald-500/20 via-slate-900 to-cyan-500/20 border border-emerald-500/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider">
                🔒 Placement Guarantee Assurance
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Upon successful course completion and practical evaluation, candidates receive direct placement interviews across leading Indian EV manufacturers.
              </p>
            </div>
            <a 
              href="#apply" 
              onClick={onNavigateBack}
              className="whitespace-nowrap bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs uppercase px-6 py-3 rounded-xl shadow-lg hover:brightness-110 transition-all"
            >
              Enroll for Sep 2026 Batch
            </a>
          </div>
        </section>

        {/* 👥 Executive Leadership Team */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">Visionary Leadership</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Meet Our Industry Masters</h2>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              Learn directly from global EV veterans and enterprise tech leaders with decades of combined hands-on OEM operational experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaders.map((leader, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-orange-500/40 transition-all duration-300 shadow-xl group relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Leader Avatar Badge */}
                  <div className="flex items-center justify-between">
                    <div className="h-14 w-14 bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl border border-slate-700/80 flex items-center justify-center text-xl font-black text-orange-400 shadow-inner group-hover:scale-105 transition-transform">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full border ${leader.badgeColor}`}>
                      {leader.experience}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-bold text-amber-400 mt-0.5">
                      {leader.role}
                    </p>
                  </div>

                  {/* Certifications Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {leader.certifications.map((cert, cIdx) => (
                      <span key={cIdx} className="text-[9px] font-bold bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded-md">
                        📜 {cert}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                    {leader.bio}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60 text-[9px] text-slate-400 uppercase tracking-widest font-bold">
                  E Visionary Executive Board
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🏢 B2B & Academy Capability Spectrum */}
        <section className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400">Our Capabilities</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Engineering Fleet Uptime & Career Readiness</h2>
            <p className="text-xs text-slate-300">
              We bridge theoretical knowledge with practical, on-ground field execution—ensuring technicians and engineers are fully equipped to handle high-voltage challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corporatePillars.map((pillar, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="text-3xl">{pillar.icon}</div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">{pillar.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 📜 Call to Action Banner */}
        <div className="bg-gradient-to-r from-orange-600/20 via-slate-900 to-cyan-600/20 border border-orange-500/30 rounded-3xl p-6 md:p-8 text-center space-y-3">
          <h3 className="text-lg font-black text-white">Ready to Start Your High-Pay EV Career?</h3>
          <p className="text-xs text-slate-300 max-w-2xl mx-auto">
            Reserve your seat for the September 2026 batch. Limited to 30 students per schedule for maximum hands-on lab access.
          </p>
          <div className="pt-2">
            <a 
              href="mailto:admissions@evisionarysolutionsindia.com" 
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs uppercase px-6 py-3 rounded-xl shadow-lg hover:brightness-110 transition-all"
            >
              Contact Admissions Cell
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}