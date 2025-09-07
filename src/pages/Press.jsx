import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSite from '../store/useSite';
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

export default function Press() {
    const { state } = useSite();
    const items = state.press || [];
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const categories = ['all', ...new Set(items.map(item => item.outlet).filter(Boolean))];

    const filteredItems = activeFilter === 'all'
        ? items
        : items.filter(item => item.outlet === activeFilter);

    const PressCard = ({ item }) => (
        <motion.div
            variants={itemVariants}
            className="group cursor-pointer"
            onClick={() => setSelectedItem(item)}
        >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10 hover:border-ukBlue/30 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                {(item.video_url || item.image_url) && (
                    <div className="relative h-56 overflow-hidden">
                        <MediaDisplay
                            item={{
                                video_url: item.video_url,
                                image_url: item.image_url,
                                title: item.title
                            }}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute top-4 left-4">
                            {item.outlet && (
                                <span className="px-3 py-1 bg-ukBlue/20 text-ukBlue text-xs font-semibold rounded-full border border-ukBlue/30 backdrop-blur-sm">
                                    {item.outlet}
                                </span>
                            )}
                        </div>
                        {(item.video_url || item.image_url) && (
                            <div className="absolute top-4 right-4">
                                <span className="px-2 py-1 bg-black/50 text-white text-xs font-semibold rounded backdrop-blur-sm">
                                    {item.video_url ? 'Video' : 'Image'}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                <div className="p-6">
                    <div className="flex items-center text-sm text-white/60 mb-3">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-ukBlue transition-colors duration-300 line-clamp-2">
                        {item.title}
                    </h3>

                    {item.excerpt && (
                        <p className="text-white/80 mb-4 line-clamp-3 leading-relaxed">
                            {item.excerpt}
                        </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-ukBlue text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            View Coverage
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                        {item.url && (
                            <span className="text-xs text-white/40 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Source
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const PressModal = ({ item, onClose }) => (
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
                    {(item.video_url || item.image_url) && (
                        <div className="relative">
                            <MediaDisplay
                                item={{
                                    video_url: item.video_url,
                                    image_url: item.image_url,
                                    title: item.title
                                }}
                                className="w-full aspect-video"
                            />
                        </div>
                    )}

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                {item.outlet && (
                                    <span className="px-3 py-1 bg-ukBlue/20 text-ukBlue text-sm font-semibold rounded-full border border-ukBlue/30 mb-3 inline-block">
                                        {item.outlet}
                                    </span>
                                )}
                                <h2 className="text-3xl font-bold text-white mb-2">{item.title}</h2>
                                <p className="text-white/60">
                                    {new Date(item.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
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

                        {item.excerpt && (
                            <div className="prose prose-invert max-w-none mb-6">
                                <p className="text-white/90 leading-relaxed text-lg">{item.excerpt}</p>
                            </div>
                        )}

                        {item.url && (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-blue inline-flex items-center mb-6"
                            >
                                Read Full Article
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}

                        <div className="flex gap-4 pt-6 border-t border-white/10">
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
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-ukBlue bg-clip-text text-transparent">
                        Press & Media
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                        Discover how our work is being covered by media outlets around the world.
                        Watch interviews, read features, and see the impact of our mission through press coverage.
                    </p>
                </motion.div>

                {categories.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === category
                                    ? 'bg-ukBlue text-white'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                                    }`}
                            >
                                {category === 'all' ? 'All Media' : category}
                            </button>
                        ))}
                    </motion.div>
                )}

                {filteredItems.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredItems.map(item => (
                            <PressCard key={item.id} item={item} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center py-20"
                    >
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-gradient-to-br from-white/5 to-white/10 border-2 border-dashed border-white/20 rounded-3xl p-12 backdrop-blur-sm">
                                <svg className="w-20 h-20 mx-auto text-white/40 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                <h3 className="text-2xl font-semibold text-white mb-3">No Press Coverage Yet</h3>
                                <p className="text-white/60 mb-6">
                                    Media features, interviews, and press releases will appear here as they become available.
                                </p>
                                <button className="btn btn-blue">
                                    Media Inquiries
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-16 pt-12 border-t border-white/10"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">Media Resources</h3>
                    <p className="text-white/60 mb-6 max-w-2xl mx-auto">
                        Download press kits, logos, and other resources for media professionals.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="btn btn-blue">
                            Press Kit
                        </button>
                        <button className="btn btn-blue">
                            Media Assets
                        </button>
                        <button className="btn btn-blue">
                            Contact Press Team
                        </button>
                    </div>
                </motion.div>
            </div>

            {selectedItem && (
                <PressModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </section>
    );
}