const form = document.getElementById('contactForm');
const overlay = document.getElementById('formOverlay');

const policyAgree = document.getElementById('policyAgree');
const advertisingAgree = document.getElementById('advertisingAgree');
const submitButton = form.querySelector('button[type="submit"]');

function updateSubmitButton() {
    submitButton.disabled = !policyAgree.checked;
}

policyAgree.addEventListener('change', updateSubmitButton);
policyAgree.addEventListener('invalid', event => event.preventDefault());
window.addEventListener('pageshow', updateSubmitButton);
updateSubmitButton();

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!policyAgree.checked) {
        return;
    }

    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        comment: document.getElementById('comment').value,
        advertisingConsent: advertisingAgree.checked
    };

    const response = await fetch('https://formspree.io/f/mregogrp', {
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
        updateSubmitButton();

        setTimeout(() => {
            overlay.classList.remove('active');
        }, 3000);

    } else {
        alert('Ошибка отправки. Попробуйте позже.');
    }
});
