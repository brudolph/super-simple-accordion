import SuperSimpleAccordions from './js/accordions';

if (document.querySelector('.accordion')) {
  const accordions = new SuperSimpleAccordions('.accordion', {
    icons: true, // false or true
    iconsSymbol: 'arrow', // plus-minus or arrow
    iconsPosition: 'right', // left or right
  });
}
