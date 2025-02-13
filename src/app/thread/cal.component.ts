import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fibo-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Web Worker Fibonacci Calculator</h2>
    <input type="number" [(ngModel)]="fibNumber" placeholder="Enter number" />
    <button (click)="calculateFibonacci()">Calculate</button>
    <button (click)="cancelWorker()">Cancel</button>
    <p *ngIf="loading">Calculating...</p>
    <p *ngIf="result !== null">Result: {{ result }}</p>
  `,
  styles: [`
    input {
      width: 100px;
      padding: 5px;
      margin-right: 10px;
    }
    button {
      padding: 5px 10px;
    }
    p {
      font-size: 18px;
      margin-top: 10px;
    }
  `]
})
export class CalComponent implements OnInit {
  worker!: Worker;
  fibNumber: number = 10; // Default number
  result: number | null = null;
  loading = false;

  ngOnInit() {
    this.createWorker();
  }

  createWorker() {
    if (typeof Worker !== 'undefined') {
        this.worker = new Worker(new URL('./worker.worker', import.meta.url), { type: 'module' });
  
        // Handle messages from the worker
        this.worker.onmessage = ({ data }) => {
          this.result = data;
          this.loading = false;
        };
      } else {
        console.warn('Web Workers are not supported in this browser.');
      }

  }

  calculateFibonacci() {
    if (this.worker && this.fibNumber >= 0) {
      this.loading = true;
      this.result = null;
      this.worker.postMessage(this.fibNumber); // Send number to worker
    }
  }

  cancelWorker() {
    if (this.worker) {
      this.worker.terminate();
      this.loading = false;
      this.result = null;
      this.createWorker(); // Recreate the worker
      console.log('Worker terminated.');
    }
  }
}