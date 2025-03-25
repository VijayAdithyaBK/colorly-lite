# colorly-lite 🎨  
**Effortless color manipulation for Node.js—lightweight, fast, and dependency-free.**  

![colorly-lite](https://img.shields.io/badge/colorly--lite-v1.0.1-blue)  
![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)  
![License](https://img.shields.io/badge/license-MIT-blue)  

## 📌 Features
✅ Convert between HEX, RGB, and HSL.  
✅ Lighten, darken, saturate, and desaturate colors.  
✅ Generate complementary and analogous colors.  
✅ Check contrast ratios for accessibility.  
✅ Zero dependencies—pure JavaScript, fast & efficient.  

## 🚀 Installation
Install via **npm**, **yarn**, or **pnpm**:
```sh
npm install colorly-lite
```
```sh
yarn add colorly-lite
```
```sh
pnpm add colorly-lite
```

## 🔧 Usage
### 1️⃣ Import the module
```js
const ColorlyLite = require("colorly-lite");
```

### 2️⃣ Convert Colors
```js
const color = new ColorlyLite("#ff5733");

console.log(color.color); // { r: 255, g: 87, b: 51 }
console.log(color.toHsl()); // { h: 11, s: 100, l: 60 }
console.log(color.toHex()); // "#ff5733"
```

### 3️⃣ Manipulate Colors
```js
console.log(color.lighten(20)); // "#ff9985"
console.log(color.darken(20));  // "#992d1a"
console.log(color.saturate(20));// "#ff401a"
console.log(color.desaturate(20));// "#c16857"
```

### 4️⃣ Generate Color Schemes
```js
console.log(color.getComplementary()); // "#33b3ff"
console.log(color.getAnalogous()); // ["#ff8533", "#ff5733", "#ff3333"]
```

### 5️⃣ Check Contrast
```js
const white = new ColorlyLite("#ffffff");
console.log(white.contrastWith("#000000")); // 21.0 (Max contrast)
console.log(white.contrastWith("#bbbbbb")); // Low contrast
```

## 📖 API Reference
### **`new ColorlyLite(color)`**
- Accepts a **HEX (#RRGGBB or #RGB)**, **RGB string ("rgb(255,87,51)")**, or **HSL string ("hsl(11,100%,60%)")**.
- Throws an error if the input is invalid.

### **Color Conversion Methods**
- `toHex()` → Returns the color in HEX format.
- `toRgb()` → Returns `{ r, g, b }` object.
- `toHsl()` → Returns `{ h, s, l }` object.
- `hslToHex(h, s, l)` → Converts HSL to HEX.

### **Color Manipulation Methods**
- `lighten(percent)` → Lightens the color by `percent%`.
- `darken(percent)` → Darkens the color by `percent%`.
- `saturate(percent)` → Increases saturation.
- `desaturate(percent)` → Decreases saturation.

### **Color Harmony Methods**
- `getComplementary()` → Returns the complementary color.
- `getAnalogous()` → Returns an array of analogous colors.

### **Contrast Methods**
- `contrastWith(color)` → Returns contrast ratio between two colors.

## 🧪 Running Tests
Run the test suite using Jest:
```sh
npm test
```

## 🛠 Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m "Add new feature"`
4. Push: `git push origin feature-branch`
5. Open a Pull Request.

## 📜 License
MIT License © 2025 **colorly-lite**  
