# @gvray/domkit

A toolkit for DOM manipulation and browser utilities.

## Installation

```shell
npm i @gvray/domkit
# or
yarn add @gvray/domkit
# or
pnpm add @gvray/domkit
```
<!-- AUTO-API-START -->

## API Reference

## Functions

### addClass()

Adds one or more classes to an element's class attribute, excluding classes that already exist, including SVG elements.

**Parameters:**
- `classes: ...string[]` - One or more classes to add to the element, passing one or multiple class names in each argument

**Since:** 1.0.0

### addCss()

Add CSS rules to a stylesheet with a given title. If a stylesheet with that title does not exist, it will be created.

**Parameters:**
- `selector: string` - The CSS selector to which to apply the rules.
- `cssRules: StyleProps` - An object containing CSS rules to apply.
- `title: string = 'sheet'` - The title of the stylesheet.

**Since:** 1.0.0

### addEvent()

Adds an event listener to a given element.

**Parameters:**
- `ele: T` - The element to which the event listener should be added.
- `type: keyof HTMLElementEventMap` - The type of event to listen for.
- `eventHandle: (ev) => void` - The function to be called when the event occurs.

**Returns:**
- undefined \| () => void - A function to remove the event listener.

**Since:** 1.0.0

### canUseDom()

Returns a boolean indicating if the current environment is a browser environment.

### cancelAnimationFrame()

Cancel animation frame

**Parameters:**
- `handler: number` - The return that requestAnimationFrame back

**Since:** 1.0.0

### createDom()

Creates a new DOM element based on the provided attributes.

**Parameters:**
- `domAttrs?: DomAttrs\<K\>` - Optional attributes for the new element.

**Returns:**
- HTMLElementTagNameMap\[K\] - The newly created element.

**Since:** 1.0.0

### downloadByBlob()

Downloads a file from a Blob object by creating a temporary object URL and clicking a link with a download attribute.

**Parameters:**
- `dataStream: BlobPart` - The data to download as a Blob object.
- `fileName: string = 'unknown'` - The name to use for the downloaded file. Defaults to 'unknown'.

**Since:** 1.0.0

### downloadByUrl()

Downloads a file from a URL by creating a temporary object URL and clicking a link with a download attribute.

**Parameters:**
- `Url: string` - The URL of the file to download.
- `type: string = 'application/octet-stream'` - The MIME type of the file. Defaults to 'application/octet-stream'.

### emptyDom()

Removes all child nodes from the specified DOM element.

**Parameters:**
- `el: HTMLElement` - The DOM element to empty.

### getBoundingClientPosition()

Gets the client (x, y) coordinates of the specified element relative to the viewport.

**Parameters:**
- `ele: HTMLElement` - The element to get the bounding client for.

**Returns:**
- ClientXY - The client (x, y) coordinates of the element.

### getBrowser()

**`Experimental`** Gets the name of the current user's web browser.

**Returns:**
- BrowserName - An enumerated value representing the current browser.

### getClass()

Returns a string of all the CSS class names assigned to an element, including SVG elements.

**Returns:**
- string - A string containing class names

**Since:** 1.0.0

### getCssVariable()

Gets the value of a CSS variable on the specified element or the root element.

**Parameters:**
- `key: string` - The name of the CSS variable to get.
- `ele?: HTMLElement` - The element to get the CSS variable from. If not specified, defaults to the root element.

**Returns:**
- string - The value of the CSS variable.

### getOffsetPosition()

Gets the offset (left, top) position of the specified element relative to its parent element.

**Parameters:**
- `ele: HTMLElement` - The element to get the offset position for.

**Returns:**
- object - The offset (left, top) position of the element relative to its parent.

### getPlatform()

**`Experimental`** Get the platform string of the user's operating system.

**Returns:**
- Platform - The platform string.

### getScrollLeft()

Get the horizontal scroll position.

**Returns:**
- number - The horizontal scroll position.

### getScrollPosition()

Gets the scroll position of the specified target element.

**Parameters:**
- `el: TargetType` - The target element to get the scroll position for.

**Returns:**
- Position - A `Position` object that contains the horizontal and vertical scroll position of the specified target

**Example:**
```typescript
import { getScrollPosition } from "@gvray/domkit";

// Get scroll position for window object
const windowScrollPosition = getScrollPosition(window);
console.log(`Window scroll position: left = ${windowScrollPosition.left}, top = ${windowScrollPosition.top}`);

// Get scroll position for document object
const documentScrollPosition = getScrollPosition(document);
console.log(`Document scroll position: left = ${documentScrollPosition.left}, top = ${documentScrollPosition.top}`);

// Get scroll position for HTML element
const element = document.getElementById("my-element");
const elementScrollPosition = getScrollPosition(element);
console.log(`Element scroll position: left = ${elementScrollPosition.left}, top = ${elementScrollPosition.top}`);
```

### getScrollTop()

Get the scroll position.

**Returns:**
- number - The scroll position.

### getStyleProps()

Get the style properties of an element.

**Parameters:**
- `element: HTMLElement` - The element to get the style properties of.
- `propName?: string` - The name of the property to get.

**Returns:**
- string \| StyleProps - If `propName` is specified, returns the value of that property. Otherwise, returns an object containing all style properties and their values.

**Since:** 1.0.0

### getTextPixelWidth()

Calculates the pixel width of the given text in the specified font.

**Parameters:**
- `text: string` - The text to calculate the width of.

**Returns:**
- number - The pixel width of the text in the specified font.

**Since:** 1.0.0

### hasClass()

Checks if an element has a specified CSS class, including SVG elements.

**Parameters:**
- `className: string` - The CSS class to check for

**Returns:**
- boolean - If the element has the specified CSS class, returns true; otherwise, returns false.

**Since:** 1.0.0

### isBrowser()

Check if the code is running in a browser environment.

**Returns:**
- boolean - A boolean value indicating whether the code is running in a browser environment.

**Example:**
```typescript
import { isBrowser } from "./browserDetection";

if (isBrowser()) {
    console.log("This is running in a browser!");
} else {
    console.log("This is not a browser environment!");
}
```

### isIE()

Checks if the current browser is Internet Explorer (IE).

**Returns:**
- boolean - Returns `true` if the browser is IE; otherwise, returns `false`.

### isScrollEnd()

Checks if the scroll has reached the end.

**Returns:**
- boolean - Returns a boolean indicating whether the scroll has reached the end.

### loadScript()

Loads a script dynamically.

### observeScroll()

Observes the scroll event on the specified element and triggers the provided callbacks.

**Parameters:**
- `element: HTMLElement` - The element to observe scroll events on.
- `onScroll: (event?) => void` - The callback function to execute when a scroll event occurs.
- `onScrollStop?: () => void` - The optional callback function to execute when scrolling stops.

**Returns:**
- A function to stop observing scroll events. - > (): `void`

### rem()

Set font size of HTML tag according to the design width.

**Parameters:**
- `designWidth: number` - The design width of the page.
- `options: RemOptions = {}` - The optional parameters.

### removeClass()

Remove a class from an element.

**Parameters:**
- `el: HTMLElement` - The target element.
- `className: string` - The class name to remove.

### removeCssVariable()

Removes a CSS variable from the specified element or the root element.

**Parameters:**
- `key: string` - The name of the CSS variable to remove.
- `ele?: HTMLElement` - The element from which to remove the CSS variable. If not specified, defaults to the root element.

### removeDom()

Remove a DOM element.

**Parameters:**
- `el: Element` - The element to remove.

**Since:** 1.0.0

### removeEvent()

Remove an event listener from an element.

**Parameters:**
- `el: Element` - The element to remove the event listener from.
- `type: string` - The event type to remove.
- `callback: EventListener = ...` - The callback function to remove.
- `options: RemoveEventOptions = {}` - The options object.

**Since:** 1.0.0

### requestAnimationFrame()

The requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes as an argument a callback to be invoked before the repaint. The callback accepts a parameter, a timestamp, which indicates the current time when callbacks queued by requestAnimationFrame() begin to fire. This method searches for the appropriate version of requestAnimationFrame() to use, with fallbacks for older versions in use by some browsers.

**Parameters:**
- `fn: FrameRequestCallback` - A function specifying the animation to perform for each frame.

**Returns:**
- number - A numeric ID which can be passed to cancelAnimationFrame() to cancel the requested animation.

**Example:**
```typescript
const animate = () => {
  const element = document.getElementById('myElement')
  let position = 0
  const moveDown = () => {
    position += 2
    element.style.top = `${position}px`
    requestAnimationFrame(moveDown)
  }
  moveDown()
}
animate()
```

**Since:** 1.0.0

### require()

Dynamically load a JavaScript file and execute a callback function.

**Parameters:**
- `file: string` - The URL of the JavaScript file to load.
- `callback: (ev) => any` - The callback function to execute when the script is loaded.

**Since:** 1.0.0

### scrollTo()

### setClass()

Sets the class attribute or className property of an element to the specified value.

**Parameters:**
- `className: string` - The class name(s) to set on the element.

**Since:** 1.0.0

### setCssVariable()

Sets a CSS variable on the specified element or the root element.

**Parameters:**
- `key: string` - The name of the CSS variable to set.
- `val: string` - The value to set the CSS variable to.
- `ele?: HTMLElement` - The element to set the CSS variable on. If not specified, defaults to the root element.

### setOpacity()

Set the opacity of an element.

**Parameters:**
- `elem: any` - The element whose opacity to set.
- `opacity: number` - The opacity value to set.

**Since:** 1.0.0

### setStyleProps()

Sets the style properties of an HTML element.

**Parameters:**
- `props: Partial\<\{[key: string]: string; \}\>` - The style properties to set, in the form of an object of key-value pairs.

**Returns:**
- void - void

**Since:** 1.0.0

### toBack()

Moves the given element to the back of its parent's children.

**Parameters:**
- `el: HTMLElement` - The element to move to the back.

### toFront()

Moves the given element to the front of its parent's children.

**Parameters:**
- `el: HTMLElement` - The element to move to the front.


## Variables

### preload

<!-- AUTO-API-END -->