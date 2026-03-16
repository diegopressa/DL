import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        let settings = await prisma.globalSettings.findUnique({
            where: { id: 1 }
        });
        
        if (!settings) {
            settings = await prisma.globalSettings.create({
                data: {
                    id: 1,
                    whatsapp: "59899000000",
                    email: "info@dldiseno.uy",
                    phone: "+598 99 000 000",
                    address: "Montevideo, Uruguay"
                }
            });
        }
        return NextResponse.json(settings);
    } catch (error) {
        console.error("API Settings Error:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}
