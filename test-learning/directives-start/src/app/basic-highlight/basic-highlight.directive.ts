import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  Input,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]',
})
export class BasicHighlightDirective implements OnInit {
  // constructor(private elementRef: ElementRef) {}

  // ngOnInit() {
  //   this.elementRef.nativeElement.style.backgroundColor = 'green';
  // }

  // me doing hover on my own
  @Input() defaultColor: string = 'red';
  @Input('appBasicHighlight') highlightColor: string = 'red';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}
