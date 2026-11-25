const storageKey = 'ovapart-cookie-consent';
const banner = document.getElementById('cookieBanner');
const settings = document.getElementById('cookieSettings');

let choice;
try {
    choice = localStorage.getItem(storageKey);
} catch {
    // The banner still works when browser storage is blocked.
}

function enableOptionalServices() {
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

    import('./map.js')
        .then(({ initMap }) => initMap())
        .catch(error => console.error('Не удалось загрузить карту', error));
}

function saveChoice(nextChoice) {
    const previousChoice = choice;
    choice = nextChoice;

    try {
        localStorage.setItem(storageKey, choice);
    } catch {
        // Apply the choice for the current page even without browser storage.
    }

    banner.hidden = true;
    settings.hidden = false;

    if (choice === 'accepted' && previousChoice !== 'accepted') {
        enableOptionalServices();
    }
    if (choice === 'declined' && previousChoice === 'accepted') {
        window.location.reload();
    } else if (previousChoice === 'accepted' || previousChoice === 'declined') {
        settings.focus({ preventScroll: true });
    }
}

document.getElementById('acceptCookies').addEventListener('click', () => saveChoice('accepted'));
document.getElementById('declineCookies').addEventListener('click', () => saveChoice('declined'));

settings.addEventListener('click', () => {
    banner.hidden = false;
    document.getElementById('cookieBannerTitle').focus();
});

const hasChoice = choice === 'accepted' || choice === 'declined';
banner.hidden = hasChoice;
settings.hidden = !hasChoice;

if (choice === 'accepted') {
    enableOptionalServices();
}
