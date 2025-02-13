import { Component, OnInit } from '@angular/core';
import { DataService } from './dataservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticker-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Tickers</h3>
    <table>
      <tr><th>Ticker</th><th>Price</th></tr>
      <tr 
        *ngFor="let ticker of tickers" 
        (click)="selectTicker(ticker.id)"
        [class.selected]="selectedTicker && selectedTicker.id === ticker.id">
        <td>{{ ticker.id }}</td>
        <td>{{ ticker.price }}</td>
      </tr>
    </table>

    <div *ngIf="selectedTicker" class="details">
      <h3>{{ selectedTicker.id }} Details</h3>
      <p>High: {{ selectedTicker.high }}</p>
      <p>Low: {{ selectedTicker.low }}</p>
      <p>Open: {{ selectedTicker.open }}</p>
      <p>Close: {{ selectedTicker.close }}</p>
    </div>
  `,
  styles: [`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    tr.selected {
      background-color: lightblue;
      cursor: pointer;
    }
    .details {
      margin-top: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      background: #f9f9f9;
    }
  `]
})
export class TickerViewComponent implements OnInit {
  tickers: any[] = [];
  selectedTicker: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getTickers().subscribe(data => this.tickers = data);
  }

  selectTicker(id: string) {
    this.dataService.getTickerDetail(id).subscribe(data => {
        if (data.length > 0) {
          this.selectedTicker = data[0]; // Extract the first object from the array
        } else {
          this.selectedTicker = null;
        }
      });
  }
}