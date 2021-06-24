import { PatientImageGet } from './../../../core/models/Entities/PatientImage';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'photo-report',
  templateUrl: './photo-report.component.html',
  styleUrls: ['./photo-report.component.css']
})
export class PhotoReportComponent implements OnInit {
@Input() patientimage!:PatientImageGet[];
  constructor() { }
  index:number=1;
  ngOnInit(): void {
  }

}
 

