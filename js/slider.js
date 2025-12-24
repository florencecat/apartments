document.querySelectorAll('[data-slider]').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    let isDown = false;
    let startX;
    let scrollX = 0;

    slider.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - scrollX;
        track.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        track.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', e => {
        if (!isDown) return;
        scrollX = e.pageX - startX;
        track.style.transform = `translateX(${scrollX}px)`;
    });
});