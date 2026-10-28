const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Zapri meni' : 'Odpri meni');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Odpri meni');
  }));
}

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const service = document.querySelector('#service');
    if (service) {
      const target = link.dataset.service;
      const option = [...service.options].find(item => item.textContent.trim() === target);
      if (option) service.value = option.value;
    }
  });
});

const form = document.querySelector('#contact-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Povpraševanje – Džems Plesk (${data.get('name')})`;
  const body = [
    `Ime in priimek: ${data.get('name')}`,
    `Telefon: ${data.get('phone')}`,
    `E-pošta: ${data.get('email') || 'Ni navedena'}`,
    `Lokacija objekta: ${data.get('location') || 'Ni navedena'}`,
    `Vrsta dela: ${data.get('service') || 'Ni izbrana'}`,
    '',
    'Opis:',
    data.get('message')
  ].join('\n');
  const status = document.querySelector('#form-status');
  if (status) status.textContent = 'Odpiramo vaš e-poštni program. Pred pošiljanjem preverite sporočilo.';
  window.location.href = `mailto:dzems.plesk@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
