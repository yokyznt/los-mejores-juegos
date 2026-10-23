/* GameHub · menú móvil y buscador */
(function () {
  var nav   = document.getElementById('nav');
  var menu  = document.getElementById('menu');
  var search = document.getElementById('search');
  var input = document.getElementById('q');
  var qbtn  = document.getElementById('qbtn');
  var items = document.querySelectorAll('#cards > li');
  var empty = document.getElementById('empty');
  var movil = window.matchMedia('(max-width: 899px)');

  function cerrarMenu() {
    nav.dataset.open = 'false';
    menu.setAttribute('aria-expanded', 'false');
  }

  /* Botón hamburguesa (móvil y tablet) */
  menu.addEventListener('click', function () {
    var abrir = nav.dataset.open !== 'true';
    nav.dataset.open = String(abrir);
    menu.setAttribute('aria-expanded', String(abrir));
    search.dataset.open = 'false';
  });

  /* Al tocar un enlace del menú, se cierra */
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) cerrarMenu();
  });

  /* Lupa: en móvil abre/cierra la caja de búsqueda */
  qbtn.addEventListener('click', function () {
    if (movil.matches) {
      var abrir = search.dataset.open !== 'true';
      search.dataset.open = String(abrir);
      if (abrir) { cerrarMenu(); input.focus(); }
    } else {
      input.focus();
    }
  });

  /* Buscador: filtra las tarjetas mientras escribes */
  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    var visibles = 0;
    items.forEach(function (li) {
      var texto = (li.dataset.nombre + ' ' + li.textContent).toLowerCase();
      var ok = !q || texto.indexOf(q) !== -1;
      li.hidden = !ok;
      if (ok) visibles++;
    });
    empty.hidden = visibles !== 0;
    if (q) document.getElementById('juegos').scrollIntoView({ block: 'start' });
  });

  /* Esc cierra menú y buscador */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { cerrarMenu(); search.dataset.open = 'false'; }
  });

  /* Si se agranda la ventana, se limpia el estado móvil */
  movil.addEventListener('change', function () { cerrarMenu(); search.dataset.open = 'false'; });
})();
