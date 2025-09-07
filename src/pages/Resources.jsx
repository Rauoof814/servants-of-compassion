import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSite from '../store/useSite';
import MediaDisplay from '../components/Embed';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export default function Resources() {
    const { state } = useSite();
    const items = state.resources || [];
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['all', 'documents', 'videos', 'images', ...new Set(items.map(item => item.category).filter(Boolean))];

    const filteredItems = items.filter(item => {
        const matchesCategory = selectedCategory === 'all' ||
            (selectedCategory === 'documents' && item.kind === 'doc') ||
            (selectedCategory === 'videos' && item.video_url) ||
            (selectedCategory === 'images' && item.image_url && !item.video_url) ||
            item.category === selectedCategory;

        const matchesSearch = searchTerm === '' ||
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const ResourceCard = ({ item }) => (
        <motion.div
            variants={itemVariants}
            className="group"
        >
            <div className="card p-6 hover:shadow-xl transition-all duration-300 border border-white/10 hover:border-ukBlue/30 group-hover:scale-[1.02]">
                {(item.video_url || item.image_url) && (
                    <div className="mb-6 rounded-xl overflow-hidden">
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

                {item.kind === 'doc' && !item.video_url && !item.image_url && (
                    <div className="mb-6 p-4 bg-ukBlue/10 border border-ukBlue/20 rounded-lg text-center">
                        <svg className="w-12 h-12 mx-auto text-ukBlue mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm text-ukBlue font-semibold">Document Resource</p>
                    </div>
                )}

                <div className="flex items-center justify-between mb-3">
                    {item.category && (
                        <span className="px-3 py-1 bg-ukBlue/20 text-ukBlue text-xs font-semibold rounded-full border border-ukBlue/30">
                            {item.category}
                        </span>
                    )}
                    <span className="text-xs text-white/60 capitalize">
                        {item.kind === 'doc' ? 'Document' : item.video_url ? 'Video' : 'Image'}
                    </span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-ukBlue transition-colors">
                    {item.title}
                </h3>

                {item.description && (
                    <p className="text-white/80 mb-4 leading-relaxed">
                        {item.description}
                    </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    {(item.url || item.file_url) && (
                        <a
                            href={item.url || item.file_url}
                            target={item.url ? "_blank" : undefined}
                            download={item.file_url ? true : undefined}
                            className="btn btn-blue btn-sm"
                        >
                            {item.url ? 'View Resource' : 'Download'}
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.url ? "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" : "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"} />
                            </svg>
                        </a>
                    )}
                    <span className="text-xs text-white/40">
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short'
                        })}
                    </span>
                </div>
            </div>
        </motion.div>
    );

    return (
        <section className="section py-20 bg-gradient-to-b from-gray-900 to-gray-950">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="h1 mb-4 text-white">Resources & Materials</h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Access our collection of documents, videos, and resources to learn more about our work and impact.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-4 mb-12"
                >
                    <div className="flex flex-wrap gap-3 flex-1">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedCategory === category
                                        ? 'bg-ukBlue text-white'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                            >
                                {category === 'all' ? 'All Resources' :
                                    category === 'documents' ? 'Documents' :
                                        category === 'videos' ? 'Videos' :
                                            category === 'images' ? 'Images' : category}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input pl-10 pr-4 py-2 w-full md:w-64"
                        />
                        <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </motion.div>

                {filteredItems.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredItems.map(item => (
                            <ResourceCard key={item.id} item={item} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center py-16"
                    >
                        <div className="card p-12 bg-white/5 border-2 border-dashed border-white/20">
                            <svg className="w-16 h-16 mx-auto text-white/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-xl font-semibold mb-2">No Resources Available</h3>
                            <p className="text-white/60">Resources and materials will appear here when available.</p>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16 pt-8 border-t border-white/10"
                >
                    <p className="text-white/60 mb-4">Need additional resources or information?</p>
                    <a href="/contact" className="btn btn-yellow">
                        Contact Us
                    </a>
                </motion.div>
            </div>
        </section>
    );
}