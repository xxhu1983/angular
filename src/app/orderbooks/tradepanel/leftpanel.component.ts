import { Component } from '@angular/core';
import { RightPanelService } from './rightpanelservice';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  template: `
    <div class="left-panel">
      <button (click)="loadView('customer')">Customers</button>
      <button (click)="loadView('ticker')">Tickers</button>
      <button (click)="loadView('list')">List</button>
    </div>
  `,
  styles: [`
    .left-panel {
      width: 30%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    button {
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
    }
  `]
})
export class LeftPanelComponent {
  constructor(private rightPanelService: RightPanelService) {}

  loadView(view: string) {
    this.rightPanelService.setActiveView(view);
  }
}
