import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Ambulance, HandHeart, HeartPulse, Users, Truck, ShieldCheck, Activity,
    CalendarDays, ChevronRight, ArrowRight, Globe, Wrench, Boxes,
    Star, Award, Target, Clock, MapPin, Phone, Mail, Download
} from "lucide-react";

import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import useSite from "../store/useSite";
import { pick } from "../i18n";

// Animation components
const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay }}
        viewport={{ once: true, margin: "-100px" }}
        className={className}
    >
        {children}
    </motion.div>
);

const SlideIn = ({ children, direction = "left", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        viewport={{ once: true }}
    >
        {children}
    </motion.div>
);

// Custom hook for count-up animation
function useCountUp(value, duration = 2000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = Number(value) || 0;
        if (end === 0) return;

        const incrementTime = duration / end;
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    return count;
}

export default function Home() {
    const { state } = useSite();
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Stats with count-up animation
    const ambulances = useCountUp(state.stats?.ambulances || 18);
    const kits = useCountUp(state.stats?.kits || 4200);
    const volunteers = useCountUp(state.stats?.volunteers || 87);
    const regions = useCountUp(state.stats?.regions || 9);

    // Upcoming events
    const now = new Date();
    const upcomingEvents = (state.events || [])
        .filter(e => new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    // Testimonials carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % (state.testimonials?.length || 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [state.testimonials]);

    return (
        <main className="overflow-x-hidden">
            {/* Hero Section */}
            <Hero />

            {/* Impact Statistics */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
                <div className="container">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Making a <span className="text-ukYellow">Measurable Impact</span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Every donation contributes to our mission of delivering critical medical aid
                            to communities in need. Here's what we've accomplished together.
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FadeIn delay={0.1}>
                            <StatCard
                                icon={<Ambulance className="w-8 h-8" />}
                                value={ambulances}
                                label="Ambulances Delivered"
                                suffix="+"
                            />
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <StatCard
                                icon={<HeartPulse className="w-8 h-8" />}
                                value={kits}
                                label="Medical Kits Provided"
                                suffix="+"
                            />
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <StatCard
                                icon={<Users className="w-8 h-8" />}
                                value={volunteers}
                                label="Active Volunteers"
                                suffix="+"
                            />
                        </FadeIn>
                        <FadeIn delay={0.4}>
                            <StatCard
                                icon={<Globe className="w-8 h-8" />}
                                value={regions}
                                label="Regions Served"
                                suffix="+"
                            />
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.5} className="text-center mt-12">
                        <Link to="/impact" className="btn btn-yellow">
                            View Full Impact Dashboard
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20 bg-gray-900">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <FadeIn>
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    Our <span className="text-ukBlue">Mission</span> in Action
                                </h2>
                                <p className="text-xl text-white/80 mb-6 leading-relaxed">
                                    We bridge the gap between injury and care by delivering fully-equipped
                                    ambulances, trauma kits, and critical medical supplies to frontline
                                    medics in Ukraine.
                                </p>
                                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                                    Through strategic partnerships and transparent operations, we ensure
                                    that every donation directly supports those who need it most, saving
                                    precious minutes that save lives.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/mission" className="btn btn-yellow">
                                        Learn About Our Mission
                                    </Link>
                                    <Link to="/what-we-do" className="btn bg-white/10 text-white border-white/20">
                                        See What We Do
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="grid grid-cols-2 gap-6">
                                <FeatureCard
                                    icon={<Truck className="w-6 h-6" />}
                                    title="Rapid Deployment"
                                    description="Vehicles delivered within weeks of funding"
                                />
                                <FeatureCard
                                    icon={<ShieldCheck className="w-6 h-6" />}
                                    title="Quality Assured"
                                    description="All equipment meets medical standards"
                                />
                                <FeatureCard
                                    icon={<Target className="w-6 h-6" />}
                                    title="Strategic Focus"
                                    description="Targeting areas with greatest need"
                                />
                                <FeatureCard
                                    icon={<Activity className="w-6 h-6" />}
                                    title="Transparent Tracking"
                                    description="Follow each vehicle's journey"
                                />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Donation Impact */}
            <section className="py-20 bg-gradient-to-br from-ukBlue/10 to-ukYellow/10">
                <div className="container">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            How Your <span className="text-ukYellow">Donation</span> Helps
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Every contribution makes a tangible difference. Here's how your support transforms into life-saving resources.
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <FadeIn delay={0.1}>
                            <ImpactCard
                                amount="$25"
                                title="Medical Supplies"
                                description="Provides trauma kits for first responders"
                                icon={<HeartPulse className="w-8 h-8" />}
                            />
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <ImpactCard
                                amount="$100"
                                title="Equipment Fund"
                                description="Helps purchase oxygen tanks and AED units"
                                icon={<Boxes className="w-8 h-8" />}
                            />
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <ImpactCard
                                amount="$500"
                                title="Ambulance Support"
                                description="Contributes to vehicle maintenance and fuel"
                                icon={<Ambulance className="w-8 h-8" />}
                            />
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.4} className="text-center">
                        <Link to="/donate" className="btn btn-yellow text-lg px-8 py-4">
                            <HandHeart className="w-6 h-6 mr-2" />
                            Make a Difference Today
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* Recent Success Stories */}
            <section className="py-20 bg-gray-900">
                <div className="container">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Recent <span className="text-ukBlue">Success Stories</span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Discover how our collective efforts are making a real impact in communities across Ukraine.
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {upcomingEvents.map((event, index) => (
                            <FadeIn key={event.id} delay={0.1 * index}>
                                <EventCard event={event} />
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn className="text-center">
                        <Link to="/events" className="btn bg-white/10 text-white border-white/20">
                            View All Events and Stories
                            <CalendarDays className="w-5 h-5 ml-2" />
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
                <div className="container">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Voices of <span className="text-ukYellow">Impact</span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Hear from those whose lives have been touched by our mission.
                        </p>
                    </FadeIn>

                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            {state.testimonials?.length > 0 && (
                                <motion.div
                                    key={activeTestimonial}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center"
                                >
                                    <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                                        <div className="text-ukYellow text-6xl mb-6">"</div>
                                        <p className="text-xl text-white/90 italic mb-6">
                                            {state.testimonials[activeTestimonial]?.text}
                                        </p>
                                        <div className="font-semibold text-white">
                                            {state.testimonials[activeTestimonial]?.name}
                                        </div>
                                        <div className="text-white/60 text-sm">
                                            {state.testimonials[activeTestimonial]?.role}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {state.testimonials?.length > 1 && (
                            <div className="flex justify-center mt-8 space-x-2">
                                {state.testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${index === activeTestimonial
                                                ? 'bg-ukYellow w-8'
                                                : 'bg-white/30 hover:bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-ukBlue">
                <div className="container text-center">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Join Us in <span className="text-ukYellow">Saving Lives</span>
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                            Your support enables us to continue delivering critical medical aid to those who need it most.
                            Together, we can make a lasting difference.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 mb-12">
                            <Link to="/donate" className="btn btn-yellow text-lg px-8 py-4">
                                <HandHeart className="w-6 h-6 mr-2" />
                                Donate Now
                            </Link>
                            <Link to="/volunteer" className="btn bg-white/20 text-white border-white/30 text-lg px-8 py-4">
                                <Users className="w-6 h-6 mr-2" />
                                Volunteer
                            </Link>
                            <Link to="/partners" className="btn bg-white/10 text-white border-white/20 text-lg px-8 py-4">
                                <ShieldCheck className="w-6 h-6 mr-2" />
                                Partner With Us
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 text-white/80">
                            <div>
                                <div className="text-2xl font-bold text-ukYellow mb-2">100%</div>
                                <p>Transparent allocation of funds</p>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-ukYellow mb-2">24/7</div>
                                <p>Emergency response capability</p>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-ukYellow mb-2">5000+</div>
                                <p>Lives impacted to date</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-20 bg-gray-900">
                <div className="container">
                    <div className="bg-gradient-to-r from-ukBlue/20 to-ukYellow/20 rounded-3xl p-8 md:p-12 border border-white/10">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <FadeIn>
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-4">
                                        Stay <span className="text-ukYellow">Connected</span>
                                    </h3>
                                    <p className="text-white/80 mb-6">
                                        Subscribe to our newsletter for updates on our mission,
                                        success stories, and opportunities to get involved.
                                    </p>
                                    <ul className="space-y-2 text-white/70">
                                        <li className="flex items-center">
                                            <Star className="w-4 h-4 text-ukYellow mr-2" />
                                            Monthly impact reports
                                        </li>
                                        <li className="flex items-center">
                                            <Award className="w-4 h-4 text-ukYellow mr-2" />
                                            Exclusive volunteer opportunities
                                        </li>
                                        <li className="flex items-center">
                                            <Clock className="w-4 h-4 text-ukYellow mr-2" />
                                            Emergency response updates
                                        </li>
                                    </ul>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-white mb-2">Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white mb-2">Email</label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-yellow w-full py-3">
                                            Subscribe to Updates
                                        </button>
                                    </form>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Component: Stat Card
function StatCard({ icon, value, label, suffix = "" }) {
    return (
        <motion.div
            className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
            whileHover={{ y: -5 }}
        >
            <div className="text-ukYellow mb-4 flex justify-center">{icon}</div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {value}{suffix}
            </div>
            <div className="text-white/70">{label}</div>
        </motion.div>
    );
}

// Component: Feature Card
function FeatureCard({ icon, title, description }) {
    return (
        <motion.div
            className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
            whileHover={{ y: -3 }}
        >
            <div className="text-ukYellow mb-4">{icon}</div>
            <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
            <p className="text-white/70 text-sm">{description}</p>
        </motion.div>
    );
}

// Component: Impact Card
function ImpactCard({ amount, title, description, icon }) {
    return (
        <motion.div
            className="text-center p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
            whileHover={{ y: -5, scale: 1.02 }}
        >
            <div className="text-ukYellow text-4xl font-bold mb-4">{amount}</div>
            <div className="text-ukYellow mb-4 flex justify-center">{icon}</div>
            <h4 className="text-xl font-semibold text-white mb-3">{title}</h4>
            <p className="text-white/70">{description}</p>
        </motion.div>
    );
}

// Component: Event Card
function EventCard({ event }) {
    return (
        <motion.div
            className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all group"
            whileHover={{ y: -5 }}
        >
            {event.image_url && (
                <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
            )}
            <div className="p-6">
                <div className="flex items-center text-sm text-white/60 mb-3">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                </div>
                <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-ukYellow transition-colors">
                    {event.title}
                </h4>
                <p className="text-white/70 mb-4 line-clamp-3">
                    {event.description || "Join us for this important event."}
                </p>
                <Link to={`/events#${event.id}`} className="text-ukYellow hover:text-ukYellow/80 font-semibold">
                    Learn More →
                </Link>
            </div>
        </motion.div>
    );
}