import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightPanelService {
  private activeView = new BehaviorSubject<string>('customer');
  activeView$ = this.activeView.asObservable();

  setActiveView(view: string) {
    this.activeView.next(view);
  }
}