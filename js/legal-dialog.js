const dialog = document.getElementById('legalDialog');
const title = document.getElementById('legalDialogTitle');
const status = document.getElementById('legalDialogStatus');
const frame = document.getElementById('legalDocument');

const resizeObserver = new ResizeObserver(() => {
    const body = frame.contentDocument?.body;
    if (body) {
        frame.style.height = `${Math.ceil(body.getBoundingClientRect().height)}px`;
    }
});

for (const link of document.querySelectorAll('[data-legal-document]')) {
    link.addEventListener('click', event => {
        if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
            return;
        }

        event.preventDefault();
        title.textContent = link.textContent.trim();
        frame.title = title.textContent;
        frame.hidden = true;
        frame.style.removeProperty('height');
        status.hidden = false;
        status.textContent = 'Загрузка документа…';
        link.focus({ preventScroll: true });
        dialog.showModal();
        frame.src = link.href;
    });
}

frame.addEventListener('load', () => {
    const page = frame.contentDocument;
    if (!dialog.open || page?.URL === 'about:blank') {
        return;
    }

    if (!page?.body?.classList.contains('doc-content')) {
        status.textContent = 'Не удалось загрузить документ.';
        return;
    }

    title.textContent = page.title;
    frame.title = page.title;
    status.hidden = true;
    frame.hidden = false;
    resizeObserver.observe(page.body, { box: 'border-box' });

    page.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            dialog.close();
        }
    });
});

dialog.addEventListener('click', event => {
    if (event.target === dialog) {
        dialog.close();
    }
});

dialog.addEventListener('close', () => {
    // Keep the document visible until the dialog's closing transition ends.
    resizeObserver.disconnect();
});
