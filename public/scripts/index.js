function adjustHeight() {
    // Captura a altura real da janela de visualização
    let vh = window.innerHeight * 0.01;
    // Define a altura customizada no CSS
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Ajusta a altura assim que a página é carregada
adjustHeight();

// Recalcula a altura quando a janela é redimensionada
window.addEventListener('resize', adjustHeight);