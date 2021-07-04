 import { Doctor } from 'src/app/core/models/Entities/Doctor';
import {   Component,  Input} from '@angular/core';

@Component({
  selector: 'report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.css']
}) 
export class ReportInfoComponent {
  @Input() scope!:string;
  @Input() ptout!:boolean;
  @Input() endoscopist!:Doctor;
  @Input() anaesth!:string;
  constructor() { }

 
}
