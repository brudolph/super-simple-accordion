import SuperSimpleAccordions from '../js/accordions';
import "../css/accordion.css"
const accordions = new SuperSimpleAccordions('.accordion', {
  // ALL available options

  // Accordion parts
  accordionClass: 'accordion',
  headerClass: 'accordion__title',
  contentClass: 'accordion__content',
  panelClass: 'accordion__panel',

  hidden: false,

  // Toggle Button
  toggleBtnClass: 'accordion__toggle',
  // Toggle all other accordions closed when one is opened
  toggleOthers: false,
  toggleBtnSelfMarkup: true,

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
).innerHTML = `<h1>Title for these grouped accordions</h1><div class="accordion__grouped"><div class="accordion"><h2 class="accordion__title"><button class="accordion__toggle">Accordion Heading 1</button></h2><div class="accordion__panel"><div class="accordion__content"><p>Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p><p>Lorem ipsum dolor quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div></div><div class="accordion" data-expanded="true"><h2 class="accordion__title"><button class="accordion__toggle">Accordion Heading 2</button></h2><div class="accordion__panel"><div class="accordion__content"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p><div class="accordion" data-expanded="true"><h2 class="accordion__title"><button class="accordion__toggle">Nested Accordion 1</button></h2><div class="accordion__panel"><div class="accordion__content"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div></div><div class="accordion"><h2 class="accordion__title"><button class="accordion__toggle">Nested Accordion 2</button></h2><div class="accordion__panel"><div class="accordion__content"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div></div></div></div></div><div class="accordion"><h2 class="accordion__title"><button class="accordion__toggle">Accordion Heading 2</button></h2><div class="accordion__panel"><div class="accordion__content"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div></div></div><div class="accordion__grouped"><div class="accordion"><h2 class="accordion__title"><button class="accordion__toggle">Accordion Heading 1</button></h2><div class="accordion__panel"><div class="accordion__content"><p>Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p><p>Lorem ipsum dolor quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div></div><div class="accordion"><h2 class="accordion__title"><button class="accordion__toggle">Accordion Heading 2</button></h2><div class="accordion__panel"><div class="accordion__content"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p><div class="accordion"><h2 class="accordion__title"><button class="accordion__toggle">Nested Accordion 1</button></h2><div class="accordion__panel"><div class="accordion__content"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div></div><div class="accordion"><h2 class="accordion__title"><button class="accordion__toggle">Nested Accordion 2</button></h2><div class="accordion__panel"><div class="accordion__content"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div></div></div></div></div><div class="accordion"><h2 class="accordion__title"><button class="accordion__toggle">Accordion Heading 2</button></h2><div class="accordion__panel"><div class="accordion__content"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus veritatis sunt esse possimus corrupti aspernatur veniam accusantium eius omnis asperiores autem, tempora excepturi voluptas at eaque quo praesentium numquam? </p></div></div></div></div>`;


setTimeout(() => {
  accordions.init();
}, 200);
