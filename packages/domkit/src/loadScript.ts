export type LoadScriptCallback = (ev?: Event) => void;

export type LoadScriptOptions = {
  url: string;
  async?: boolean;
  cache?: boolean;
  //'anonymous' | 'use-credentials'
  crossorigin?: string | null;
  defer?: boolean;
};

/**
 * Loads a script dynamically.
 *
 * @param url - The URL of the script to load.
 * @param callbackfn - Optional callbackfn function to be called when the script is loaded or encounters an error.
 *
 * @example
 * console.log(typeof loadScript)
 * console.log(new Promise((resolve) => loadScript('https://example.com/x.js', resolve)) instanceof Promise)
 *
 * @since 1.0.0
 */
function loadScript(url: string, callbackfn?: LoadScriptCallback): void;
function loadScript(options: LoadScriptOptions, callbackfn?: LoadScriptCallback): void;
function loadScript(
  urlOrOptions: string | LoadScriptOptions,
  callbackfn?: LoadScriptCallback
): void {
  const head =
    document.head || document.getElementsByTagName('head')[0] || document.documentElement;
  const script = document.createElement('script');
  const { url, ...options } =
    typeof urlOrOptions === 'object' ? urlOrOptions : { url: urlOrOptions };

  script.src = url;

  const { async = false, crossorigin = null, defer = false, cache } = options;
  if (cache === false) {
    script.src = `${url + (/\?/.test(url) ? '&' : '?')}_=${new Date().getTime()}`;
  }

  script.async = async;
  script.type = 'text/javascript';
  script.crossOrigin = crossorigin;
  script.defer = defer;

  const handleLoad = () => {
    if (callbackfn) {
      callbackfn();
      cleanup();
    }
  };

  const handleError = (ev: Event) => {
    if (callbackfn) {
      callbackfn(ev);
      cleanup();
    }
  };

  const cleanup = () => {
    script.removeEventListener('load', handleLoad);
    script.removeEventListener('error', handleError);
  };

  script.addEventListener('load', handleLoad, false);
  script.addEventListener('error', handleError, false);

  head.insertBefore(script, head.firstChild);
}

export default loadScript;
