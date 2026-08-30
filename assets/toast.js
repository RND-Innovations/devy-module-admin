document.querySelectorAll('.toast').forEach((el, i) => {
    const delay = 5000 + (i * 400);

    setTimeout(() => {
        el.classList.add('hide');
        setTimeout(() => el.remove(), 300);
    }, delay);
});