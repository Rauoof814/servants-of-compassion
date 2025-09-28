import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu, X, ChevronDown, HandHeart,
  Newspaper, Activity, Users, Globe, Ambulance
} from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import useSite from "../store/useSite";

export default function Navbar() {
  const { state } = useSite();

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
      setMega(false); // close megamenu on scroll
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[5000] transition-all ${scrolled
        ? "bg-slate-900/85 backdrop-blur border-b border-white/10 shadow-glass"
        : "bg-gradient-to-b from-slate-950/80 to-transparent"
        }`}
    >
      {/* scroll progress */}
      <div
        className="h-0.5 bg-ukYellow"
        style={{ width: `${progress}%`, transition: "width .18s linear" }}
      />

      <div className="container flex items-center gap-4 py-3">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={state.brand.logo}
            className="h-10 w-10 rounded-xl border border-white/20 object-contain group-hover:scale-105 transition"
          />
          <div>
            <div className="text-[11px] uppercase tracking-wide opacity-70">
              Non-Profit
            </div>
            <div className="font-extrabold tracking-tight">
              {state.brand.name}
            </div>
          </div>
        </Link>

        {/* primary nav: more spacing + wrap when tight */}
        <nav className="hidden lg:flex items-center gap-2 ml-6 flex-wrap">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navlink ${isActive ? "bg-white/15" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* MEGA MENU (right-aligned, never off-screen) */}
          <div
            className="relative"
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
          >
            <button className="navlink inline-flex items-center gap-1">
              Explore <ChevronDown className="w-4 h-4" />
            </button>
            {mega && (
              <div className="absolute right-0 mt-2 w-[min(92vw,760px)] max-h-[80vh] overflow-auto rounded-2xl p-4 bg-slate-900/95 backdrop-blur border border-white/10 shadow-glass z-[5100]">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Mega to="/mission" icon={<Ambulance />} title="Programs">
                    How ambulances & supplies move.
                  </Mega>
                  <Mega to="/impact" icon={<Activity />} title="Impact">
                    KPI dashboard & vehicle log.
                  </Mega>
                  <Mega to="/press" icon={<Newspaper />} title="Press">
                    Coverage & media kit.
                  </Mega>
                  <Mega to="/volunteer" icon={<Users />} title="Volunteer">
                    Help drive, pack, or host events.
                  </Mega>
                  <Mega to="/resources" icon={<Globe />} title="Resources">
                    One-pagers & downloads.
                  </Mega>
                  <Mega to="/donate" icon={<HandHeart />} title="Donate">
                    Give via Givebutter or PayPal.
                  </Mega>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />
          <Link to="/donate" className="btn btn-yellow ml-1">
            <HandHeart className="w-4 h-4" />
            Donate
          </Link>
        </div>

        {/* mobile trigger */}
        <button className="lg:hidden btn" onClick={() => setOpen(true)}>
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* MOBILE SHEET */}
      {open && (
        <div className="fixed inset-0 z-[5200] bg-slate-950/70 backdrop-blur-sm">
          <div className="absolute inset-y-0 right-0 w-[86%] sm:w-[400px] bg-slate-900 border-l border-white/10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={state.brand.logo}
                  className="h-9 w-9 rounded-lg border border-white/20"
                />
                <div className="font-bold">{state.brand.name}</div>
              </div>
              <button className="btn" onClick={() => setOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-5 grid gap-1">
              {links.concat([["/donate", "Donate"]]).map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-white/10"
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="mt-5">
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Mega({ to, icon, title, children }) {
  return (
    <Link
      to={to}
      className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 p-4 transition grid gap-1"
    >
      <div className="flex items-center gap-2">
        <span className="p-2 rounded-lg bg-white/10">{icon}</span>
        <div className="font-semibold">{title}</div>
      </div>
      <div className="text-sm opacity-80">{children}</div>
    </Link>
  );
}
