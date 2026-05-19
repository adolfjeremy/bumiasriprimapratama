const BASE_URL = import.meta.env.STRAPI_URL;
const TOKEN = import.meta.env.STRAPI_API_TOKEN;

export async function fetchAPI(path) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });

    const text = await res.text(); // ambil raw response

    console.log('STATUS:', res.status);
    console.log('RESPONSE:', text);

    if (!res.ok) {
        throw new Error(`API Error ${res.status}: ${text}`);
    }

    return JSON.parse(text);
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