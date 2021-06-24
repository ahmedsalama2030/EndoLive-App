
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'eg-top-scroll',
  templateUrl: './top-scroll.component.html',
  styleUrls: ['./top-scroll.component.css']
})
export class TopScrollComponent implements OnInit {

  windowScrolled?: boolean;
  headerPosition: number = 0;
  constructor(@Inject(DOCUMENT) private document: Document) { }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.headerPosition = document.querySelector('header')?.offsetTop   as number;
     
     
     if ( document.documentElement.scrollTop || document.body.scrollTop > this.headerPosition) {
      document.querySelector('header')?.classList.add("sticky");
      this.windowScrolled = true;
    }
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop <this.headerPosition) {
      this.windowScrolled = false;
      document.querySelector('header')?.classList.remove("sticky");

    }
    else {
      document.querySelector('header')?.classList.remove("sticky");
       }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    })();
  }
  ngOnInit() {
    this.headerPosition = document.querySelector('header')?.offsetTop as number;


  }
}