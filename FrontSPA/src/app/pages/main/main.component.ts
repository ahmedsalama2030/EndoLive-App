import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild, Renderer2, InjectionToken, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { bounceOut, slideInAnimation } from 'src/app/animations';

@Component({
  selector: 'eg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
   

})
export class MainComponent implements OnInit {
  menuOpen: boolean = true;
  langEn: boolean = true;
  closeOverlay: boolean = false;
  TempStatus: boolean = false;
   @ViewChild('overlay')
  private overlay !: ElementRef;
  constructor(
    @Inject(DOCUMENT) private document: Document,
        public translate: TranslateService) {

  }
  ngOnInit() {
    let lang = this.translate.currentLang;
    console.log(lang);
    if (lang === 'en')  
     this.addClassEn();
  else
      this.addClassAr();
      
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  onAR() {
    this.translate.use('ar');
    localStorage.setItem('lang', 'ar');
    this.langEn = false;
    this.addClassAr();


  }
  onEN() {
    this.translate.use('en');
    localStorage.setItem('lang', 'en');
    this.langEn = true;
    this.addClassEn();
  }

  addClassAr() {
    document.body.classList.remove("dit-ltr", "ltr");
    document.body.classList.add("dit-rtl", "rtl");
   }

  addClassEn() {
    this.document.body.classList.remove("dit-rtl", "rtl");
    this.document.body.classList.add("dit-ltr", "ltr");
 
  }

  closeMenu(){ 
    this. document.body.classList.remove("sidebar-open");
    this.document.body.classList.add("sidebar-closed","sidebar-collapse");
  }
}