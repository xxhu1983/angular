import { DataService } from './dataservice';
import { Component, ComponentRef, ViewChild, ViewContainerRef, Type,OnInit } from '@angular/core';
import { RightPanelService } from './rightpanelservice';
import { CustomerViewComponent } from './customer-view.component';
import { TickerViewComponent } from './ticker-view.component';
import { ListViewComponent } from './list-view.component';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  template: `<ng-container #viewContainer></ng-container>`,
  styles: [`
    :host {
      width: 70%;
      padding: 10px;
    }
  `]
})
export class RightPanelComponent implements OnInit {
  @ViewChild('viewContainer', { read: ViewContainerRef, static: true }) viewContainer!: ViewContainerRef;

  private customerComponentRef: ComponentRef<CustomerViewComponent> | null = null;
  private currentComponent: ComponentRef<any> | null = null;

  constructor(private rightPanelService: RightPanelService) {
    this.rightPanelService.activeView$.subscribe(view => {
      this.loadComponent(view);
    });
  }

  ngOnInit() {
    this.loadComponent('customer');
  }

  loadComponent(view: string) {
    this.viewContainer?.clear(); // Destroy previous component
    /* if (this.viewContainer && this.viewContainer.length > 0) {

        let viewref = this.viewContainer.detach(0);
        if (viewref instanceof ComponentRef ) {
            if(!(viewref.instance instanceof CustomerViewComponent))
                viewref?.destroy();
        }
    }


    if (view === 'customer') {
        if (this.customerComponentRef) {
          // Reuse existing customer component
          this.viewContainer.insert(this.customerComponentRef.hostView);
        } else {
          // Create and store the customer component for reuse
          this.customerComponentRef = this.viewContainer.createComponent(CustomerViewComponent);
        }
        return;
    } */

    let componentType: Type<any> | null = null;

    switch (view) {
     case 'customer':
        componentType = CustomerViewComponent;
        break;

      case 'ticker':
        componentType = TickerViewComponent;
        break;
      case 'list':
        componentType = ListViewComponent;
        break;
    }

    if (componentType) {
      this.viewContainer?.createComponent(componentType);
    }
  }
}