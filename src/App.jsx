import React, { useState } from 'react';
import AboutUs from './components/AboutUs';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const [formData, setFormData] = useState({
    studentName: '',
    whatsappNumber: '',
    email: '',
    education: '',
    preferredBatch: '',
    verifiedChecked: false
  });

  const [activeAccordion, setActiveAccordion] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const syllabusDays = [
    {
      title: "Phase 1: High-Voltage Safety & Tools (Days 1–10)",
      content: "Introduction to high-voltage automotive platforms. Standard Operating Procedures (SOPs) for safety, emergency shutoff loops, insulation rating, and donning certified Class 0 glove gear."
    },
    {
      title: "Phase 2: Battery Chemistries & BMS Diagnostics (Days 11–25)",
      content: "Lithium-ion vs. LFP cell architectures. Hands-on thermal runaways mitigation, CAN bus logging, state-of-charge (SoC) calibration, and manual cell balancing on active BMS diagnostic rigs."
    },
    {
      title: "Phase 3: Motor Powertrains & Controller Tuning (Days 26–35)",
      content: "BLDC and PMSM motor diagnostics. Wiring, troubleshooting rotor angle sensors, tracking controller phase currents, and resolving drive-cycle error logs."
    },
    {
      title: "Phase 4: EV Charging Systems & Fleet Integration (Days 36–45)",
      content: "AC vs. DC fast charging protocols. Troubleshooting gun locking systems, charging station earth leakage detection, and final vehicle live-fault diagnostics on salvaged EVs."
    }
  ];

  const careerTracks = [
    {
      category: "Engineering & Management Leadership",
      roles: ["Head Service", "Service Manager", "Service Engineer", "Shift Incharge / Supervisor", "Service Trainee"]
    },
    {
      category: "Technical & Electrical Workshop Operations",
      roles: ["Senior Electrician", "Electrician", "Helper Electrician / E-Helper", "Senior Mechanic", "Mechanic", "Helper Technician", "Denter", "Painter", "Tyre Supervisor", "Tyreman / Tyre Technician"]
    },
    {
      category: "Logistics, Admin & Fleet Operations",
      roles: ["DBM Operator / MIS", "Store Manager / Store Incharge", "Store Executive / Store Picker", "Admin / Accounts"]
    }
  ];

  const hiringPartners = [
    {
      segment: "Commercial EV OEMs & Manufacturers",
      companies: ["Olectra Greentech", "JBM Auto", "Tata Motors Commercial", "Switch Mobility (Ashok Leyland)", "Euler Motors", "Altigreen"]
    },
    {
      segment: "EV Fleet Operators & Logistics Networks",
      companies: ["BluSmart Mobility", "MoEVing Cargo", "Zypp Electric", "Lithium Urban Technologies"]
    },
    {
      segment: "Battery Chemistries & Infrastructure Partners",
      companies: ["Amara Raja Energy & Mobility", "Exide Energy Solutions", "Log9 Materials", "Lohum Cleantech"]
    }
  ];

  const labGallery = [
    { src: "/images/photo1.png", desc: "Full-scale commercial EV heavy vehicle lift bays for hands-on under-chassis fleet troubleshooting." },
    { src: "/images/photo2.png", desc: "Smart interactive digital lab setups for tracking real-time CAN bus telemetry and BMS analytics." },
    { src: "/images/photo3.png", desc: "Deep look into structural suspension steering linkages integrated alongside high-voltage powertrain loops." },
    { src: "/images/photo4.png", desc: "Hands-on calibration of barcode-tracked diagnostic harnesses and automated sensor blocks." },
    { src: "/images/photo5.png", desc: "Mastering drive-axle configurations and high-torque electric motor power interfaces." },
    { src: "/images/photo6.png", desc: "Diagnostic tracking on dual-stage motor control units and high-current shielded power lines." },
    { src: "/images/photo7.png", desc: "Troubleshooting heavy-vehicle pneumatic air systems and auxiliary thermal cooling radiators." },
    { src: "/images/photo8.png", desc: "Exploring complex copper-tubed battery thermal management systems and climate control filtration rigs." },
  ];

  const validateForm = () => {
    let errors = {};
    if (!formData.studentName.trim()) {
      errors.studentName = "Student name is required.";
    } else if (formData.studentName.trim().length < 3) {
      errors.studentName = "Name must be at least 3 characters.";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.whatsappNumber) {
      errors.whatsappNumber = "WhatsApp number is required.";
    } else if (!phoneRegex.test(formData.whatsappNumber)) {
      errors.whatsappNumber = "Enter a valid 10-digit Indian mobile number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.education) {
      errors.education = "Please select your educational qualification.";
    }

    if (!formData.preferredBatch) {
      errors.preferredBatch = "Please choose a batch schedule.";
    }

    if (!formData.verifiedChecked) {
      errors.verifiedChecked = "You must confirm your technical interest to proceed.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      const payload = {
        fullName: formData.studentName,
        email: formData.email.trim(),
        phone: formData.whatsappNumber,
        course: `EV Program (${formData.preferredBatch.toUpperCase()})`,
        experience: formData.education
      };

      try {
        await fetch(import.meta.env.VITE_API_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        setIsSubmitted(true);
      } catch (error) {
        console.error('Submission error:', error);
        alert('❌ Network connection error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const scrollToTop = (e) => {
    if (e) e.preventDefault();
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'about') {
    return <AboutUs onNavigateBack={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />;
  }

  return (
    <div className="min-h-screen bg-[#070E1C] text-slate-100 relative overflow-x-hidden font-sans selection:bg-orange-500 selection:text-white">
      
      {/* 🌟 Ambient Electric Lighting Glows */}
      <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/15 rounded-full blur-[100px] sm:blur-[128px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-orange-500/15 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none" />

      {/* 📐 High-Tech Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 🟢 FIXED Mobile-Friendly Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/80 bg-[#070E1C]/95 backdrop-blur-md px-3 py-2.5 sm:px-8 sm:py-3 shadow-xl">
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-orange-500 to-blue-600 absolute top-0 left-0 right-0" />

        <div className="max-w-6xl mx-auto flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <button 
                onClick={scrollToTop}
                type="button"
                className="p-2 bg-slate-900 border border-slate-700/80 rounded-lg text-orange-400 hover:border-orange-400 hover:bg-orange-500/20 active:scale-95 transition-all shadow-md flex-shrink-0 cursor-pointer"
                title="Return to Home"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="M13 7.5l-3.5 4.5h3.5l-1 5.5 3.5-4.5h-3.5z" fill="currentColor" className="text-orange-400" />
                </svg>
              </button>
              <div>
                <h1 className="text-xs sm:text-base font-black tracking-tight text-white uppercase cursor-pointer leading-tight" onClick={scrollToTop}>
                  <span className="text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">EV</span>ISIONARY SOLUTIONS INDIA
                </h1>
                <p className="text-[8px] sm:text-[10px] text-orange-400/90 font-bold tracking-wider uppercase">
                  Regd No. 42 of 2026 • Anantapur, AP
                </p>
              </div>
            </div>

            <a href="#apply" className="sm:hidden bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 px-3 py-1 rounded-md font-black text-[10px] uppercase shadow-md whitespace-nowrap">
              Apply
            </a>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 pt-0.5 text-[11px] sm:text-xs font-semibold scrollbar-none border-t border-slate-800/40">
            <button 
              onClick={() => setCurrentView('about')} 
              className="text-orange-400 font-extrabold bg-orange-500/10 border border-orange-500/30 px-2.5 py-0.5 rounded-md flex-shrink-0"
            >
              About Us
            </button>
            <a href="#curriculum" className="text-slate-300 hover:text-orange-400 px-2 py-0.5 flex-shrink-0">Outline</a>
            <a href="#pathways" className="text-slate-300 hover:text-orange-400 px-2 py-0.5 flex-shrink-0">Careers</a>
            <a href="#partners" className="text-slate-300 hover:text-orange-400 px-2 py-0.5 flex-shrink-0">Hiring Network</a>
            <a href="#gallery" className="text-slate-300 hover:text-orange-400 px-2 py-0.5 flex-shrink-0">Lab Gallery</a>
            <a href="#apply" className="hidden sm:inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 px-3 py-1 rounded-lg font-black shadow-lg shadow-orange-500/20 ml-auto">Register Now</a>
          </div>
        </div>
      </header>

      {/* ⚡ Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 pt-28 sm:pt-36 pb-12 sm:pb-20 space-y-16 sm:space-y-20">
        <section className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 px-2.5 py-1 rounded-full text-[10px] sm:text-xs text-orange-400 font-semibold shadow-inner">
            <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse"></span>
            India's EV Technical Capital Launching in Anantapur
          </div>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Power India's EV Future. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400">
              Get Certified and Placed in 60 Days.
            </span>
          </h2>
          
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed px-2">
            Hands-on practical training aligned with ASDC & NSDC standards for ITI, Diploma, and Engineering students. Step away from traditional textbooks and troubleshoot real battery packs, motor powertrains, and BMS software systems.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-4 text-left">
            {[
              { label: "Course Duration", value: "60 Days (Intensive)" },
              { label: "Lab Location", value: "Anantapur, AP" },
              { label: "Launch Seats", value: "30 Available / Batch" },
              { label: "Fee Option", value: "Easy 2-Part Installments" }
            ].map((m, idx) => (
              <div key={idx} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg">
                <span className="text-[9px] sm:text-[10px] text-orange-400 uppercase font-bold tracking-wider block">{m.label}</span>
                <span className="text-xs sm:text-sm font-extrabold text-white mt-0.5 block">{m.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 📚 Interactive Curriculum Section */}
        <section id="curriculum" className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">Classroom Setup</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">What You Will Master</h3>
              <p className="text-xs text-slate-300 mt-1">
                Our syllabus matches hiring criteria established by leading Indian OEMs, battery manufacturers, and fleet operators.
              </p>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {syllabusDays.map((phase, idx) => (
                <div key={idx} className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl sm:rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 flex justify-between items-center focus:outline-none"
                  >
                    <span className="text-xs font-extrabold text-white pr-2">{phase.title}</span>
                    <span className="text-orange-400 text-base font-bold flex-shrink-0">
                      {activeAccordion === idx ? '−' : '+'}
                    </span>
                  </button>
                  {activeAccordion === idx && (
                    <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/50">
                      {phase.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 📝 Registration Form Container */}
          <div id="apply" className="bg-slate-900/90 backdrop-blur-md border border-orange-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="text-center lg:text-left relative z-10">
              <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest">Early Access</span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">Join the Pioneer Batch</h3>
              <p className="text-xs text-slate-300 mt-1">
                Secure your early admission scholarship token. Only 30 slots available per batch.
              </p>
            </div>

            {isSubmitted ? (
              <div id="success-message" className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-xl text-center space-y-3">
                <div className="h-10 w-10 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                  Registration Secured Successfully!
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  An industrial technical onboarding blueprint has been dispatched to your email.
                </p>
                <div className="bg-slate-950/80 border border-slate-800 p-3 sm:p-4 rounded-xl text-left space-y-1.5">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 block">Next Steps:</span>
                  <p className="text-[10px] sm:text-[11px] text-slate-300 leading-normal">
                    • Coordinators will contact your WhatsApp within 24 hours.<br />
                    • Direct Email: <a href="mailto:admissions@evisionarysolutionsindia.com" className="text-orange-400 font-bold underline">admissions@evisionarysolutionsindia.com</a>
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5 relative z-10">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">Full Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full bg-slate-950/90 border ${formErrors.studentName ? 'border-red-500' : 'border-slate-800'} rounded-xl py-3 px-3.5 text-base sm:text-xs text-white focus:outline-none focus:border-orange-500`}
                  />
                  {formErrors.studentName && <span className="text-[10px] text-red-400 block mt-1">{formErrors.studentName}</span>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">Active WhatsApp Number</label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className={`w-full bg-slate-950/90 border ${formErrors.whatsappNumber ? 'border-red-500' : 'border-slate-800'} rounded-xl py-3 px-3.5 text-base sm:text-xs text-white focus:outline-none focus:border-orange-500`}
                  />
                  {formErrors.whatsappNumber && <span className="text-[10px] text-red-400 block mt-1">{formErrors.whatsappNumber}</span>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className={`w-full bg-slate-950/90 border ${formErrors.email ? 'border-red-500' : 'border-slate-800'} rounded-xl py-3 px-3.5 text-base sm:text-xs text-white focus:outline-none focus:border-orange-500`}
                  />
                  {formErrors.email && <span className="text-[10px] text-red-400 block mt-1">{formErrors.email}</span>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">Educational Qualification</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-950/90 border ${formErrors.education ? 'border-red-500' : 'border-slate-800'} rounded-xl py-3 px-3.5 text-base sm:text-xs text-slate-200 focus:outline-none focus:border-orange-500`}
                  >
                    <option value="">Select qualification</option>
                    <option value="ITI">ITI (Electrical / Mechanic / Fitter)</option>
                    <option value="Diploma">Diploma (EEE / ME / ECE / Auto)</option>
                    <option value="BTech">B.E. / B.Tech (Mech, EEE, ECE)</option>
                    <option value="Vocational">Vocational Electrical Streams</option>
                  </select>
                  {formErrors.education && <span className="text-[10px] text-red-400 block mt-1">{formErrors.education}</span>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">Preferred Batch Schedule</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "morning", label: "Morning (8 AM - 12 PM)" },
                      { value: "afternoon", label: "Afternoon (1 PM - 5 PM)" }
                    ].map((batch) => (
                      <label
                        key={batch.value}
                        className={`border rounded-xl p-2.5 flex items-center justify-center cursor-pointer text-center transition-all ${
                          formData.preferredBatch === batch.value
                            ? 'border-orange-500 bg-orange-500/10 text-orange-400 font-bold'
                            : 'border-slate-800 text-slate-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="preferredBatch"
                          value={batch.value}
                          checked={formData.preferredBatch === batch.value}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <span className="text-[10px]">{batch.label}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.preferredBatch && <span className="text-[10px] text-red-400 block mt-1">{formErrors.preferredBatch}</span>}
                </div>

                <label className="flex items-start gap-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    name="verifiedChecked"
                    checked={formData.verifiedChecked}
                    onChange={handleInputChange}
                    className="mt-0.5 accent-orange-500 h-4 w-4 rounded"
                  />
                  <span className="text-[10px] text-slate-400 leading-tight">
                    I confirm my genuine interest in joining this EV upskilling program in Anantapur.
                  </span>
                </label>
                {formErrors.verifiedChecked && <span className="text-[10px] text-red-400 block mt-1">{formErrors.verifiedChecked}</span>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-5 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-slate-950 font-black rounded-xl shadow-lg uppercase text-xs cursor-pointer min-h-[44px]"
                >
                  {isLoading ? "Registering Slot..." : "Secure My Seat Now"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 📋 Career Tracks */}
        <section id="pathways" className="border-t border-slate-800/80 pt-12 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">Employment Roadmap</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">Careers We Build & Prepare You For</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {careerTracks.map((track, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
                <h4 className="text-xs font-extrabold text-orange-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                  {track.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {track.roles.map((role, roleIdx) => (
                    <span key={roleIdx} className="bg-slate-950/80 text-slate-300 border border-slate-800 text-[10px] font-medium px-2 py-0.5 rounded">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🏢 Hiring Partners */}
        <section id="partners" className="border-t border-slate-800/80 pt-12 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400">Placement Network</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">Target Placement Companies</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {hiringPartners.map((partnerGroup, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-[11px] font-black text-white uppercase tracking-wider mb-2 pb-2 border-b border-slate-800 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                    {partnerGroup.segment}
                  </h4>
                  <ul className="space-y-1.5">
                    {partnerGroup.companies.map((company, companyIdx) => (
                      <li key={companyIdx} className="flex items-center text-xs text-slate-300">
                        <span className="text-orange-400 mr-1.5 font-bold">→</span>
                        {company}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 📸 Lab Gallery */}
        <section id="gallery" className="border-t border-slate-800/80 pt-12 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">Anantapur Center</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">Our Practical Rigs</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {labGallery.map((item, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                <div className="aspect-video w-full bg-slate-950 overflow-hidden relative">
                  <img 
                    src={item.src} 
                    alt={`EV Lab Station ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-slate-900 items-center justify-center p-3 text-center border-b border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">🔧 Station {idx + 1}</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-900/40">
                  <p className="text-[11px] text-slate-300 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 📄 Footer with Clickable Google Maps Address */}
      <footer className="relative z-10 border-t border-slate-850 bg-[#040810] py-6 px-4 text-center space-y-2">
        <p className="text-[10px] text-slate-400">
          © {new Date().getFullYear()} M/S <span className="text-orange-400 font-bold">EV</span>ISIONARY SOLUTIONS INDIA [Regd No: 42 of 2026].
        </p>
        
        {/* Clickable Google Maps Link */}
        <a 
          href="https://maps.google.com/?q=Ramnagar+80ft+Road+Near+Neru+Pragathi+Park+Anantapur" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[10px] text-cyan-400 hover:text-orange-400 transition-colors font-medium max-w-md mx-auto"
        >
          <span>📍 Operational Center: Ramnagar 80ft Road, Near Neru Pragathi Park, Ananthapuramu, AP</span>
          <span className="text-[9px] underline font-bold">(Open in Maps)</span>
        </a>
      </footer>

      {/* 💬 FLOATING WHATSAPP QUICK-CHAT BUTTON */}
      <a 
        href="https://wa.me/917013311533?text=Hi%20E%20Visionary%20Solutions,%20I%20want%20to%20know%20more%20about%20the%20EV%20training%20program." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white p-3.5 rounded-full shadow-2xl shadow-emerald-500/50 flex items-center justify-center transition-all duration-300 group"
        title="Chat with Us on WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}