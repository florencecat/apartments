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

const slideWidth = slides[0].offsetWidth + 24;
const maxIndex = slides.length - Math.floor(slider.offsetWidth / slideWidth);

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
