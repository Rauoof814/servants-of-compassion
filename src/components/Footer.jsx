// import React from "react";
// import { Link } from "react-router-dom";
// import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
// import useSite from "../store/useSite";

// export default function Footer() {
//   const { state } = useSite();
//   const s = state.brand.social || {};
//   const posts = (state.blog || []).slice(0, 3);
//   const photos = [
//     "/src/assets/photos/photo_1.jpg",
//     "/src/assets/photos/photo_2.jpg",
//     "/src/assets/photos/photo_3.jpg",
//     "/src/assets/photos/photo_4.jpg",
//     "/src/assets/photos/photo_9.jpg",
//     "/src/assets/photos/photo_11.jpg",
//   ].filter(Boolean);

//   const onNewsletter = (e) => {
//     e.preventDefault();
//     const f = new FormData(e.currentTarget);
//     const n = Object.fromEntries(f.entries());
//     const list = [
//       { id: crypto.randomUUID(), ...n, date: new Date().toISOString() },
//       ...(state.newsletter || []),
//     ];
//     localStorage.setItem(
//       "soc_state_v2",
//       JSON.stringify({ ...state, newsletter: list })
//     );
//     e.currentTarget.reset();
//     alert("Thanks! You’re on the list.");
//   };

//   return (
//     <footer className="mt-24 relative">
//       {/* decorative wave */}
//       <div className="pointer-events-none absolute -top-16 left-0 w-full opacity-70">
//         <svg viewBox="0 0 1440 140" className="w-full h-[140px]">
//           <path
//             fill="url(#g)"
//             d="M0,96L80,85.3C160,75,320,53,480,64C640,75,800,117,960,128C1120,139,1280,117,1360,106.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
//           />
//           <defs>
//             <linearGradient id="g" x1="0" x2="1">
//               <stop offset="0%" stopColor="#0057B7" />
//               <stop offset="100%" stopColor="#FFD500" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </div>

//       <div className="bg-slate-900/90 backdrop-blur border-t border-white/10">
//         <div className="container py-14">
//           {/* top row: brand + quick donate */}
//           <div className="grid lg:grid-cols-[1.5fr,1fr,1fr,1fr] gap-10">
//             {/* Brand / about */}
//             <div>
//               <div className="flex items-center gap-3">
//                 <img
//                   src={state.brand.logo}
//                   className="h-12 w-12 rounded-xl border border-white/20 object-contain"
//                 />
//                 <div>
//                   <div className="font-black text-xl">
//                     {state.brand.name}
//                   </div>
//                   <div className="text-[11px] uppercase tracking-wider opacity-70">
//                     Delivering ambulances & medical aid
//                   </div>
//                 </div>
//               </div>
//               <p className="mt-4 opacity-90">
//                 We are a registered non-profit helping Ukrainians with ambulances,
//                 trauma kits, and community support. Your gift shortens the time
//                 between injury and care.
//               </p>

//               {/* photo strip */}
//               <div className="mt-4 grid grid-cols-6 gap-2">
//                 {photos.map((src, i) => (
//                   <img
//                     key={i}
//                     src={src}
//                     className="h-16 w-full object-cover rounded-lg border border-white/10"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Explore */}
//             <div>
//               <div className="h3 mb-3">Explore</div>
//               <ul className="space-y-2 opacity-90">
//                 <li><Link className="hover:underline" to="/donate">Donate</Link></li>
//                 <li><Link className="hover:underline" to="/mission">Our Mission</Link></li>
//                 <li><Link className="hover:underline" to="/impact">Impact Dashboard</Link></li>
//                 <li><Link className="hover:underline" to="/events">Events</Link></li>
//                 <li><Link className="hover:underline" to="/volunteer">Volunteer</Link></li>
//                 <li><Link className="hover:underline" to="/press">Press & Media</Link></li>
//                 <li><Link className="hover:underline" to="/resources">Resources</Link></li>
//                 <li><Link className="hover:underline" to="/admin">Admin</Link></li>
//               </ul>
//             </div>

//             {/* Latest stories */}
//             <div>
//               <div className="h3 mb-3">Latest stories</div>
//               <ul className="space-y-3">
//                 {posts.map((p) => (
//                   <li key={p.id} className="flex gap-3">
//                     {p.image && (
//                       <img
//                         src={p.image}
//                         className="h-12 w-16 rounded-lg object-cover border border-white/10"
//                       />
//                     )}
//                     <div className="text-sm">
//                       <Link className="font-semibold hover:underline" to={`/blog/${p.id}`}>
//                         {p.title}
//                       </Link>
//                       <div className="opacity-70">
//                         {new Date(p.date).toLocaleDateString()}
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//                 {posts.length === 0 && (
//                   <li className="opacity-70 text-sm">No posts yet.</li>
//                 )}
//               </ul>
//             </div>

//             {/* Newsletter & contact */}
//             <div>
//               <div className="h3 mb-3">Newsletter</div>
//               <form onSubmit={onNewsletter} className="grid gap-2">
//                 <input name="name" placeholder="Your name" className="input" />
//                 <input
//                   name="email"
//                   type="email"
//                   placeholder="Email"
//                   className="input"
//                   required
//                 />
//                 <button className="btn btn-yellow">Subscribe</button>
//               </form>

//               <div className="h3 mt-6 mb-2">Contact</div>
//               <div className="text-sm opacity-90 flex items-center gap-2">
//                 <MapPin className="w-4 h-4" /> {state.brand.address}
//               </div>
//               <a
//                 href={`mailto:${state.brand.email}`}
//                 className="text-sm opacity-90 flex items-center gap-2 hover:underline"
//               >
//                 <Mail className="w-4 h-4" /> {state.brand.email}
//               </a>
//               <a
//                 href={`tel:${state.brand.phone}`}
//                 className="text-sm opacity-90 flex items-center gap-2 hover:underline"
//               >
//                 <Phone className="w-4 h-4" /> {state.brand.phone}
//               </a>

//               {/* social */}
//               <div className="flex gap-3 mt-4">
//                 {s.facebook && (
//                   <a
//                     href={s.facebook}
//                     target="_blank"
//                     className="p-2 rounded-lg border border-white/10 hover:bg-white/10"
//                     aria-label="Facebook"
//                   >
//                     <Facebook className="w-4 h-4" />
//                   </a>
//                 )}
//                 {s.instagram && (
//                   <a
//                     href={s.instagram}
//                     target="_blank"
//                     className="p-2 rounded-lg border border-white/10 hover:bg-white/10"
//                     aria-label="Instagram"
//                   >
//                     <Instagram className="w-4 h-4" />
//                   </a>
//                 )}
//                 {s.twitter && (
//                   <a
//                     href={s.twitter}
//                     target="_blank"
//                     className="p-2 rounded-lg border border-white/10 hover:bg-white/10"
//                     aria-label="Twitter / X"
//                   >
//                     <Twitter className="w-4 h-4" />
//                   </a>
//                 )}
//               </div>

//               {/* trust badges */}
//               <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider">
//                 <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10">
//                   Givebutter
//                 </span>
//                 <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10">
//                   PayPal
//                 </span>
//                 <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10">
//                   Transparency Log
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* bottom legal row */}
//           <div className="mt-10 border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-70">
//             <div>
//               © {new Date().getFullYear()} {state.brand.name}. All rights reserved.
//             </div>
//             <div className="flex gap-3">
//               <Link to="/resources">Privacy</Link>
//               <Link to="/resources">Terms</Link>
//               <a href="#top">Back to top ↑</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



import React from "react";
import useSite from "../store/useSite";
import { Link } from "react-router-dom";

export default function Footer() {
  const { state } = useSite();
  const brand = state?.brand || {};
  const logoSrc = brand.logo || "/logo.png";

  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-900/60 backdrop-blur">
      <div className="container py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt="Logo"
              className="h-10 w-10 rounded-lg border border-white/20 object-contain"
              loading="lazy"
              onError={(e) => { e.currentTarget.src = "/logo.png"; }}
            />
            <div>
              <div className="text-xs uppercase opacity-70">Non-Profit</div>
              <div className="font-extrabold">{brand.name || "Servants of Compassion"}</div>
            </div>
          </div>
          {brand.address && <p className="mt-3 text-sm opacity-80">{brand.address}</p>}
          {(brand.email || brand.phone) && (
            <div className="mt-2 text-sm opacity-80 space-y-1">
              {brand.email && <div>{brand.email}</div>}
              {brand.phone && <div>{brand.phone}</div>}
            </div>
          )}
        </div>

        <div>
          <div className="font-semibold mb-2">Explore</div>
          <div className="grid gap-1 text-sm opacity-90">
            {[
              ["/donate", "Donate"],
              ["/mission", "Our Mission"],
              ["/impact", "Impact"],
              ["/events", "Events"],
              ["/press", "Press & Media"],
              ["/resources", "Resources"],
              ["/admin", "Admin"],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="hover:underline">{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <div className="font-semibold mb-2">Latest stories</div>
          <div className="text-sm opacity-80">
            <div>Check the blog & events for updates.</div>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-2">Newsletter</div>
          <form className="grid gap-2">
            <input className="input" placeholder="Your name" />
            <input className="input" placeholder="Email" />
            <button className="btn btn-yellow">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} {brand.name || "Servants of Compassion"}
      </div>
    </footer>
  );
}
