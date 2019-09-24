import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { TableCellComponent } from './shared/table-cell/table-cell.component';
import { CommonModule } from '@angular/common';
import { AlphaNumericDirective } from './shared/directives/alphanumberic.directive';
import { NumberOnlyDirective } from './shared/directives/number-only.directive';
import { CurrencyDirective } from './shared/directives/currency.directive';
import { DirectivesFactory } from '../app/shared/directives.factory';

@NgModule({
  declarations: [
    AppComponent,
    TableCellComponent,
    AlphaNumericDirective,
    NumberOnlyDirective,
    CurrencyDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    BrowserModule
  ],
  providers: [DirectivesFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
