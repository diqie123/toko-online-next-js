import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: function NextImage(props: any) {
    const { src, alt, fill, priority, placeholder, blurDataURL, loader, ...rest } = props;
    return React.createElement("img", {
      src: typeof src === "string" ? src : src?.src,
      alt,
      ...rest
    });
  }
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: function NextLink(props: any) {
    const { href, children, prefetch, replace, scroll, shallow, locale, ...rest } = props;
    const resolved = typeof href === "string" ? href : href?.pathname ?? "";
    return React.createElement("a", { href: resolved, ...rest }, children);
  }
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
});
