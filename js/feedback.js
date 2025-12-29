const form = document.getElementById('contactForm');
const overlay = document.getElementById('formOverlay');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        comment: document.getElementById('comment').value
    };

    const response = await fetch('https://formspree.io/f/abcdwxyz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        overlay.classList.add('active');
        form.reset();

        setTimeout(() => {
            overlay.classList.remove('active');
        }, 3000);

    } else {
        alert('Ошибка отправки. Попробуйте позже.');
    }
});
