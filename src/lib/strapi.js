const BASE_URL = process.env.STRAPI_URL || import.meta.env.STRAPI_URL;
const TOKEN = process.env.STRAPI_API_TOKEN || import.meta.env.STRAPI_API_TOKEN;

export async function fetchAPI(path) {
    if (!BASE_URL || BASE_URL === "undefined") {
        console.error("CRITICAL ERROR: STRAPI_URL environment variable is missing.");
        return { data: [], meta: { pagination: { pageCount: 0, total: 0 } } };
    }

    try {
        const res = await fetch(`${BASE_URL}${path}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });

        const text = await res.text();

        if (!res.ok) {
            console.error(`API Error ${res.status}: ${text}`);
            return { data: [], meta: { pagination: { pageCount: 0, total: 0 } } };
        }

        return JSON.parse(text);
    } catch (error) {
        console.error(`Fetch API Error for path ${path}:`, error.message);
        return { data: [], meta: { pagination: { pageCount: 0, total: 0 } } };
    }
}

/**
 * Build the full URL for a Strapi media file.
 * Handles both relative paths (/uploads/…) and absolute URLs (https://cdn.example.com/…).
 */
export function getStrapiMedia(url) {
    if (!url) return null;
    if (url.startsWith("http")) return url;       // already absolute
    return `${BASE_URL}${url}`;                    // prepend STRAPI_URL
}