import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DecodedTokenUser } from '../models/Dtos/decodedTokenUser';
import { Login } from '../models/Dtos/login';
import { Register } from '../models/Dtos/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwthelper = new JwtHelperService();
  decodedToken?:DecodedTokenUser;
  user:any;
sitelang:string='en';
dir:string='ltr';
language=new BehaviorSubject<string>('en');
lang=this.language.asObservable();
cartBehavior=new BehaviorSubject<number>(0);
cart=this.cartBehavior.asObservable();
baseUrl=environment.apiUrl+'auth/';
cartNumber:number=0;
paid:boolean=false;

  constructor(private http:HttpClient) { 
    this.lang.subscribe(
      lang=>{
        if(lang=='en'){
          this.dir='ltr';
          this.sitelang='en';
        }
        else{
          this.dir='rtl';
          this.sitelang='ar';
        }
      }
    );
  }

register(registerModel:any){
 return  this.http.post(this.baseUrl+'register',registerModel);
}

login(model:Login){
  return  this.http.post(this.baseUrl+'login',model).pipe(
    map((res:any)=>{
      const user=res;
      if(user){
        localStorage.setItem('token',user.token);
         localStorage.setItem('user',JSON.stringify(user.user));
        
          
       }
      this.decodedToken=this.jwthelper.decodeToken(user.token);
      const token=localStorage.getItem('token') || '';
      console.log('token');
      console.log(token);
      console.log(   this.jwthelper.isTokenExpired(token));
      console.log(   this.decodedToken);
      

}) ); }

loggedIn(){
  try{
    const token=localStorage.getItem('token') !;
   return   !this.jwthelper.isTokenExpired(token);
  }
  catch{
 return false;
  }
}

cardAdd(){
  this.cart.subscribe( data => { this.cartNumber = data } );

  this.cartBehavior.next(this.cartNumber + 1);
}
cardRemove(){
  this.cart.subscribe( data => { this.cartNumber = data } );

  this.cartBehavior.next(this.cartNumber - 1);
}

charge(userId:any,stripeToken:any,model:any){
  return this.http.post(environment.apiUrl+'users/'+userId+'/charge/'+stripeToken,model)
}

}
