import { Component } from '@angular/core';
import { RouterOutlet, RouterModule} from '@angular/router';
import { AuthService } from './auth/authservice';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet,RouterModule],
})
export class AppComponent {
  title = 'Real-Time House Bidding App';
  constructor(private authService: AuthService, private router: Router) {

  }

  logout() {
    this.authService.logout();  
    this.router.navigate(['/login']);
  }
}
