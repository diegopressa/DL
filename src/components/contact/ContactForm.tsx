"use client";

import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus("success");
                setMessage("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
                (e.target as HTMLFormElement).reset();
            } else {
                throw new Error();
            }
        } catch (error) {
            setStatus("error");
            setMessage("Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Nombre completo
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Juan Pérez"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="juan@empresa.com"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Mensaje o consulta
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Contanos qué necesitás..."
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-black py-5 rounded-2xl text-xl shadow-xl shadow-blue-900/40 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
                {status === "loading" ? (
                    <Loader2 className="animate-spin" size={24} />
                ) : (
                    <Send size={24} />
                )}
                {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
            </button>

            {status !== "idle" && (
                <div className={`p-4 rounded-xl text-center font-bold ${
                    status === "success" ? "bg-green-500/20 text-green-400" : 
                    status === "error" ? "bg-red-500/20 text-red-400" : ""
                }`}>
                    {message}
                </div>
            )}
        </form>
    );
}
