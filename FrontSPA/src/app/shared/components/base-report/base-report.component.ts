import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from 'src/app/core/models/Entities/Doctor';
import { Patient } from 'src/app/core/models/Entities/Patient';

@Component({
  selector: 'base-report',
  templateUrl: './base-report.component.html',
  styleUrls: ['./base-report.component.css']
})
export class BaseReportComponent implements OnInit {
  @Input() patient!:Patient;
   constructor() { }
 
  ngOnInit(): void {
  }
 
}
