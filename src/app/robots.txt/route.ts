import { getSeoSettings } from "@/actions/seoActions";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dldiseno.uy";

export async function GET() {
    const settings = await getSeoSettings();
    const content = settings?.robotsTxt ||
        `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${SITE_URL}/sitemap.xml`;

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
