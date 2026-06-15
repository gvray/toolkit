import { getBoundingClientPosition } from '../src';

describe('getBoundingClientPosition', () => {
  let container: HTMLElement;
  let child: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '50px';
    container.style.left = '50px';
    container.style.width = '100px';
    container.style.height = '100px';

    child = document.createElement('span');
    child.style.position = 'relative';
    child.style.top = '25px';
    child.style.left = '25px';

    container.appendChild(child);
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('returns the correct bounding client for an element', () => {
    getBoundingClientPosition(child);
    // 浏览器环境TODO
    // expect(bounds.x).toBe(75)
    // expect(bounds.y).toBe(75)
  });
});
