import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSite from '../store/useSite';
import { pick } from '../i18n';
import MediaDisplay from '../components/Embed';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

export default function Events() {
    const { state } = useSite();
    const now = new Date().toISOString().split('T')[0];
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const upcoming = state.events.filter(e => e.date >= now);
    const past = state.events.filter(e => e.date < now);

    const EventCard = ({ event, tag }) => (
        <motion.div
            variants={itemVariants}
            className="group cursor-pointer"
            onClick={() => setSelectedEvent(event)}
        >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 hover:border-ukYellow/30 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                {event.image_url && (
                    <div className="relative h-56 overflow-hidden">
                        <motion.img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${tag === 'Upcoming'
                                ? 'bg-ukYellow/20 text-ukYellow border border-ukYellow/30'
                                : 'bg-white/20 text-white border border-white/30'
                                }`}>
                                {tag}
                            </span>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    <div className="flex items-center text-sm text-white/60 mb-3">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-ukYellow transition-colors duration-300">
                        {pick(event.title, event.title_uk, state.lang)}
                    </h3>

                    {event.location && (
                        <div className="flex items-center text-sm text-white/70 mb-3">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                        </div>
                    )}

                    {event.provides && (
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-ukBlue/20 text-ukBlue text-xs font-semibold rounded-full border border-ukBlue/30 mb-2">
                                Provides: {event.provides}
                            </span>
                        </div>
                    )}

                    {event.description && (
                        <p className="text-white/80 text-sm line-clamp-3 leading-relaxed mb-4">
                            {event.description}
                        </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-ukYellow text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            View Details
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                        {event.video_url && (
                            <span className="text-xs text-white/40 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Video
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const EventModal = ({ event, onClose }) => (
        <AnimatePresence>
            <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    {event.image_url && (
                        <div className="relative h-64">
                            <img
                                src={event.image_url}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        </div>
                    )}

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    {pick(event.title, event.title_uk, state.lang)}
                                </h2>
                                <div className="flex items-center text-white/60">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                    {event.location && (
                                        <>
                                            <span className="mx-3">•</span>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {event.location}
                                        </>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {event.provides && (
                            <div className="bg-ukBlue/10 border border-ukBlue/20 rounded-xl p-4 mb-6">
                                <h4 className="font-semibold text-ukBlue mb-2 text-lg">What This Event Provides</h4>
                                <p className="text-white/90">{event.provides}</p>
                            </div>
                        )}

                        {event.description && (
                            <div className="prose prose-invert max-w-none mb-6">
                                <p className="text-white/90 leading-relaxed text-lg">{event.description}</p>
                            </div>
                        )}

                        {event.video_url && (
                            <div className="mb-6 rounded-xl overflow-hidden">
                                <MediaDisplay
                                    item={{ video_url: event.video_url, title: event.title }}
                                    className="w-full aspect-video"
                                />
                            </div>
                        )}

                        <div className="flex gap-4 pt-6 border-t border-white/10">
                            <button className="btn btn-yellow flex-1">
                                Register for Event
                            </button>
                            <button className="btn flex-1" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-20">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-ukYellow bg-clip-text text-transparent">
                        Events & Activities
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                        Join us in our mission to deliver critical medical aid and support to communities in need.
                        Our events bring together volunteers, partners, and supporters to make a real difference.
                    </p>
                </motion.div>

                <div className="flex justify-center mb-12">
                    <div className="flex bg-white/10 rounded-full p-1 backdrop-blur-sm">
                        {['All Events', 'Upcoming', 'Past'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter.toLowerCase().replace(' ', '-'))}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === filter.toLowerCase().replace(' ', '-')
                                    ? 'bg-ukYellow text-gray-900'
                                    : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {(activeFilter === 'all' || activeFilter === 'upcoming') && upcoming.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                            <svg className="w-8 h-8 mr-3 text-ukYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Upcoming Events
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcoming.map(event => (
                                <EventCard key={event.id} event={event} tag="Upcoming" />
                            ))}
                        </div>
                    </motion.div>
                )}

                {(activeFilter === 'all' || activeFilter === 'past') && past.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                            <svg className="w-8 h-8 mr-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Past Events
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {past.map(event => (
                                <EventCard key={event.id} event={event} tag="Past" />
                            ))}
                        </div>
                    </motion.div>
                )}

                {state.events.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center py-20"
                    >
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-gradient-to-br from-white/5 to-white/10 border-2 border-dashed border-white/20 rounded-3xl p-12 backdrop-blur-sm">
                                <svg className="w-20 h-20 mx-auto text-white/40 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-2xl font-semibold text-white mb-3">No Events Scheduled Yet</h3>
                                <p className="text-white/60 mb-6">
                                    We're planning our next events to support communities in need.
                                    Check back soon for opportunities to get involved and make a difference.
                                </p>
                                <button className="btn btn-yellow">
                                    Subscribe to Updates
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </section>
    );
}