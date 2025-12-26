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
      <div class="review__name" style="user-select: none;">${review.name}</div>
      <div class="review__stars" style="user-select: none;">${'★'.repeat(5)}</div>
      <div class="review__text" style="user-select: none;">${review.text}</div>
      <div class="review__date" style="user-select: none;">${review.date}</div>
    </div>
  `).join('');
}

function updateSlider() {
    const slideWidth = reviewTrack.parentElement.offsetWidth + 20;
    reviewTrack.style.transform = `translateX(-${reviewIndex * slideWidth}px)`;
}

prevBtn.addEventListener('click', () => {
    reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    updateSlider();
});
