import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { VerifyUserService } from '../services/verify-user.service';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public token: any;
  public userName: any;
  public value: boolean = false;
  public results: any;
  public status = true

  constructor(
    public jwtHelper: JwtHelperService,
    // public verifyUserService: VerifyUserService,
    // public cookieService:CookieService
  ) { }

  public isAuthenticated(): boolean {
    this.token = localStorage.getItem('rankingToken');
    this.userName = localStorage.getItem('username');
    let expired = !this.jwtHelper.isTokenExpired(this.token);
    this.results = this.jwtHelper.decodeToken(this.token);
    // ต้องมี token และต้องมี status เป็น 1 หรือ 0 ถึงจะสามารถเข้าระบบได้ 
    // ถ้าลบ token ออกก็ไม่สามารถเข้าระบบได้
    
    try {
      if (this.results.role == 'admin' && expired) {
        this.value = true;
      } else {
        this.value = false;
      }
    } catch (error) {
      this.value = false;
    }
    return this.value;
  }
}
