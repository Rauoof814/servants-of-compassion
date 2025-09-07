
// import { Routes, Route, useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import About from './pages/About';
// import Mission from './pages/Mission';
// import WhatWeDo from './pages/WhatWeDo';
// import Events from './pages/Events';
// import Partners from './pages/Partners';
// import Press from './pages/Press';
// import Blog from './pages/Blog';
// import BlogPost from './pages/BlogPost';
// import Impact from './pages/Impact';
// import Resources from './pages/Resources';
// import Volunteer from './pages/Volunteer';
// import Contact from './pages/Contact';
// import Donate from './pages/Donate';
// import Admin from './pages/Admin';
// import useSite from './store/useSite';

// const SESSION_KEY = 'soc_admin_session';

// export default function App() {
//     const { state, logout } = useSite();
//     const loc = useLocation();

//     // Leave /admin? Kill session and logout.
//     useEffect(() => {
//         if (state.auth?.user && loc.pathname !== '/admin') {
//             sessionStorage.removeItem(SESSION_KEY);
//             logout();
//         }
//     }, [loc.pathname]); // eslint-disable-line

//     // Refresh/close tab? Kill session so next load is logged out.
//     useEffect(() => {
//         const onBeforeUnload = () => sessionStorage.removeItem(SESSION_KEY);
//         window.addEventListener('beforeunload', onBeforeUnload);
//         return () => window.removeEventListener('beforeunload', onBeforeUnload);
//     }, []);

//     return (
//         <div>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/mission" element={<Mission />} />
//                 <Route path="/what-we-do" element={<WhatWeDo />} />
//                 <Route path="/events" element={<Events />} />
//                 <Route path="/partners" element={<Partners />} />
//                 <Route path="/press" element={<Press />} />
//                 <Route path="/blog" element={<Blog />} />
//                 <Route path="/blog/:id" element={<BlogPost />} />
//                 <Route path="/impact" element={<Impact />} />
//                 <Route path="/resources" element={<Resources />} />
//                 <Route path="/volunteer" element={<Volunteer />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/donate" element={<Donate />} />
//                 <Route path="/admin" element={<Admin />} />
//             </Routes>
//             <Footer />
//         </div>
//     );
// }





import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Mission from './pages/Mission';
import WhatWeDo from './pages/WhatWeDo';
import Events from './pages/Events';
import Partners from './pages/Partners';
import Press from './pages/Press';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Impact from './pages/Impact';
import Resources from './pages/Resources';
import Volunteer from './pages/Volunteer';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Admin from './pages/Admin';

export default function App() {
    return (
        <ErrorBoundary>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mission" element={<Mission />} />
                    <Route path="/what-we-do" element={<WhatWeDo />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/press" element={<Press />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/impact" element={<Impact />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/volunteer" element={<Volunteer />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/donate" element={<Donate />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
                <Footer />
            </div>
        </ErrorBoundary>
    );
}
