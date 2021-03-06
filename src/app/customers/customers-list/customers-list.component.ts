import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

import { ICustomer } from '../../shared/interfaces';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: []
})
export class CustomersListComponent implements OnInit {

  @Input() customers!: ICustomer[];

  filteredCustomers!: ICustomer[];
  customersOrderTotal!: number;
  currencyCode: string = 'USD';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customers'].previousValue !== changes['customers'].currentValue) {
      this.filteredCustomers = changes['customers'].currentValue;
      this.calculateOrders();
    }
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

  filter(data: string) {
    if (data) {
        this.filteredCustomers = this.customers.filter((cust: ICustomer) => {
            return cust.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                   cust.city.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                   (cust.orderTotal ? cust.orderTotal.toString().indexOf(data): -2) > -1;
        });
    } else {
        this.filteredCustomers = this.customers;
    }

    this.calculateOrders();
}

}
