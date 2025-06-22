document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".header__menu-toggle");
  const navMenu = document.querySelector(".header__menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".header__menu-item").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      // Check if the target element exists before scrolling
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add fade-in animation on scroll
  // Assuming elements to fade have the class 'fade-in'
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((el) => observer.observe(el));

  // Added functionality for the testimonial carousel
  let currentSlide = 0;
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "flex" : "none"; // Use flex for layout
      slide.setAttribute("aria-hidden", i !== index); // Add aria-hidden for accessibility
    });
    // Update aria-label for current slide
    if (slides[index]) {
      slides[index].setAttribute(
        "aria-label",
        `Testimonial ${index + 1} of ${slides.length}`
      );
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Initialize the first slide if slides exist
  if (slides.length > 0) {
    showSlide(currentSlide);
  }

  if (prevButton) {
    prevButton.addEventListener("click", prevSlide);
  }
  if (nextButton) {
    nextButton.addEventListener("click", nextSlide);
  }

  // Ensure the top__bar element scrolls the page back to the top
  const topBar = document.querySelector(".top__bar-link");
  if (topBar) {
    topBar.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  const hCaptcha = form.querySelector(
    "textarea[name=h-captcha-response]"
  ).value;

  if (!hCaptcha) {
    e.preventDefault();
    alert("Please fill out captcha field");
    return;
  }

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = "Form submitted successfully";
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});
