import { getSeoPages } from "@/actions/seoActions";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dldiseno.uy";

export async function GET() {
    const pages = await getSeoPages();
    const indexable = (pages || []).filter((p: any) => p.robotsIndex !== false);

    const urls = indexable.map((p: any) => {
        const slug = p.pageSlug === "/" ? "" : p.pageSlug;
        return `  <url>
    <loc>${SITE_URL}${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p.pageSlug === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
    }).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
}
