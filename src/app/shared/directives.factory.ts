import { Injectable } from '@angular/core';
import { AlphaNumericDirective } from './directives/alphanumberic.directive';
import { CurrencyDirective } from './directives/currency.directive';
import { NumberOnlyDirective } from './directives/number-only.directive';

@Injectable()
export class DirectivesFactory {

    public entryDirectives = {
        AlphaNumericDirective,
        CurrencyDirective,
        NumberOnlyDirective
    };

    constructor() { }

    createInstance(name: string, props) {
        let directiveInstance;
        try {
            directiveInstance = new this.entryDirectives[name](...props);
        } catch (error) {
            console.error(`Please declar Class ${name} in entryDirectives`);
        }
        return directiveInstance;
    }
}
