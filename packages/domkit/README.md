# @gvray/domkit

A toolkit for dom

## Usage

```shell
npm i @gvray/domkit
```

@gvray/domkit - v1.0.0-Beta

# @gvray/domkit - v1.0.0-Beta

## Table of contents

### Functions

- [addClass](README.md#addclass)
- [addCss](README.md#addcss)
- [addEvent](README.md#addevent)
- [canUseDom](README.md#canusedom)
- [cancelAnimationFrame](README.md#cancelanimationframe)
- [createDom](README.md#createdom)
- [downloadByBlob](README.md#downloadbyblob)
- [downloadByUrl](README.md#downloadbyurl)
- [emptyDom](README.md#emptydom)
- [getBoundingClientPosition](README.md#getboundingclient)
- [getBrowser](README.md#getbrowser)
- [getClass](README.md#getclass)
- [getCssVariable](README.md#getcssvariable)
- [getOffsetPosition](README.md#getoffsetposition)
- [getPlatform](README.md#getplatform)
- [getScrollPosition](README.md#getscrollposition)
- [getStyleProps](README.md#getstyleprops)
- [getTextPixelWidth](README.md#gettextpixelwidth)
- [hasClass](README.md#hasclass)
- [isBrowser](README.md#isbrowser)
- [preload](README.md#preload)
- [rem](README.md#rem)
- [removeClass](README.md#removeclass)
- [removeCssVariable](README.md#removecssvariable)
- [removeDom](README.md#removedom)
- [removeEvent](README.md#removeevent)
- [requestAnimationFrame](README.md#requestanimationframe)
- [require](README.md#require)
- [scrollTo](README.md#scrollto)
- [setClass](README.md#setclass)
- [setCssVariable](README.md#setcssvariable)
- [setOpacity](README.md#setopacity)
- [setStyleProps](README.md#setstyleprops)
- [toBack](README.md#toback)
- [toFront](README.md#tofront)

## Functions

### addClass

▸ **addClass**(`el`, `...classes`): `void`

Adds one or more classes to an element's class attribute, excluding classes that already exist, including SVG elements.

**`Example`**

```ts
const el = document.querySelector('.example-class')!
addClass(el, 'new-class-1', 'new-class-2', 'example-class')
```

**`Since`**

1.0.0

#### Parameters

| Name         | Type                          | Description                                                                                     |
| :----------- | :---------------------------- | :---------------------------------------------------------------------------------------------- |
| `el`         | `HTMLElement` \| `SVGElement` | The element to add class names to                                                               |
| `...classes` | `string`[]                    | One or more classes to add to the element, passing one or multiple class names in each argument |

#### Returns

`void`

#### Defined in

[addClass.ts:15](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/addClass.ts#L15)

---

### addCss

▸ **addCss**(`selector`, `cssRules`, `title?`): `void`

Add CSS rules to a stylesheet with a given title.
If a stylesheet with that title does not exist, it will be created.

**`Example`**

```ts
addCss('.my-class', { color: 'red', backgroundColor: 'blue' }, 'my-stylesheet')
```

**`Since`**

1.0.0

#### Parameters

| Name       | Type         | Default value | Description                                   |
| :--------- | :----------- | :------------ | :-------------------------------------------- |
| `selector` | `string`     | `undefined`   | The CSS selector to which to apply the rules. |
| `cssRules` | `StyleProps` | `undefined`   | An object containing CSS rules to apply.      |
| `title`    | `string`     | `'sheet'`     | The title of the stylesheet.                  |

#### Returns

`void`

#### Defined in

[addCss.ts:23](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/addCss.ts#L23)

---

### addEvent

▸ **addEvent**<`T`\>(`ele`, `type`, `eventHandle`, `options?`): `undefined` \| () => `void`

Adds an event listener to a given element.

**`Example`**

```ts
const button = document.querySelector('button')
addEvent(button, 'click', () => console.log('Button clicked!'))
```

**`Since`**

1.0.0

#### Type parameters

| Name | Type                                  |
| :--- | :------------------------------------ |
| `T`  | extends `HTMLElement` \| `SVGElement` |

#### Parameters

| Name                  | Type                                                                                                                                                                                                                                                                                                                                                                                   | Description                                                                                                                                                             |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ele`                 | `T`                                                                                                                                                                                                                                                                                                                                                                                    | The element to which the event listener should be added.                                                                                                                |
| `type`                | keyof `HTMLElementEventMap`                                                                                                                                                                                                                                                                                                                                                            | The type of event to listen for.                                                                                                                                        |
| `eventHandle`         | (`ev`: `Event` \| `ProgressEvent`<`EventTarget`\> \| `ClipboardEvent` \| `UIEvent` \| `AnimationEvent` \| `MouseEvent` \| `InputEvent` \| `FocusEvent` \| `CompositionEvent` \| `DragEvent` \| `ErrorEvent` \| `FormDataEvent` \| `PointerEvent` \| `KeyboardEvent` \| `SecurityPolicyViolationEvent` \| `SubmitEvent` \| `TouchEvent` \| `TransitionEvent` \| `WheelEvent`) => `void` | The function to be called when the event occurs.                                                                                                                        |
| `options`             | `Object`                                                                                                                                                                                                                                                                                                                                                                               | Additional options to modify the behavior of the event listener.                                                                                                        |
| `options.useCapture`  | `undefined` \| `boolean`                                                                                                                                                                                                                                                                                                                                                               | A boolean indicating whether events of this type should be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. |
| `options.useDebounce` | `undefined` \| `boolean`                                                                                                                                                                                                                                                                                                                                                               | A boolean indicating whether the event handler should be debounced.                                                                                                     |
| `options.useThrottle` | `undefined` \| `boolean`                                                                                                                                                                                                                                                                                                                                                               | A boolean indicating whether the event handler should be throttled.                                                                                                     |

#### Returns

`undefined` \| () => `void`

A function to remove the event listener.

#### Defined in

[addEvent.ts:19](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/addEvent.ts#L19)

---

### canUseDom

▸ **canUseDom**(): `boolean`

Returns a boolean indicating if the current environment is a browser environment.

#### Returns

`boolean`

#### Defined in

[canUseDom.ts:4](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/canUseDom.ts#L4)

---

### cancelAnimationFrame

▸ **cancelAnimationFrame**(`handler`): `void`

Cancel animation frame

**`Since`**

1.0.0

**`Example`**

```ts
let animation = requestAnimationFrame(changeHeight)
setTimeout(() => clearAnimationFrame(animation), 3000)
```

**`Todo`**

jest

#### Parameters

| Name      | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `handler` | `number` | The return that requestAnimationFrame back |

#### Returns

`void`

#### Defined in

[cancelAnimationFrame.ts:10](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/cancelAnimationFrame.ts#L10)

---

### createDom

▸ **createDom**<`K`\>(`domAttrs?`): `HTMLElementTagNameMap`[`K`]

Creates a new DOM element based on the provided attributes.

**`Example`**

```ts
// Creating a new div with some text content and adding it to the document body
const myDiv = createDom({
  tagName: 'div',
  node: 'Hello, world!',
  container: document.body
})
```

**`Since`**

1.0.0

#### Type parameters

| Name | Type                                  |
| :--- | :------------------------------------ |
| `K`  | extends keyof `HTMLElementTagNameMap` |

#### Parameters

| Name        | Type             | Description                              |
| :---------- | :--------------- | :--------------------------------------- |
| `domAttrs?` | `DomAttrs`<`K`\> | Optional attributes for the new element. |

#### Returns

`HTMLElementTagNameMap`[`K`]

The newly created element.

#### Defined in

[createDom.ts:24](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/createDom.ts#L24)

---

### downloadByBlob

▸ **downloadByBlob**(`dataStream`, `fileName?`): `void`

Downloads a file from a Blob object by creating a temporary object URL and clicking a link with a download attribute.

**`Example`**

```ts
// Download a file from an ExcelJS workbook
const workbook = new ExcelJS.Workbook()
// ...
const buffer = await workbook.xlsx.writeBuffer()
downloadByBlob(buffer, 'my-file')
```

**`Since`**

1.0.0

#### Parameters

| Name         | Type       | Default value | Description                                                     |
| :----------- | :--------- | :------------ | :-------------------------------------------------------------- |
| `dataStream` | `BlobPart` | `undefined`   | The data to download as a Blob object.                          |
| `fileName`   | `string`   | `'unknown'`   | The name to use for the downloaded file. Defaults to 'unknown'. |

#### Returns

`void`

#### Defined in

[downloadByBlob.ts:13](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/downloadByBlob.ts#L13)

---

### downloadByUrl

▸ **downloadByUrl**(`Url`, `type?`): `void`

Downloads a file from a URL by creating a temporary object URL and clicking a link with a download attribute.

**`Example`**

```ts
downloadByUrl('https://example.com/my-file.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
```

#### Parameters

| Name   | Type     | Default value                | Description                                                        |
| :----- | :------- | :--------------------------- | :----------------------------------------------------------------- |
| `Url`  | `string` | `undefined`                  | The URL of the file to download.                                   |
| `type` | `string` | `'application/octet-stream'` | The MIME type of the file. Defaults to 'application/octet-stream'. |

#### Returns

`void`

#### Defined in

[downloadByUrl.ts:8](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/downloadByUrl.ts#L8)

---

### emptyDom

▸ **emptyDom**(`el`): `void`

Removes all child nodes from the specified DOM element.

**`Example`**

```ts
// clear the contents of a div with id "my-div"
const el = document.getElementById('my-div')
emptyDom(el)
```

#### Parameters

| Name | Type          | Description               |
| :--- | :------------ | :------------------------ |
| `el` | `HTMLElement` | The DOM element to empty. |

#### Returns

`void`

#### Defined in

[emptyDom.ts:11](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/emptyDom.ts#L11)

---

### getBoundingClientPosition

▸ **getBoundingClientPosition**(`ele`): `ClientXY`

Gets the client (x, y) coordinates of the specified element relative to the viewport.

**`Example`**

```ts
// get the bounding client of the element with id "my-ele"
const el = document.getElementById('my-ele')
const bounds = getBoundingClientPosition(el)
console.log(bounds.x, bounds.y)
```

#### Parameters

| Name  | Type          | Description                                 |
| :---- | :------------ | :------------------------------------------ |
| `ele` | `HTMLElement` | The element to get the bounding client for. |

#### Returns

`ClientXY`

The client (x, y) coordinates of the element.

#### Defined in

[getBoundingClientPosition.ts:18](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/getBoundingClientPosition.ts#L18)

---

### getBrowser

▸ **getBrowser**(): `BrowserName`

Gets the name of the current user's web browser.

**`Example`**

const browser: BrowserName = getBrowser();
console.log(`Your browser is: ${browser}`);

#### Returns

`BrowserName`

An enumerated value representing the current browser.

#### Defined in

[getBrowser.ts:24](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/getBrowser.ts#L24)

---

### getClass

▸ **getClass**(`el`): `string`

Returns a string of all the CSS class names assigned to an element, including SVG elements.

**`Example`**

```ts
const el = document.querySelector('.example-class')!
const classes = getClass(el)
console.log(classes) // 'example-class'
```

**`Since`**

1.0.0

#### Parameters

| Name | Type                          | Description                                  |
| :--- | :---------------------------- | :------------------------------------------- |
| `el` | `HTMLElement` \| `SVGElement` | The element to retrieve the class names from |

#### Returns

`string`

A string containing class names

#### Defined in

[getClass.ts:15](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/getClass.ts#L15)

---

### getCssVariable

▸ **getCssVariable**(`key`, `ele?`): `string`

Gets the value of a CSS variable on the specified element or the root element.

**`Example`**

```ts
// Get the value of a CSS variable on the root element
const bgColor = getCssVariable('--main-bg-color')

// Get the value of a CSS variable on a specific element
const element = document.querySelector('.my-element')
const bgColor = getCssVariable('--main-bg-color', element)
```

#### Parameters

| Name   | Type          | Description                                                                               |
| :----- | :------------ | :---------------------------------------------------------------------------------------- |
| `key`  | `string`      | The name of the CSS variable to get.                                                      |
| `ele?` | `HTMLElement` | The element to get the CSS variable from. If not specified, defaults to the root element. |

#### Returns

`string`

The value of the CSS variable.

#### Defined in

[getCssVariable.ts:14](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/getCssVariable.ts#L14)

---

### getOffsetPosition

▸ **getOffsetPosition**(`ele`): `Object`

Gets the offset (left, top) position of the specified element relative to its parent element.

**`Example`**

```ts
// get the offset position of the element with id "my-ele" relative to its parent
const el = document.getElementById('my-ele')
const offset = getOffsetPosition(el)
console.log(offset.left, offset.top)
```

#### Parameters

| Name  | Type          | Description                                 |
| :---- | :------------ | :------------------------------------------ |
| `ele` | `HTMLElement` | The element to get the offset position for. |

#### Returns

`Object`

The offset (left, top) position of the element relative to its parent.

| Name   | Type     |
| :----- | :------- |
| `left` | `number` |
| `top`  | `number` |

#### Defined in

[getOffsetPosition.ts:13](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/getOffsetPosition.ts#L13)

---

### getPlatform

▸ **getPlatform**(): `Platform`

Get the platform string of the user's operating system.

**`Example`**

```ts
const platform = getPlatform()
console.log(platform) // Outputs: Windows / MacOS / Linux / Android / iOS / Unknown
```

#### Returns

`Platform`

The platform string.

#### Defined in

[getPlatform.ts:20](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/getPlatform.ts#L20)

---

### getScrollPosition

▸ **getScrollPosition**(`el`): `Position`

Gets the scroll position of the specified target element.

**`Remarks`**

This function returns the horizontal and vertical scroll position of the specified target element, which can be
an HTML element or the window or document object.

**`Example`**

```typescript
import { getScrollPosition } from '@gvray/domkit'

// Get scroll position for window object
const windowScrollPosition = getScrollPosition(window)
console.log(`Window scroll position: left = ${windowScrollPosition.left}, top = ${windowScrollPosition.top}`)

// Get scroll position for document object
const documentScrollPosition = getScrollPosition(document)
console.log(`Document scroll position: left = ${documentScrollPosition.left}, top = ${documentScrollPosition.top}`)

// Get scroll position for HTML element
const element = document.getElementById('my-element')
const elementScrollPosition = getScrollPosition(element)
console.log(`Element scroll position: left = ${elementScrollPosition.left}, top = ${elementScrollPosition.top}`)
```

#### Parameters

| Name | Type         | Description                                        |
| :--- | :----------- | :------------------------------------------------- |
| `el` | `TargetType` | The target element to get the scroll position for. |

#### Returns

`Position`

A `Position` object that contains the horizontal and vertical scroll position of the specified target
element.

#### Defined in

[getScrollPosition.ts:35](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/getScrollPosition.ts#L35)

---

### getStyleProps

▸ **getStyleProps**(`element`, `propName?`): `string` \| `StyleProps`

Get the style properties of an element.

**`Example`**

Get all style properties of a specified element:

```typescript
const element = document.getElementById('my-element')
const styleProps = getStyleProps(element)
console.log(styleProps)
```

Get the `color` property of a specified element:

```typescript
const element = document.getElementById('my-element')
const color = getStyleProps(element, 'color')
console.log(color)
```

**`Since`**

1.0.0

#### Parameters

| Name        | Type          | Description                                 |
| :---------- | :------------ | :------------------------------------------ |
| `element`   | `HTMLElement` | The element to get the style properties of. |
| `propName?` | `string`      | The name of the property to get.            |

#### Returns

`string` \| `StyleProps`

If `propName` is specified, returns the value of that property. Otherwise, returns an object containing all style properties and their values.

#### Defined in

[getStyleProps.ts:38](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/getStyleProps.ts#L38)

---

### getTextPixelWidth

▸ **getTextPixelWidth**(`text`, `options`): `number`

Calculates the pixel width of the given text in the specified font.

**`Example`**

```ts
// Returns the pixel width of "Hello, World!" in the "20px Arial" font.
const width = getTextPixelWidth('Hello, World!', { fontFamily: 'Arial', fontSize: 20 })
```

**`Since`**

1.0.0

#### Parameters

| Name                  | Type                 | Description                                     |
| :-------------------- | :------------------- | :---------------------------------------------- |
| `text`                | `string`             | The text to calculate the width of.             |
| `options`             | `Object`             | Options for the font.                           |
| `options.font?`       | `string`             | The font string to use, e.g. `Arial`.           |
| `options.fontFamily?` | `string`             | The name of the font family, e.g. `sans-serif`. |
| `options.fontSize?`   | `string` \| `number` | The size of the font in pixels.                 |
| `options.fontWeight?` | `string` \| `number` | The weight of the font, e.g. `bold`.            |

#### Returns

`number`

The pixel width of the text in the specified font.

#### Defined in

[getTextPixelWidth.ts:21](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/getTextPixelWidth.ts#L21)

---

### hasClass

▸ **hasClass**(`el`, `className`): `boolean`

Checks if an element has a specified CSS class, including SVG elements.

**`Example`**

```ts
const el = document.querySelector('.example-class')!
if (hasClass(el, 'example-class')) {
  console.log('Element has class "example-class".')
}
```

**`Since`**

1.0.0

#### Parameters

| Name        | Type                          | Description                |
| :---------- | :---------------------------- | :------------------------- |
| `el`        | `HTMLElement` \| `SVGElement` | The element to check       |
| `className` | `string`                      | The CSS class to check for |

#### Returns

`boolean`

If the element has the specified CSS class, returns true; otherwise, returns false.

#### Defined in

[hasClass.ts:17](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/hasClass.ts#L17)

---

### isBrowser

▸ **isBrowser**(): `boolean`

Check if the code is running in a browser environment.

**`Remarks`**

This function detects if the code is running in a browser by checking for the presence of `window` and `document`
objects, and whether `document.createElement` function is available.

**`Example`**

```typescript
import { isBrowser } from './browserDetection'

if (isBrowser()) {
  console.log('This is running in a browser!')
} else {
  console.log('This is not a browser environment!')
}
```

#### Returns

`boolean`

A boolean value indicating whether the code is running in a browser environment.

#### Defined in

[isBrowser.ts:21](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/isBrowser.ts#L21)

---

### preload

▸ **preload**(`options`): `void`

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `options` | `PreloadOptions` |

#### Returns

`void`

#### Defined in

[preload.ts:23](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/preload.ts#L23)

---

### rem

▸ **rem**(`designWidth`, `options?`): `void`

Set font size of HTML tag according to the design width.

**`Example`**

```ts
// Sets the HTML font size based on a design width of 750 pixels
// with a maximum width of 2000 pixels and a minimum width of 375 pixels.
rem(750, { maxWith: 2000, minWith: 375 })
```

#### Parameters

| Name          | Type         | Description                   |
| :------------ | :----------- | :---------------------------- |
| `designWidth` | `number`     | The design width of the page. |
| `options`     | `RemOptions` | The optional parameters.      |

#### Returns

`void`

#### Defined in

[rem.ts:17](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/rem.ts#L17)

---

### removeClass

▸ **removeClass**(`el`, `className`): `void`

Remove a class from an element.

**`Example`**

```ts
// Removes the class "active" from an element with the "target" ID.
const target = document.getElementById('target')
removeClass(target, 'active')
```

#### Parameters

| Name        | Type          | Description               |
| :---------- | :------------ | :------------------------ |
| `el`        | `HTMLElement` | The target element.       |
| `className` | `string`      | The class name to remove. |

#### Returns

`void`

#### Defined in

[removeClass.ts:12](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/removeClass.ts#L12)

---

### removeCssVariable

▸ **removeCssVariable**(`key`, `ele?`): `void`

Removes a CSS variable from the specified element or the root element.

**`Example`**

```ts
// Remove a CSS variable from the root element
removeCssVariable('--main-bg-color')

// Remove a CSS variable from a specific element
const element = document.querySelector('.my-element')
removeCssVariable('--main-bg-color', element)
```

#### Parameters

| Name   | Type          | Description                                                                                        |
| :----- | :------------ | :------------------------------------------------------------------------------------------------- |
| `key`  | `string`      | The name of the CSS variable to remove.                                                            |
| `ele?` | `HTMLElement` | The element from which to remove the CSS variable. If not specified, defaults to the root element. |

#### Returns

`void`

#### Defined in

[removeCssVariable.ts:13](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/removeCssVariable.ts#L13)

---

### removeDom

▸ **removeDom**(`el`): `void`

Remove a DOM element.

**`Example`**

```ts
removeDom(document.getElementById('my-element'))
```

**`Since`**

1.0.0

#### Parameters

| Name | Type      | Description            |
| :--- | :-------- | :--------------------- |
| `el` | `Element` | The element to remove. |

#### Returns

`void`

#### Defined in

[removeDom.ts:12](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/removeDom.ts#L12)

---

### removeEvent

▸ **removeEvent**(`el`, `type`, `callback`, `options?`): `void`

Remove an event listener from an element.

**`Example`**

```ts
const el = document.getElementById('my-element')
const callback = () => {
  console.log('Button clicked')
}

// Add the event listener
addEvent(el, 'click', callback, { useCapture: false })

// Remove the event listener
removeEvent(el, 'click', callback, { useCapture: false })
```

**`Since`**

1.0.0

#### Parameters

| Name       | Type                 | Description                                    |
| :--------- | :------------------- | :--------------------------------------------- |
| `el`       | `Element`            | The element to remove the event listener from. |
| `type`     | `string`             | The event type to remove.                      |
| `callback` | `EventListener`      | The callback function to remove.               |
| `options`  | `RemoveEventOptions` | The options object.                            |

#### Returns

`void`

#### Defined in

[removeEvent.ts:30](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/removeEvent.ts#L30)

---

### requestAnimationFrame

▸ **requestAnimationFrame**(`fn`): `number`

The requestAnimationFrame() method tells the browser that you wish to perform an animation
and requests that the browser calls a specified function to update an animation before the
next repaint. The method takes as an argument a callback to be invoked before the repaint.
The callback accepts a parameter, a timestamp, which indicates the current time when callbacks
queued by requestAnimationFrame() begin to fire.

This method searches for the appropriate version of requestAnimationFrame() to use, with fallbacks
for older versions in use by some browsers.

**`Example`**

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

**`Since`**

1.0.0

#### Parameters

| Name | Type                   | Description                                                    |
| :--- | :--------------------- | :------------------------------------------------------------- |
| `fn` | `FrameRequestCallback` | A function specifying the animation to perform for each frame. |

#### Returns

`number`

A numeric ID which can be passed to cancelAnimationFrame() to cancel the requested animation.

#### Defined in

[requestAnimationFrame.ts:31](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/requestAnimationFrame.ts#L31)

---

### require

▸ **require**(`file`, `callback`): `void`

Dynamically load a JavaScript file and execute a callback function.

**`Example`**

```ts
requireScript('path/to/script.js', () => {
  console.log('Script loaded')
})
```

**`Since`**

1.0.0

#### Parameters

| Name       | Type                     | Description                                                 |
| :--------- | :----------------------- | :---------------------------------------------------------- |
| `file`     | `string`                 | The URL of the JavaScript file to load.                     |
| `callback` | (`ev`: `Event`) => `any` | The callback function to execute when the script is loaded. |

#### Returns

`void`

#### Defined in

[require.ts:15](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/require.ts#L15)

---

### scrollTo

▸ **scrollTo**(`«destructured»`): `void`

#### Parameters

| Name             | Type              |
| :--------------- | :---------------- |
| `«destructured»` | `ScrollToOptions` |

#### Returns

`void`

#### Defined in

[scrollTo.ts:34](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/scrollTo.ts#L34)

---

### setClass

▸ **setClass**(`el`, `className`): `void`

Sets the class attribute or className property of an element to the specified value.

**`Example`**

```ts
const myEl = document.getElementById('my-element')!
setClass(myEl, 'my-class')
// The above call sets the class to "my-class" on #my-element.
```

**`Since`**

1.0.0

#### Parameters

| Name        | Type                          | Description                                          |
| :---------- | :---------------------------- | :--------------------------------------------------- |
| `el`        | `HTMLElement` \| `SVGElement` | The element to set the class attribute/property for. |
| `className` | `string`                      | The class name(s) to set on the element.             |

#### Returns

`void`

#### Defined in

[setClass.ts:13](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/setClass.ts#L13)

---

### setCssVariable

▸ **setCssVariable**(`key`, `val`, `ele?`): `void`

Sets a CSS variable on the specified element or the root element.

**`Example`**

```ts
// Set a CSS variable on the root element
setCssVariable('--main-bg-color', '#ffffff')

// Set a CSS variable on a specific element
const element = document.querySelector('.my-element')
setCssVariable('--main-bg-color', '#ffffff', element)
```

#### Parameters

| Name   | Type          | Description                                                                             |
| :----- | :------------ | :-------------------------------------------------------------------------------------- |
| `key`  | `string`      | The name of the CSS variable to set.                                                    |
| `val`  | `string`      | The value to set the CSS variable to.                                                   |
| `ele?` | `HTMLElement` | The element to set the CSS variable on. If not specified, defaults to the root element. |

#### Returns

`void`

#### Defined in

[setCssVariable.ts:14](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/setCssVariable.ts#L14)

---

### setOpacity

▸ **setOpacity**(`elem`, `opacity`): `void`

Set the opacity of an element.

**`Example`**

```ts
const element = document.querySelector('.my-element')
setOpacity(element, 0.5)
```

**`Since`**

1.0.0

#### Parameters

| Name      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `elem`    | `any`    | The element whose opacity to set. |
| `opacity` | `number` | The opacity value to set.         |

#### Returns

`void`

#### Defined in

[setOpacity.ts:14](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/setOpacity.ts#L14)

---

### setStyleProps

▸ **setStyleProps**<`T`\>(`element`, `props`): `void`

Sets the style properties of an HTML element.

**`Example`**

```ts
const el = document.getElementById('myElement')
setStyleProps(el, { color: 'red', fontSize: '14px' })
```

**`Since`**

1.0.0

#### Type parameters

| Name | Type                  |
| :--- | :-------------------- |
| `T`  | extends `HTMLElement` |

#### Parameters

| Name      | Type                                       | Description                                                               |
| :-------- | :----------------------------------------- | :------------------------------------------------------------------------ |
| `element` | `null` \| `T`                              | The element to set style properties on.                                   |
| `props`   | `Partial`<{ `[key: string]`: `string`; }\> | The style properties to set, in the form of an object of key-value pairs. |

#### Returns

`void`

void

#### Defined in

[setStyleProps.ts:18](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/setStyleProps.ts#L18)

---

### toBack

▸ **toBack**(`el`): `void`

Moves the given element to the back of its parent's children.

**`Example`**

```ts
// Move the first div to the back of its parent container
const container = document.querySelector('.container')
const firstDiv = container.firstElementChild
toBack(firstDiv)
```

#### Parameters

| Name | Type          | Description                      |
| :--- | :------------ | :------------------------------- |
| `el` | `HTMLElement` | The element to move to the back. |

#### Returns

`void`

#### Defined in

[toBack.ts:12](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/toBack.ts#L12)

---

### toFront

▸ **toFront**(`el`): `void`

Moves the given element to the front of its parent's children.

**`Example`**

```ts
// Create a new element and add it to the DOM
const newDiv = document.createElement('div')
document.body.appendChild(newDiv)

// Move the new element to the front of the body
toFront(newDiv)
```

#### Parameters

| Name | Type          | Description                       |
| :--- | :------------ | :-------------------------------- |
| `el` | `HTMLElement` | The element to move to the front. |

#### Returns

`void`

#### Defined in

[toFront.ts:14](https://github.com/gvray/toolkit/blob/7fa8b86/packages/domkit/src/toFront.ts#L14)
