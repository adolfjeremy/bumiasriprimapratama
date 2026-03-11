/**
 * Detects the current device type based on screen width.
 *
 * Breakpoints:
 *   - mobile  : width < 768px
 *   - tablet  : 768px ≤ width < 1024px
 *   - desktop : width ≥ 1024px
 *
 * @returns {"mobile" | "tablet" | "desktop"}
 */
export function getDevice() {
    const width = window.innerWidth;

    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
}

/**
 * Convenience boolean helpers.
 */
export const isMobile = () => getDevice() === "mobile";
export const isTablet = () => getDevice() === "tablet";
export const isDesktop = () => getDevice() === "desktop";

/**
 * Calls the callback whenever the device type changes (on resize).
 * Returns an unsubscribe function.
 *
 * @param {(device: "mobile" | "tablet" | "desktop") => void} callback
 * @returns {() => void} unsubscribe
 */
export function onDeviceChange(callback) {
    let current = getDevice();

    function handleResize() {
        const next = getDevice();
        if (next !== current) {
            current = next;
            callback(current);
        }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
}
