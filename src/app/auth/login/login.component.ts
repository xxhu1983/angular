import { Component } from '@angular/core';
import { AuthService } from '../authservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  username: string = 'default';
  password: string = 'default';
  newPassword = '';
  email = '';
  errorMessage: string = '';
  isPasswordChangeRequired = false;
  sesssion: any ;
  iflogin: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}


  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.iflogin = response;
        if(!this.iflogin){
          this.errorMessage = 'Login failed';
          
        }
        else{
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed';
      }
    });
  }

  changePassword() {
    this.authService
      .respondToNewPasswordChallenge(this.sesssion, this.username, this.newPassword)
      .subscribe({
        next: (response) => {
          localStorage.setItem('idToken', response.AuthenticationResult.IdToken);
          this.router.navigate(['/dashboard']);
          console.log('Password changed successfully:', response);
          this.isPasswordChangeRequired = false;
        },
        error: (error) => console.error('Password change failed:', error)
      });
  }

  signup() {
    this.authService.signup(this.username, this.password, this.email).subscribe({
      next: () => console.log('Signup successful! Please verify your email.'),
      error: (err) => {
        this.errorMessage = 'Signup failed';
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  signout() {
    this.authService.logout();
  }
}
