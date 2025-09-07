import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSite from '../store/useSite';
import { pick } from '../i18n';
import DonateWidget from './DonateWidget';
import SmartEmbed from './Embed';

export default function Hero() {
    const { state } = useSite();
    const [currentSlide, setCurrentSlide] = useState(0);

    const title = pick(state.content.heroTitle, state.content.heroTitleUk, state.lang);
    const subtitle = pick(state.content.heroSubtitle, state.content.heroSubtitleUk, state.lang);
    const hero = state.hero || {};

    // Auto-advance slideshow
    useEffect(() => {
        if (hero.mode === 'slideshow' && hero.slides?.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % hero.slides.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [hero.slides, hero.mode]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/70 z-0" />

            <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text content */}
                <motion.div
                    className="grid gap-8 text-center lg:text-left"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div>
                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <span className="bg-gradient-to-r from-ukYellow to-ukBlue bg-clip-text text-transparent">
                                {title || "Together, we deliver hope and emergency care"}
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            {subtitle || "Your donation funds ambulances, trauma kits, and critical equipment so medics can reach people in time."}
                        </motion.p>
                    </div>

                    <motion.div
                        className="grid md:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <a className="btn btn-yellow text-lg font-semibold py-4 px-8 rounded-xl hover:scale-105 transition-transform" href="/donate">
                            Donate Now
                        </a>
                        <a className="btn bg-white/10 text-white border-white/20 text-lg font-semibold py-4 px-8 rounded-xl hover:bg-white/20 transition-all" href="/mission">
                            How your gift helps
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <DonateWidget compact />
                    </motion.div>
                </motion.div>

                {/* Media content */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div className="rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl hero-media aspect-video lg:aspect-square lg:max-h-[600px]">
                        {hero.mode === 'video' && hero.video_url ? (
                            <SmartEmbed
                                url={hero.video_url}
                                className="w-full h-full object-cover"
                            />
                        ) : hero.mode === 'slideshow' && hero.slides?.length > 0 ? (
                            <Slideshow
                                slides={hero.slides}
                                currentSlide={currentSlide}
                            />
                        ) : (
                            <DefaultPlaceholder />
                        )}
                    </div>

                    {/* Slide indicators */}
                    {hero.mode === 'slideshow' && hero.slides?.length > 1 && (
                        <div className="flex justify-center mt-6 space-x-2">
                            {hero.slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                        ? 'bg-ukYellow w-8'
                                        : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-ukYellow/30 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight],
                            x: [null, Math.random() * window.innerWidth],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <div className="text-white/70 text-sm mb-2">Scroll to explore</div>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <motion.div
                        className="w-1 h-3 bg-ukYellow rounded-full mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
}

function Slideshow({ slides, currentSlide }) {
    return (
        <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentSlide}
                    src={slides[currentSlide].src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                />
            </AnimatePresence>
        </div>
    );
}

function DefaultPlaceholder() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ukBlue/20 to-ukYellow/20">
            <div className="text-center p-8">
                <div className="text-ukYellow text-6xl mb-4">🚑</div>
                <h3 className="text-white text-xl font-semibold mb-2">Hero Content</h3>
                <p className="text-white/70">Add video or images in admin panel</p>
            </div>
        </div>
    );
}