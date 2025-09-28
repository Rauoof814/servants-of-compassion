import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Users, Target, Heart, Award, Clock, Shield,
    Star, Calendar, MapPin, Phone, Mail, Download,
    ChevronDown, Play, Instagram, Facebook, Twitter
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

export default function About() {
    const { state } = useSite();
    const [activeTab, setActiveTab] = useState("mission");
    const [activeAccordion, setActiveAccordion] = useState(null);

    const teamMembers = [
        {
            name: "John Smith",
            role: "CEO & Founder",
            bio: "Former emergency medical technician with 15+ years of experience in humanitarian aid.",
            image: "/team/ceo.jpg"
        },
        {
            name: "Maria Johnson",
            role: "Operations Director",
            bio: "Logistics expert specializing in medical supply chain management across conflict zones.",
            image: "/team/operations.jpg"
        },
        {
            name: "David Chen",
            role: "Medical Director",
            bio: "Board-certified emergency physician with extensive field experience in disaster response.",
            image: "/team/medical.jpg"
        },
        {
            name: "Sarah Williams",
            role: "Partnership Coordinator",
            bio: "Former UN aid worker with deep connections in the international humanitarian community.",
            image: "/team/partnerships.jpg"
        }
    ];

    const milestones = [
        { year: "2022", event: "Organization founded in response to Ukraine crisis", impact: "10 ambulances deployed" },
        { year: "2023 Q1", event: "First major fundraising campaign", impact: "$500,000 raised" },
        { year: "2023 Q2", event: "Partnership with major hospitals established", impact: "25 medical facilities supported" },
        { year: "2023 Q3", event: "International volunteer program launched", impact: "100+ volunteers recruited" },
        { year: "2023 Q4", event: "Mobile medical clinic initiative started", impact: "5 clinics operational" },
        { year: "2024", event: "Expansion to additional regions", impact: "50+ communities served" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-ukBlue/20 to-ukYellow/20 z-0" />
                <div className="container relative z-10">
                    <FadeIn>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6">
                            About <span className="text-ukYellow">Servants of Compassion</span>
                        </h1>
                        <p className="text-xl text-white/80 text-center max-w-3xl mx-auto leading-relaxed">
                            We are a dedicated team of humanitarian professionals committed to delivering
                            life-saving medical aid and support to communities affected by conflict in Ukraine.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gray-900">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <FadeIn>
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    Our <span className="text-ukBlue">Mission</span> & <span className="text-ukYellow">Vision</span>
                                </h2>
                                <p className="text-lg text-white/80 mb-6 leading-relaxed">
                                    Founded in 2022, Servants of Compassion emerged as a direct response to the
                                    humanitarian crisis in Ukraine. Our mission is simple yet profound: to bridge
                                    the gap between injury and care by delivering critical medical resources where
                                    they are needed most.
                                </p>
                                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                                    We envision a world where every community has access to emergency medical care,
                                    regardless of conflict or circumstance. Through strategic partnerships, transparent
                                    operations, and unwavering commitment, we're turning this vision into reality.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex items-center">
                                        <Target className="w-8 h-8 text-ukBlue mr-3" />
                                        <div>
                                            <div className="font-semibold text-white">Clear Mission</div>
                                            <div className="text-white/70 text-sm">Save lives through medical aid</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Heart className="w-8 h-8 text-ukYellow mr-3" />
                                        <div>
                                            <div className="font-semibold text-white">Compassionate Approach</div>
                                            <div className="text-white/70 text-sm">People-first humanitarian work</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="card p-6 text-center">
                                    <div className="text-4xl font-bold text-ukYellow mb-2">50+</div>
                                    <div className="text-white/80">Ambulances Deployed</div>
                                </div>
                                <div className="card p-6 text-center">
                                    <div className="text-4xl font-bold text-ukYellow mb-2">5,000+</div>
                                    <div className="text-white/80">Medical Kits Delivered</div>
                                </div>
                                <div className="card p-6 text-center">
                                    <div className="text-4xl font-bold text-ukYellow mb-2">100+</div>
                                    <div className="text-white/80">Trained Volunteers</div>
                                </div>
                                <div className="card p-6 text-center">
                                    <div className="text-4xl font-bold text-ukYellow mb-2">25+</div>
                                    <div className="text-white/80">Partner Hospitals</div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-950">
                <div className="container">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Meet Our <span className="text-ukYellow">Leadership Team</span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Our diverse team brings together experts from medicine, logistics, humanitarian aid,
                            and international development to create meaningful impact.
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <FadeIn key={index} delay={0.1 * index}>
                                <div className="card p-6 text-center group hover:bg-white/10 transition-all">
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-ukBlue to-ukYellow p-1">
                                        <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-white mb-2">{member.name}</h3>
                                    <div className="text-ukYellow mb-3">{member.role}</div>
                                    <p className="text-white/70 text-sm">{member.bio}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 bg-gray-900">
                <div className="container">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our <span className="text-ukBlue">Journey</span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            From humble beginnings to making a significant impact across Ukraine,
                            here's our story of growth and dedication.
                        </p>
                    </FadeIn>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-ukYellow/30 h-full"></div>
                        {milestones.map((milestone, index) => (
                            <FadeIn key={index} delay={0.1 * index}>
                                <div className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className="w-1/2">
                                        <div className={`card p-6 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-md`}>
                                            <div className="text-ukYellow font-bold mb-2">{milestone.year}</div>
                                            <h4 className="text-white font-semibold mb-2">{milestone.event}</h4>
                                            <p className="text-white/70 text-sm">{milestone.impact}</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 bg-ukYellow rounded-full mx-4 flex-shrink-0"></div>
                                    <div className="w-1/2"></div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-gradient-to-br from-ukBlue/10 to-ukYellow/10">
                <div className="container">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our <span className="text-ukYellow">Core Values</span>
                        </h2>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Shield className="w-8 h-8" />, title: "Integrity", desc: "Transparent operations and honest reporting" },
                            { icon: <Heart className="w-8 h-8" />, title: "Compassion", desc: "People-first approach to humanitarian work" },
                            { icon: <Target className="w-8 h-8" />, title: "Excellence", desc: "Highest standards in medical aid delivery" },
                            { icon: <Users className="w-8 h-8" />, title: "Collaboration", desc: "Strong partnerships for greater impact" }
                        ].map((value, index) => (
                            <FadeIn key={index} delay={0.1 * index}>
                                <div className="card p-6 text-center group hover:bg-white/10 transition-all">
                                    <div className="text-ukYellow mb-4">{value.icon}</div>
                                    <h3 className="font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-white/70">{value.desc}</p>
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
                            Join Us in <span className="text-ukYellow">Making a Difference</span>
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                            Whether through donation, volunteering, or partnership, your support enables us
                            to continue our life-saving work in Ukraine.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="/donate" className="btn btn-yellow text-lg px-8 py-4">
                                Donate Now
                            </a>
                            <a href="/volunteer" className="btn bg-white/20 text-white border-white/30 text-lg px-8 py-4">
                                Volunteer
                            </a>
                            <a href="/contact" className="btn bg-white/10 text-white border-white/20 text-lg px-8 py-4">
                                Partner With Us
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}