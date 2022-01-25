import { Component, OnInit, Input } from '@angular/core';

import { ICustomer } from '../../shared/interfaces';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: []
})
export class CustomersListComponent implements OnInit {
  @Input() customers: ICustomer[]= [];
  filteredCustomers!: ICustomer[];
  customersOrderTotal!: number;
  currencyCode: string = 'USD';

  constructor() { }

  ngOnInit() {
    this.filteredCustomers = this.customers;
    this.calculateOrders();
  }

  calculateOrders() {
    this.customersOrderTotal = 0;
    this.filteredCustomers.forEach((cust: ICustomer) => {
        this.customersOrderTotal += cust.orderTotal || 0;
    });
  }

  sortBy(prop: string) {
    const sortedCustomers = this.filteredCustomers.sort((a: ICustomer, b: ICustomer) => {
      return a[prop] > b[prop] ? 1 : -1;
    })

    this.filteredCustomers = sortedCustomers;
  }

}
