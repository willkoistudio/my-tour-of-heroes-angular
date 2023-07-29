import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[type=file]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileInputValueAccessorDirective,
      multi: true
    }
  ]
})
export class FileInputValueAccessorDirective implements ControlValueAccessor {

  onChange(e) {}

  @HostListener('change', ['$event.target.value']) _handleInput(event) {
    this.onChange(event);
  }

  constructor(private element: ElementRef, private render: Renderer2) { }

  writeValue(value: any): void {
    const normalizedValue = value == null ? '' : value;
    this.render.setProperty(this.element.nativeElement, 'value', normalizedValue);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}

}
