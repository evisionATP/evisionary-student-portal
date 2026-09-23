import React, { useState, useEffect } from 'react';
import AboutUs from './components/AboutUs';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const [formData, setFormData] = useState({
    studentName: '',
    whatsappNumber: '',
    email: '',
    education: '',
    preferredMode: 'offline',
    preferredBatch: '',
    verifiedChecked: false
  });

  const [activeAccordion, setActiveAccordion] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 🎯 Initialize Meta Pixel on Page Load
  useEffect(() => {
    if (!window.fbq) {
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
      );

      window.fbq('init', '29616716044585384');
    }
    window.fbq('track', 'PageView');
  }, []);

  const curriculumModules = [
    {
      moduleNumber: "Module 01",
      title: "EV Architecture, Vehicle Dynamics & MATLAB/Simulink Sizing",
      tools: "MATLAB, Simulink, Powertrain Blockset",
      badge: "Software & Sizing",
      description: "Mathematical modeling of EV dynamics, tractive effort equations, component sizing, and drive-cycle simulations.",
      topics: [
        "EV Fundamentals & Vehicle Dynamics: Governing mechanical equations, roll resistance, aerodynamic drag, and gradeability calculations.",
        "Component Sizing: Sizing battery packs (kWh), traction inverters, DC-DC buck/boost converters, and onboard chargers (OBC).",
        "MATLAB & Simulink Simulation: Simulating drive cycles (WLTP, FTP75, Indian Drive Cycle), motor load curves, and efficiency maps.",
        "High-voltage vehicle harness routing, contactor sequencing, and auxiliary 12V DC-DC system simulation."
      ]
    },
    {
      moduleNumber: "Module 02",
      title: "Advanced Battery Technology, Pack Engineering & Active BMS Diagnostics",
      tools: "MATLAB Simscape, Active BMS Hardware Rigs, Thermal Loggers",
      badge: "Cell to Pack Hardware",
      description: "Deep dive into Lithium-ion chemistries, thermal runaway prevention, CAN bus battery logging, and physical pack assembly.",
      topics: [
        "Chemistries: LFP (Lithium Iron Phosphate), NMC, NCA, and next-generation Solid-State battery cells.",
        "Pack Engineering: Module architecture, busbar welding standards, pre-charge resistor sizing, and safety interlocks.",
        "Battery Thermal Management Systems (BTMS): Phase-change materials, liquid cooling jacket loops, and thermal runaway containment.",
        "BMS Diagnostics & Protocols: Real-time SoC/SoH estimation, active vs. passive cell balancing, CCCV charging curves, and CAN bus telemetry."
      ]
    },
    {
      moduleNumber: "Module 03",
      title: "Electric Traction Motors, Vector Control (FOC/DTC) & Power Inverters",
      tools: "Vector Control Rigs, PMSM Simulation benches, Power Analyzers",
      badge: "Powertrain Core",
      description: "Mastering Permanent Magnet Synchronous Motors (PMSM), Induction Motors, and field-oriented inverter controller tuning.",
      topics: [
        "Traction Topology: Design and operation of BLDC, PMSM, and PMaSynRM (Outer Rotor High Torque) traction systems.",
        "Vector Control & Inverter Tuning: Direct Torque Control (DTC) and Field-Oriented Control (FOC) using rotor angle sensors (Resolvers/Encoders).",
        "Regenerative Braking Systems: Braking energy recapture algorithms, converter phase-current tracking, and MOSFET/IGBT gate driver loops.",
        "Failure Diagnostics: Resolving motor stator phase faults, controller over-temperature alarms, and OEM benchmark teardowns (Toyota Prius / MG EV)."
      ]
    },
    {
      moduleNumber: "Module 04",
      title: "Heavy Mechanical Workshop: Turbo Engines, Transmissions & Axles",
      tools: "Industrial Engine Benches, Hydraulic Press, Torque Calibrators",
      badge: "Heavy Mechanical Core",
      description: "Complete hands-on overhaul and structural calibration of heavy-duty mechanical automotive subsystems.",
      topics: [
        "Turbocharged Engine Assembly: Turbocharger vane inspection, intercooler efficiency loops, cylinder head torquing, and oil feed line servicing.",
        "Gearbox & Transmission Systems: Multi-speed manual/automatic reduction gearboxes, sync-ring replacement, and planetary gear sets.",
        "Axle Assemblies: Front steering knuckle geometry, kingpins, rear live drive axles, differential carrier gear backlash, and crown-pinion setup.",
        "Heavy Chassis Suspension & Brakes: Air-brake pneumatic circuitry, steering linkages, hub bearing press-fitting, and load dynamics."
      ]
    },
    {
      moduleNumber: "Module 05",
      title: "Autonomous Driving Systems (ADAS), Perception & Computer Vision",
      tools: "Python, OpenCV, CARLA Simulator, ROS (Robot Operating System)",
      badge: "Autonomous Systems",
      description: "Build ADAS algorithms and test autonomy sensor stacks on physical vision rigs and simulation testbeds.",
      topics: [
        "ADAS Architectures: SAE Autonomy Levels (Level 1 to Level 5) and sensor suite integration (Cameras, Radar, LiDAR, Ultrasonic).",
        "Computer Vision with Python & OpenCV: Edge detection (Canny), Hough line lane-detection transforms, and stereo depth estimation.",
        "ADAS Safety Features: Implementation of Automatic Emergency Braking (AEB), Forward Collision Warning (FCW), Blind Spot Detection, and Lane Keep Assist.",
        "Hardware-in-the-Loop Simulation: Running CARLA autonomous test tracks and sensor fusion algorithms using Artificial Neural Networks (ANN/CNN)."
      ]
    },
    {
      moduleNumber: "Module 06",
      title: "Connected Vehicles (V2X), Automotive Embedded Systems & HIL Testing",
      tools: "STM32CubeIDE, FreeRTOS, PeakCAN, CANoe, Wireshark, dSPACE",
      badge: "Embedded & IoT",
      description: "Automotive ECU firmware development, real-time operating systems, vehicle networking, and cyber resilience.",
      topics: [
        "Automotive Embedded Architectures: Microcontrollers (STM32, ARM Cortex-M), timers, ADC, interrupt handling, and RTOS task scheduling.",
        "Connected Car & V2X: Vehicle-to-Vehicle (V2V), Vehicle-to-Infrastructure (V2I), IoT telematics gateways, GPS tracking, and Fastag protocols.",
        "Automotive Protocols & HIL: CAN, LIN, Ethernet, and dSPACE / CANoe hardware-in-the-loop diagnostic logging.",
        "Automotive Cybersecurity: Secure bootloaders, CAN injection attack mitigation, SSL/TLS vehicular communication, and penetration testing."
      ]
    },
    {
      moduleNumber: "Module 07",
      title: "Applied AI & Machine Learning in Automotive Systems",
      tools: "TensorFlow, Scikit-Learn, Edge-AI Accelerator Kits",
      badge: "Industrial AI",
      description: "Deploy machine learning for real-time battery degradation alerts, vehicle predictive maintenance, and conversational cabin AI.",
      topics: [
        "Predictive Maintenance: ML algorithms analyzing sensor telemetry to forecast motor bearing wear, brake pad life, and battery thermal health.",
        "EV Energy Optimization: AI-driven range prediction taking into account topology, driver habits, climate control, and route conditions.",
        "Cabin AI: Natural Language Processing (NLP) voice assistants, driver drowsiness detection cameras, and cabin personalization.",
        "Manufacturing AI: Robotic vision inspection for automated weld-joint defect detection and intelligent factory supply-chain scheduling."
      ]
    },
    {
      moduleNumber: "Module 08",
      title: "Final-Year B.Tech & Diploma Academic Capstone & Custom Prototyping Hub",
      tools: "3D CAD, Custom CNC, PCB Fabrication, Dyno Test Bench",
      badge: "Major / Minor Project & Patenting",
      description: "End-to-end prototype development for academic submissions, national competitions, and commercial startup patents.",
      topics: [
        "Custom EV Conversions: Converting standard 2-wheelers or custom chassis to high-efficiency PMSM electric drive systems.",
        "Smart BMS & Telematics Prototypes: Custom PCB layout design, IoT cloud-connected tracking, and lithium pack fabrication from scratch.",
        "Autonomous Mobile Robots (AMRs): Camera/LiDAR driven delivery bots, obstacle-avoiding rovers, and sensor fusion demonstration rigs.",
        "Full Documentation Support: Complete circuit schematics, CAD designs, simulation source code, project synopsis, IEEE-format reports, and viva preparation."
      ]
    }
  ];

  const careerTracks = [
    {
      category: "Engineering & R&D Leadership",
      roles: ["EV Powertrain Engineer", "BMS Calibration Engineer", "ADAS Software Developer", "Embedded Firmware Engineer", "Vehicle Dynamics Specialist"]
    },
    {
      category: "Heavy Mechanical & Workshop Operations",
      roles: ["Turbo Engine Specialist", "Transmission & Gearbox Technician", "Differential & Axle Overhaul Lead", "Chassis & Suspension Inspector", "Senior Automotive Electrician"]
    },
    {
      category: "Academic & Prototyping R&D",
      roles: ["Prototype Build Specialist", "Testing & Calibration Trainee", "Robotics & IoT Integrator", "Fleet Maintenance Supervisor"]
    }
  ];

  const hiringPartners = [
    {
      segment: "Commercial EV OEMs & Manufacturers",
      companies: ["Olectra Greentech", "JBM Auto", "Tata Motors Commercial", "Switch Mobility (Ashok Leyland)", "Euler Motors", "Altigreen"]
    },
    {
      segment: "EV Fleet Operators & Mobility Networks",
      companies: ["BluSmart Mobility", "MoEVing Cargo", "Zypp Electric", "Lithium Urban Technologies"]
    },
    {
      segment: "Battery & Heavy Mechanical Engineering",
      companies: ["Amara Raja Energy & Mobility", "Exide Energy", "Bosch India", "Lohum Cleantech", "Log9 Materials"]
    }
  ];

  const labGallery = [
    { src: "/images/photo1.png", desc: "Full-scale commercial vehicle hydraulic lift bays for heavy under-chassis, transmission, and axle overhauls." },
    { src: "/images/photo2.png", desc: "Interactive digital lab stations running MATLAB/Simulink dynamics and live CAN bus bus-monitoring software." },
    { src: "/images/photo3.png", desc: "Mechanical steering linkages, differential gearboxes, and suspension components alongside high-voltage powertrains." },
    { src: "/images/photo4.png", desc: "Custom prototype workbench equipped for battery pack fabrication, spot welding, and BMS firmware flashing." },
    { src: "/images/photo5.png", desc: "Live dyno rigs for testing high-torque PMSM and BLDC traction motors under variable road resistance loads." },
    { src: "/images/photo6.png", desc: "Automotive embedded testing setups utilizing STM32 microcontrollers, CANalyzers, and sensor suites." },
    { src: "/images/photo7.png", desc: "Turbocharged IC engine test stand for studying intake boost pressure, intercoolers, and auxiliary cooling loops." },
    { src: "/images/photo8.png", desc: "High-voltage battery thermal management modules with multi-channel temperature data loggers." },
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
        course: `EV & Mechanical Specialist Program (${formData.preferredMode.toUpperCase()} - ${formData.preferredBatch.toUpperCase()})`,
        experience: formData.education
      };

      try {
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx9SUpoC4SfqaLnkcz_SsBCYrM4185hkJLrHCLc2aYS3dnlyokhbrH4s0RpLjP_DM4LNQ/exec";

        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });

        setIsSubmitted(true);

        // 🎯 Track Successful Lead in Meta Ads
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', {
            content_name: 'Pioneer Batch Seat Reservation',
            value: 20000,
            currency: 'INR'
          });
        }
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

      {/* 🟢 FIXED Top Navigation */}
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
              Reserve Seat
            </a>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 pt-0.5 text-[11px] sm:text-xs font-semibold scrollbar-none border-t border-slate-800/40">
            <button 
              onClick={() => setCurrentView('about')} 
              className="text-orange-400 font-extrabold bg-orange-500/10 border border-orange-500/30 px-2.5 py-0.5 rounded-md flex-shrink-0"
            >
              About Us
            </button>
            <a href="#curriculum" className="text-slate-300 hover:text-orange-400 px-2 py-0.5 flex-shrink-0">Curriculum (8 Modules)</a>
            <a href="#prototyping" className="text-cyan-400 hover:text-cyan-300 px-2 py-0.5 flex-shrink-0 font-bold">Academic Projects</a>
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/15 via-amber-500/15 to-cyan-500/15 border border-orange-500/40 px-3.5 py-1.5 rounded-full text-xs text-white font-semibold shadow-inner">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>EV Powertrains • Turbo Engines • Axles • ADAS & AI</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Advanced EV & Mechanical Systems. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400">
              Get Certified and Placed in 60 Days.
            </span>
          </h2>
          
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed px-2">
            Step away from ordinary theory. Master active cell balancing, MATLAB dynamic simulations, BMS diagnostics, and autonomous ADAS algorithms alongside full hands-on teardowns of turbocharged engines, manual/auto gearboxes, and heavy drive axles.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-4 text-left">
            {[
              { label: "Learning Mode", value: "Offline Lab & Online Live" },
              { label: "Pioneer Launch Batch", value: "₹20,000/- Only" },
              { label: "Academic Projects", value: "B.Tech & Diploma Ready" },
              { label: "Limited Seats", value: "First 30 Registrations" }
            ].map((m, idx) => (
              <div key={idx} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg">
                <span className="text-[9px] sm:text-[10px] text-orange-400 uppercase font-bold tracking-wider block">{m.label}</span>
                <span className="text-xs sm:text-sm font-extrabold text-white mt-0.5 block">{m.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 📚 Comprehensive Curriculum Section */}
        <section id="curriculum" className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">Industry-Standard Blueprint</span>
            <h3 className="text-xl sm:text-3xl font-black text-white">Comprehensive 8-Module Syllabus</h3>
            <p className="text-xs text-slate-300">
              Covering everything from battery chemistry and motor vector control to heavy mechanical assemblies and vehicle AI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Accordion Column */}
            <div className="lg:col-span-7 space-y-3">
              {curriculumModules.map((mod, idx) => (
                <div key={idx} className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-200">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 flex justify-between items-center focus:outline-none"
                  >
                    <div className="space-y-1 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">{mod.moduleNumber}</span>
                        <span className="text-[9px] uppercase font-semibold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{mod.badge}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-white leading-snug">{mod.title}</h4>
                    </div>
                    <span className="text-orange-400 text-lg font-black flex-shrink-0">
                      {activeAccordion === idx ? '−' : '+'}
                    </span>
                  </button>

                  {activeAccordion === idx && (
                    <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 space-y-3">
                      <p className="text-[11px] text-slate-400 italic">{mod.description}</p>
                      
                      <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="text-[10px] text-orange-400 uppercase font-black tracking-wider block mb-0.5">Software & Diagnostic Tools:</span>
                        <span className="text-[11px] font-mono text-cyan-300">{mod.tools}</span>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[10px] text-slate-300 uppercase font-bold tracking-wider block">Hands-On Scope & Lab Exercises:</span>
                        <ul className="space-y-1.5">
                          {mod.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start text-[11px] text-slate-300">
                              <span className="text-orange-400 mr-2 font-bold">⚡</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Registration Form Column */}
            <div id="apply" className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md border border-orange-500/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-4 shadow-2xl relative lg:sticky lg:top-24">
              <div>
                <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest">Pioneer Enrollment</span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">Join the Pioneer Batch</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Reserve your seat for the upcoming batch in Anantapur or Live Online.
                </p>
              </div>

              {/* 🏷️ Special Pricing Promo Card */}
              <div className="bg-gradient-to-r from-orange-500/20 via-amber-500/10 to-emerald-500/20 border border-orange-500/40 rounded-xl p-3.5 text-center space-y-1 shadow-lg">
                <span className="text-[10px] font-black uppercase text-orange-400 tracking-wider block">
                  🔥 Inaugural Pioneer Batch Offer
                </span>
                <div className="flex items-center justify-center gap-2 pt-0.5">
                  <span className="text-sm sm:text-base text-slate-400 line-through font-bold decoration-red-500 decoration-2">
                    ₹40,000/-
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
                    ₹20,000/-
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-black px-2 py-0.5 rounded-md uppercase">
                    50% OFF
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 font-medium">
                  Flat 50% waiver applied for the first 30 students only.
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
                  <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-left space-y-1.5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 block">Next Steps:</span>
                    <p className="text-[10px] sm:text-[11px] text-slate-300 leading-normal">
                      • Coordinators will contact your WhatsApp within 24 hours.<br />
                      • Direct Email: <a href="mailto:admissions@evisionarysolutionsindia.com" className="text-orange-400 font-bold underline">admissions@evisionarysolutionsindia.com</a>
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3 relative z-10">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">Full Student Name</label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full bg-slate-950/90 border ${formErrors.studentName ? 'border-red-500' : 'border-slate-800'} rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500`}
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
                      className={`w-full bg-slate-950/90 border ${formErrors.whatsappNumber ? 'border-red-500' : 'border-slate-800'} rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500`}
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
                      className={`w-full bg-slate-950/90 border ${formErrors.email ? 'border-red-500' : 'border-slate-800'} rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500`}
                    />
                    {formErrors.email && <span className="text-[10px] text-red-400 block mt-1">{formErrors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">Academic Status / Goal</label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-950/90 border ${formErrors.education ? 'border-red-500' : 'border-slate-800'} rounded-xl py-2.5 px-3 text-xs text-slate-200 focus:outline-none focus:border-orange-500`}
                    >
                      <option value="">Select qualification</option>
                      <option value="BTech-FinalYear">B.Tech Final Year (Seeking Project / Placement)</option>
                      <option value="Diploma-FinalYear">Diploma Final Year (Seeking Project / Placement)</option>
                      <option value="BTech-Grad">B.E. / B.Tech Graduate (Mech, EEE, ECE)</option>
                      <option value="Diploma-Grad">Diploma Graduate (Auto / EEE / Mech)</option>
                      <option value="ITI">ITI (Electrical / Mechanic / Fitter)</option>
                      <option value="Professional">Working Automotive / Mechanical Technician</option>
                    </select>
                    {formErrors.education && <span className="text-[10px] text-red-400 block mt-1">{formErrors.education}</span>}
                  </div>

                  {/* Mode Selector */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">Preferred Training Mode</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "offline", label: "Offline (Anantapur Lab)" },
                        { value: "online", label: "Live Online Classes" }
                      ].map((mode) => (
                        <label
                          key={mode.value}
                          className={`border rounded-xl p-2 flex items-center justify-center cursor-pointer text-center transition-all ${
                            formData.preferredMode === mode.value
                              ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 font-bold'
                              : 'border-slate-800 text-slate-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredMode"
                            value={mode.value}
                            checked={formData.preferredMode === mode.value}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <span className="text-[10px]">{mode.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">Batch Schedule</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "morning", label: "Morning (8 AM - 12 PM)" },
                        { value: "afternoon", label: "Afternoon (1 PM - 5 PM)" }
                      ].map((batch) => (
                        <label
                          key={batch.value}
                          className={`border rounded-xl p-2 flex items-center justify-center cursor-pointer text-center transition-all ${
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
                      I confirm my enrollment interest for ₹20,000/- (Pioneer Batch).
                    </span>
                  </label>
                  {formErrors.verifiedChecked && <span className="text-[10px] text-red-400 block mt-1">{formErrors.verifiedChecked}</span>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-5 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-slate-950 font-black rounded-xl shadow-lg uppercase text-xs cursor-pointer min-h-[42px]"
                  >
                    {isLoading ? "Reserving Slot..." : "Reserve My Seat @ ₹20,000/-"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 🎓 DEDICATED PROTOTYPING & FINAL YEAR PROJECTS SECTION */}
        <section id="prototyping" className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-black uppercase text-cyan-400 tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              For Engineering & Diploma Final-Year Students
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Academic Projects & Custom Hardware Prototyping
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              We guide B.Tech and Diploma students from concept to fully functioning physical hardware prototypes—delivering IEEE-compliant documentation, working simulation files, and hands-on lab fabrication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="h-10 w-10 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 font-black text-lg">
                01
              </div>
              <h4 className="text-sm font-bold text-white">Custom Prototype Fabrication</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build real working projects: Retrofit EV conversions, custom active BMS boards, IoT CAN telemetry trackers, solar-assisted fast charging rigs, and autonomous robot testbeds.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="h-10 w-10 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center justify-center text-orange-400 font-black text-lg">
                02
              </div>
              <h4 className="text-sm font-bold text-white">Mechanical & Powertrain Rigs</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hands-on project work on turbocharged IC engines, regenerative dyno testing, planetary gear reduction boxes, and custom differential axle mechanisms.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 font-black text-lg">
                03
              </div>
              <h4 className="text-sm font-bold text-white">Complete Thesis & Viva Preparation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive complete project reports, circuit schematics, MATLAB / Simulink simulation models, Python computer vision codes, and 1-on-1 external viva guidance.
              </p>
            </div>
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
            <h3 className="text-xl sm:text-2xl font-black text-white">Our Practical Rigs & Heavy Testing Bays</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {labGallery.map((item, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                <div className="aspect-video w-full bg-slate-950 overflow-hidden relative">
                  <img 
                    src={item.src} 
                    alt={`Lab Station ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-slate-900 items-center justify-center p-3 text-center border-b border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">🔧 Rig {idx + 1}</span>
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

      {/* 📄 Footer */}
      <footer className="relative z-10 border-t border-slate-850 bg-[#040810] py-6 px-4 text-center space-y-2">
        <p className="text-[10px] text-slate-400">
          © {new Date().getFullYear()} M/S <span className="text-orange-400 font-bold">EV</span>ISIONARY SOLUTIONS INDIA [Regd No: 42 of 2026].
        </p>
        
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

      {/* 💬 FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/917899474996?text=Hi%20EVisionary%20Solutions,%20I%20want%20to%20reserve%20a%20seat%20for%20the%20first%20batch%20at%2020,000/-" 
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