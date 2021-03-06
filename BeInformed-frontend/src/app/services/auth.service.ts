import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import{Response} from '../models/response';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  authToken: any;
  url:any;
  user: any;
  jwtHelper:any;
  headers; any;
  constructor(private http: HttpClient,private router:Router) {
     // this.isDev = true;  // Change to false before deployment
     this.headers = new HttpHeaders({'Content-Type': 'application/json'});
     this.url='';
     this.jwtHelper = new JwtHelperService();
     localStorage.setItem('authentication', "");

  }

  registerUser(user):Observable<Response> {
    return this.http.post<Response>(this.url+'/user/register', user, {headers: this.headers});
  }

  authenticateUser(user) {
    return this.http.post<Response>(this.url+'/user/login', user, {headers: this.headers})
  }

 /* getProfile() {
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('users/profile', {headers: headers})
      .map(res => res.json());
  }*/

  storeUserData(token) {
    localStorage.setItem('authentication', token);
  }

  loadToken() {
    return localStorage.getItem('authentication');
  }
  loggedIn() {
    
     // console.log(localStorage.getItem('authentication'));
      return !this.jwtHelper.isTokenExpired(this.loadToken());
    
  }
  logout() {
    localStorage.clear();
  }
      
 
  registerGoogle(id_token){
    return this.http.post<Response>(this.url+'/user/googlelogin', {id_token}, {headers: this.headers});
  }
}