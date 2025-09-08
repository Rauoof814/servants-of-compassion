// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import {
//   Menu, X, ChevronDown, HandHeart,
//   Newspaper, Activity, Users, Globe, Ambulance
// } from "lucide-react";
// import LanguageToggle from "./LanguageToggle";
// import useSite from "../store/useSite";

// export default function Navbar() {
//   const { state } = useSite();

//   const links = [
//     ["/", "Home"],
//     ["/about", "About Us"],
//     ["/mission", "Our Mission"],
//     ["/what-we-do", "What We Do"],
//     ["/events", "Events"],
//     ["/partners", "Partners"],
//     ["/press", "Press"],
//     ["/blog", "Blog"],
//     ["/impact", "Impact"],
//     ["/resources", "Resources"],
//     ["/volunteer", "Volunteer"],
//     ["/contact", "Contact"],
//   ];

//   const [open, setOpen] = React.useState(false);
//   const [mega, setMega] = React.useState(false);
//   const [scrolled, setScrolled] = React.useState(false);
//   const [progress, setProgress] = React.useState(0);

//   React.useEffect(() => {
//     const onScroll = () => {
//       const y = window.scrollY || 0;
//       setScrolled(y > 24);
//       const doc = document.documentElement;
//       const h = doc.scrollHeight - doc.clientHeight;
//       setProgress(h ? (y / h) * 100 : 0);
//       setMega(false); // close megamenu on scroll
//     };
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-[5000] transition-all ${scrolled
//         ? "bg-slate-900/85 backdrop-blur border-b border-white/10 shadow-glass"
//         : "bg-gradient-to-b from-slate-950/80 to-transparent"
//         }`}
//     >
//       {/* scroll progress */}
//       <div
//         className="h-0.5 bg-ukYellow"
//         style={{ width: `${progress}%`, transition: "width .18s linear" }}
//       />

//       <div className="container flex items-center gap-4 py-3">
//         <Link to="/" className="group flex items-center gap-3">
//           <img
//             src={state.brand.logo}
//             className="h-10 w-10 rounded-xl border border-white/20 object-contain group-hover:scale-105 transition"
//           />
//           <div>
//             <div className="text-[11px] uppercase tracking-wide opacity-70">
//               Non-Profit
//             </div>
//             <div className="font-extrabold tracking-tight">
//               {state.brand.name}
//             </div>
//           </div>
//         </Link>

//         {/* primary nav: more spacing + wrap when tight */}
//         <nav className="hidden lg:flex items-center gap-2 ml-6 flex-wrap">
//           {links.map(([to, label]) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 `navlink ${isActive ? "bg-white/15" : ""}`
//               }
//             >
//               {label}
//             </NavLink>
//           ))}

//           {/* MEGA MENU (right-aligned, never off-screen) */}
//           <div
//             className="relative"
//             onMouseEnter={() => setMega(true)}
//             onMouseLeave={() => setMega(false)}
//           >
//             <button className="navlink inline-flex items-center gap-1">
//               Explore <ChevronDown className="w-4 h-4" />
//             </button>
//             {mega && (
//               <div className="absolute right-0 mt-2 w-[min(92vw,760px)] max-h-[80vh] overflow-auto rounded-2xl p-4 bg-slate-900/95 backdrop-blur border border-white/10 shadow-glass z-[5100]">
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   <Mega to="/mission" icon={<Ambulance />} title="Programs">
//                     How ambulances & supplies move.
//                   </Mega>
//                   <Mega to="/impact" icon={<Activity />} title="Impact">
//                     KPI dashboard & vehicle log.
//                   </Mega>
//                   <Mega to="/press" icon={<Newspaper />} title="Press">
//                     Coverage & media kit.
//                   </Mega>
//                   <Mega to="/volunteer" icon={<Users />} title="Volunteer">
//                     Help drive, pack, or host events.
//                   </Mega>
//                   <Mega to="/resources" icon={<Globe />} title="Resources">
//                     One-pagers & downloads.
//                   </Mega>
//                   <Mega to="/donate" icon={<HandHeart />} title="Donate">
//                     Give via Givebutter or PayPal.
//                   </Mega>
//                 </div>
//               </div>
//             )}
//           </div>
//         </nav>

//         <div className="flex-1" />

//         <div className="hidden md:flex items-center gap-2">
//           <LanguageToggle />
//           <Link to="/donate" className="btn btn-yellow ml-1">
//             <HandHeart className="w-4 h-4" />
//             Donate
//           </Link>
//         </div>

//         {/* mobile trigger */}
//         <button className="lg:hidden btn" onClick={() => setOpen(true)}>
//           <Menu className="w-5 h-5" />
//         </button>
//       </div>

//       {/* MOBILE SHEET */}
//       {open && (
//         <div className="fixed inset-0 z-[5200] bg-slate-950/70 backdrop-blur-sm">
//           <div className="absolute inset-y-0 right-0 w-[86%] sm:w-[400px] bg-slate-900 border-l border-white/10 p-5 overflow-y-auto">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <img
//                   src={state.brand.logo}
//                   className="h-9 w-9 rounded-lg border border-white/20"
//                 />
//                 <div className="font-bold">{state.brand.name}</div>
//               </div>
//               <button className="btn" onClick={() => setOpen(false)}>
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="mt-5 grid gap-1">
//               {links.concat([["/donate", "Donate"]]).map(([to, label]) => (
//                 <NavLink
//                   key={to}
//                   to={to}
//                   onClick={() => setOpen(false)}
//                   className="px-3 py-2 rounded-xl hover:bg-white/10"
//                 >
//                   {label}
//                 </NavLink>
//               ))}
//             </div>
//             <div className="mt-5">
//               <LanguageToggle />
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// function Mega({ to, icon, title, children }) {
//   return (
//     <Link
//       to={to}
//       className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 p-4 transition grid gap-1"
//     >
//       <div className="flex items-center gap-2">
//         <span className="p-2 rounded-lg bg-white/10">{icon}</span>
//         <div className="font-semibold">{title}</div>
//       </div>
//       <div className="text-sm opacity-80">{children}</div>
//     </Link>
//   );
// }


// // This is the deepseek beatiful code
// // import React, { useState, useEffect } from "react";
// // import { Link, NavLink, useLocation } from "react-router-dom";
// // import {
// //   Menu, X, ChevronDown, HandHeart,
// //   Newspaper, Activity, Users, Globe, Ambulance, Phone, Mail
// // } from "lucide-react";
// // import LanguageToggle from "./LanguageToggle";
// // import useSite from "../store/useSite";

// // export default function Navbar() {
// //   const { state } = useSite();
// //   const location = useLocation();

// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [activeDropdown, setActiveDropdown] = useState(null);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setIsScrolled(window.scrollY > 50);
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   useEffect(() => {
// //     setIsOpen(false);
// //     setActiveDropdown(null);
// //   }, [location]);

// //   const navItems = [
// //     { path: "/", label: "Home" },
// //     {
// //       path: "/about",
// //       label: "About Us",
// //       dropdown: [
// //         { path: "/mission", label: "Our Mission", icon: <Target className="w-4 h-4" /> },
// //         { path: "/what-we-do", label: "What We Do", icon: <Activity className="w-4 h-4" /> },
// //         { path: "/team", label: "Our Team", icon: <Users className="w-4 h-4" /> }
// //       ]
// //     },
// //     { path: "/impact", label: "Impact" },
// //     { path: "/events", label: "Events" },
// //     {
// //       path: "/get-involved",
// //       label: "Get Involved",
// //       dropdown: [
// //         { path: "/donate", label: "Donate", icon: <HandHeart className="w-4 h-4" /> },
// //         { path: "/volunteer", label: "Volunteer", icon: <Users className="w-4 h-4" /> },
// //         { path: "/partners", label: "Partners", icon: <Globe className="w-4 h-4" /> }
// //       ]
// //     },
// //     { path: "/stories", label: "Stories" },
// //     { path: "/resources", label: "Resources" },
// //     { path: "/contact", label: "Contact" }
// //   ];

// //   return (
// //     <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
// //         ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/10"
// //         : "bg-transparent"
// //       }`}>
// //       <div className="container">
// //         <div className="flex items-center justify-between h-20">
// //           {/* Logo */}
// //           <Link
// //             to="/"
// //             className="flex items-center space-x-3 group"
// //             onMouseEnter={() => setActiveDropdown(null)}
// //           >
// //             <div className="w-12 h-12 bg-gradient-to-br from-ukBlue to-ukYellow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
// //               <span className="text-white font-bold text-lg">SOC</span>
// //             </div>
// //             <div className="hidden sm:block">
// //               <div className="text-sm text-white/70 uppercase tracking-wide">Servants of</div>
// //               <div className="font-bold text-white text-xl">Compassion</div>
// //             </div>
// //           </Link>

// //           {/* Desktop Navigation */}
// //           <nav className="hidden lg:flex items-center space-x-1">
// //             {navItems.map((item) => (
// //               <div
// //                 key={item.path}
// //                 className="relative"
// //                 onMouseEnter={() => item.dropdown && setActiveDropdown(item.path)}
// //                 onMouseLeave={() => setActiveDropdown(null)}
// //               >
// //                 {item.dropdown ? (
// //                   <>
// //                     <button className="navlink flex items-center space-x-1 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all">
// //                       <span>{item.label}</span>
// //                       <ChevronDown className="w-4 h-4 transition-transform" />
// //                     </button>

// //                     {activeDropdown === item.path && (
// //                       <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl py-2 z-50">
// //                         {item.dropdown.map((dropdownItem) => (
// //                           <Link
// //                             key={dropdownItem.path}
// //                             to={dropdownItem.path}
// //                             className="flex items-center space-x-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all"
// //                           >
// //                             {dropdownItem.icon}
// //                             <span>{dropdownItem.label}</span>
// //                           </Link>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </>
// //                 ) : (
// //                   <NavLink
// //                     to={item.path}
// //                     className={({ isActive }) =>
// //                       `navlink px-4 py-2 rounded-xl transition-all ${isActive
// //                         ? "text-ukYellow bg-white/10"
// //                         : "text-white/90 hover:text-white hover:bg-white/10"
// //                       }`
// //                     }
// //                   >
// //                     {item.label}
// //                   </NavLink>
// //                 )}
// //               </div>
// //             ))}
// //           </nav>

// //           {/* Right side actions */}
// //           <div className="flex items-center space-x-4">
// //             <LanguageToggle />

// //             <div className="hidden md:flex items-center space-x-3">
// //               <a
// //                 href={`tel:${state.brand.phone}`}
// //                 className="p-2 text-white/70 hover:text-ukYellow transition-colors"
// //                 aria-label="Call us"
// //               >
// //                 <Phone className="w-5 h-5" />
// //               </a>
// //               <a
// //                 href={`mailto:${state.brand.email}`}
// //                 className="p-2 text-white/70 hover:text-ukYellow transition-colors"
// //                 aria-label="Email us"
// //               >
// //                 <Mail className="w-5 h-5" />
// //               </a>
// //             </div>

// //             <Link
// //               to="/donate"
// //               className="btn btn-yellow hidden md:flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
// //             >
// //               <HandHeart className="w-5 h-5" />
// //               <span>Donate</span>
// //             </Link>

// //             {/* Mobile menu button */}
// //             <button
// //               onClick={() => setIsOpen(!isOpen)}
// //               className="lg:hidden p-2 text-white/90 hover:text-white transition-colors"
// //               aria-label="Toggle menu"
// //             >
// //               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile menu */}
// //       {isOpen && (
// //         <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-md">
// //           <div className="container pt-24 pb-8 h-full overflow-y-auto">
// //             <div className="flex flex-col space-y-6">
// //               {navItems.map((item) => (
// //                 <div key={item.path}>
// //                   {item.dropdown ? (
// //                     <div>
// //                       <button
// //                         onClick={() => setActiveDropdown(
// //                           activeDropdown === item.path ? null : item.path
// //                         )}
// //                         className="flex items-center justify-between w-full py-3 text-white/90 hover:text-white text-lg font-semibold"
// //                       >
// //                         <span>{item.label}</span>
// //                         <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === item.path ? "rotate-180" : ""
// //                           }`} />
// //                       </button>
// //                       {activeDropdown === item.path && (
// //                         <div className="pl-6 mt-2 space-y-4">
// //                           {item.dropdown.map((dropdownItem) => (
// //                             <Link
// //                               key={dropdownItem.path}
// //                               to={dropdownItem.path}
// //                               className="block py-2 text-white/70 hover:text-white transition-colors"
// //                               onClick={() => setIsOpen(false)}
// //                             >
// //                               {dropdownItem.label}
// //                             </Link>
// //                           ))}
// //                         </div>
// //                       )}
// //                     </div>
// //                   ) : (
// //                     <Link
// //                       to={item.path}
// //                       className="block py-3 text-white/90 hover:text-white text-lg font-semibold transition-colors"
// //                       onClick={() => setIsOpen(false)}
// //                     >
// //                       {item.label}
// //                     </Link>
// //                   )}
// //                 </div>
// //               ))}

// //               <div className="pt-8 border-t border-white/10">
// //                 <Link
// //                   to="/donate"
// //                   className="btn btn-yellow w-full justify-center py-4 text-lg font-semibold"
// //                   onClick={() => setIsOpen(false)}
// //                 >
// //                   <HandHeart className="w-6 h-6 mr-2" />
// //                   Donate Now
// //                 </Link>
// //               </div>

// //               <div className="flex justify-center space-x-6 pt-6">
// //                 <a
// //                   href={`tel:${state.brand.phone}`}
// //                   className="p-3 bg-white/10 rounded-xl text-white hover:text-ukYellow transition-colors"
// //                   aria-label="Call us"
// //                 >
// //                   <Phone className="w-6 h-6" />
// //                 </a>
// //                 <a
// //                   href={`mailto:${state.brand.email}`}
// //                   className="p-3 bg-white/10 rounded-xl text-white hover:text-ukYellow transition-colors"
// //                   aria-label="Email us"
// //                 >
// //                   <Mail className="w-6 h-6" />
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </header>
// //   );
// // }



import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, HandHeart, Newspaper, Activity, Users, Globe, Ambulance } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import useSite from "../store/useSite";

export default function Navbar() {
  const { state } = useSite();
  const logo = state?.brand?.logo || "/logo.png"; // fallback if DB is empty

  const links = [
    ["/", "Home"],
    ["/about", "About Us"],
    ["/mission", "Our Mission"],
    ["/what-we-do", "What We Do"],
    ["/events", "Events"],
    ["/partners", "Partners"],
    ["/press", "Press"],
    ["/blog", "Blog"],
    ["/impact", "Impact"],
    ["/resources", "Resources"],
    ["/volunteer", "Volunteer"],
    ["/contact", "Contact"],
  ];

  const [open, setOpen] = React.useState(false);
  const [mega, setMega] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 24);
      const doc = document.documentElement;
      const h = doc.scrollHeight - doc.clientHeight;
      setProgress(h ? (y / h) * 100 : 0);
      setMega(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[5000] transition-all ${scrolled ? "bg-slate-900/85 backdrop-blur border-b border-white/10 shadow-glass"
        : "bg-gradient-to-b from-slate-950/80 to-transparent"
      }`}>
      <div className="h-0.5 bg-ukYellow" style={{ width: `${progress}%`, transition: "width .18s linear" }} />

      <div className="container flex items-center gap-4 py-3">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-10 rounded-xl border border-white/20 object-contain group-hover:scale-105 transition"
            onError={(e) => { e.currentTarget.src = "/logo.png"; }}
          />
          <div>
            <div className="text-[11px] uppercase tracking-wide opacity-70">Non-Profit</div>
            <div className="font-extrabold tracking-tight">{state?.brand?.name || "Servants of Compassion"}</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-2 ml-6 flex-wrap">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `navlink ${isActive ? "bg-white/15" : ""}`}>
              {label}
            </NavLink>
          ))}

          <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button className="navlink inline-flex items-center gap-1">
              Explore <ChevronDown className="w-4 h-4" />
            </button>
            {mega && (
              <div className="absolute right-0 mt-2 w-[min(92vw,760px)] max-h-[80vh] overflow-auto rounded-2xl p-4 bg-slate-900/95 backdrop-blur border border-white/10 shadow-glass z-[5100]">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Mega to="/mission" icon={<Ambulance />} title="Programs">How ambulances & supplies move.</Mega>
                  <Mega to="/impact" icon={<Activity />} title="Impact">KPI dashboard & vehicle log.</Mega>
                  <Mega to="/press" icon={<Newspaper />} title="Press">Coverage & media kit.</Mega>
                  <Mega to="/volunteer" icon={<Users />} title="Volunteer">Help drive, pack, or host events.</Mega>
                  <Mega to="/resources" icon={<Globe />} title="Resources">One-pagers & downloads.</Mega>
                  <Mega to="/donate" icon={<HandHeart />} title="Donate">Give via Givebutter or PayPal.</Mega>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />
          <Link to="/donate" className="btn btn-yellow ml-1">
            <HandHeart className="w-4 h-4" /> Donate
          </Link>
        </div>

        <button className="lg:hidden btn" onClick={() => setOpen(true)}><Menu className="w-5 h-5" /></button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[5200] bg-slate-950/70 backdrop-blur-sm">
          <div className="absolute inset-y-0 right-0 w-[86%] sm:w-[400px] bg-slate-900 border-l border-white/10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logo} alt="logo" className="h-9 w-9 rounded-lg border border-white/20"
                  onError={(e) => { e.currentTarget.src = "/logo.png"; }} />
                <div className="font-bold">{state?.brand?.name || "Servants of Compassion"}</div>
              </div>
              <button className="btn" onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="mt-5 grid gap-1">
              {links.concat([["/donate", "Donate"]]).map(([to, label]) => (
                <NavLink key={to} to={to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl hover:bg-white/10">
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="mt-5"><LanguageToggle /></div>
          </div>
        </div>
      )}
    </header>
  );
}

function Mega({ to, icon, title, children }) {
  return (
    <Link to={to} className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 p-4 transition grid gap-1">
      <div className="flex items-center gap-2">
        <span className="p-2 rounded-lg bg-white/10">{icon}</span>
        <div className="font-semibold">{title}</div>
      </div>
      <div className="text-sm opacity-80">{children}</div>
    </Link>
  );
}
