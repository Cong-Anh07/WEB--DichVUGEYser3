// Navigation utility for consistent page routing across development and production
export function navigateTo(page) {
  // Handle hash links (same page navigation)
  if (page.startsWith("#")) {
    window.location.hash = page;
    return;
  }

  // Ensure page has .html extension if it's a page name
  if (!page.endsWith(".html") && !page.includes("#") && !page.includes("?")) {
    page += ".html";
  }

  // Use relative path for better compatibility
  if (
    !page.startsWith("./") &&
    !page.startsWith("#") &&
    !page.startsWith("http")
  ) {
    page = "./" + page;
  }

  window.location.href = page;
}

// Get base URL for the application
export function getBaseUrl() {
  const base = document.querySelector("base");
  if (base) {
    return base.href;
  }
  return window.location.origin + "/";
}

// Navigate with query parameters preserved
export function navigateToWithParams(page, params = {}) {
  let url = page;

  // Add .html if needed
  if (!url.endsWith(".html") && !url.includes("#") && !url.includes("?")) {
    url += ".html";
  }

  // Add relative path prefix
  if (
    !url.startsWith("./") &&
    !url.startsWith("#") &&
    !url.startsWith("http")
  ) {
    url = "./" + url;
  }

  // Add query parameters
  const queryString = new URLSearchParams(params).toString();
  if (queryString) {
    url += (url.includes("?") ? "&" : "?") + queryString;
  }

  window.location.href = url;
}

// Initialize navigation - add event listeners to links
export function initNavigation() {
  document.addEventListener("DOMContentLoaded", () => {
    // Handle all internal navigation links
    document.querySelectorAll('a[href$=".html"]').forEach((link) => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("http") && !href.startsWith("#")) {
        // Ensure relative path
        if (!href.startsWith("./")) {
          link.setAttribute("href", "./" + href);
        }
      }
    });
  });
}

// Auto-initialize
if (typeof window !== "undefined") {
  initNavigation();
}
