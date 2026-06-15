interface StyleProps {
  [key: string]: string | number;
}

interface StyleSheetCache {
  [key: string]: CSSStyleSheet;
}

const styleSheetCache: StyleSheetCache = {};

/**
 * Add CSS rules to a stylesheet with a given title.
 * If a stylesheet with that title does not exist, it will be created.
 * @param selector The CSS selector to which to apply the rules.
 * @param cssRules An object containing CSS rules to apply.
 * @param title The title of the stylesheet.
 *
 * @example
 * addCss('.my-class', { color: 'red', backgroundColor: 'blue' }, 'my-stylesheet')
 * console.log(document.querySelectorAll('style').length > 0)
 *
 * @since 1.0.0
 */
function addCss(selector: string, cssRules: StyleProps, title = 'sheet'): void {
  let styleSheet = styleSheetCache[title];

  if (!styleSheet) {
    const sty = document.createElement('style');
    sty.title = title;
    document.head.appendChild(sty);

    // @ts-expect-error window.createPopup is IE-only
    if (!window.createPopup) {
      /* For Safari */
      document.head.appendChild(document.createTextNode(''));
    }

    styleSheet = document.styleSheets[document.styleSheets.length - 1];
    styleSheetCache[title] = styleSheet;
  }

  const ruleStr = Object.entries(cssRules)
    .map(
      ([prop, value]) => `${prop.replace(/[A-Z]/g, (value) => `-${value.toLowerCase()}`)}:${value}`
    )
    .join(';');

  if (styleSheet.insertRule) {
    styleSheet.insertRule(`${selector}{${ruleStr}}`, styleSheet.cssRules.length);
  } else {
    styleSheet.addRule(selector, ruleStr, styleSheet.cssRules.length);
  }
}

export default addCss;
