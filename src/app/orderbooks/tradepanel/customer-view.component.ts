import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './dataservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table>
      <tr><th>ID</th><th>Name</th><th>Email</th></tr>
      <tr *ngFor="let customer of customers">
        <td>{{customer.id}}</td>
        <td>{{customer.name}}</td>
        <td>{{customer.email}}</td>
      </tr>
    </table>
  `
})
export class CustomerViewComponent implements OnInit ,OnDestroy{
  customers: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCustomers().subscribe(data => this.customers = data);
  }

  ngOnDestroy() {
    console.debug('ngOnDestroy:  customer Component about to be destroyed');
  }
}