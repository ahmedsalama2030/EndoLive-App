import { DegreeService } from './../../../core/services/degree.service';
import { DepartmentService } from './../../../core/services/department.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, HostListener, OnInit, TemplateRef, OnDestroy } from '@angular/core';
 import { PatientService } from 'src/app/core/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/core/models/Entities/Department';
import { delay } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Degree } from 'src/app/core/models/Entities/Degree';
import { arLocale, defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { fadeAnimation } from 'src/app/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/core/services/alert.service';
 defineLocale('ar', arLocale);
 @Component({
  selector: 'eg-patient-operation',
  templateUrl: './patient-operation.component.html',
  styleUrls: ['./patient-operation.component.css'],
  animations:[fadeAnimation]
})
export class PatientOperationComponent implements OnInit ,OnDestroy{
  form !: FormGroup;  // form group
  massage: string = '';  //result massage
  deparments: Department[] = [];  //  Deparment array
  degrees: Degree[] = [];       //  Degree array
  checkStatus: boolean = false; //  checkStatus loader
  modalRef: BsModalRef | undefined;  // model ref 
  modelConfig = {                       // 
    animated: true             // model config
  };
  degreeDepartModelForm: any = {}  // form modal  template driven 
  TypeDD: string = '';    // type Deparment or Degree

  bsConfig!: Partial<BsDatepickerConfig>;  // date config
  maxDate: Date=new Date();                  //  max date
  constructor(  // constructor servoices
    private patientService: PatientService,
    private fb: FormBuilder,
    private routActive: ActivatedRoute,
    private location:  Location,
    private modalService: BsModalService,
    private departmentService: DepartmentService,
    private degreeService: DegreeService,
     private spinner: NgxSpinnerService,
    private loadingBar: LoadingBarService,
    private alertService:AlertService,
     ) {  }
 
     @HostListener('window:beforeunload', ['$event'])
     onWindowClose(event: any): void {
    
       event.preventDefault();
       event.returnValue = true;
   
    }
  ngOnInit(): void {    // initail
    this.createForm();
    this.dateConfig()
    this.configInitailData();
  }
  createForm() {         // create form ooperation
    this.form = this.fb.group({
      id: [''],
      labCode: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      thirdName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      degreeId: ['', Validators.required],
      departmentId: ['', Validators.required],
      nationalId: [''],
      city: [''],
      state: [''],
      street: [''],
      phone: [''],
      email: ['', { validators: [Validators.email] }],
    })
     
   
  }
  configInitailData(){   // set up resolve come
    this.routActive.data.subscribe(data => {
       this.deparments = data['data'].department;
      this.degrees = data['data'].degree;
      this.form.patchValue(data['data'].patient);
    });
  }

  dateConfig(){          // ngx-date config
    this.bsConfig={
      isAnimated: true,
      dateInputFormat: 'YYYY-MM-DD' ,
      containerClass: 'theme-blue',startView: 'year'}
      }
  onAdd() {      // om add Operation
    this.openSpinner();
    this.patientService.register(this.form.value).pipe(delay(500)).subscribe(
      () => { this.alertService.success()},
      (err) => { this.alertService.error(err); this.closeSpinner()  },
      () => { this.closeSpinner() }
     );
  }
  onEdit() {   
    this.loadingBar.start();        // on edit operation
    this.checkStatus = true;
    this.spinner.show();
   this.patientService.edit(this.id?.value, this.form.value).pipe(delay(500)).subscribe(
      () => { this.alertService.success()  },
      () => { this.alertService.error() ;this.closeSpinner()},
      () => { this.closeSpinner()}
    );
  }
  onDelete() {  // on delete operation
    this.checkStatus = true;
    this.spinner.show();       
    this.patientService.delete(this.id?.value).pipe(delay(500)).subscribe(
      () => { this.alertService.success()  },
      () => { this.alertService.error(),this.closeSpinner()  },
      () => {  this.location.back() }
     ); 
  }
  onPrint() {           // om print operation
this.alertService.info('in next version')
  }
 saerchLabCode() {  // search lab code found
  
  this.openSpinner() 
    this.patientService.IsLabCodeFound(this.labCode?.value).pipe(delay(500)).subscribe(
      res => { 
        if (res == true)
         this.alertService.error('found')
          },
      () => { this.alertService.success('not found');this.closeSpinner() },
      () => {this.closeSpinner() }
    ); 
  } 
// modeal function 
onDepartment(template: TemplateRef<any>) {
  this.TypeDD = 'department';
  this.modalRef = this.modalService.show(template, this.modelConfig);

}
onDegree(template: TemplateRef<any>) {
  this.TypeDD = 'degree';
  this.modalRef = this.modalService.show(template, this.modelConfig);

}
onSaveDD() { // save degree or department
  if (this.TypeDD === 'department')
    this.saveDepartment();
  else
    this.saveDegree();
}
saveDepartment() {
  this.departmentService.register(this.degreeDepartModelForm).subscribe(
    (res) => {
      this.deparments.push(res);
      this.TypeDD = ''
    }
  );
}
saveDegree() {
  this.degreeService.register(this.degreeDepartModelForm).subscribe(
    (res:any) => {
      this.degrees.push(res);

      this.modalRef?.hide()
      this.TypeDD = ''
    }
  );
}

openSpinner(){
   
  this.loadingBar.start();        // on edit operation
    this.checkStatus = true;
    this.spinner.show();
}
closeSpinner(){
  this.checkStatus = false;
  this.loadingBar.complete();

  this.spinner.hide(); 

}
  ngOnDestroy(): void {
    this.closeSpinner()
     }
 /// form controll get
  get id() {         
    return this.form.get('id');
  }
  get labCode() {    // form labCode
    return this.form.get('labCode');
  }
  get firstName() {
    return this.form.get('firstName');
  }
  get secondName() {
    return this.form.get('secondName');
  }
  get thirdName() {
    return this.form.get('thirdName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
 get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }
  get degreeId() {
    return this.form.get('degreeId');
  }
  get departmentId() {
    return this.form.get('departmentId');
  }
  get nationalId() {
    return this.form.get('nationalId');
  }
  get city() {
    return this.form.get('city');
  }
  get phone() {
    return this.form.get('state');
  }
  get email() {
    return this.form.get('email');
  }
}
