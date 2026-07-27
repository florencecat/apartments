const slider = document.querySelector('.apartments__slider-window');
const track = document.querySelector('.apartments__slider-track');
const slides = document.querySelectorAll('.apartment__card');
const openPolicy = document.getElementById('openPolicy');
const closePolicy = document.getElementById('closePolicy');
const policyModal = document.getElementById('policyModal');
const header = document.querySelector('.header');
const burger = document.querySelector('.header__burger');
const menuLinks = document.querySelectorAll('.header__menu-items a');

let index = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

let slideWidth = 0;
let maxIndex = 0;

// отступ берём из CSS (он разный на брейкпоинтах), а не хардкодим
function measureSlider() {
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  slideWidth = slides[0].offsetWidth + gap;
  maxIndex = Math.max(0, slides.length - Math.floor(slider.offsetWidth / slideWidth));
  index = Math.min(index, maxIndex);
}

measureSlider();

// пересчитываем при смене размера/ориентации, иначе слайды уезжают
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    measureSlider();
    setPosition();
  }, 150);
});

/* ===== TOUCH + MOUSE ===== */
slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchmove', touchMove);
slider.addEventListener('touchend', touchEnd);

slider.addEventListener('mousedown', touchStart);
slider.addEventListener('mousemove', touchMove);
slider.addEventListener('mouseup', touchEnd);
slider.addEventListener('mouseleave', touchEnd);

// slider

function touchStart(e) {
  startX = getX(e);
  isDragging = true;
  prevTranslate = currentTranslate;
  track.style.transition = 'none';
}

function touchMove(e) {
  if (!isDragging) return;
  const currentX = getX(e);
  currentTranslate = prevTranslate + currentX - startX;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
  if (!isDragging) return;
  isDragging = false;

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100) index++;
  if (movedBy > 100) index--;

  index = Math.max(0, Math.min(index, maxIndex));
  setPosition();
}

function setPosition() {
  currentTranslate = -index * slideWidth;
  prevTranslate = currentTranslate;
  track.style.transition = 'transform .4s ease';
  track.style.transform = `translateX(${currentTranslate}px)`;
}

// photo switch

function getX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.3
});

document.querySelectorAll('.animate').forEach(el => {
  observer.observe(el);
});

document.querySelectorAll('.apartment__media').forEach(media => {
  const images = media.querySelectorAll('img');
  const zones = media.querySelectorAll('.apartment__media-zones span');

  media.style.setProperty('--zones', zones.length);

  zones.forEach(zone => {
    zone.addEventListener('mouseenter', () => {
      const index = zone.dataset.index;

      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');
    });
  });

  media.addEventListener('mouseleave', () => {
    images.forEach(img => img.classList.remove('active'));
    images[0].classList.add('active');
  });
});

// header collapse on scroll

let headerCollapsed = false;
let scrollTicking = false;

function updateHeaderState() {
  const y = window.scrollY || window.pageYOffset;

  // hysteresis to avoid flicker around the threshold
  if (!headerCollapsed && y > 80) {
    header.classList.add('scrolled');
    headerCollapsed = true;
  } else if (headerCollapsed && y < 40) {
    header.classList.remove('scrolled');
    headerCollapsed = false;
  }

  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(updateHeaderState);
  }
}, { passive: true });

updateHeaderState();

// burger

burger.addEventListener('click', () => {
  header.classList.toggle('open');
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('open');
  });
});

// policy

openPolicy.addEventListener('click', (e) => {
  e.preventDefault();
  policyModal.classList.add('active');
});

closePolicy.addEventListener('click', () => {
  policyModal.classList.remove('active');
});

// Закрытие по клику на фон
policyModal.addEventListener('click', (e) => {
  if (e.target === policyModal) {
    policyModal.classList.remove('active');
  }
});
