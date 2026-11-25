const storageKey = 'ovapart-cookie-consent';
const banner = document.getElementById('cookieBanner');

let choice;
try {
    choice = localStorage.getItem(storageKey);
} catch {
    // The banner still works when browser storage is blocked.
}

function enableAnalytics() {
    window.ym = window.ym || function () {
        (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = Date.now();
    window.ym(106063524, 'init', {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: 'dataLayer',
        accurateTrackBounce: true,
        trackLinks: true
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js?id=106063524';
    document.head.append(script);
}

function saveChoice(nextChoice) {
    if (banner.hidden) {
        return;
    }

    try {
        localStorage.setItem(storageKey, nextChoice);
    } catch {
        // Apply the choice for the current page even without browser storage.
    }

    banner.hidden = true;
    if (nextChoice === 'accepted') {
        enableAnalytics();
    }
}

document.getElementById('acceptCookies').addEventListener('click', () => saveChoice('accepted'));
document.getElementById('essentialCookies').addEventListener('click', () => saveChoice('declined'));

banner.hidden = choice === 'accepted' || choice === 'declined';

if (choice === 'accepted') {
    enableAnalytics();
}
