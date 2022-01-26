import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-filter-textbox',
    template: `
        Filters: <input type="text" [(ngModel)]="filter"/>
    `
})

export class FilterTextboxComponent implements OnInit {

    private _filter: any;
    @Input() get filter() {
        return this._filter;
    }
    
    set filter(val: string) { 
        this._filter = val;
        this.changed.emit(this.filter); //Raise changed event
    }

    @Output() changed: EventEmitter<string> = new EventEmitter<string>();

    constructor(){}
    ngOnInit(): void {}
}