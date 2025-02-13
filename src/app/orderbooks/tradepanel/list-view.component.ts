import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './dataservice';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Item List</h3>
    <ul>
      <li *ngFor="let item of items">
        <strong>{{item.title}}</strong> - {{item.description}}
      </li>
    </ul>
  `
})
export class ListViewComponent implements OnInit {
  items: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getItems().subscribe(data => this.items = data);
  }
}