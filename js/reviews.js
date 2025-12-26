const reviewTrack = document.querySelector('.review__track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let reviews = [];
let reviewIndex = 0;

fetch('data/reviews.json')
    .then(res => res.json())
    .then(data => {
        reviews = data;
        renderReviews();
        updateSlider();
    });

function renderReviews() {
    reviewTrack.innerHTML = reviews.map(review => `
    <div class="review">
      <div class="review__name">${review.name}</div>
      <div class="review__stars">${'★'.repeat(5)}</div>
      <div class="review__text">${review.text}</div>
      <div class="review__date">${review.date}</div>
    </div>
  `).join('');
}

function updateSlider() {
    const slideWidth = reviewTrack.parentElement.offsetWidth + 20;
    reviewTrack.style.transform = `translateX(-${index * slideWidth}px)`;
}

prevBtn.addEventListener('click', () => {
    index = (index - 1 + reviews.length) % reviews.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    index = (index + 1) % reviews.length;
    updateSlider();
});
