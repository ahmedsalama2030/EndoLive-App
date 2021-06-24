import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from 'src/app/core/models/Entities/Doctor';

@Component({
  selector: 'report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.css']
}) 
export class ReportInfoComponent implements OnInit {
  @Input() scope!:string;
   @Input() ptout!:boolean;
   @Input() endoscopist!:Doctor;
  @Input() anaesth!:string;
  constructor() { }

  ngOnInit(): void {
  }

}
