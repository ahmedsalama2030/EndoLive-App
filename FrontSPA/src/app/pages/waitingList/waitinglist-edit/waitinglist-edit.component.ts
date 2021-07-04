import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'waitinglist-edit',
  templateUrl: './waitinglist-edit.component.html',
  styleUrls: ['./waitinglist-edit.component.css']
})
export class WaitinglistEditComponent implements OnInit {
@Input() t:any=12;
  constructor() { }

  ngOnInit(): void {
  }
  mm(){

  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);

   }
}
