const ColorlyLite = require("../index");

describe("ColorlyLite Library", () => {
    // ✅ 1. Color Parsing Tests
    test("Parses HEX color correctly", () => {
        const color = new ColorlyLite("#ff5733");
        expect(color.color).toEqual({ r: 255, g: 87, b: 51 });
    });

    test("Parses shorthand HEX color correctly", () => {
        const color = new ColorlyLite("#f53");
        expect(color.color).toEqual({ r: 255, g: 85, b: 51 });
    });

    test("Parses RGB color string correctly", () => {
        const color = new ColorlyLite("rgb(255, 87, 51)");
        expect(color.color).toEqual({ r: 255, g: 87, b: 51 });
    });

    test("Throws error for invalid color format", () => {
        expect(() => new ColorlyLite("invalidColor")).toThrow(
            "Unsupported color format"
        );
    });

    // ✅ 2. Color Conversion Tests
    test("Converts HEX to RGB correctly", () => {
        const color = new ColorlyLite("#ff5733");
        expect(color.toHex()).toBe("#ff5733");
    });

    test("Converts RGB to HSL correctly", () => {
        const color = new ColorlyLite("#ff5733");
        expect(color.toHsl()).toEqual({ h: 11, s: 100, l: 60 });
    });

    test("Converts HSL to HEX correctly", () => {
        const color = new ColorlyLite("#ff5733");
        const { h, s, l } = color.toHsl();
        expect(color.hslToHex(h, s, l)).toBe("#ff5833");
    });

    // ✅ 3. Color Manipulation Tests
    test("Lightens color correctly", () => {
        const color = new ColorlyLite("#ff5733");
        expect(color.lighten(20)).toBe("#ffac99");
    });

    test("Darkens color correctly", () => {
        const color = new ColorlyLite("#ff5733");
        expect(color.darken(20)).toBe("#cc2500");
    });

    test("Saturates color correctly", () => {
        const color = new ColorlyLite("#808080"); // Neutral gray
        expect(color.saturate(20)).not.toBe("#808080");
    });

    test("Desaturates color correctly", () => {
        const color = new ColorlyLite("#ff5733");
        expect(color.desaturate(20)).not.toBe("#ff5733");
    });

    // ✅ 4. Color Harmony Tests
    test("Generates correct complementary color", () => {
        const color = new ColorlyLite("#ff5733");
        expect(color.getComplementary()).toBe("#33daff");
    });

    test("Generates correct analogous colors", () => {
        const color = new ColorlyLite("#ff5733");
        expect(color.getAnalogous()).toEqual([
            "#ffbe33",
            "#ff5833",
            "#ff3374",
        ]);
    });

    // ✅ 5. Color Contrast Tests
    test("Calculates contrast ratio correctly", () => {
        const color1 = new ColorlyLite("#ffffff"); // White
        const color2 = new ColorlyLite("#000000"); // Black
        expect(color1.contrastWith("#000000")).toBeCloseTo(21.0, 1);
    });

    test("Ensures low contrast between similar colors", () => {
        const color1 = new ColorlyLite("#aaaaaa");
        const color2 = new ColorlyLite("#bbbbbb");
        expect(color1.contrastWith("#bbbbbb")).toBeLessThan(1.2);
    });

    // ✅ 6. Edge Cases and Boundary Tests
    test("Handles extreme values correctly", () => {
        const white = new ColorlyLite("#ffffff");
        expect(white.darken(100)).toBe("#000000"); // Fully darkened

        const black = new ColorlyLite("#000000");
        expect(black.lighten(100)).toBe("#ffffff"); // Fully lightened
    });

    test("Handles invalid HEX input", () => {
        expect(() => new ColorlyLite("#invalid")).toThrow(
            "Unsupported color format"
        );
    });

    test("Handles invalid RGB input", () => {
        expect(() => new ColorlyLite("rgb(300, -20, 500)")).toThrow(
            "Invalid RGB format"
        );
    });

    test("Handles out-of-range lighten/darken values", () => {
        const color = new ColorlyLite("#ff5733");
        expect(color.lighten(200)).toBe("#ffffff");
        expect(color.darken(200)).toBe("#000000");
    });
});
