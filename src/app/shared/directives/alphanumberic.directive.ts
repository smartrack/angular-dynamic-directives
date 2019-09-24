import { Directive, OnDestroy, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: '[appAlphaNumeric]' })
export class AlphaNumericDirective implements OnDestroy {
    private unlisten = () => { };

    constructor(public elementRef: ElementRef, public renderer: Renderer2) {
        this.bindEvent();
    }

    private bindEvent() {
        const inputElement = this.elementRef.nativeElement;
        this.unlisten =
            this.renderer.listen(inputElement, 'input', (event: KeyboardEvent) => {
                event.preventDefault();
                const targetElement = event.target as HTMLInputElement;
                // RegEx to replace all special char except alphanumeric with space
                targetElement.value = targetElement.value.replace(/[^A-Z0-9 ]+/ig, '');
            });

    }

    ngOnDestroy() {
        this.unlisten();
    }
}
