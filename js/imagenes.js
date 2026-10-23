/* GameHub · imágenes
   Orden: 1) src (archivo PNG de la carpeta img/)
          2) cada enlace de data-alt (internet, separados por |) si el archivo no existe */
(function () {
  function siguiente(img) {
    var lista = (img.dataset.alt || '').split('|').filter(Boolean);
    var n = parseInt(img.dataset.altN || '0', 10);
    if (n < lista.length) {
      img.dataset.altN = String(n + 1);
      img.src = lista[n];
    }
  }
  document.querySelectorAll('img[data-alt]').forEach(function (img) {
    img.addEventListener('error', function () { siguiente(img); });
    if (img.complete && img.naturalWidth === 0) siguiente(img);  /* ya falló antes de cargar este script */
  });
})();
