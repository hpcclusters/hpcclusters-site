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

  // Contact form -> Netlify Forms, submitted via fetch so the page doesn't reload
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new URLSearchParams(new FormData(form)).toString();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Form submission failed");
          var success = document.getElementById("form-success");
          form.hidden = true;
          if (success) success.hidden = false;
        })
        .catch(function () {
          // Netlify Forms needs the JS build step or a real deploy to respond;
          // if the fetch fails (e.g. local preview), fall back to a normal submit.
          form.submit();
        });
    });
  }
});
