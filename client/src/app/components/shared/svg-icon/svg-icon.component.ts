import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'klock-svg-icon',
  standalone: true,
  imports: [],
  template: ``,
})
export class SvgIconComponent implements OnChanges {
  @Input() set svgName(val: string) {
    this.fetchSvg(val)
  };
  @Input() className = '';
  @Input() size = '';
  @Input() color = '';
  @Input() stroke = '';
  @Input() hoverColor = '';

  svgContent = '';

  private http = inject(HttpClient);
  private element = inject(ElementRef);

  svgCustomization(svg: string) {
    const parser = new DOMParser();
    const svgElement = parser
      .parseFromString(svg, 'image/svg+xml')
      .getElementsByTagName('svg')[0];
    this.setSvgAttributes(svgElement);
    this.setSvgColor(svgElement);
    return svgElement;
  }

  setSvgAttributes(svg: SVGElement): void {
    if (!this.size) return;
    const size = parseInt(this.size, 10);
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.setAttribute('class', this.className);
  }

  setSvgColor(svg: SVGElement): void {
    if (!svg) return;
    const innerEls = svg.getElementsByTagName('*');
      Array.from(innerEls).forEach((el) => {
        if (el.getAttribute('fill') && this.color) {
          el.setAttribute('fill', this.color);
        } else if (el.getAttribute('stroke') && this.stroke) {
          el.setAttribute('stroke', this.stroke);
        }
      });
  }

  loadSvg(path: string): void {
    this.http.get(path, { responseType: 'text' }).subscribe({
      next: (data) => {
      const svgEl = this.element.nativeElement as HTMLElement;
      svgEl.firstChild?.remove();
      svgEl.appendChild(this.svgCustomization(data))
      },
    });
  }

fetchSvg(name: string) {
  if (!name) return;
  const svgPath = `assets/icons/${name}.svg`;
  this.loadSvg(svgPath);
}
  
  ngOnChanges() {    
    const svgEl = this.element.nativeElement.querySelector('svg') as SVGElement;
    if (!svgEl) return;
    this.setSvgColor(svgEl);
  }
}
