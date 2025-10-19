// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelectorAll('.nav-toggle');
  toggle.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!nav) return;
      nav.classList.toggle('open');
      // simple aria toggle (optional)
      btn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  });

  // simple contact form demo handler (no backend)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // basic UI feedback
      alert('Thank you! Your message has been recorded (demo). To send emails, wire the form to a backend or use a form service.');
      contactForm.reset();
    });
  }
});
// Hero Background Slideshow
const slideshowImages = [
  "assets/images/hero1.jpg",
  "assets/images/hero2.jpg",
  "assets/images/hero3.jpg"
];

let currentSlide = 0;
const heroSection = document.querySelector(".hero-slideshow");

function changeSlide() {
  heroSection.style.backgroundImage = `url('${slideshowImages[currentSlide]}')`;
  currentSlide = (currentSlide + 1) % slideshowImages.length;
}

if (heroSection) {
  changeSlide();
  setInterval(changeSlide, 3000);
}
// --- About Tabs Functionality ---
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".about-tabs li");
  const contents = document.querySelectorAll(".tab-content");

  if (tabs.length && contents.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        tabs.forEach((t) => t.classList.remove("active"));
        // Add active class to the clicked tab
        tab.classList.add("active");

        // Hide all contents
        contents.forEach((c) => c.classList.remove("active"));
        // Show the selected tab content
        const activeContent = document.getElementById(tab.getAttribute("data-tab"));
        if (activeContent) activeContent.classList.add("active");
      });
    });
  }
});

// Smooth scroll for service section links
document.querySelectorAll('.dropdown-menu a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const section = document.querySelector(targetId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Dropdown touch / click handling & smooth scroll (add to script.js)
document.addEventListener('DOMContentLoaded', () => {
  // Enable click-to-toggle on touch / small screens
  document.querySelectorAll('.site-nav .dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      const dropdown = link.parentElement;
      // if viewport small, toggle menu open instead of navigating
      if (window.innerWidth < 992) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });
  });

  // Close dropdowns if clicking outside
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.site-nav .dropdown.open').forEach(dd => {
      if (!dd.contains(e.target)) dd.classList.remove('open');
    });
  });

  // Smooth scroll for internal anchors in dropdown (if href starts with #)
  document.querySelectorAll('.dropdown-menu a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80; // adjust for header height
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          // close any open dropdowns on mobile after click
          document.querySelectorAll('.site-nav .dropdown.open').forEach(dd => dd.classList.remove('open'));
        }
      }
    });
  });

  // keyboard: close dropdown on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.site-nav .dropdown.open').forEach(dd => dd.classList.remove('open'));
    }
  });
});

function setupZoomCarousel(sliderClass, interval = 1500) {
  const sliderWrapper = document.querySelector(`.${sliderClass} .slider-wrapper`);
  const track = sliderWrapper.querySelector('.slider-track');
  const slides = track.querySelectorAll('.slide');
  const slideWidth = slides[0].offsetWidth + 40; // slide width + margin
  let index = 0;

  // Set first slide active
  slides[index].classList.add('active');

  setInterval(() => {
    // Remove active class
    slides.forEach(slide => slide.classList.remove('active'));

    // Move to next slide
    index = (index + 1) % slides.length;

    // Add active class to center slide
    slides[index].classList.add('active');

    // Move track
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }, interval);
}

document.addEventListener('DOMContentLoaded', () => {
  setupZoomCarousel('certSlider', 1500);
  setupZoomCarousel('partnerSlider', 1500);
});
