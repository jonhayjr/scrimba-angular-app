import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-filter-textbox',
    template: `
        Filters: <input type="text" [(ngModel)]="filter" (ngModelChange)="handleChange()"/>
    `
})

export class FilterTextboxComponent implements OnInit {

    filter!:string;
    
    @Input() initialFilter?: string | '';
    
    @Output() changed: EventEmitter<string> = new EventEmitter<string>();

    constructor(){}
    ngOnInit(): void {
        if (this.initialFilter) {
            this.filter = this.initialFilter;
        }
    }

    handleChange() {
        this.changed.emit(this.filter);
    }
}