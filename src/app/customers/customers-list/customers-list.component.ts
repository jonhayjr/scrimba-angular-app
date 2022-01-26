import { Component, OnInit, Input } from '@angular/core';

import { ICustomer } from '../../shared/interfaces';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: []
})
export class CustomersListComponent implements OnInit {

  @Input() get customers(): ICustomer[] {
    return this._customers;
  }

  set customers(value: ICustomer[]) {
    if (value) {
      this.filteredCustomers = this._customers = value;
      this.calculateOrders();
    }
  }

  private _customers: ICustomer[] = [];

  filteredCustomers!: ICustomer[];
  customersOrderTotal!: number;
  currencyCode: string = 'USD';

  constructor() { }

  ngOnInit() {
  }


  calculateOrders() {
    this.customersOrderTotal = 0;
    this.filteredCustomers.forEach((cust: ICustomer) => {
        this.customersOrderTotal += cust.orderTotal || 0;
    });
  }

  sortBy(prop: string) {
    const sortedCustomers = this.filteredCustomers.sort((a: any, b: any) => {
      return a[prop] > b[prop] ? 1 : -1;
    })

    this.filteredCustomers = sortedCustomers;
  }

}
