import {  Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { LeftPanelComponent } from './leftpanel.component';
import { RightPanelComponent } from './rightpanel.component';

@Component({
  selector: 'app-tradepanel',
  standalone: true,
  imports: [LeftPanelComponent, RightPanelComponent],
  templateUrl: './tradepanel.component.html',
  styleUrl: './tradepanel.component.css'
})
export class TradepanelComponent  implements OnInit, OnDestroy, OnChanges, AfterViewInit{
  constructor() {
    console.debug('TradepanelComponent created');
  }

  ngOnInit(): void {
    console.debug('TradepanelComponent initialized');
  }

  ngOnChanges() {
    console.debug('ngOnChanges: Input property changed');
  }

  ngAfterViewInit() {
    console.debug('ngAfterViewInit: View initialized');
  }

  ngOnDestroy() {
    console.debug('ngOnDestroy: Component about to be destroyed');
  }


}
