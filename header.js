// header.js
fetch("header.html")
  .then(r => r.text())
  .then(html => {
    const mount = document.getElementById("header");
    mount.innerHTML = html;

    // Attach click-to-toggle on all dropdowns
    document.querySelectorAll('.has-submenu').forEach(menu => {
      const trigger = menu.querySelector('.nav-link, .submenu-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', (e) => {
        if (trigger.getAttribute('href') === '#') {
          e.preventDefault(); // stop dummy links from jumping
        }
        menu.classList.toggle('open');
        trigger.setAttribute('aria-expanded', menu.classList.contains('open'));
      });
    });

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
      document.querySelectorAll('.has-submenu.open').forEach(openMenu => {
        if (!openMenu.contains(e.target)) {
          openMenu.classList.remove('open');
          const t = openMenu.querySelector('.nav-link, .submenu-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });