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
document.addEventListener("DOMContentLoaded", function () {
  const slideshowImages = [
    "assets/images/hero9.jpg",
    "assets/images/hero8.jpg",
    // "assets/images/mfa.jpg",
    "assets/images/services1.jpg"
  ];

  const slideshowQuotes = [
    "Delivering safe, sustainable, and high-quality construction solutions across the Middle East.",
    "Excellence in every beam, precision in every brick.",
    "Strong foundations for a stronger tomorrow."
  ];

  let currentSlide = 0;
  const heroSection = document.querySelector(".hero-slideshow");
  const quoteElement = document.querySelector(".hero-slideshow .description");

  // ✅ Preload all images first to avoid blank screen
  function preloadImages(images, callback) {
    let loaded = 0;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === images.length) callback();
      };
    });
  }

  // ✅ Function to change background and quote
  function changeSlide() {
    heroSection.style.backgroundImage = `url('${slideshowImages[currentSlide]}')`;
    if (quoteElement) {
      quoteElement.textContent = slideshowQuotes[currentSlide];
    }
    currentSlide = (currentSlide + 1) % slideshowImages.length;
  }

  // ✅ Run slideshow after images are loaded
  if (heroSection) {
    preloadImages(slideshowImages, () => {
      changeSlide(); // show first image + quote immediately
      setInterval(changeSlide, 5000); // change every 5 seconds
    });
  }
});


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
function setupZoomCarousel(sliderClass, interval = 2000) {
  const wrapper = document.querySelector(`.${sliderClass}`);
  const track = wrapper.querySelector('.slider-track');
  const slides = Array.from(track.children);

  // Duplicate slides for seamless looping
  slides.forEach(slide => track.appendChild(slide.cloneNode(true)));

  let index = 0;
  const totalSlides = slides.length;
  const slideWidth = slides[0].offsetWidth + 40;

  function moveCarousel() {
    index++;
    track.style.transition = 'transform 1s ease';
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    // Active center zoom effect
    const allSlides = track.querySelectorAll('.slide');
    allSlides.forEach(s => s.classList.remove('active'));
    const activeIndex = (index + Math.floor(totalSlides / 2)) % totalSlides;
    allSlides[activeIndex].classList.add('active');

    // Reset position when reaching midpoint
    if (index >= totalSlides) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        index = 0;
      }, 1000);
    }
  }

  setInterval(moveCarousel, interval);
  slides[0].classList.add('active'); // initial active
}

document.addEventListener('DOMContentLoaded', () => {
  setupZoomCarousel('certSlider', 1800);
  setupZoomCarousel('partnerSlider', 1800);
});

