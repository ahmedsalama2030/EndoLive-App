import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'eg-waitinglist-list',
  templateUrl: './waitinglist-list.component.html',
  styleUrls: ['./waitinglist-list.component.css']
})
export class WaitinglistListComponent implements OnInit,OnChanges {

  constructor() {
    console.log("constructor");

   }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

}
