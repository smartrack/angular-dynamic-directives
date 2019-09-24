import { Component } from '@angular/core';
import { CurrencyDirective } from './shared/directives/currency.directive';
import { NumberOnlyDirective } from './shared/directives/number-only.directive';
import { ItemChangeAction } from './shared/table-cell/item-change-action.interface';
import { AlphaNumericDirective } from './shared/directives/alphanumberic.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-dynamic-directives';
  rows = [
    { id: 123, name: 'Gerber', desc: 'Beautiful Single Flower', category: 'Flowers', price: '$5.00', inventory: 100 },
    { id: 124, name: 'Iris', desc: 'Beautiful Single Flower', category: 'Flowers', price: '$5.00', inventory: 100 },
    { id: 125, name: 'Curcuma', desc: 'Beautiful Single Flower', category: 'Flowers', price: '$5.00', inventory: 100 },
    { id: 126, name: 'Carnation', desc: 'Beautiful Single Flower', category: 'Flowers', price: '$5.00', inventory: 100 },
    { id: 127, name: 'Astilbe', desc: 'Beautiful Single Flower', category: 'Flowers', price: '$5.00', inventory: 100 },
    { id: 128, name: 'Peonis', desc: 'Beautiful Single Flower', category: 'Flowers', price: '$5.00', inventory: 100 },
    { id: 129, name: 'Scabiosa', desc: 'Beautiful Single Flower', category: 'Flowers', price: '$5.00', inventory: 100 },
    { id: 130, name: 'Ranunculus', desc: 'Beautiful Single Flower', category: 'Flowers', price: '$5.00', inventory: 100 },
    { id: 131, name: 'Scilla', desc: 'Beautiful Single Flower', category: 'Flowers', price: '$5.00', inventory: 100 }
  ];

  columns = [
    {
      prop: 'name',
      title: 'Name'
    },
    {
      prop: 'desc',
      title: 'Description',
      type: 'text',
      restrict: [AlphaNumericDirective]
    },
    {
      prop: 'category',
      title: 'Category',
      type: 'select',
      options: [{
        label: 'Flowers', value: 'Flowers'
      },
      {
        label: 'Vegetables', value: 'Vegetables'
      }
      ]
    },
    {
      prop: 'price',
      title: 'Price',
      type: 'text',
      restrict: [CurrencyDirective]
    },
    {
      prop: 'inventory',
      title: 'Inventory',
      type: 'text',
      restrict: [NumberOnlyDirective]
    }
  ];

  public handleItemChange($event: ItemChangeAction) {
    this.rows = this.rows.map((row) => {
      if (row.id === $event.item.id) {
        return $event.item;
      }
      return row;
    });

  }
}
