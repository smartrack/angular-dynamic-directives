import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { ItemChangeAction } from './item-change-action.interface';
import { DirectivesFactory } from '../directives.factory';

@Component({
    selector: 'app-table-cell',
    templateUrl: 'table-cell.component.html',
    styleUrls: ['./table-cell.component.scss']
})

export class TableCellComponent implements OnInit, OnDestroy {

    @Input() column;
    @Input() row;

    @Output() itemChange: EventEmitter<ItemChangeAction> = new EventEmitter();

    @ViewChild('textboxRef', { static: false })
    public set textboxRef(value: ElementRef) {
        this.attachDirective(value);
    }

    private directiveInstances = [];

    inputVisiblity = false;
    selectVisiblity = false;

    public contentRef;

    constructor(private directivesFactory: DirectivesFactory, private renderer: Renderer2) { }

    public toggleInput() {
        this.inputVisiblity = !this.inputVisiblity;
    }

    public ngOnInit() {
        this.contentRef = {
            $implicit: this.row[this.column.prop],
            options: this.column.options
        };
    }

    public updateValue($event) {
        this.row[this.column.prop] = $event.target.value;
        this.itemChange.emit({
            column: this.column.prop,
            item: this.row
        });
        this.inputVisiblity = false;
    }

    public attachDirective(inputElement: ElementRef) {
        if (!inputElement || !this.column.restrict) {
            return;
        }
        /**
         * create new instance of directives using directivesFactory and stores in an array
         */
        this.directiveInstances = this.column.restrict.map((directive) => {
            return this.directivesFactory.createInstance(directive.name, [inputElement, this.renderer]);
        });

    }

    ngOnDestroy() {
        if (this.directiveInstances.length === 0) {
            return;
        }

        this.directiveInstances.forEach((directiveInstance) => {
            if (directiveInstance && typeof directiveInstance.ngOnDestroy === 'function') {
                directiveInstance.ngOnDestroy();
            }
        });
    }
}
