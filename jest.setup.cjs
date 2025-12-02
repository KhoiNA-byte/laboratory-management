// jest.setup.cjs
// CommonJS setup file for Jest

try {
  // optional, safe if not installed
  require("@testing-library/jest-dom/extend-expect");
} catch (err) {
  // ignore if not present
}

if (typeof window !== "undefined" && !window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: function (query) {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: function () {}, // deprecated
        removeListener: function () {}, // deprecated
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () {
          return false;
        }
      };
    }
  });
}
