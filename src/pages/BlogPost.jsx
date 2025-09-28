import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Clock, Share2 } from "lucide-react";
import useSite from '../store/useSite';
import { pick } from '../i18n';
import MediaDisplay from '../components/Embed';

export default function BlogPost() {
    const { state } = useSite();
    const { id } = useParams();
    const post = (state.blog || []).find(x => x.id === id);

    if (!post) {
        return (
            <section className="section min-h-screen">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="h1 text-ukYellow mb-4">Post Not Found</h1>
                        <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist.</p>
                        <Link to="/blog" className="btn btn-yellow">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Link>
                    </motion.div>
                </div>
            </section>
        );
    }

    const readingTime = Math.max(1, Math.ceil((post.content?.length || 0) / 1000));

    return (
        <section className="section min-h-screen">
            <div className="container max-w-4xl">
                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <Link to="/blog" className="inline-flex items-center text-ukYellow hover:text-ukYellow/80 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="h1 text-white mb-4">
                        {pick(post.title, post.title_uk, state.lang)}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-white/70 mb-6">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>

                        {post.author && (
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                {post.author}
                            </div>
                        )}

                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {readingTime} min read
                        </div>
                    </div>

                    {/* Featured image */}
                    {post.image_url && (
                        <div className="rounded-2xl overflow-hidden mb-6 border border-white/10">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-64 md:h-96 object-cover"
                            />
                        </div>
                    )}

                    {/* Video content */}
                    {post.video_url && (
                        <div className="rounded-2xl overflow-hidden mb-6 border border-white/10">
                            <MediaDisplay
                                item={{ video_url: post.video_url, title: post.title }}
                                className="w-full aspect-video"
                            />
                        </div>
                    )}
                </motion.header>

                {/* Content */}
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert prose-lg max-w-none"
                >
                    <div className="text-white/90 leading-relaxed space-y-6">
                        {post.content?.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </motion.article>

                {/* Share buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 pt-8 border-t border-white/10"
                >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center">
                            <Share2 className="w-5 h-5 mr-2 text-ukYellow" />
                            <span className="font-semibold">Share this post:</span>
                        </div>

                        <div className="flex gap-3">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 rounded-xl hover:bg-blue-400 transition-colors"
                                aria-label="Share on Twitter"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>

                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 rounded-xl hover:bg-blue-600 transition-colors"
                                aria-label="Share on Facebook"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>

                            <a
                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 rounded-xl hover:bg-blue-700 transition-colors"
                                aria-label="Share on LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Related posts */}
                {state.blog && state.blog.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16"
                    >
                        <h3 className="h3 mb-6">Related Posts</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {state.blog
                                .filter(p => p.id !== post.id)
                                .slice(0, 2)
                                .map(relatedPost => (
                                    <Link
                                        key={relatedPost.id}
                                        to={`/blog/${relatedPost.id}`}
                                        className="card p-4 hover:bg-white/10 transition-all group"
                                    >
                                        {relatedPost.image_url && (
                                            <img
                                                src={relatedPost.image_url}
                                                alt={relatedPost.title}
                                                className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
                                            />
                                        )}
                                        <h4 className="font-semibold text-white group-hover:text-ukYellow transition-colors mb-2">
                                            {pick(relatedPost.title, relatedPost.title_uk, state.lang)}
                                        </h4>
                                        <p className="text-white/70 text-sm line-clamp-2">
                                            {relatedPost.excerpt || relatedPost.content?.slice(0, 100)}...
                                        </p>
                                    </Link>
                                ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}