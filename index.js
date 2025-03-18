class ColorlyLite {
    constructor(color) {
        this.color = this.parseColor(color);
    }

    // Parse color input and return an object { r, g, b }
    parseColor(color) {
        if (typeof color !== "string") {
            throw new Error("Unsupported color format");
        }
        if (color.startsWith("#")) {
            const rgb = this.hexToRgb(color);
            if (!rgb) {
                throw new Error("Unsupported color format");
            }
            return rgb;
        } else if (color.startsWith("rgb")) {
            return this.rgbStringToRgb(color);
        } else {
            throw new Error("Unsupported color format");
        }
    }

    // Convert HEX to RGB
    hexToRgb(hex) {
        hex = hex.replace("#", "");
        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((c) => c + c)
                .join("");
        }
        if (hex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(hex)) {
            return null; // Return null for invalid hex
        }
        const intVal = parseInt(hex, 16);
        return {
            r: (intVal >> 16) & 255,
            g: (intVal >> 8) & 255,
            b: intVal & 255,
        };
    }

    // Convert RGB string to RGB object
    rgbStringToRgb(rgbString) {
        const match = rgbString.match(/\d+/g);
        if (!match || match.length < 3) throw new Error("Invalid RGB format");
        const r = parseInt(match[0]);
        const g = parseInt(match[1]);
        const b = parseInt(match[2]);

        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            throw new Error("Invalid RGB format");
        }

        return { r, g, b };
    }

    // Convert RGB to HEX
    toHex() {
        const { r, g, b } = this.color;
        return (
            "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")
        );
    }

    // Convert RGB to HSL
    toHsl() {
        const { r, g, b } = this.color;
        const rNorm = r / 255,
            gNorm = g / 255,
            bNorm = b / 255;
        const max = Math.max(rNorm, gNorm, bNorm),
            min = Math.min(rNorm, gNorm, bNorm);
        let h,
            s,
            l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // Achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case rNorm:
                    h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
                    break;
                case gNorm:
                    h = (bNorm - rNorm) / d + 2;
                    break;
                case bNorm:
                    h = (rNorm - gNorm) / d + 4;
                    break;
            }
            h /= 6;
        }
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100),
        };
    }

    // Lighten a color
    lighten(amount = 20) {
        let { h, s, l } = this.toHsl();
        l = Math.min(100, l + amount);
        return this.hslToHex(h, s, l);
    }

    // Darken a color
    darken(amount = 20) {
        let { h, s, l } = this.toHsl();
        l = Math.max(0, l - amount);
        return this.hslToHex(h, s, l);
    }

    // Saturate a color
    saturate(amount = 20) {
        let { h, s, l } = this.toHsl();
        s = Math.min(100, s + amount);
        return this.hslToHex(h, s, l);
    }

    // Desaturate a color
    desaturate(amount = 20) {
        let { h, s, l } = this.toHsl();
        s = Math.max(0, s - amount);
        return this.hslToHex(h, s, l);
    }

    // Get complementary color
    getComplementary() {
        let { h, s, l } = this.toHsl();
        h = (h + 180) % 360;
        return this.hslToHex(h, s, l);
    }

    // Generate analogous colors
    getAnalogous() {
        let { h, s, l } = this.toHsl();
        return [
            this.hslToHex((h + 30) % 360, s, l),
            this.hslToHex(h, s, l),
            this.hslToHex((h - 30 + 360) % 360, s, l),
        ];
    }

    // Check contrast ratio
    contrastWith(otherColor) {
        const rgb1 = this.color;
        const rgb2 = new ColorlyLite(otherColor).color;
        const lum1 = this.relativeLuminance(rgb1);
        const lum2 = this.relativeLuminance(rgb2);
        return Math.round(
            (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05)
        );
    }

    // Convert HSL to HEX
    hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        const f = (n) => {
            const k = (n + h / 30) % 12;
            return Math.round(
                (l -
                    s *
                        Math.min(l, 1 - l) *
                        Math.max(-1, Math.min(k - 3, 9 - k, 1))) *
                    255
            );
        };
        return `#${f(0).toString(16).padStart(2, "0")}${f(8)
            .toString(16)
            .padStart(2, "0")}${f(4).toString(16).padStart(2, "0")}`;
    }

    // Calculate relative luminance for contrast ratio
    relativeLuminance({ r, g, b }) {
        const gamma = (c) =>
            c / 255 <= 0.03928
                ? c / 255 / 12.92
                : ((c / 255 + 0.055) / 1.055) ** 2.4;
        return 0.2126 * gamma(r) + 0.7152 * gamma(g) + 0.0722 * gamma(b);
    }
}

module.exports = ColorlyLite;
