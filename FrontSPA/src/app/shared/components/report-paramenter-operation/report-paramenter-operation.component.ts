import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Doctor } from 'src/app/core/models/Entities/Doctor';

@Component({
  selector: 'report-paramenter-operation',
  templateUrl: './report-paramenter-operation.component.html',
  styleUrls: ['./report-paramenter-operation.component.css']
})
export class ReportParamenterOperationComponent implements OnInit {
  @Input() consolutant!:Doctor[];
  @Input() endoscopist!:Doctor[];
  @Output() onconsolutant= new EventEmitter<Doctor>();
  @Output() onendoscopist= new EventEmitter<Doctor>();
  @Output() onSubmit= new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }
  selectEndoscopist(value:any){
const id=value.target.value;
if(id!=''){
  var doctor =this.endoscopist.find(a=>a.id==id);
  this.onendoscopist.emit(doctor);

}
  }
  selectConsolutant(value:any){
    const id= value.target.value;
      if(id!=''){
      var doctor =this.consolutant.find(a=>a.id==id);
    this.onconsolutant.emit(doctor);
    
    }
  }

  onSubmitForm(){
this.onSubmit.emit(true);
  }
}
