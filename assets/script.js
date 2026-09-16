// Mobile nav toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(expanded));
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form -> Web3Forms, submitted via fetch so the page doesn't reload
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var payload = Object.fromEntries(new FormData(form));

      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (!result.success) throw new Error(result.message || "Form submission failed");
          var success = document.getElementById("form-success");
          form.hidden = true;
          if (success) success.hidden = false;
        })
        .catch(function () {
          // If the AJAX request fails, fall back to a normal submit so
          // Web3Forms still receives it and redirects to the thank-you page.
          form.submit();
        });
    });
  }
});
