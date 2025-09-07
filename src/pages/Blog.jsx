import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
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

export default function Blog() {
    const { state } = useSite();
    const posts = state.blog || [];
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['all', ...new Set(posts.map(post => post.category).filter(Boolean))];

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const matchesSearch = searchTerm === '' ||
            post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const BlogCard = ({ post }) => (
        <motion.div
            variants={itemVariants}
            className="group"
        >
            <Link
                to={`/blog/${post.id}`}
                className="block bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10 hover:border-ukYellow/30 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2"
            >
                {(post.image_url || post.video_url) && (
                    <div className="relative h-56 overflow-hidden">
                        {post.video_url ? (
                            <MediaDisplay
                                item={{ video_url: post.video_url, title: post.title }}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <motion.img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.7 }}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        {post.category && (
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-ukBlue/20 text-ukBlue text-xs font-semibold rounded-full border border-ukBlue/30 backdrop-blur-sm">
                                    {post.category}
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
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                        {post.author && (
                            <>
                                <span className="mx-3">•</span>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {post.author}
                            </>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-ukYellow transition-colors duration-300 line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="text-white/80 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt || post.content?.slice(0, 200) + '...'}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-ukYellow text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            Read Full Story
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="text-xs text-white/40">
                                {Math.ceil((post.content?.length || 0) / 1000)} min read
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
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
                        Blog & Stories
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                        Discover inspiring stories, updates from the field, and insights into our mission
                        to deliver critical aid to communities in need around the world.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col md:flex-row gap-4 mb-12"
                >
                    <div className="flex flex-wrap gap-3 flex-1">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-ukYellow text-gray-900'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                                    }`}
                            >
                                {category === 'all' ? 'All Stories' : category}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search stories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input pl-10 pr-4 py-2 w-full md:w-64 bg-white/5 border-white/10 focus:border-ukYellow/30"
                        />
                        <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </motion.div>

                {filteredPosts.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredPosts.map(post => (
                            <BlogCard key={post.id} post={post} />
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <h3 className="text-2xl font-semibold text-white mb-3">No Stories Yet</h3>
                                <p className="text-white/60 mb-6">
                                    We're working on bringing you inspiring stories from our mission.
                                    Check back soon for updates and insights from the field.
                                </p>
                                <button className="btn btn-yellow">
                                    Subscribe for Updates
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
                    <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
                    <p className="text-white/60 mb-6 max-w-2xl mx-auto">
                        Subscribe to our newsletter to receive the latest stories, updates,
                        and opportunities to support our mission.
                    </p>
                    <div className="flex max-w-md mx-auto gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input flex-1 bg-white/5 border-white/10"
                        />
                        <button className="btn btn-yellow">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}