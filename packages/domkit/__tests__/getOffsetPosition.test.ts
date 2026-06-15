import { getOffsetPosition } from '../src';

describe('getOffsetPosition', () => {
  let container: HTMLElement;
  let child: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '50px';
    container.style.left = '50px';

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

  test('returns the correct offset position for an element', () => {
    getOffsetPosition(child);
    // 浏览器环境TODO
    // expect(offset.left).toBe(25)
    // expect(offset.top).toBe(25)
  });
});
