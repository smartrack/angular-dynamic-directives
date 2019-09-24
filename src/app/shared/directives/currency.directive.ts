import { Directive, ElementRef, Renderer2, OnDestroy } from '@angular/core';

@Directive({ selector: '[appCurrency]' })
export class CurrencyDirective implements OnDestroy {
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
                this.formatCurrency(targetElement);
            });

    }

    private formatNumber(value: string): string {
        return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    private formatCurrency(inputElement: HTMLInputElement) {
        let inputValue = inputElement.value;
        if (inputValue === '') {
            return;
        }
        const originalLength = inputValue.length;
        let cursorPosition = inputElement.selectionStart;

        if (inputValue.indexOf('.') >= 0) {
            const decimalPosition = inputValue.indexOf('.');
            let beforeDecimal = inputValue.substring(0, decimalPosition);
            let afterDecimal = inputValue.substring(decimalPosition);

            beforeDecimal = this.formatNumber(beforeDecimal);
            afterDecimal = this.formatNumber(afterDecimal);

            afterDecimal = afterDecimal.substring(0, 2);
            inputValue = '$' + beforeDecimal + '.' + afterDecimal;
        } else {
            inputValue = this.formatNumber(inputValue);
            inputValue = '$' + inputValue;
        }
        inputElement.value = inputValue;
        cursorPosition = inputValue.length - originalLength + cursorPosition;
        inputElement.setSelectionRange(cursorPosition, cursorPosition);
    }

    ngOnDestroy() {
        this.inputUnListner();
    }
}
