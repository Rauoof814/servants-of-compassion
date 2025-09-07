import React, { useState } from "react";
import { motion } from "framer-motion";
import useSite from '../store/useSite';

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

export default function Partners() {
    const { state } = useSite();
    const partners = state.partners || [];
    const [selectedPartner, setSelectedPartner] = useState(null);

    const PartnerCard = ({ partner }) => (
        <motion.div
            variants={itemVariants}
            className="group"
        >
            <div
                className="card p-6 hover:shadow-xl transition-all duration-300 border border-white/10 hover:border-ukYellow/30 cursor-pointer group-hover:scale-[1.02]"
                onClick={() => setSelectedPartner(partner)}
            >
                <div className="flex items-center justify-center h-32 mb-4">
                    {partner.logo_url ? (
                        <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                    ) : null}
                    {!partner.logo_url && (
                        <div className="text-2xl font-bold text-ukYellow text-center">
                            {partner.name}
                        </div>
                    )}
                </div>

                <h3 className="text-lg font-bold text-center mb-2 group-hover:text-ukYellow transition-colors">
                    {partner.name}
                </h3>

                {partner.description && (
                    <p className="text-white/70 text-sm text-center line-clamp-2 mb-4">
                        {partner.description}
                    </p>
                )}

                {partner.url && (
                    <div className="text-center">
                        <span className="text-ukYellow text-sm font-semibold inline-flex items-center">
                            Visit Website
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );

    const PartnerModal = ({ partner, onClose }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 rounded-2xl max-w-md w-full p-8"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">{partner.name}</h2>
                        {partner.url && (
                            <a
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-ukYellow hover:underline text-sm"
                            >
                                {partner.url.replace(/^https?:\/\//, '')}
                            </a>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-4"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {partner.logo_url && (
                    <div className="flex justify-center mb-6">
                        <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="max-h-32 max-w-full object-contain"
                        />
                    </div>
                )}

                {partner.description && (
                    <div className="prose prose-invert max-w-none mb-6">
                        <p className="text-white/80 leading-relaxed">{partner.description}</p>
                    </div>
                )}

                <div className="flex gap-3">
                    {partner.url && (
                        <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-yellow flex-1"
                        >
                            Visit Website
                        </a>
                    )}
                    <button
                        onClick={onClose}
                        className="btn flex-1"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
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
                    <h1 className="h1 mb-4 text-white">Partners & Supporters</h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        We are grateful for the organizations and individuals who support our mission to deliver critical aid to those in need.
                    </p>
                </motion.div>

                {partners.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {partners.map(partner => (
                            <PartnerCard key={partner.id} partner={partner} />
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold mb-2">No Partners Yet</h3>
                            <p className="text-white/60">Our partnership network will be displayed here.</p>
                        </div>
                    </motion.div>
                )}

                {selectedPartner && (
                    <PartnerModal
                        partner={selectedPartner}
                        onClose={() => setSelectedPartner(null)}
                    />
                )}
            </div>
        </section>
    );
}