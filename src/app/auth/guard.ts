import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './authservice';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private oidcSecurityService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.oidcSecurityService.isAuthenticated() ;
       
  }
}