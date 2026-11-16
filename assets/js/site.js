(function () {
  'use strict';

  /* ---------- мобильное меню ---------- */
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        mobileNav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- табы ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          if (panel) panel.hidden = !on;
        });
      });
    });
  });

  /* ---------- фильтр галереи ---------- */
  var filterRoot = document.querySelector('[data-gallery]');
  if (filterRoot) {
    var chips = filterRoot.querySelectorAll('[data-filter]');
    var items = Array.prototype.slice.call(filterRoot.querySelectorAll('[data-cat]'));
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var cat = chip.getAttribute('data-filter');
        chips.forEach(function (c) {
          c.setAttribute('aria-selected', c === chip ? 'true' : 'false');
          c.classList.toggle('tab--on', c === chip);
        });
        var shown = 0;
        items.forEach(function (item) {
          var ok = cat === 'all' || item.getAttribute('data-cat').indexOf(cat) !== -1;
          item.style.display = ok ? '' : 'none';
          if (ok) shown++;
        });
        var empty = filterRoot.querySelector('.gal-empty');
        if (empty) empty.hidden = shown !== 0;
      });
    });
  }

  /* ---------- лайтбокс ---------- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    document.querySelectorAll('[data-zoom]').forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        if (!img) return;
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        lightbox.showModal();
      });
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('modal__close')) lightbox.close();
    });
  }

  /* ---------- модалка брони ---------- */
  var bookModal = document.getElementById('book');
  document.querySelectorAll('[data-open="book"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (bookModal) bookModal.showModal();
    });
  });
  document.querySelectorAll('dialog.modal').forEach(function (dlg) {
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.classList.contains('modal__close')) dlg.close();
    });
    dlg.addEventListener('close', function () {
      var form = dlg.querySelector('form');
      var ok = dlg.querySelector('.modal__success');
      if (form) form.hidden = false;
      if (ok) ok.hidden = true;
    });
  });

  /* ---------- отправка форм (демо) ---------- */
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var dlg = form.closest('dialog');
      if (dlg) {
        var ok = dlg.querySelector('.modal__success');
        form.hidden = true;
        if (ok) ok.hidden = false;
      } else {
        var msg = form.querySelector('.form__done');
        if (!msg) {
          msg = document.createElement('div');
          msg.className = 'form__done';
          msg.textContent = 'Заявка отправлена — менеджер перезвонит в течение 15 минут.';
          form.appendChild(msg);
        }
        msg.hidden = false;
        form.querySelectorAll('input,textarea,select,button').forEach(function (el) {
          el.disabled = true;
        });
      }
    });
  });
})();
