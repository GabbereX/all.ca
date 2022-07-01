import './sass/styles.scss';

const burgerMenuButton = document.getElementById('burgerMenuButton');
const responsiveMenu = document.getElementById('responsiveMenu');
const closeMenuButton = document.getElementById('closeMenuButton');


burgerMenuButton.addEventListener('click', () => {
  responsiveMenu.style.transform = 'translateY(0)'
  document.body.style.overflowY = 'hidden'
})

closeMenuButton.addEventListener('click', () => {
  responsiveMenu.style.transform = 'translateY(-100%)'
  document.body.style.overflowY = ''
})