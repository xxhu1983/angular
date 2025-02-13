import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Child Component</h3>
    <ul>
      <li *ngFor="let user of users" (click)="selectUser(user)">
        {{ user.name }}
      </li>
    </ul>
  `,
  styles: [`
    li {
      cursor: pointer;
      padding: 5px;
      list-style: none;
    }
    
    li:hover {
      background-color: lightblue;
    }
  `]
})
export class ChildComponent implements OnChanges {
  @Input() users: any[] = []; // Receives data from the parent
  @Output() userSelected = new EventEmitter<any>(); // Emits event to parent

  selectUser(user: any) {
    this.userSelected.emit(user); // Notify the parent
  }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        console.debug('Changes detected:', changes['users'].currentValue);
    }
}

