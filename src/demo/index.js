import SuperSimpleAccordions from '../js/accordions';
import "../css/accordion.css"
const accordions = new SuperSimpleAccordions('.accordion', {
  // ALL available options

  // Accordion parts
  accordionClass: 'accordion',
  headerClass: 'accordion__title',
  contentClass: 'accordion__content',
  panelClass: 'accordion__panel',

  // Toggle Button
  toggleBtnClass: 'accordion__toggle',
  // Toggle all other accordions closed when one is opened
  toggleOthers: true,

  // Icons
  icons: true, // true or false
  iconsClass: 'accordion__icon',
  iconsSymbol: 'plus-minus', // arrow or plus-minus
  iconsPosition: 'left', // right or left

  // Expand All features
  expandAllBtn: true, // true or false
  expandAllClass: 'accordion__toggle-all',
  expandAllContainerClass: 'accordion__toggle-all-container',
  expandSelectClass: 'expanded',
  expandAllOpenText: 'Expand All',
  expandAllCloseText: 'Collapse All',
  expanded: false, // accordions collapsed by default but an be expanded
});

document.querySelector(
  'body'
).innerHTML = `<h1>Title for these grouped accordions</h1><div class="accordion"><h2 class="accordion__title">Accordion Heading 1</h2><div class="accordion__panel"><p>Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p><p>Lorem ipsum dolor quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div><div class="accordion" data-expanded="true"><h2 class="accordion__title">Accordion Heading 2</h2><div class="accordion__panel"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p><div class="accordion" data-expanded="true"><h2 class="accordion__title">Nested Accordion 1</h2><div class="accordion__panel"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div><div class="accordion"><h2 class="accordion__title">Nested Accordion 2</h2><div class="accordion__panel"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div></div></div><div class="accordion"><h2 class="accordion__title">Accordion Heading 2</h2><div class="accordion__panel"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div>`;

console.log('accordions', accordions);

accordions.init();
