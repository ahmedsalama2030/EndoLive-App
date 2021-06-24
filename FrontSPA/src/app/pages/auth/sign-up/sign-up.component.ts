import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'eg-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Output() loginForm=new EventEmitter<boolean>();
  @Input() toggleForm?:boolean;
  errorMassage: string = '';

  signupForm!:FormGroup;
   Form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    body: new FormControl('', Validators.required)
  });
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this. createLoginForm();
  }

  createLoginForm(){
    this.signupForm=this.fb.group({
      userName:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
     
     
      password:new FormControl('',[Validators.required,Validators.minLength(4)]),
      repassword:new FormControl('',[Validators.required])
    },
      {
        validator: MustMatch("password", "repassword")
      });
      
      
 }
  
  signup(){// signup register
    this.errorMassage='';
  this.authService.register(this.signupForm.value).subscribe(
    ()=>{    
      this.authService.login(this.signupForm.value).subscribe(
        ()=>{      this.router.navigate(["/"]); },  
        (err)=>{this.errorMassage=err}

      )}, 
    (err)=>{this.errorMassage=err}

  );
  }
  gologin() {
    this.loginForm.emit(!this.toggleForm);
 }
}

