import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Here you would normally send an email or save to DB.
        // For now, we just log it and return success as requested.
        console.log("Contact Form Submission:", { name, email, message });

        return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" });
    } catch (error) {
        console.error("API Contact Error:", error);
        return NextResponse.json({ error: "No se pudo enviar el mensaje" }, { status: 500 });
    }
}
