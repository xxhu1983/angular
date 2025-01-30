import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Order {
  price: number;
  quantity: number;
  side: 'buy' | 'sell';
}

export interface Trade {
  price: number;
  quantity: number;
  side: 'buy' | 'sell';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private trades: Trade[] = [];

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private tradesSubject = new BehaviorSubject<Trade[]>([]);

  private updateSubject = new BehaviorSubject<Order|null>(null);

  orders$ = this.ordersSubject.asObservable();
  trades$ = this.tradesSubject.asObservable();

  constructor() { 
    this.generateMockData();
    this.startAutoUpdates();
    this.updateSubject.subscribe(order => {
      if (order) this.updateRandomOder(order);
    });
  }

  private generateMockData() {
    for (let i = 0; i < 10; i++) {
      this.orders.push(
        { price: 100 + i, quantity: Math.floor(Math.random() * 10 + 1), side: 'buy' },
        { price: 110 - i, quantity: Math.floor(Math.random() * 10 + 1), side: 'sell' }
      );
    }
    this.ordersSubject.next(this.orders);
  }

  private startAutoUpdates() {
    if (this.orders.length === 0) return;
    
    //this.orders[index].quantity = Math.floor(Math.random() * 10) + 1;
    setInterval(() => {
      const index = Math.floor(Math.random() * this.orders.length);
      const order = this.orders[index];
      this.updateSubject.next(order)
    }, 100); // Every 2 seconds
  }

  private updateRandomOder(order:Order) {
    order.quantity = Math.floor(Math.random() * 10) + 1;
    //const action = Math.floor(Math.random() * 3);
    //if (action === 0) this.addRandomOrder();
    //this.modifyRandomOrder();
    //if (action === 2) this.removeRandomOrder();
  }

  private addRandomOrder() {
    const price = Math.floor(Math.random() * 20) + 95;
    const quantity = Math.floor(Math.random() * 10) + 1;
    const side: 'buy' | 'sell' = Math.random() > 0.5 ? 'buy' : 'sell';

    this.orders.push({ price, quantity, side });
    this.ordersSubject.next(this.orders);
  }

  private modifyRandomOrder() {
    if (this.orders.length === 0) return;
    const index = Math.floor(Math.random() * this.orders.length);
    this.orders[index].quantity = Math.floor(Math.random() * 10) + 1;
    //this.ordersSubject.next(this.orders);
  }

  private removeRandomOrder() {
    if (this.orders.length === 0) return;
    const index = Math.floor(Math.random() * this.orders.length);
    this.orders.splice(index, 1);
    this.ordersSubject.next(this.orders);
  }

  addOrder(price: number, quantity: number, side: 'buy' | 'sell') {
    this.orders.push({ price, quantity, side });
    this.orders.sort((a, b) => (side === 'buy' ? b.price - a.price : a.price - b.price));
    this.ordersSubject.next(this.orders);
  }

  removeOrder(price: number, side: 'buy' | 'sell') {
    this.orders = this.orders.filter(order => order.price !== price || order.side !== side);
    this.ordersSubject.next(this.orders);
  }

  executeTrade(price: number, quantity: number, side: 'buy' | 'sell') {
     const order = this.orders.find(order => order.price === price && order.side === side);
     if(order)
     {
      order.quantity += quantity;
     }
     //this.trades.push({ price, quantity, side, timestamp: new Date() });
    //this.tradesSubject.next(this.trades);
    //this.removeOrder(price, side);
  }
}
