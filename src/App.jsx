import React, { useState } from 'react';

export default function EnrollmentPortal() {
  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    whatsappNumber: '',
    email: '',
    education: '',
    preferredBatch: '',
    verifiedChecked: false
  });

  // UI States
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 45-Day Syllabus Data
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

  // Grouped Career Tracks
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

  // 📸 Dynamic Lab Gallery Assets Array (Updated to .png)
  const labGallery = [
    { src: "/images/photo1.png", desc: "Full-scale commercial EV heavy vehicle lift bays for hands-on under-chassis fleet troubleshooting." },
    { src: "/images/photo2.png", desc: "Smart interactive digital lab setups for tracking real-time CAN bus telemetry and BMS analytics." },
    { src: "/images/photo3.png", desc: "Deep look into structural suspension steering linkages integrated alongside high-voltage powertrain loops." },
    { src: "/images/photo4.png", desc: "Hands-on calibration of barcode-tracked diagnostic harnesses and automated sensor blocks." },
    { src: "/images/photo5.png", desc: "Mastering drive-axle configurations and high-torque electric motor power interfaces." },
    { src: "/images/photo6.png", desc: "Diagnostic tracking on dual-stage motor control units and high-current shielded power lines." },
    { src: "/images/photo7.png", desc: "Troubleshooting heavy-vehicle pneumatic air systems and auxiliary thermal cooling radiators." },
    { src: "/images/photo8.png", desc: "Exploring complex copper-tubed battery thermal management systems and climate control filtration rigs." },
    { src: "/images/photo9.png", desc: "Wiring and load-testing auxiliary battery systems alongside commercial maxi-fuse distribution panels." },
    { src: "/images/photo10.png", desc: "Mapping advanced high-voltage distribution units (PDUs) across commercial electric bus platforms." }
  ];

  // Form Validation Logic
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* 🟢 Top Navigation Bar */}
      <header className="border-b border-slate-900 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50 px-4 py-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-center sm:text-left">
            <h1 className="text-lg font-black tracking-tight text-white uppercase">
              E VISIONARY SOLUTIONS INDIA
            </h1>
            <span className="text-[10px] text-emerald-400 font-bold tracking-widest block uppercase">
              Regd No. 42 of 2026 • Anantapur, AP
            </span>
          </div>
          <div className="flex gap-4 text-xs font-semibold">
            <a href="#curriculum" className="text-slate-400 hover:text-emerald-400 transition-colors">Course Outline</a>
            <a href="#pathways" className="text-slate-400 hover:text-emerald-400 transition-colors">Careers</a>
            <a href="#gallery" className="text-slate-400 hover:text-emerald-400 transition-colors">Lab Gallery</a>
            <a href="#apply" className="bg-emerald-500 text-slate-950 px-4 py-1.5 rounded-lg hover:bg-emerald-400 transition-all font-black">Register Now</a>
          </div>
        </div>
      </header>

      {/* ⚡ Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-20 space-y-20">
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs text-emerald-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            India's EV Technical Capital Launching in Anantapur
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Power India's EV Future. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Get Certified in 45 Days.
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Hands-on practical training designed for ITI, Diploma, and Engineering students. Step away from traditional textbooks and troubleshoot real battery packs, motor powertrains, and BMS software systems.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-left">
            {[
              { label: "Course Duration", value: "45 Days (Full-Time)" },
              { label: "Lab Location", value: "Anantapur, AP" },
              { label: "Launch Seats", value: "30 Available" },
              { label: "Fee Option", value: "Easy 3-Part Installments" }
            ].map((m, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">{m.label}</span>
                <span className="text-sm font-extrabold text-white mt-1 block">{m.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 📚 Interactive Curriculum Section */}
        <section id="curriculum" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Classroom Setup</span>
              <h3 className="text-2xl font-black text-white mt-1">What You Will Master</h3>
              <p className="text-xs text-slate-400 mt-2">
                Our syllabus is continuously tested to match hiring criteria established by leading Indian OEMs, battery manufacturers, and fleet operators.
              </p>
            </div>

            <div className="space-y-3">
              {syllabusDays.map((phase, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-850 rounded-xl overflow-hidden transition-all">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none hover:bg-slate-900 transition-colors"
                  >
                    <span className="text-xs font-extrabold text-white">{phase.title}</span>
                    <span className="text-emerald-400 text-lg font-bold">
                      {activeAccordion === idx ? '−' : '+'}
                    </span>
                  </button>
                  {activeAccordion === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-900/50">
                      {phase.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 📝 Short Registration Form */}
          <div id="apply" className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-extrabold text-white">Join the Pioneer Batch</h3>
              <p className="text-xs text-slate-400 mt-1">
                Secure your ₹3,000 early admission scholarship token. Only 30 slots available.
              </p>
            </div>

            {isSubmitted ? (
              <div id="success-message" className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-xl text-center space-y-3">
                <div className="h-12 w-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h4 className="text-sm font-extrabold text-white">Registration Submitted Successfully!</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Thank you for registering. Our Technical Director, Dileep, or Center Coordinator, Abhiram, will reach out to you on WhatsApp within 24 hours to schedule your physical lab visit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Full Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter your name as per certificate"
                    className={`w-full bg-slate-950 border ${formErrors.studentName ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-emerald-400'} rounded-lg py-2 px-3 text-xs text-white focus:outline-none`}
                  />
                  {formErrors.studentName && <span className="text-[10px] text-red-500 block mt-1">{formErrors.studentName}</span>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Active WhatsApp Number</label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className={`w-full bg-slate-950 border ${formErrors.whatsappNumber ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-emerald-400'} rounded-lg py-2 px-3 text-xs text-white focus:outline-none`}
                  />
                  {formErrors.whatsappNumber && <span className="text-[10px] text-red-500 block mt-1">{formErrors.whatsappNumber}</span>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className={`w-full bg-slate-950 border ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-emerald-400'} rounded-lg py-2 px-3 text-xs text-white focus:outline-none`}
                  />
                  {formErrors.email && <span className="text-[10px] text-red-500 block mt-1">{formErrors.email}</span>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Educational Background</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-950 border ${formErrors.education ? 'border-red-500' : 'border-slate-800'} rounded-lg py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-400`}
                  >
                    <option value="">Select your qualification</option>
                    <option value="ITI">ITI (Electrical / Mechanical)</option>
                    <option value="Diploma">Diploma (EEE / ME / ECE)</option>
                    <option value="BTech">B.E. / B.Tech Graduate</option>
                    <option value="Other">Other Technical Background</option>
                  </select>
                  {formErrors.education && <span className="text-[10px] text-red-500 block mt-1">{formErrors.education}</span>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Preferred Batch Window</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "morning", label: "Morning (8 AM - 12 PM)" },
                      { value: "afternoon", label: "Afternoon (1 PM - 5 PM)" }
                    ].map((batch) => (
                      <label
                        key={batch.value}
                        className={`border rounded-lg p-2 flex items-center justify-center cursor-pointer text-center transition-all ${
                          formData.preferredBatch === batch.value
                            ? 'border-emerald-400 bg-emerald-500/10 text-emerald-400'
                            : 'border-slate-800 hover:border-slate-700 text-slate-400'
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
                        <span className="text-[10px] font-bold">{batch.label}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.preferredBatch && <span className="text-[10px] text-red-500 block mt-1">{formErrors.preferredBatch}</span>}
                </div>

                <label className="flex items-start gap-2 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="verifiedChecked"
                    checked={formData.verifiedChecked}
                    onChange={handleInputChange}
                    className="mt-1 accent-emerald-500 rounded"
                  />
                  <span className="text-[10px] text-slate-500 leading-tight">
                    I confirm my genuine interest in joining this EV upskilling program in Anantapur and understand that seats are limited to 30 per batch.
                  </span>
                </label>
                {formErrors.verifiedChecked && <span className="text-[10px] text-red-500 block mt-1">{formErrors.verifiedChecked}</span>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-500 text-slate-950 py-3 rounded-lg hover:bg-emerald-400 transition-all text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent rounded-full"></span>
                      Registering Slot...
                    </>
                  ) : (
                    "Secure My Scholarship Slot"
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 📋 Employment Vetting Roadmap Section */}
        <section id="pathways" className="border-t border-slate-900 pt-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Employment Vetting Roadmap</span>
            <h3 className="text-2xl font-black text-white">Careers We Build & Prepare You For</h3>
            <p className="text-xs text-slate-400">
              Our intensive laboratory curriculum maps directly to standard industry positions. We prepare candidates to confidently step into professional roles within major commercial Indian EV ecosystem networks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerTracks.map((track, idx) => (
              <div key={idx} className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider border-b border-slate-900 pb-2">
                  {track.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {track.roles.map((role, roleIdx) => (
                    <span 
                      key={roleIdx} 
                      className="bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-medium px-2.5 py-1 rounded-md shadow-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 📸 🟢 NEW: High-Impact Infrastructure & Diagnostic Lab Gallery Block */}
        <section id="gallery" className="border-t border-slate-900 pt-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Inside the Anantapur Center</span>
            <h3 className="text-2xl font-black text-white">Our Practical Machinery & Rigs</h3>
            <p className="text-xs text-slate-400">
              Take a look inside our heavy vehicle maintenance infrastructure and precision diagnostic stations where you will spend 80% of your training course hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {labGallery.map((item, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-900 rounded-xl overflow-hidden shadow-xl flex flex-col group hover:border-emerald-500/30 transition-all duration-300">
                <div className="aspect-video sm:aspect-square w-full bg-slate-950 overflow-hidden relative">
                  {/* Dynamic image loading overlay */}
                  <img 
                    src={item.src} 
                    alt={`EV Lab Station ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* CSS Diagnostic Placeholder Fallback UI if assets are compiling */}
                  <div className="hidden absolute inset-0 bg-slate-900 items-center justify-center p-4 text-center border-b border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block">🔧 Lab Station {idx + 1}</span>
                  </div>
                </div>
                <div className="p-3.5 flex-grow bg-slate-900/20 backdrop-blur-sm">
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 📄 Footer Section */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center space-y-2">
        <p className="text-[10px] text-slate-500">
          © {new Date().getFullYear()} M/S E VISIONARY SOLUTIONS INDIA. All Rights Reserved. [No: 42 of 2026].
        </p>
        <p className="text-[9px] text-slate-600 max-w-lg mx-auto">
          Operational Center: Anantapur, Andhra Pradesh. All candidate assessments, test scores, and program data are monitored and securely logged to provide vetted manpower solutions to commercial Indian EV manufacturers.
        </p>
      </footer>
    </div>
  );
}