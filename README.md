[![CodeQL](https://github.com/brudolph/super-simple-accordion/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/brudolph/super-simple-accordion/actions/workflows/codeql-analysis.yml)

Super simple, accessible, content accordion.

The instructions below are for installing Super Simple Accordion with NPM and using your favorite bundler to import.

## Install

1. To add Super Simple Accordion using NPM

```sh
$ npm install super-simple-accordion

```

## Usage

## Step 1. Include CSS

You will need to import the css into your project entry file.

```js
import 'super-simple-accordions/dist/css/accordions.min.css';
```

## Step 2. Include markup

In your project include the following markup.

```html
<div class="accordion">
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
</div>

<div class="accordion">
 <h2 class="accordion__title">
   Who is involved?
 </h2>
 <div class="accordion__panel">
     <p>Accordions are useful when you want to toggle between hiding and showing large amounts of content.</p>
 </div>
</div>
```


This is just some example markup and can be changed to fit your needs. You will just need these three elements:

 1. A container for your accordion with the class `.accordion`.
 2. A header with the class `.accordion__title`.
 3. A container for the content with the class `.accordion__panel`

If you want an accordion to be opened by default add the following data attribute in the outer accordion container.

```html
<div class="accordion" data-expanded="true">
```

And to group accordions so the expand all button works just for the group, wrap each group in a `div` with the class `.accordion__grouped`.

```html
<div class="accordion__grouped">
  <div class="accordion">
   <h2 class="accordion__title">
   What is an accordion?
   </h2>
   <div class="accordion__panel">
     <p>
       Accordions are useful when you want to toggle between hiding and showing large amounts of content. Great for FAQs!
     </p>
     <p>
       Look at all of this beautiful content!
     </p>
     <p>
       It all seems so gratuitous but ohhhhh so needed. I love hearing myself talk (type?)!
     </p>
   </div>
   </div>

   <div class="accordion">
   <h2 class="accordion__title">
     Who is involved?
   </h2>
   <div class="accordion__panel">
     <p>Accordions are useful when you want to toggle between hiding and showing large amounts of content.</p>
   </div>
  </div>
</div>
```

This will add an expand all button to each group. Once accordions are grouped the global expand all button will not be placed in the DOM.

## Step 3. Import the package

Below are the default options available. Only include the ones you plan to change. If you do change the class names makes sure to update your CSS accordingly.

In your entry file:

```js
import {SuperSimpleAccordions} from 'super-simple-accordions';

if (document.querySelector(".accordion")) {
    const accordions = new SuperSimpleAccordions('.accordion', {
      // ALL available options

      // Accordion parts
       accordionClass: 'accordion',
       headerClass: 'accordion__title',
       contentClass: 'accordion__content',
       panelClass: 'accordion__panel',

      //Whether to add the hidden attribute to the accordion content
      hidden: true,

       // Toggle Button
       toggleBtnClass: 'accordion__toggle',
      // Toggle all other accordions closed when one is opened
       toggleOthers: false,

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
       expanded: false, // accordions collapsed by default but can be expanded

       //accordion groups
       groupedClass: 'accordion__grouped',
       groupedExpandAllClass: 'accordion__toggle-all-grouped',
    })
  }
```
## Build from source

Download or clone the project - [Github repo](https://github.com/brudolph/super-simple-accordion)

```sh
$ npm install

```

Open up accordions.js in the src/js directory and customize to your liking.


```sh
$ npm run prod

```

This will create a file named accordions.js in the dist directory.


## Browser Compatibility

Super Simple Accordion works in all modern browsers.


## TODO

* Share your ideas and create a pull request.
