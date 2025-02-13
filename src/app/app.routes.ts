import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guard';
import { OrderbookComponent } from './orderbooks/orderbook/orderbook.component';
import { PlayformComponent } from './playform/playform.component';  
import { TradepanelComponent } from './orderbooks/tradepanel/tradepanel.component';
import { provideRouter } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import {CalComponent} from './thread/cal.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: OrderbookComponent, canActivate: [AuthGuard] },
  { path: 'play', component: PlayformComponent , canActivate: [AuthGuard]},
  { path: 'parent', component: ParentComponent , canActivate: [AuthGuard]},
  { path: 'trade', component: TradepanelComponent , canActivate: [AuthGuard]},
  { path: 'cal', component: CalComponent , canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const appRoutingProviders = [provideRouter(routes)];