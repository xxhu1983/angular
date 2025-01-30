import { Component , OnInit} from '@angular/core';
import {OrderService, Order} from '../orderservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderbook',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './orderbook.component.html',
  styleUrl: './orderbook.component.css'
})
export class OrderbookComponent implements OnInit {
  buyOrders: Order[] = [];
  sellOrders: Order[] = [];

  constructor(private orderbookService: OrderService) {}

  ngOnInit() {
    this.orderbookService.orders$.subscribe(orders => {
      this.buyOrders = orders.filter(o => o.side === 'buy').sort((a, b) => b.price - a.price);
      this.sellOrders = orders.filter(o => o.side === 'sell').sort((a, b) => a.price - b.price);
    });
  }

  trackOrder(index: number, order: Order) {
    return order.price; // Track by price since it is unique
  }

  executeTrade(price: number, side: 'buy' | 'sell') {    
    this.orderbookService.executeTrade(price, 10, side); // Assume trade of quantity 1
  }
}
