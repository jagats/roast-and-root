/* ==========================================================================
   ROAST & ROOT COFFEE CO. — MAIN JAVASCRIPT
   One shared file for every page. Each feature is wrapped in its own
   init function so pages only run what they contain.
   ========================================================================== */

"use strict";

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION (hamburger menu)
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  // Close the menu when a link is chosen (useful on mobile)
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* --------------------------------------------------------------------------
   2. EMAIL VALIDATION (shared by newsletter + contact form)
   -------------------------------------------------------------------------- */
function isValidEmail(email) {
  // Simple pattern: something@something.something
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* --------------------------------------------------------------------------
   3. NEWSLETTER FORM VALIDATION
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.querySelector(".newsletter-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Demo site — no real submission
    const emailInput = form.querySelector("input[type='email']");
    const errorMsg = form.querySelector(".error-msg");

    if (emailInput.value.trim() === "") {
      errorMsg.textContent = "Please enter your email address.";
      form.classList.add("invalid");
    } else if (!isValidEmail(emailInput.value.trim())) {
      errorMsg.textContent = "That email address doesn't look right — please check it.";
      form.classList.add("invalid");
    } else {
      form.classList.remove("invalid");
      emailInput.value = "";
      errorMsg.textContent = "";
      alert("Thank you for subscribing! Welcome to the Roast & Root community."); // Demo feedback
    }
  });
}

/* --------------------------------------------------------------------------
   4. COFFEE CATEGORY FILTERING (coffee.html)
   -------------------------------------------------------------------------- */
function initCoffeeFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const coffeeCards = document.querySelectorAll(".coffee-card");
  if (filterButtons.length === 0 || coffeeCards.length === 0) return;

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Update which button looks active
      filterButtons.forEach(function (btn) { btn.classList.remove("active"); });
      button.classList.add("active");

      const filter = button.dataset.filter; // "all", "light", "medium", "dark"

      coffeeCards.forEach(function (card) {
        const roast = card.dataset.roast;
        if (filter === "all" || filter === roast) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. PRODUCT DETAIL MODAL (coffee.html)
   Each card stores its details in data-* attributes; the modal reads them.
   -------------------------------------------------------------------------- */
function initProductModal() {
  const modal = document.getElementById("product-modal");
  if (!modal) return;

  const titleEl = modal.querySelector("#pm-title");
  const regionEl = modal.querySelector("#pm-region");
  const bodyEl = modal.querySelector("#pm-body");
  const priceEl = modal.querySelector("#pm-price");

  function openModal(card) {
    titleEl.textContent = card.dataset.name;
    regionEl.textContent = card.dataset.region;
    priceEl.textContent = card.dataset.price;
    bodyEl.innerHTML = card.querySelector(".modal-data").innerHTML;
    modal.classList.add("open");
    document.body.style.overflow = "hidden"; // stop page scrolling behind modal
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".coffee-card .open-product").forEach(function (button) {
    button.addEventListener("click", function () {
      openModal(button.closest(".coffee-card"));
    });
  });

  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
  });
}

/* --------------------------------------------------------------------------
   6. JOURNAL ARTICLE MODAL (journal.html)
   Full article text lives in a hidden <template> inside each card.
   -------------------------------------------------------------------------- */
function initJournalModal() {
  const modal = document.getElementById("article-modal");
  if (!modal) return;

  const titleEl = modal.querySelector("#am-title");
  const metaEl = modal.querySelector("#am-meta");
  const bodyEl = modal.querySelector("#am-body");

  function openModal(card) {
    titleEl.textContent = card.dataset.title;
    metaEl.textContent = card.dataset.meta;
    bodyEl.innerHTML = card.querySelector(".article-template").innerHTML;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".article-card .open-article").forEach(function (button) {
    button.addEventListener("click", function () {
      openModal(button.closest(".article-card"));
    });
  });

  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
  });
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM VALIDATION (contact.html)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  function setFieldError(input, message) {
    const field = input.closest(".form-field");
    field.classList.add("invalid");
    field.querySelector(".error-msg").textContent = message;
  }

  function clearFieldError(input) {
    const field = input.closest(".form-field");
    field.classList.remove("invalid");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Demo site — nothing is actually sent
    let isValid = true;

    const name = form.querySelector("#contact-name");
    const email = form.querySelector("#contact-email");
    const subject = form.querySelector("#contact-subject");
    const message = form.querySelector("#contact-message");

    // Name
    if (name.value.trim().length < 2) {
      setFieldError(name, "Please tell us your name.");
      isValid = false;
    } else { clearFieldError(name); }

    // Email
    if (email.value.trim() === "") {
      setFieldError(email, "Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      setFieldError(email, "Please enter a valid email address.");
      isValid = false;
    } else { clearFieldError(email); }

    // Subject
    if (subject.value.trim() === "") {
      setFieldError(subject, "Please add a subject so we can route your message.");
      isValid = false;
    } else { clearFieldError(subject); }

    // Message
    if (message.value.trim().length < 10) {
      setFieldError(message, "Please write a message of at least 10 characters.");
      isValid = false;
    } else { clearFieldError(message); }

    // Show success message (demo only — no data is sent anywhere)
    if (isValid) {
      form.reset();
      const success = document.getElementById("form-success");
      success.classList.add("show");
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  // Clear an error as soon as the user starts fixing the field
  form.querySelectorAll("input, textarea").forEach(function (input) {
    input.addEventListener("input", function () { clearFieldError(input); });
  });
}

/* --------------------------------------------------------------------------
   8. BREWING CALCULATOR (brewing.html)
   Formula: coffee (g) = total water (ml) / ratio
   -------------------------------------------------------------------------- */
function initBrewingCalculator() {
  const calculator = document.getElementById("brew-calculator");
  if (!calculator) return;

  const cupsInput = calculator.querySelector("#calc-cups");
  const ratioInput = calculator.querySelector("#calc-ratio");
  const perCupInput = calculator.querySelector("#calc-percup");

  const waterOut = calculator.querySelector("#calc-result-water");
  const coffeeOut = calculator.querySelector("#calc-result-coffee");
  const perCupOut = calculator.querySelector("#calc-result-percup");
  const noteOut = calculator.querySelector("#calc-note");

  function calculate() {
    const cups = parseInt(cupsInput.value, 10);
    const ratio = parseFloat(ratioInput.value);
    const perCup = parseInt(perCupInput.value, 10);

    // Guard against empty or impossible inputs
    if (!cups || cups < 1 || !ratio || ratio < 1 || !perCup || perCup < 50) {
      waterOut.textContent = "—";
      coffeeOut.textContent = "—";
      perCupOut.textContent = "—";
      noteOut.textContent = "Enter a valid number of cups, water per cup and ratio above.";
      return;
    }

    const totalWater = cups * perCup;          // ml
    const coffee = Math.round((totalWater / ratio) * 10) / 10; // g, 1 decimal

    waterOut.textContent = totalWater + " ml";
    coffeeOut.textContent = coffee + " g";
    perCupOut.textContent = ratio + " : 1";

    noteOut.textContent =
      "For " + cups + " cup" + (cups > 1 ? "s" : "") +
      ", brew " + totalWater + " ml of water with " + coffee +
      " g of coffee at a 1:" + ratio + " ratio.";
  }

  calculator.querySelectorAll("input").forEach(function (input) {
    input.addEventListener("input", calculate);
  });

  calculate(); // run once with the default values on page load
}

/* --------------------------------------------------------------------------
   9. SCROLL REVEAL ANIMATIONS
   Adds .visible to every .reveal element as it enters the viewport.
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length === 0) return;

  // Graceful fallback for very old browsers: just show everything
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(function (el) { el.classList.add("visible"); });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate each element only once
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(function (el) { observer.observe(el); });
}

/* --------------------------------------------------------------------------
   START EVERYTHING on page load
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initNewsletterForm();
  initCoffeeFilter();
  initProductModal();
  initJournalModal();
  initContactForm();
  initBrewingCalculator();
  initScrollReveal();
});
