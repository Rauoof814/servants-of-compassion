import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Ambulance, HeartPulse, Users, Truck, ShieldCheck,
    Activity, Calendar, MapPin, Clock, Target, Star,
    Play, Download, ArrowRight, CheckCircle
} from "lucide-react";
import useSite from "../store/useSite";
import { pick } from "../i18n";
import MediaDisplay from "../components/Embed";

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

export default function WhatWeDo() {
    const { state } = useSite();
    const [activeProgram, setActiveProgram] = useState("ambulances");

    const programs = {
        ambulances: {
            title: "Ambulance Deployment",
            icon: <Ambulance className="w-8 h-8" />,
            description: "We source, refurbish, and deliver fully-equipped ambulances to frontline medical facilities in Ukraine.",
            features: [
                "Emergency vehicle procurement and inspection",
                "Medical equipment installation and testing",
                "Logistics and transportation coordination",
                "Training for local medical staff",
                "Ongoing maintenance support"
            ],
            stats: { delivered: 50, inProgress: 12, goal: 100 }
        },
        medical: {
            title: "Medical Supplies",
            icon: <HeartPulse className="w-8 h-8" />,
            description: "We deliver critical medical supplies and trauma kits to hospitals and emergency responders.",
            features: [
                "Trauma and first aid kits",
                "Surgical equipment and supplies",
                "Medications and pharmaceuticals",
                "Personal protective equipment",
                "Medical consumables"
            ],
            stats: { delivered: 5000, inProgress: 1000, goal: 10000 }
        },
        training: {
            title: "Medical Training",
            icon: <Users className="w-8 h-8" />,
            description: "We provide specialized training for medical professionals and first responders in emergency care.",
            features: [
                "Emergency medical technician training",
                "Trauma care workshops",
                "Equipment operation sessions",
                "Mass casualty incident response",
                "Ongoing professional development"
            ],
            stats: { delivered: 250, inProgress: 50, goal: 500 }
        }
    };

    const processSteps = [
        {
            step: 1,
            title: "Needs Assessment",
            description: "We work with local partners to identify the most critical needs in each community.",
            icon: <Target className="w-6 h-6" />
        },
        {
            step: 2,
            title: "Sourcing & Preparation",
            description: "We procure and prepare medical equipment, ensuring everything meets quality standards.",
            icon: <ShieldCheck className="w-6 h-6" />
        },
        {
            step: 3,
            title: "Logistics Coordination",
            description: "We manage the complex logistics of getting aid to where it's needed most.",
            icon: <Truck className="w-6 h-6" />
        },
        {
            step: 4,
            title: "Delivery & Training",
            description: "We deliver the aid and provide training to ensure proper use and maintenance.",
            icon: <Users className="w-6 h-6" />
        },
        {
            step: 5,
            title: "Monitoring & Support",
            description: "We provide ongoing support and monitor the impact of our interventions.",
            icon: <Activity className="w-6 h-6" />
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-ukBlue/20 to-ukYellow/20 z-0" />
                <div className="container relative z-10">
                    <FadeIn>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6">
                            What We <span className="text-ukYellow">Do</span>
                        </h1>
                        <p className="text-xl text-white/80 text-center max-w-3xl mx-auto leading-relaxed">
                            Through strategic programs and partnerships, we deliver comprehensive medical aid
                            and support to communities affected by conflict in Ukraine.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Programs Navigation */}
            <section className="py-16 bg-gray-900">
                <div className="container">
                    <FadeIn className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our <span className="text-ukBlue">Programs</span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Discover how we're making a difference through our focused humanitarian initiatives.
                        </p>
                    </FadeIn>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {Object.entries(programs).map(([key, program]) => (
                            <button
                                key={key}
                                onClick={() => setActiveProgram(key)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeProgram === key
                                    ? 'bg-ukYellow text-gray-900'
                                    : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                                    }`}
                            >
                                {program.title}
                            </button>
                        ))}
                    </div>

                    {/* Active Program Display */}
                    <FadeIn>
                        <div className="card p-8">
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="text-ukYellow mb-4">{programs[activeProgram].icon}</div>
                                    <h3 className="text-3xl font-bold text-white mb-4">
                                        {programs[activeProgram].title}
                                    </h3>
                                    <p className="text-white/80 mb-6 leading-relaxed">
                                        {programs[activeProgram].description}
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        {programs[activeProgram].features.map((feature, index) => (
                                            <div key={index} className="flex items-center">
                                                <CheckCircle className="w-5 h-5 text-ukYellow mr-3" />
                                                <span className="text-white/90">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Progress Stats */}
                                    <div className="bg-white/5 rounded-xl p-4 mb-6">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-white font-semibold">Progress</span>
                                            <span className="text-ukYellow font-bold">
                                                {programs[activeProgram].stats.delivered} / {programs[activeProgram].stats.goal}
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                            <div
                                                className="bg-ukYellow h-2 rounded-full transition-all duration-1000"
                                                style={{
                                                    width: `${(programs[activeProgram].stats.delivered / programs[activeProgram].stats.goal) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-sm text-white/70 mt-2">
                                            <span>Delivered</span>
                                            <span>Goal</span>
                                        </div>
                                    </div>

                                    <button className="btn btn-yellow">
                                        Support This Program
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </button>
                                </div>

                                <div className="lg:text-right">
                                    <div className="bg-gradient-to-br from-ukBlue/20 to-ukYellow/20 rounded-2xl p-8">
                                        <div className="text-6xl font-bold text-ukYellow mb-2">
                                            {programs[activeProgram].stats.delivered}
                                        </div>
                                        <div className="text-white/80">Successfully Delivered</div>
                                        <div className="mt-4 text-sm text-white/60">
                                            {programs[activeProgram].stats.inProgress} currently in progress
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-950">
                <div className="container">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our <span className="text-ukYellow">Process</span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            From identification to implementation, we follow a rigorous process to ensure
                            maximum impact and transparency in all our operations.
                        </p>
                    </FadeIn>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-ukYellow/30 h-full hidden lg:block"></div>
                        <div className="space-y-12">
                            {processSteps.map((step, index) => (
                                <FadeIn key={index} delay={0.1 * index}>
                                    <div className="flex flex-col lg:flex-row items-center">
                                        <div className="lg:w-1/2 lg:pr-12 mb-6 lg:mb-0 lg:text-right">
                                            <div className="inline-flex items-center justify-center w-12 h-12 bg-ukYellow text-gray-900 rounded-full font-bold text-lg mb-4">
                                                {step.step}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                            <p className="text-white/70">{step.description}</p>
                                        </div>

                                        <div className="lg:w-12 lg:mx-4 flex justify-center mb-6 lg:mb-0">
                                            <div className="w-12 h-12 bg-ukYellow/20 rounded-full flex items-center justify-center">
                                                {step.icon}
                                            </div>
                                        </div>

                                        <div className="lg:w-1/2 lg:pl-12">
                                            <div className="card p-6">
                                                <div className="text-ukYellow mb-2">Key Activities</div>
                                                <ul className="space-y-2 text-white/80">
                                                    {[
                                                        "Stakeholder consultations",
                                                        "Resource assessment",
                                                        "Quality assurance checks",
                                                        "Documentation and reporting"
                                                    ].map((activity, i) => (
                                                        <li key={i} className="flex items-center">
                                                            <CheckCircle className="w-4 h-4 text-ukYellow mr-2" />
                                                            {activity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Stories */}
            <section className="py-20 bg-gray-900">
                <div className="container">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Success <span className="text-ukBlue">Stories</span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Real stories of impact from the communities we serve and the partners we work with.
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <FadeIn key={item} delay={0.1 * item}>
                                <div className="card p-6 group hover:bg-white/10 transition-all">
                                    <div className="w-16 h-16 bg-ukYellow/20 rounded-xl flex items-center justify-center mb-4">
                                        <Star className="w-8 h-8 text-ukYellow" />
                                    </div>
                                    <h3 className="font-bold text-white mb-3 group-hover:text-ukYellow transition-colors">
                                        Emergency Response in Kharkiv
                                    </h3>
                                    <p className="text-white/70 mb-4">
                                        Delivered 5 ambulances and medical supplies to hospitals serving front-line communities.
                                    </p>
                                    <div className="flex items-center text-sm text-white/60">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        Kharkiv, Ukraine
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn className="text-center mt-12">
                        <a href="/stories" className="btn bg-white/10 text-white border-white/20">
                            View All Success Stories
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                    </FadeIn>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-20 bg-gradient-to-br from-ukBlue/10 to-ukYellow/10">
                <div className="container">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our <span className="text-ukYellow">Partners</span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            We work with trusted organizations and institutions to maximize our impact and reach.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((partner) => (
                            <FadeIn key={partner} delay={0.1 * partner}>
                                <div className="card p-6 flex items-center justify-center hover:bg-white/10 transition-all">
                                    <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                                        <div className="text-2xl font-bold text-ukYellow">P{partner}</div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-ukBlue">
                <div className="container text-center">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to <span className="text-ukYellow">Make an Impact</span>?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                            Join us in our mission to deliver critical medical aid to communities in need.
                            Your support can save lives and make a lasting difference.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="/donate" className="btn btn-yellow text-lg px-8 py-4">
                                Donate Now
                            </a>
                            <a href="/volunteer" className="btn bg-white/20 text-white border-white/30 text-lg px-8 py-4">
                                Volunteer
                            </a>
                            <a href="/contact" className="btn bg-white/10 text-white border-white/20 text-lg px-8 py-4">
                                Become a Partner
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}