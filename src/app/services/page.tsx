"use client";

import { motion } from "framer-motion";
import {
    Sun,
    Settings,
    PiggyBank,
    Search,
    BatteryCharging,
    Factory,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
    const services = [
        {
            id: "installation",
            title: "Panel Installations",
            description: "Precision-engineered solar array setups for maximum sunlight capture and longevity on your unique roof structure.",
            icon: <Sun className="w-8 h-8 text-primary-foreground" />,
        },
        {
            id: "design",
            title: "System Design & Integration",
            description: "Custom-architected energy grids that seamlessly integrate with your existing electrical framework without disruption.",
            icon: <Settings className="w-8 h-8 text-primary-foreground" />,
        },
        {
            id: "financing",
            title: "Financing & Incentives",
            description: "Expert guidance in navigating government subsidies, tax credits, and specialized loan structures to minimize your upfront cost.",
            icon: <PiggyBank className="w-8 h-8 text-primary-foreground" />,
        },
        {
            id: "audit",
            title: "Energy Audits & Optimization",
            description: "Comprehensive site surveys and ongoing system diagnostics to ensure your setup operates at peak efficiency year-round.",
            icon: <Search className="w-8 h-8 text-primary-foreground" />,
        },
        {
            id: "battery",
            title: "Battery Storage",
            description: "High-capacity lithium-ion resilience. Store excess daytime energy to power your life seamlessly through the night or during grid outages.",
            icon: <BatteryCharging className="w-8 h-8 text-primary-foreground" />,
        },
        {
            id: "commercial",
            title: "Commercial Solutions",
            description: "Massive scale deployments for businesses and factories. Offset immense energy overheads and proudly display your green credentials.",
            icon: <Factory className="w-8 h-8 text-primary-foreground" />,
        }
    ];

    return (
        <div className="bg-background min-h-screen text-foreground">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 text-center border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_60%)] opacity-10 pointer-events-none" />
                <div className="container max-w-4xl mx-auto relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                    >
                        Our <span className="text-primary">Services</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
                    >
                        Comprehensive green energy solutions meticulously designed for residential and commercial success in Mumbai.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                id={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative flex flex-col bg-foreground/5 border border-white/5 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(4,120,87,0.2)] hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 shadow-inner">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>

                                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                                    {service.description}
                                </p>

                                <div className="pt-6 border-t border-white/5 mt-auto">
                                    <Link
                                        href={`/contact?service=${service.id}`}
                                        className="flex items-center gap-2 text-primary font-bold group-hover:text-primary/80 transition-colors w-max"
                                    >
                                        Request a Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust CTA Section */}
            <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-10 pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">
                            Ready to harness the sun?
                        </h2>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 font-medium">
                            Join the hundreds of Sani Solar clients preventing millions of pounds of CO₂ emissions every year.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-extrabold rounded-full hover:bg-white hover:scale-105 transition-all shadow-xl"
                        >
                            Start Your Free Audit
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
