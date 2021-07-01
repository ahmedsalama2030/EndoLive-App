import { query } from '@angular/animations';
import { AuthService } from './core/services/auth.service';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedTokenUser } from './core/models/Dtos/decodedTokenUser';
import { TranslateService } from '@ngx-translate/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
 
@Component({    
  selector: 'app-root',
  template: ' <ngx-loading-bar [includeSpinner]=false></ngx-loading-bar> <router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
     
    
})  
export class AppComponent implements OnInit ,AfterViewInit{
  jwthelper = new JwtHelperService();
  decodedToken?:DecodedTokenUser;

constructor(
  public authService:AuthService,
  public  translate: TranslateService,
  private elementRef:ElementRef,
  private loadingBar: LoadingBarService 

  ){
  
}
  ngAfterViewInit(): void {
this.loadingBar.start();
this.loadingBar.complete();

this.loadingBar.stop();

 } 
  ngOnInit(): void {

    const token = localStorage.getItem('token') ;
    const user: any = JSON.parse(localStorage.getItem('user') !);

    if (token) {
      this.authService.decodedToken = this.jwthelper.decodeToken(token);
     }
    if (user) {
      this.authService.user = user;
     }

     this.translate.use(localStorage.getItem('lang')||'en');
  }
    
} 
