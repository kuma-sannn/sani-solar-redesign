"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number."),
    monthlyBill: z.string()
        .min(1, "Please enter a bill amount.")
        .refine((val) => !isNaN(Number(val)), "Must be a number.")
        .refine((val) => Number(val) >= 500, "Bill amount is too low to qualify for solar ROI estimation.")
        .refine((val) => Number(val) <= 1000000, "Please enter a realistic bill amount."),
    propertyType: z.enum(["Residential", "Commercial", "Industrial"], {
        message: "Please select a valid property type.",
    }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            monthlyBill: "",
            propertyType: undefined,
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/consultation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to submit request.");
            }

            console.log("Form successfully submitted:", result);
            setIsSuccess(true);
            reset();

            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-primary/20 text-primary-foreground border border-primary/50 rounded-xl p-4 flex items-center gap-3 mb-6"
                    >
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                        <p className="font-medium">Thank you! Your free audit request has been received.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/80">Full Name</label>
                    <input
                        {...register("name")}
                        type="text"
                        id="name"
                        className={`w-full bg-background/10 border ${errors.name ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20 focus:ring-primary'} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all`}
                        placeholder="John Doe"
                    />
                    {errors.name && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-white/80">Phone Number</label>
                    <input
                        {...register("phone")}
                        type="tel"
                        id="phone"
                        className={`w-full bg-background/10 border ${errors.phone ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20 focus:ring-primary'} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all`}
                        placeholder="+91 98xxx xxxxx"
                    />
                    {errors.phone && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="monthlyBill" className="text-sm font-medium text-white/80">Monthly Bill Amount (₹)</label>
                    <input
                        {...register("monthlyBill")}
                        type="number"
                        id="monthlyBill"
                        className={`w-full bg-background/10 border ${errors.monthlyBill ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20 focus:ring-primary'} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all`}
                        placeholder="e.g. 5000"
                    />
                    {errors.monthlyBill && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.monthlyBill.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="propertyType" className="text-sm font-medium text-white/80">Property Type</label>
                    <div className="relative">
                        <select
                            {...register("propertyType")}
                            id="propertyType"
                            defaultValue=""
                            className={`w-full bg-background/10 border ${errors.propertyType ? 'border-red-500/50 focus:ring-red-500' : 'border-white/20 focus:ring-primary'} rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer`}
                        >
                            <option value="" disabled className="text-gray-900 bg-white">Select Property Type</option>
                            <option value="Residential" className="text-gray-900 bg-white">Residential</option>
                            <option value="Commercial" className="text-gray-900 bg-white">Commercial</option>
                            <option value="Industrial" className="text-gray-900 bg-white">Industrial</option>
                        </select>
                        {/* Custom downward arrow for select */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    {errors.propertyType && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.propertyType.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="pt-6">
                <motion.button
                    animate={{
                        boxShadow: isSubmitting || isSuccess ? "none" : [
                            "0px 0px 0px 0px rgba(4, 120, 87, 0.4)",
                            "0px 0px 20px 10px rgba(4, 120, 87, 0.2)",
                            "0px 0px 0px 0px rgba(4, 120, 87, 0.4)"
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground text-xl font-bold py-5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" /> Processing...
                        </>
                    ) : (
                        "Claim Your Free Solar Audit"
                    )}
                </motion.button>
            </div>

            <p className="text-center text-sm text-white/40 mt-4">
                We respect your privacy. All information is kept confidential.
            </p>
        </form>
    );
}
