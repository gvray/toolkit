import { hasClass } from '../src';
describe('hasClass', () => {
  it('should return true when SVG Element contains class name', () => {
    const svg: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'example-class-1 example-class-2');
    expect(hasClass(svg, 'example-class-1')).toBe(true);
  });

  it('should return false when SVG Element does not contain class name', () => {
    const svg: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'existing-class-1 existing-class-2');
    expect(hasClass(svg, 'example-class-1')).toBe(false);
  });

  it('should return true when HTMLElement contains class name', () => {
    const div: HTMLDivElement = document.createElement('div');
    div.setAttribute('class', 'example-class-1 example-class-2');
    expect(hasClass(div, 'example-class-1')).toBe(true);
  });

  it('should match full class tokens only', () => {
    const div: HTMLDivElement = document.createElement('div');
    div.setAttribute('class', 'btn-primary');
    expect(hasClass(div, 'btn')).toBe(false);
  });

  it('should return false when HTMLElement does not contain class name', () => {
    const div: HTMLDivElement = document.createElement('div');
    div.setAttribute('class', 'existing-class-1 existing-class-2');
    expect(hasClass(div, 'example-class-1')).toBe(false);
  });
});
