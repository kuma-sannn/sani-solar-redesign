import Link from "next/link";
import { Sun, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-foreground text-background pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Col */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-primary p-2 rounded-xl">
                                <Sun className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">Sani Solar</span>
                        </Link>
                        <p className="text-muted-foreground/80 leading-relaxed max-w-sm">
                            Illuminating the future with clean, sustainable, and reliable solar energy solutions since 2011.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-white">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-muted-foreground/80 hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="text-muted-foreground/80 hover:text-primary transition-colors">Our Services</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground/80 hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/" className="text-muted-foreground/80 hover:text-primary transition-colors">ROI Calculator</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-white">Our Services</h3>
                        <ul className="space-y-4">
                            <li><Link href="/services#residential" className="text-muted-foreground/80 hover:text-primary transition-colors">Residential Solar</Link></li>
                            <li><Link href="/services#commercial" className="text-muted-foreground/80 hover:text-primary transition-colors">Commercial Solutions</Link></li>
                            <li><Link href="/services#battery" className="text-muted-foreground/80 hover:text-primary transition-colors">Battery Storage</Link></li>
                            <li><Link href="/services#audit" className="text-muted-foreground/80 hover:text-primary transition-colors">Energy Audits</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-white">Contact Us</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-primary shrink-0" />
                                <span className="text-muted-foreground/80">
                                    203, Sita kunj Building, Liberty Garden Cross Rd Number 3, Malad West, Mumbai, Maharashtra 400064
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="w-6 h-6 text-primary shrink-0" />
                                <a href="tel:+919870331729" className="text-muted-foreground/80 hover:text-white transition-colors">
                                    +91 98703 31729
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="w-6 h-6 text-primary shrink-0" />
                                <div className="flex flex-col">
                                    <a href="mailto:info@sanisolarsolutions.in" className="text-muted-foreground/80 hover:text-white transition-colors">
                                        info@sanisolarsolutions.in
                                    </a>
                                    <a href="mailto:sagar@sanisolarsolutions.in" className="text-muted-foreground/80 hover:text-white transition-colors">
                                        sagar@sanisolarsolutions.in
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/60">
                    <p>© {new Date().getFullYear()} Sani Solar Solutions. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
