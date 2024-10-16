import { deepMerge } from './lib/util';

// Create an empty plugin object
const plugin = {};

// Set the plugin defaults
const defaults = {
  // Accordion parts
  accordionClass: 'accordion',
  headerClass: 'accordion__title',
  contentClass: 'accordion__content',
  panelClass: 'accordion__panel',
  toggleBtnClass: 'accordion__toggle',

  //Whether to add the hidden attribute to the accordion content
  hidden: true,

  // Toggle all other accordions closed when one is opened
  toggleOthers: false,
  // If true, the toggle button is already in the markup allowing for custom markup
  toggleBtnSelfMarkup: false,

  // Icons
  icons: true,
  iconsClass: 'accordion__icon',
  iconsSymbol: 'plus-minus', // arrow
  iconsPosition: 'left', // right

  // Expand All features
  expandAllBtn: true,
  expandAllClass: 'accordion__toggle-all',
  expandAllContainerClass: 'accordion__toggle-all-container',
  expandSelectClass: 'expanded',
  expandAllOpenText: 'Expand All',
  expandAllCloseText: 'Collapse All',
  expanded: false, // expanded or collapsed by default

  //accordion groups
  groupedClass: 'accordion__grouped',
  groupedExpandAllClass: 'accordion__toggle-all-grouped',
};

/**
 * Constructor.
 * @param  {String}  element  The selector element(s).
 * @param  {Object}   options  The plugin options.
 * @return {void}
 */
function SuperSimpleAccordions(element, options) {
  // Set the plugin object
  plugin.this = this;
  plugin.element = element;
  plugin.defaults = defaults;
  plugin.options = options;
  // Merge user settings with defaults
  plugin.settings = deepMerge(defaults, options);

  // Initialize the plugin
  plugin.this.init();
}

//
// Methods
//

/**
 * If icon is true then create and setup icon
 *
 * @function accordionIconSetup
 * @param  {String} toggle The toggle button
 * @return {void}
 */
const accordionIconSetup = function (toggle) {
  const toggleBtn = toggle;
  if (plugin.settings.icons === true) {
    const iconContainer = document.createElement('span');
    iconContainer.classList.add(plugin.settings.iconsSymbol);
    iconContainer.classList.add(plugin.settings.iconsPosition);
    toggle.appendChild(iconContainer);
  } else {
    toggleBtn.classList.add('icon-hidden');
  }
};

/**
 * Setup plugin.settings.panelClass which contains the content
 *
 * @function accordionContentSetup
 * @param  {String} content The accordion container.
 * @param  {String} id The accordion id.
 * @return {void}
 */
const accordionContentSetup = function (content, id) {
  // Get accordion content
  const accordionContent = content.querySelector(
    `.${plugin.settings.contentClass}`
  );
  // Get accordion panel
  const accordionPanel = content.querySelector(
    `.${plugin.settings.panelClass}`
  );

  const expandedDefault = content.dataset.expanded;

  if (!accordionContent)
    return console.error(
      'No accordion content found. Please add an element with the class .accordion__content'
    );

  function timeoutSet(element) {
    setTimeout(function () {
      element.style.height = 'auto';
    }, 300);
  }

  accordionPanel.setAttribute('id', `accordion${id}`);

  // Check to see if the accordions are set to be expanded or collapsed
  if (plugin.settings.expanded === false && expandedDefault != 'true') {
    accordionPanel.setAttribute('aria-hidden', 'true');
    accordionPanel.setAttribute('hidden', '');
    accordionPanel.style.height = '0px';
  }

  //  See if an individual accordion is set to expand by default
  if (expandedDefault === 'true') {
    accordionPanel.setAttribute('aria-hidden', 'false');
    accordionPanel.removeAttribute('hidden');
    accordionPanel.style.height = `${accordionPanel.scrollHeight}px`;
    timeoutSet(accordionPanel);
  }
};

/**
 * Setup plugin.settings.toggleBtnClass, the individual accordion toggle button
 *
 * @function accordionToggleSetup
 * @param  {String} content The accordion button.
 * @param  {String} btnId The accordion button id.
 *
 */
const accordionToggleSetup = function (content, btnId) {
  // Get accordion header from plugin.settings.accordionClass
  const accordionHeader = content.querySelector(
    `.${plugin.settings.headerClass}`
  );

  const expandedDefault = content.dataset.expanded;

  if (!accordionHeader)
    return console.error(
      'No accordion header found. Please add an element with the class .accordion__title'
    );

  let toggle;

  if (!plugin.settings.toggleBtnSelfMarkup) {
    console.log('toggleBtnSelfMarkup', plugin.settings.toggleBtnSelfMarkup);
    // Create a toggle button, add toggle class and aria attributes
    toggle = document.createElement('button');
    toggle.className = plugin.settings.toggleBtnClass;
    toggle.setAttribute('aria-controls', `accordion${btnId}`);

    // Get content from existing header and add to button
    toggle.innerHTML = accordionHeader.innerHTML;

    // Clear accordion header html since it was added to button
    accordionHeader.innerHTML = '';
    // Append button to accordion header
    accordionHeader.appendChild(toggle);
  } else {
    console.log('toggleBtnSelfMarkup', plugin.settings.toggleBtnSelfMarkup);
    // Get the existing toggle button
    toggle = content.querySelector(`.${plugin.settings.toggleBtnClass}`);
    // Check if the toggle button exists
    if (!toggle)
      return console.error(
        'No accordion toggle found. You have the toggleBtnSelfMarkup option set to true. Please add an element with the class .accordion__toggle'
      );
    toggle.setAttribute('aria-controls', `accordion${btnId}`);
  }

  // Check to see if the accordions are set to be expanded or collapsed
  if (plugin.settings.expanded === false) {
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (plugin.settings.expanded === true || expandedDefault === 'true') {
    toggle.setAttribute('aria-expanded', 'true');
  }

  // Initialize the accordion content and icon
  accordionContentSetup(content, btnId);
  accordionIconSetup(toggle);
};

/**
 * Create and setup plugin.settings.expandAllClass
 *
 * @function toggleAllSetup
 * @return {void}
 */
const toggleAllSetup = function () {
  // find first accodrion if only one the return
  const firstAccordion = document.querySelector(
    `.${plugin.settings.accordionClass}`
  );

  if (!firstAccordion)
    return console.error(
      'No accordion found. Please add an element with the class .accordion'
    );

  // create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = plugin.settings.expandAllContainerClass;

  // create expand all button
  const button = document.createElement('button');
  button.className = plugin.settings.expandAllClass;
  // Check to see if the accordions are set to be expanded or collapsed
  if (plugin.settings.expanded === false) {
    button.setAttribute('aria-expanded', 'false');
    button.textContent = plugin.settings.expandAllOpenText;
  } else {
    button.setAttribute('aria-expanded', 'true');
    button.textContent = plugin.settings.expandAllCloseText;
  }

  // insert button into container
  buttonContainer.appendChild(button);

  // find parent element of first accordion
  const parentContainer = firstAccordion.parentNode;

  // insert button container before first accordion
  parentContainer.insertBefore(buttonContainer, firstAccordion);
};

/**
 * Create and setup plugin.settings.expandAllClass
 *
 * @function toggleAllGroupedSetup
 * @return {void}
 */
const toggleAllGroupedSetup = function () {
  const groupedContainers = document.querySelectorAll(
    `.${plugin.settings.groupedClass}`
  );

  if (groupedContainers.length > 0) {
    // Iterate over each grouped container
    groupedContainers.forEach((groupContainer) => {
      // find first accordion in the group
      const firstAccordion = groupContainer.querySelector(
        `.${plugin.settings.accordionClass}`
      );

      if (!firstAccordion)
        return console.error(
          'No accordion found. Please add an element with the class .accordion'
        );

      // create button container
      const buttonContainer = document.createElement('div');
      buttonContainer.className = plugin.settings.expandAllContainerClass;

      // create expand all button
      const button = document.createElement('button');
      button.className = plugin.settings.groupedExpandAllClass;
      // Check to see if the accordions are set to be expanded or collapsed
      if (plugin.settings.expanded === false) {
        button.setAttribute('aria-expanded', 'false');
        button.textContent = plugin.settings.expandAllOpenText;
      } else {
        button.setAttribute('aria-expanded', 'true');
        button.textContent = plugin.settings.expandAllCloseText;
      }

      // insert button into container
      buttonContainer.appendChild(button);

      // insert button container before first accordion in the group
      groupContainer.insertBefore(buttonContainer, firstAccordion);
    });
  }
};

/**
 *
 *
 * @function toggleButton
 * @param  {String} targetElem  The toggle button
 * @param  {String} direction   The direction of the accordion Expand/Collapse
 * @return {void}
 */
const toggleButton = function (targetElem, direction) {
  if (direction === 'expand') {
    targetElem.setAttribute('aria-expanded', 'true');
  } else {
    targetElem.setAttribute('aria-expanded', 'false');
  }
};

/**
 * @function toggleContent
 * @param  {String} targetElem The Accordion button
 * @param  {MouseEvent} event mouse or keyboard
 * @param  {String} direction The direction of the accordion Expand/Collapse
 * @return {void}
 */
const toggleAccordion = function (
  targetElem,
  event,
  direction,
  expandAllButton
) {
  const controls = targetElem.getAttribute('aria-controls');
  const controlsElem = document.getElementById(controls);
  const controlsElemHeight = controlsElem.scrollHeight;
  const toggled = controlsElem.getAttribute('aria-hidden');

  if (event) {
    event.preventDefault();
  }

  function timeoutSet(element) {
    setTimeout(function () {
      element.style.height = 'auto';
    }, 300);
  }

  // Check if targetElem is inside plugin.settings.panelClass
  const nestedAccordion = targetElem.closest(`.${plugin.settings.panelClass}`);

  if (plugin.settings.toggleOthers && !nestedAccordion && !expandAllButton) {
    console.log('toggleOthers', plugin.settings.toggleOthers);
    // Close all accordions
    const buttons = document.querySelectorAll(
      `.${plugin.settings.toggleBtnClass}`
    );
    Array.prototype.forEach.call(buttons, function (button) {
      const controls = button.getAttribute('aria-controls');
      const controlsElem = document.getElementById(controls);
      const toggled = controlsElem.getAttribute('aria-hidden');
      if (toggled === 'false') {
        controlsElem.style.height = `${controlsElem.scrollHeight}px`;
        controlsElem.setAttribute('aria-hidden', 'true');
        setTimeout(function () {
          controlsElem.setAttribute('aria-hidden', true);
          controlsElem.style.height = `${0}px`;
        }, 50);
        setTimeout(function () {
          if (plugin.settings.hidden) {
            controlsElem.setAttribute('hidden', '');
          }
        }, 450);
        toggleButton(button, 'collapse');
      }
    });
  }

  if (direction === 'expand' && toggled === 'true') {
    controlsElem.removeAttribute('hidden');
    controlsElem.style.height = `${controlsElem.scrollHeight}px`;
    controlsElem.setAttribute('aria-hidden', 'false');
    timeoutSet(controlsElem);
  } else if (direction === 'collapse' && toggled === 'false') {
    controlsElem.style.height = `${controlsElem.scrollHeight}px`;
    controlsElem.setAttribute('aria-hidden', 'true');
    setTimeout(function () {
      controlsElem.setAttribute('aria-hidden', true);
      controlsElem.style.height = `${0}px`;
    }, 50);
    setTimeout(function () {
      if (plugin.settings.hidden) {
        controlsElem.setAttribute('hidden', '');
      }
    }, 450);
  }

  toggleButton(targetElem, direction);
};

/**
 * @function toggleAllAccordions
 * @param  {String} targetElem The toggle all button
 * @param  {MouseEvent} event mouse or keyboard
 * @param  {String} direction The direction of the accordion Expand/Collapse
 * @return {void}
 */
const toggleAllAccordions = function (targetElem, event, direction) {
  if (event) {
    event.preventDefault();
  }

  // Grab all accordion toggles in the document
  const buttons = document.querySelectorAll(
    `.${plugin.settings.toggleBtnClass}`
  );
  // Loop through each accordion
  Array.prototype.forEach.call(buttons, function (button) {
    toggleAccordion(button, event, direction, true);
  });

  // After event toggle aria-expanded attribute
  targetElem.setAttribute(
    'aria-expanded',
    targetElem.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
  );

  // After event toggle button text
  targetElem.textContent =
    targetElem.textContent === plugin.settings.expandAllOpenText
      ? (targetElem.textContent = plugin.settings.expandAllCloseText)
      : (targetElem.textContent = plugin.settings.expandAllOpenText);
};

/**
 * @function toggleAllGroupedAccordions
 * @param  {String} targetElem The toggle all button
 * @param  {MouseEvent} event mouse or keyboard
 * @param  {String} direction The direction of the accordion Expand/Collapse
 * @return {void}
 */
const toggleAllGroupedAccordions = function (targetElem, event, direction) {
  if (event) {
    event.preventDefault();
  }

  const parentContainer = targetElem.closest(
    `.${plugin.settings.groupedClass}`
  );

  // Grab all accordion toggles in the grouped container
  const buttons = parentContainer.querySelectorAll(
    `.${plugin.settings.toggleBtnClass}`
  );
  // Loop through each accordion
  Array.prototype.forEach.call(buttons, function (button) {
    toggleAccordion(button, event, direction, true);
  });

  // After event toggle aria-expanded attribute
  targetElem.setAttribute(
    'aria-expanded',
    targetElem.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
  );

  // After event toggle button text
  targetElem.textContent =
    targetElem.textContent === plugin.settings.expandAllOpenText
      ? (targetElem.textContent = plugin.settings.expandAllCloseText)
      : (targetElem.textContent = plugin.settings.expandAllOpenText);
};

/**
 * @function clickHandler
 * @param  {String} event mouse click
 * @return {type} {description}
 */
const clickHandler = function (event) {
  const toggleBtn = event.target.closest(`.${plugin.settings.toggleBtnClass}`);
  const toggleAll = event.target.closest(`.${plugin.settings.expandAllClass}`);
  const toggleAllGrouped = event.target.closest(
    `.${plugin.settings.groupedExpandAllClass}`
  );

  if (toggleBtn === null && toggleAll === null && toggleAllGrouped === null) return;

  if (toggleBtn) {
    const directionBtn =
      event.target
        .closest(`.${plugin.settings.toggleBtnClass}`)
        .getAttribute('aria-expanded') === 'true'
        ? 'collapse'
        : 'expand';
    toggleAccordion(toggleBtn, event, directionBtn);
  }
  if (toggleAll) {
    const directionAll =
      event.target
        .closest(`.${plugin.settings.expandAllClass}`)
        .getAttribute('aria-expanded') === 'true'
        ? 'collapse'
        : 'expand';
    toggleAllAccordions(toggleAll, event, directionAll);
  }
  if (toggleAllGrouped) {
    const directionAll =
      event.target
        .closest(`.${plugin.settings.groupedExpandAllClass}`)
        .getAttribute('aria-expanded') === 'true'
        ? 'collapse'
        : 'expand';
    toggleAllGroupedAccordions(toggleAllGrouped, event, directionAll);
  }
};

/**
 * @function keyboardHandler
 * @param  {String} event keyboard press
 * @return {type} {description}
 */
const keyboardHandler = function (event) {
  if (event.key == 'Enter' || event.key == ' ') {
    const toggleBtn = event.target.closest(
      `.${plugin.settings.toggleBtnClass}`
    );
    const toggleAll = event.target.closest(
      `.${plugin.settings.expandAllClass}`
    );
    const direction =
      event.target.getAttribute('aria-expanded') === 'true'
        ? 'collapse'
        : 'expand';

    if (toggleBtn) {
      event.preventDefault();
      toggleAccordion(toggleBtn, event, direction);
    }
    if (toggleAll) {
      event.preventDefault();
      toggleAllAccordions(toggleAll, event, direction);
    }
  }
};

/**
 * Public variables and methods.
 * @type {object}
 */
SuperSimpleAccordions.prototype = {
  nestedSetup(nestedAccordions, accordions) {
    let btnId = 0;
    //Loop over each accordion and setup
    Array.prototype.forEach.call(nestedAccordions, function (accordion) {
      btnId = Math.floor(Math.random() * 100000000 + 1);
      accordionToggleSetup(accordion, btnId);
    });

    plugin.this.nonestedSetup(accordions, btnId);
  },
  nonestedSetup(accordions, btnId) {
    //Loop over each accordion and setup
    Array.prototype.forEach.call(accordions, function (accordion) {
      btnId = Math.floor(Math.random() * 100000000 + 1);
      accordionToggleSetup(accordion, btnId);
    });
  },

  setup() {
    // Destructure plugin settings for easier access
    const { panelClass, groupedClass, expandAllBtn } = plugin.settings;

    // Check for nested accordions
    const nestedAccordions = document.querySelectorAll(
      `.${panelClass} > ${plugin.element}`
    );
    const accordions = document.querySelectorAll(plugin.element);
    const groupedAccordions = document.querySelectorAll(`.${groupedClass}`);

    if (nestedAccordions.length > 0) {
      plugin.this.nestedSetup(nestedAccordions, accordions);

      if (groupedAccordions.length > 0) {
        if (expandAllBtn && groupedAccordions.length > 1)
          toggleAllGroupedSetup(groupedAccordions.length);
      } else {
        if (expandAllBtn && accordions.length > 1) toggleAllSetup();
      }

      return;
    }

    if (accordions) {
      let btnId = 0;
      plugin.this.nonestedSetup(accordions, btnId);

      if (groupedAccordions.length > 0) {
        if (expandAllBtn && groupedAccordions.length > 1)
          toggleAllGroupedSetup(groupedAccordions.length);
      } else {
        if (expandAllBtn && accordions.length > 1) toggleAllSetup();
      }

      return;
    }
  },

  /**
   *
   * @function init
   *
   */
  init() {
    // If there are no accordions bail
    if (!plugin.element) return false;

    // Setup items in the DOM
    plugin.this.setup();

    // Add event mouse and keyboard listeners
    document.addEventListener('click', clickHandler, false);
    document.addEventListener('keydown', keyboardHandler, false);
  },
};

export default SuperSimpleAccordions;
