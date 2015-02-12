# Kickstarter Year in Review 2013

A handy all-in-one fullscreen slideshow, extracted from <a href="https://www.kickstarter.com/year/2013" target="_blank">Kickstarter's
2013 year in review</a>.

[See it in action.](http://kickstarter.github.io/fullscreen_slideshow)

# Features
- Mobile friendly.
- URL's allow deep linking to individual slides.
- Background videos in slides are lazy and predictively loaded. On mobile they're not loaded at all, to conserve bandwidth.
- Page background color can be controlled via a slide attribute, allowing subtle rainbow effects as you progress through the slideshow.
- Slides can open full screen modal dialogs which can embed arbitrary pages via iframe.

## Howto

### Background color

If a slide has a `data` attribute called `color` then that attribute will be added to the `body` element when the slide is loaded.
A CSS class with the same name as the slide `id` will also be added.

For example, this slide will have `green30 dollars-pledged` set as the CSS class on `body`:

```html
<div id="dollars-pledged"
    class="slide white"
    data-color="green30">
    ...
</div>
```

### Modal dialogs

A `div` with the class `js-modal` and a `data` `src` attribute can be turned into a full screen modal dialog. A button
or link with the `js-show-modal` will show the modal dialog for the slide. An element with the class `js-embed-wrap`
will have an `iframe` appended to it, with the frame source set to the `src` `data` attribute. An element with the class
`js-hide-modal` inside the modal will close it when clicked.

For example:

```html
<div class="slide-footer">
    <a class="js-show-modal">Play trailer</a>
</div>
<div id="veronica-mars-modal"
    data-src="//www.youtube.com/embed/wq1R93UMqlk?autoplay=1">
    <a class="js-hide-modal">X</a>
    <div class="js-embed-wrap">
        <!-- iframe inserted here -->
    </div>
</div>
```

---

license MIT http://www.opensource.org/licenses/mit-license.php
