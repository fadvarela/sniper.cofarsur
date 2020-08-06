import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[sniperAutofocus]'
})

export class AutofocusDirective implements OnInit {
  private focus = true;

  constructor(private eleRef: ElementRef) {
  }

  ngOnInit() {
    if (this.focus)
    {
        window.setTimeout(() =>
        {
            this.eleRef.nativeElement.focus();
        });
    }
  }

  @Input() set autofocus(condition: boolean)
  {
      this.focus = condition !== false;
  }

}
