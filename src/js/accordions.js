(function(root, factory) {
  // eslint-disable-next-line no-undef
  if (typeof define === "function" && define.amd) {
    define([], function() {
      return factory(root);
    });
  } else if (typeof exports === "object") {
    module.exports = factory(root);
  } else {
    root.SuperSimpleAccordions = factory(root);
  }
})(
  // eslint-disable-next-line no-nested-ternary
  typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : this,
  function(window) {
    // Use strict mode
    "use strict";

    // Create an empty plugin object
    const plugin = {};

    // Set the plugin defaults
    const defaults = {
      // Accordion parts
      accordionClass: "accordion",
      headerClass: "accordion__title",
      contentClass: "accordion__content",
      panelClass: "accordion__panel",

      // Toggle Button
      toggleBtnClass: "accordion__toggle",

      // Icons
      icons: true,
      iconsSymbol: "plus-minus", // arrow
      iconsPosition: "left", // right

      // Expand All features
      expandAllBtn: true,
      expandAllClass: "accordion__toggle-all",
      expandAllContainerClass: "accordion__toggle-all-container",
      expandSelectClass: "expanded",
      expandAllOpenText: "Expand All",
      expandAllCloseText: "Collapse All",
      expanded: false, // expanded or collapsed by default
    };

    /*!
     * Deep merge two or more objects into the first.
     * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
     * @param   {Object} objects  The objects to merge together
     * @returns {Object}          Merged values of defaults and options
     */
    const deepMerge = function() {
      // Make sure there are objects to merge
      var len = arguments.length;
      if (len < 1) return;
      if (len < 2) return arguments[0];

      // Merge all objects into first
      for (let i = 1; i < len; i++) {
        for (let key in arguments[i]) {
          // If it's an object, recursively merge
          // Otherwise, push to key
          if (Object.prototype.toString.call(arguments[i][key]) === "[object Object]") {
            arguments[0][key] = deepMerge(arguments[0][key] || {}, arguments[i][key]);
          } else {
            arguments[0][key] = arguments[i][key];
          }
        }
      }

      return arguments[0];
    };

    /**
     * Constructor.
     * @param  {String}  element  The selector element(s).
     * @param  {Object}   options  The plugin options.
     * @return {void}
     */
    function Plugin(element, options) {
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
    const accordionIconSetup = function(toggle) {
      const toggleBtn = toggle;
      if (plugin.settings.icons === true) {
        const iconContainer = document.createElement("span");
        iconContainer.classList.add(plugin.settings.iconsSymbol);
        iconContainer.classList.add(plugin.settings.iconsPosition);
        toggle.appendChild(iconContainer);
      } else {
        toggleBtn.classList.add("icon-hidden");
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
    const accordionContentSetup = function(content, id) {
      // Get accordion content from plugin.settings.accordionClass container
      const accordionPanel = content.querySelector(`.${plugin.settings.panelClass}`);

      const expandedDefault = content.dataset.expanded;

      if (!accordionPanel) return;

      // Create div for accordion content add content class
      const accordionContent = document.createElement("div");
      accordionContent.className = plugin.settings.contentClass;
      // Add content from panel
      accordionContent.innerHTML = accordionPanel.innerHTML;

      // Clear accordion panel html since it was added to content div
      accordionPanel.innerHTML = "";
      // Append content div to accordion panel
      accordionPanel.appendChild(accordionContent);

      accordionPanel.setAttribute("id", `accordion${id}`);

      // Check to see if the accordions are set to be expanded or collapsed
      if (plugin.settings.expanded === false && expandedDefault != "true") {
        accordionPanel.setAttribute("aria-hidden", "true");
        accordionPanel.setAttribute("hidden", "");
        accordionPanel.style.height = "0px";
      }

      if (expandedDefault === "true") {
        accordionPanel.setAttribute("aria-hidden", "false");
        accordionPanel.removeAttribute("hidden");
        accordionPanel.style.height = `${accordionPanel.scrollHeight}px`;
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
    const accordionToggleSetup = function(content, btnId) {
      // Get accordion header from plugin.settings.accordionClass
      const accordionHeader = content.querySelector(`.${plugin.settings.headerClass}`);

      const expandedDefault = content.dataset.expanded;

      if (!accordionHeader) return;

      // Create a toggle button, add toggle class and aria attributes
      const toggle = document.createElement("button");
      toggle.className = plugin.settings.toggleBtnClass;
      toggle.setAttribute("aria-controls", `accordion${btnId}`);
      // Check to see if the accordions are set to be expanded or collapsed
      if (plugin.settings.expanded === false) {
        toggle.setAttribute("aria-expanded", "false");
      }

      if (plugin.settings.expanded === true || expandedDefault === "true") {
        toggle.setAttribute("aria-expanded", "true");
      }

      // Get content from existing header and add to button
      toggle.innerHTML = accordionHeader.innerHTML;

      // Clear accordion header html since it was added to button
      accordionHeader.innerHTML = "";
      // Append button to accordion header
      accordionHeader.appendChild(toggle);

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
    const toggleAllSetup = function() {
      // find first accodrion if only one the return
      const firstAccordion = document.querySelector(`.${plugin.settings.accordionClass}`);

      if (!firstAccordion) return;

      // create button container
      const buttonContainer = document.createElement("div");
      buttonContainer.className = plugin.settings.expandAllContainerClass;

      // create expand all button
      const button = document.createElement("button");
      button.className = plugin.settings.expandAllClass;
      // Check to see if the accordions are set to be expanded or collapsed
      if (plugin.settings.expanded === false) {
        button.setAttribute("aria-expanded", "false");
        button.textContent = plugin.settings.expandAllOpenText;
      } else {
        button.setAttribute("aria-expanded", "true");
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
     *
     *
     * @function toggleButton
     * @param  {String} targetElem  The toggle button
     * @param  {String} direction   The direction of the accordion Expand/Collapse
     * @return {void}
     */
    const toggleButton = function(targetElem, direction) {
      if (direction === "expand") {
        targetElem.setAttribute("aria-expanded", "true");
      } else {
        targetElem.setAttribute("aria-expanded", "false");
      }
    };

    /**
     * @function toggleContent
     * @param  {String} targetElem The Accordion button
     * @param  {MouseEvent} event mouse or keyboard
     * @param  {String} direction The direction of the accordion Expand/Collapse
     * @return {void}
     */
    const toggleAccordion = function(targetElem, event, direction) {
      const controls = targetElem.getAttribute("aria-controls");
      const controlsElem = document.getElementById(controls);
      const controlsElemHeight = controlsElem.scrollHeight;
      const toggled = controlsElem.getAttribute("aria-hidden");

      if (event) {
        event.preventDefault();
      }

      function timeoutSet(element) {
        setTimeout(function() {
          element.style.height = "auto";
        }, 300);
      }

      if (direction === "expand" && toggled === "true") {
        controlsElem.removeAttribute("hidden");
        controlsElem.style.height = `${controlsElem.scrollHeight}px`;
        controlsElem.setAttribute("aria-hidden", "false");
        timeoutSet(controlsElem);
      } else if (direction === "collapse" && toggled === "false") {
        controlsElem.style.height = `${controlsElem.scrollHeight}px`;
        controlsElem.setAttribute("aria-hidden", "true");
        setTimeout(function() {
          controlsElem.setAttribute("aria-hidden", true);
          controlsElem.style.height = `${0}px`;
        }, 50);
        setTimeout(function() {
          controlsElem.setAttribute("hidden", "");
        }, 450);
      }

      toggleButton(targetElem, direction);
    };

    /**
     * @function toggleAllContent
     * @param  {String} targetElem The toggle all button
     * @param  {MouseEvent} event mouse or keyboard
     * @param  {String} direction The direction of the accordion Expand/Collapse
     * @return {void}
     */
    const toggleAllAccordions = function(targetElem, event, direction) {
      if (event) {
        event.preventDefault();
      }

      // Grab all accordion toggles in the document
      const buttons = document.querySelectorAll(`.${plugin.settings.toggleBtnClass}`);
      // Loop through each accordion
      Array.prototype.forEach.call(buttons, function(button) {
        toggleAccordion(button, event, direction);
      });

      // After event toggle aria-expanded attribute
      targetElem.setAttribute("aria-expanded", targetElem.getAttribute("aria-expanded") === "true" ? "false" : "true");

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
    const clickHandler = function(event) {
      const toggleBtn = event.target.closest(`.${plugin.settings.toggleBtnClass}`);
      const toggleAll = event.target.closest(`.${plugin.settings.expandAllClass}`);

      if (toggleBtn === null && toggleAll === null) return;

      if (toggleBtn) {
        const directionBtn =
          event.target.closest(`.${plugin.settings.toggleBtnClass}`).getAttribute("aria-expanded") === "true" ? "collapse" : "expand";
        toggleAccordion(toggleBtn, event, directionBtn);
      }
      if (toggleAll) {
        const directionAll =
          event.target.closest(`.${plugin.settings.expandAllClass}`).getAttribute("aria-expanded") === "true" ? "collapse" : "expand";
        toggleAllAccordions(toggleAll, event, directionAll);
      }
    };
    /**
     * @function keyboardHandler
     * @param  {String} event keyboard press
     * @return {type} {description}
     */
    const keyboardHandler = function(event) {
      if (event.key == "Enter" || event.key == " ") {
        const toggleBtn = event.target.closest(`.${plugin.settings.toggleBtnClass}`);
        const toggleAll = event.target.closest(`.${plugin.settings.expandAllClass}`);
        const direction = event.target.getAttribute("aria-expanded") === "true" ? "collapse" : "expand";

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
    Plugin.prototype = {
      nestedSetup(nestedAccordions, accordions) {
        let btnId = 0;
        //Loop over each accordion and setup
        Array.prototype.forEach.call(nestedAccordions, function(accordion) {
          btnId = Math.floor(Math.random() * 100000000 + 1);
          accordionToggleSetup(accordion, btnId);
        });

        plugin.this.nonestedSetup(accordions, btnId);
      },
      nonestedSetup(accordions, btnId) {
        //Loop over each accordion and setup
        Array.prototype.forEach.call(accordions, function(accordion) {
          btnId = Math.floor(Math.random() * 100000000 + 1);
          accordionToggleSetup(accordion, btnId);
        });
      },
      setup() {
        //Check for nested accordions
        const nestedAccordions = document.querySelectorAll(`.${plugin.settings.panelClass} > ${plugin.element}`);
        const accordions = document.querySelectorAll(plugin.element);
        if (nestedAccordions.length > 0) {
          plugin.this.nestedSetup(nestedAccordions, accordions);
          if (plugin.settings.expandAllBtn && accordions.length > 1) toggleAllSetup();
          return;
        }
        if (accordions) {
          let btnId = 0;
          plugin.this.nonestedSetup(accordions, btnId);
          if (plugin.settings.expandAllBtn && accordions.length > 1) toggleAllSetup();
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
        document.addEventListener("click", clickHandler, false);
        document.addEventListener("keydown", keyboardHandler, false);
      },
    };

    // Return the plugin
    return Plugin;
  }
);
