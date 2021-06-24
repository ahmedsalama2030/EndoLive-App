import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eg-auth-tab',
  templateUrl: './auth-tab.component.html',
  styleUrls: ['./auth-tab.component.css']
})
export class AuthTabComponent implements OnInit {

  toggleForm:boolean = true;
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  toggleAuth(){
    this.toggleForm=!this.toggleForm;
  }
  changeAuthToggle(value:boolean){
    this.toggleForm=value;
  }
}
