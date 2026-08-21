import * as pagefind from '/pagefind/pagefind.js';

window.__fractalPagefind = pagefind;
window.dispatchEvent(new Event('fractal-pagefind-ready'));
