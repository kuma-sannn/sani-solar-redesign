import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    return NextResponse.json({ status: "API is operational" });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        console.log("Minimal API Received:", body);
        return NextResponse.json({ success: true, message: "Minimal API Received" });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
