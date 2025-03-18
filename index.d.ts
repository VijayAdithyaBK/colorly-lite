declare module "colorly-lite" {
    export type RGB = { r: number; g: number; b: number };
    export type HSL = { h: number; s: number; l: number };
  
    export class ColorlyLite {
      constructor(color: string);
  
      // Convert color formats
      toHex(): string;
      toRgb(): RGB;
      toHsl(): HSL;
  
      // Manipulate color
      lighten(percent: number): string;
      darken(percent: number): string;
      saturate(percent: number): string;
      desaturate(percent: number): string;
  
      // Generate color harmonies
      getComplementary(): string;
      getAnalogous(): string[];
  
      // Accessibility
      contrastWith(color: string): number;
  
      // Helpers
      static hexToRgb(hex: string): RGB;
      static rgbToHex(r: number, g: number, b: number): string;
      static rgbToHsl(r: number, g: number, b: number): HSL;
      static hslToHex(h: number, s: number, l: number): string;
    }
  }
  