const reviewTrack = document.querySelector('.review-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const currentEl = document.querySelector('.reviews-counter .current');
const totalEl = document.querySelector('.reviews-counter .total');

let reviews = [];
let reviewIndex = 0;

fetch('data/reviews.json')
    .then(res => res.json())
    .then(data => {
        reviews = data;
        renderReviews();
        totalEl.textContent = reviews.length;
        updateSlider();
    });

function renderReviews() {
    reviewTrack.innerHTML = reviews.map(review => `
    <div class="review">
      <div class="review-name">${review.name}</div>
      <div class="review-stars">${'★'.repeat(5)}</div>
      <div class="review-text">${review.text}</div>
      <div class="review-date">${review.date}</div>
    </div>
  `).join('');
}

function updateSlider() {
    const slideWidth = reviewTrack.parentElement.offsetWidth + 20;
    reviewTrack.style.transform = `translateX(-${index * slideWidth}px)`;
    currentEl.textContent = index + 1;
}

prevBtn.addEventListener('click', () => {
    index = (index - 1 + reviews.length) % reviews.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    index = (index + 1) % reviews.length;
    updateSlider();
});
