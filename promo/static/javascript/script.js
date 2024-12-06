function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

html = '<h1 style="border: 1px solid turquoise; width: 100%; font-size: 20px;">Estás usando un TIPO</h1>';
if (isMobileDevice()) {
    document.getElementById('tipo-navegador').innerHTML = html.replace('TIPO', 'navegador de dispositivo móvil');
} else {
    document.getElementById('tipo-navegador').innerHTML = html.replace('TIPO', 'navegador de escritorio');
}