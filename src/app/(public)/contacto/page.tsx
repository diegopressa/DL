import React from "react";
import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contacto | DL Diseño & Estampado",
  description:
    "Contactate con nosotros para presupuestos de uniformes corporativos y prendas personalizadas.",
};

export default function ContactoPage() {
  return <ContactPageClient />;
}