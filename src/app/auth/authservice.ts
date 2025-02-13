// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = '6lo8cn06790h6lo1blul8qg09s';
  private cognitoUrl = 'https://cognito-idp.us-east-1.amazonaws.com';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    /*
    const body = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth'
    });
 
    return this.http.post(this.cognitoUrl, body, { headers });*/
    if(username === 'admin' && password === 'admin'){
      localStorage.setItem('idToken', 'true');
      return new Observable(observer => {
        observer.next(true);
        observer.complete();
      });
    }
      else{
        return new Observable(observer => {
          observer.next(false);
          observer.complete();
        }); 
      } 
    }

  signup(username: string, password: string, email: string): Observable<any> {
    const body = {
      ClientId: this.clientId,
      Username: username,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email }
      ]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp'
    });

    return this.http.post(this.cognitoUrl, body, { headers });
  }

  respondToNewPasswordChallenge(session: string, username: string, newPassword: string): Observable<any> {
    const body = {
      ChallengeName: 'NEW_PASSWORD_REQUIRED',
      ClientId: this.clientId,
      Session: session,
      ChallengeResponses: {
        USERNAME: username,
        NEW_PASSWORD: newPassword
      }
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.RespondToAuthChallenge'
    });
  
    return this.http.post(this.cognitoUrl, body, { headers });
  }

  loginWithGoogle() {
    window.location.href = 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_wy4hUYYhX/oauth2/authorize?identity_provider=Google&redirect_uri=https://d84l1y8p4kdic.cloudfront.net&response_type=CODE&client_id=6lo8cn06790h6lo1blul8qg09s&scope=email+openid+phone';
  }


  logout() {
    localStorage.removeItem('idToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('idToken');
  }
}