function adjustHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

adjustHeight();
window.addEventListener('resize', adjustHeight);