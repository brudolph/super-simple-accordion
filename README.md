Super simple, accessible, content accordion.

## Install

1. Add Super Simple Accordion

Available on npm:

```sh
$ npm install super-simple-accordion

```

Or from [Github](https://github.com/brudolph/super-simple-accordion)

```html
<script src="/path/to/js/accordion.min.js"></script>
```

## Usage

## Step 1. Include CSS

```html
<link rel="stylesheet" href="/dist/css/main.css" />
```

## Step 2. Include markup

In your project include the following markup.

```html
<section>
<h1>Section Title for these grouped accordions</h1>

  <article id="faq1" class="accordion">
    <h2 class="accordion__title">
      What is an accordion?
    </h2>
    <div class="accordion__panel">
        <p>
          Accordions are useful when you want to toggle between hiding and showing large amounts of content.
        </p>
        <p>
          Look at all of this beautiful content!
        </p>
        <p>
          It all seems so gratuitous but ohhhhh so needed. I love hearing myself talk (type?)!
        </p>
    </div>
  </article>

  <article class="accordion">
    <h2 class="accordion__title">
      Who is involved?
    </h2>
    <div class="accordion__panel">
        <p>Accordions are useful when you want to toggle between hiding and showing large amounts of content.</p>
    </div>
  </article>
   
 </section>
```
This is just some example markup and can be changed to fit your needs. You will just need these three elements:

 1. A container (does not need to be an article) for your accordion with the class `.accordion`. 
 2. A header with the class `.accordion__title`.
 3. A container for the content with the class `.accordion__panel`

## Step 3. Include JavaScript
If you are using the minified version and linking to it, include the accordion script and initialize it.

Customize the options to your liking. Below are the default options available. Only include the ones you plan to change. If you do change the class names makes sure to update your SASS files accordingly.

```html
<script src="/dist/js/accordions.min.js"></script>
<script>
 const accordions = new SuperSimpleAccordions('.accordion', {
      // ALL available options

      // Accordion parts
       accordionClass: 'accordion',
       headerClass: 'accordion__title',
       contentClass: 'accordion__content',
       panelClass: 'accordion__panel',

       // Toggle Button
       toggleBtnClass: 'accordion__toggle',

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
       expanded: false, // accordions collapsed or expanded by default
    })
</script>
```

If you install via npm and want to use Webpack, you can import Super Simple Accordion into your project and init like so.

In your entry file:

```js
import SuperSimpleAccordions from 'super-simple-accordions/src/js/accordions';

if (document.querySelector(".accordion")) {
    const accordions = new SuperSimpleAccordions('.accordion', {
      // ALL available options

      // Accordion parts
       accordionClass: 'accordion',
       headerClass: 'accordion__title',
       contentClass: 'accordion__content',
       panelClass: 'accordion__panel',

       // Toggle Button
       toggleBtnClass: 'accordion__toggle',

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
    })
  }
```
## Build from source

Download or clone the project - [Github repo](https://github.com/brudolph/super-simple-accordion)

```sh
$ npm install

```

Open up main.js in the src directory and customize the options to your liking. Below are the default options available. Only include the ones you plan to change.

index.js

```js
import SuperSimpleAccordions from './accordions';

if (document.querySelector(".accordion")) {
    const accordions = new SuperSimpleAccordions('.accordion', {
      // ALL available options

      // Accordion parts
       accordionClass: 'accordion',
       headerClass: 'accordion__title',
       contentClass: 'accordion__content',
       panelClass: 'accordion__panel',

       // Toggle Button
       toggleBtnClass: 'accordion__toggle',

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
    })
  }
```

If you do change the class names makes sure to update your SASS files accordingly.


```sh
$ npm run prod

```

This will create a file named accordions.js in the dist directory.

```html
<script src="/dist/js/accordions.js"></script>
```

## Browser Compatibility

Super Simple Accordion works in all modern browsers and back to IE9. It includes a polyfill for Element.closest.

If you are using the ES6 module and want to include the polyfill just import into the entrypoint.

index.js
```js
import './js/closest_polyfill.js'
```

## Shout Outs!

Huge thanks to [Chris Ferdinandi](https://gomakethings.com/about/) for being an amazing Vanilla JS ambassador. Between his daily tips at [Go Make Things](https://gomakethings.com/articles/) and his priceless [Toolkit](https://vanillajstoolkit.com/) I don't know if I would have made it this far.

When it comes to the accessibility piece, a lot of my inspiration came from [Heydon Pickering](https://twitter.com/heydonworks) and his [Inclusive Components](https://inclusive-components.design/).

## TODO

Refactor and make into ES6 modules maybe a React component?

