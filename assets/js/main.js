// WEB ATELIER (UDIT) - Student Project Template JavaScript
// Add your interactive functionality here

document.addEventListener("DOMContentLoaded", function () {
  // Initialize your project functionality
  console.log("WEB ATELIER (UDIT) - Student project initialized");

  // Example: Add smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
  // Note: the page-level morph uses animejs in `sow/analysis.html` (CDN-loaded).
  // Keep this file focused on site-wide utilities.
});
