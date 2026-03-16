import React from "react";
import { buildMetadata } from "@/lib/buildMetadata";
import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

export async function generateMetadata(): Promise<Metadata> {
    try {
        return await buildMetadata("/contacto");
    } catch (e) {
        return {
            title: "Contacto | DL Diseño & Estampado",
            description: "Contactate con nosotros para presupuestos de uniformes y prendas personalizadas."
        };
    }
}

export default function ContactoPage() {
    return <ContactPageClient />;
}

