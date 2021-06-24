import { AuthService } from 'src/app/core/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/core/models/Dtos/login';
import { Router } from '@angular/router';

@Component({
  selector: 'eg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() registerForm = new EventEmitter<boolean>();
  @Input() toggleForm?: boolean;
  loginform: any = {};
  clickedStatus: boolean = false;
  loader: boolean = false
  userNamePlace?: string = 'user Name';
  passwordPlace?: string = 'password';
  errorMassage: string = '';
  constructor(public authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    if (this.authService.sitelang == "ar") {
      this.userNamePlace = 'اسم المستخدم'
      this.passwordPlace = 'كلمة المرور'
    }
  }



  Onlogin() {// login function
    this.loader = true;
    this.errorMassage = '';

    this.authService.login(this.loginform).subscribe(
      () => { 
        this.loader = false;
        this.router.navigate([""]);
        },
      error => {
        this.loader = false;
         this.errorMassage = error;
         console.log(error);
      },


    );

  }
  goRegiser() {
    this.registerForm.emit(!this.toggleForm);
  }

 


}
