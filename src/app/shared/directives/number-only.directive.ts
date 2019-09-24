import { Directive, ElementRef, Renderer2, OnDestroy } from '@angular/core';

@Directive({ selector: '[appNumberOnly]' })
export class NumberOnlyDirective implements OnDestroy {

    private inputUnListner = () => { };

    constructor(public elementRef: ElementRef, public renderer: Renderer2) {
        this.bindEvent();
    }

    private bindEvent() {
        const inputElement = this.elementRef.nativeElement;
        this.inputUnListner =
            this.renderer.listen(inputElement, 'input', (event: KeyboardEvent) => {
                event.preventDefault();
                const targetElement = event.target as HTMLInputElement;
                targetElement.value = targetElement.value.replace(/\D/g, '');
            });

    }

    ngOnDestroy() {
        this.inputUnListner();
    }

}
