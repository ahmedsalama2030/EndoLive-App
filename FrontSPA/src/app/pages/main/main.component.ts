 import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { bounceOut, slideInAnimation } from 'src/app/animations';
 
 @Component({
  selector: 'eg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    slideInAnimation 
   ]

})
export class MainComponent implements OnInit {
 
 

   
  constructor(public translate:TranslateService) {
     
  }
  ngOnInit() {}

  prepareRoute(outlet: RouterOutlet) {
    return  outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
    onAR(){
this.translate.use('ar');
localStorage.setItem('lang','ar');

    }
    onEN(){
      this.translate.use('en');
      localStorage.setItem('lang','en');
    }

}