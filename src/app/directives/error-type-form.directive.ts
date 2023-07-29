import { Directive, OnInit, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ErrorMsgFormDirective } from './error-msg-form.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[errorTypeForm]'
})
export class ErrorTypeFormDirective implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('errorTypeForm') type: string;
  private hasView = false;

  constructor(
    private errorMsg: ErrorMsgFormDirective,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.errorMsg.controlValue$.subscribe(() => {
       this.setVisible();
     });
   }

   private setVisible() {
    if (this.errorMsg.match(this.type)) {
      if (!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    } else {
      if (this.hasView) {
         this.viewContainer.clear();
         this.hasView = false;
      }
    }
  }
}
