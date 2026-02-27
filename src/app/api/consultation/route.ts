import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export const dynamic = "force-dynamic";

// Initialize DOMPurify on the server
const window = new JSDOM("").window;
const purify = DOMPurify(window);

// Same schema as frontend for server-side validation
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

// Simple in-memory rate limiter for demo purposes
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5; // Max 5 requests
const WINDOW_MS = 60 * 1000; // per 1 minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return true;
    }

    if (now - record.lastReset > WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count += 1;
    return true;
}

export async function GET() {
    return NextResponse.json({ status: "API is operational" });
}

export async function POST(req: NextRequest) {
    try {
        // 1. Rate Limiting Check
        const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
        const allowed = checkRateLimit(ip);

        if (!allowed) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await req.json();

        // 2. Server-Side Zod Validation
        const validatedData = formSchema.parse(body);

        // 3. Input Sanitization (XSS Prevention)
        const sanitizedData = {
            name: purify.sanitize(validatedData.name),
            phone: purify.sanitize(validatedData.phone),
            monthlyBill: purify.sanitize(validatedData.monthlyBill),
            propertyType: purify.sanitize(validatedData.propertyType),
        };

        // 4. Proceed with secure logic... (e.g., save to Database, send Email)
        console.log("Secure Payload Processed:", sanitizedData);

        // Return success
        return NextResponse.json({ success: true, message: "Audit request securely processed." });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid form data.", details: error.flatten().fieldErrors }, { status: 400 });
        }
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
