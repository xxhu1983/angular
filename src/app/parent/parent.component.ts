import { Component } from '@angular/core';
import { ChildComponent } from './child.component'; 
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <h2>Parent Component</h2>
    <p><strong>Selected User:</strong> {{ selectedUser?.name || 'None' }}</p>

    <!-- Child component -->
    <app-child [users]="users" (userSelected)="onUserSelected($event)"></app-child>
  `,
  styles: [`
    h2 {
      color: darkblue;
    }
  `]
})
export class ParentComponent {
  users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  selectedUser: any = null;

  onUserSelected(user: any) {
    this.selectedUser = user; // Update selected user
    console.log('Selected User:', this.selectedUser);
  }
}
