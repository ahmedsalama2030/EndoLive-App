 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Editor } from 'ngx-editor';
import { Patient } from 'src/app/core/models/Entities/Patient';
import { Doctor } from 'src/app/core/models/Entities/Doctor';
import { PatientImage, PatientImageGet } from 'src/app/core/models/Entities/PatientImage';

@Component({
  selector: 'operation',
  templateUrl: './operation.component.html',
  styleUrls: ['operation.component.css'],

})
export class OperationComponent implements OnInit,OnDestroy {
  editor!: Editor;
  editor2!: Editor;
  editor3!: Editor;
  formReport!:FormGroup;
  patient!:Patient;      // patinet object
  doctors!:Doctor[]; 
  patientImageGet!:PatientImageGet[];
  scope!:string;
  anaesth!:string;
  outPatient:boolean=true;
  inPatient!:string;
  endoscopist!:Doctor[];
  consolutant!:Doctor[];
  selectedconsolutant!:Doctor;
  selectedendoscopist!:Doctor;
  constructor(private fb:FormBuilder) { }
 
   
  ngOnInit(): void { 
    this.editor = new Editor();
    this.editor2 = new Editor();
    this.editor3 = new Editor();
    this.createForm();
    this.getPatient();
    this.getDoctor();
    this.setuptDoctor();
    this.getpatienyImage();
    console.log(this.patientImageGet)
     }
 getPatient(){
   this.patient={
     id:'3214214',
     labCode:'1233',
     name:"ahmed salama ali mohamed",
     degreeName:'مدنى',
     age:'2.5',
     sex:'male'
      
   }
 }
 getDoctor(){
  this.doctors=[{
    id:'3',
     name:"ahmed salama ali mohamed",
     isConsultant:true,
     reportDescription:'<p style="text-align:center"><strong>prof</strong> : <em>adb elrahman marzook md</em></p>'
      
  }, 
  {
    id:'2',
     name:"ali samy ali mohamed",
     isConsultant:false,
     reportDescription:'safasfsdfasdfas asdfsadfADFASD'
      
  }]
}

getpatienyImage(){
  this.patientImageGet=[
    {date:new Date('2019-3-3'),patientImage:[{id:'4433',path:'assets/img/status.png',patientId:'12'},{id:'444',path:'assets/img/status.png',patientId:'12'}]},
    {date:new Date('2021-5-5'),patientImage:[{id:'4433',path:'assets/img/status.png',patientId:'12'},{id:'444',path:'assets/img/status.png',patientId:'12'}]},
    {date:new Date('2021-4-2'),patientImage:[{id:'4433',path:'assets/img/status.png',patientId:'12'},{id:'444',path:'assets/img/status.png',patientId:'12'}]}
  
  ]
      
 }
  createForm(){
    this.formReport=this.fb.group({
      indication:[''],
      colonoscopy:[''],
      conclusion:[''],
      scope:[''],
      anaesth:[''],
      outPatient:[''],
      InPatient:[''],
      consultantId:[''],
      endoscopistId:[''],
      patientId:[''],
       
 })
  }


  setuptDoctor(){
    this.consolutant=this.doctors.filter(a=>a.isConsultant==true);
    this.endoscopist=this.doctors.filter(a=>a.isConsultant==false);
  }

  onconsolutant(doctor:Doctor){
    this.consolutantId?.setValue(doctor.id);
    this.selectedconsolutant=doctor;
  }
  onendoscopist(doctor:Doctor){
    this.endoscopistId?.setValue(doctor.id);
    this.selectedendoscopist=doctor;

  }
  get indication(){
    return this.formReport.get('indication');
  }
  get colonoscopy(){
    return this.formReport.get('colonoscopy');
  }
  get conclusion(){
    return this.formReport.get('conclusion');
  }
  get consolutantId(){
    return this.formReport.get('consolutantId');
  }
  get endoscopistId(){
    return this.formReport.get('endoscopistId');
  }
  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor2.destroy();
    this.editor3.destroy();
  }
}
