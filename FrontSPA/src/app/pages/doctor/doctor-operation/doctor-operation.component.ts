 
import { DegreeService } from './../../../core/services/degree.service';
import { DepartmentService } from './../../../core/services/department.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
 import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/core/models/Entities/Department';
import { delay } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
 import { arLocale, defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { fadeAnimation } from 'src/app/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { Editor, Toolbar } from 'ngx-editor';
import { AlertService } from 'src/app/core/services/alert.service';
 defineLocale('ar', arLocale);
 @Component({
  selector: 'doctor-operation',
  templateUrl: './doctor-operation.component.html',
  styleUrls: ['./doctor-operation.component.css'],
  animations:[fadeAnimation]
})
export class DoctorOperationComponent implements OnInit {
  editor!: Editor;

  form !: FormGroup;  // form group
  massage: string = '';  //result massage
  departments: Department[] = [];  //  Deparment array
   checkStatus: boolean = false; //  checkStatus loader
  modalRef: BsModalRef | undefined;  // model ref 
  modelConfig = {                       // 
    animated: true             // model config
  };
  DepartModelForm: any = {}  // form modal  template driven 
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
     ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
     ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  bsConfig!: Partial<BsDatepickerConfig>;  // date config
  maxDate: Date=new Date();                  //  max date
  constructor(  // constructor servoices
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private routActive: ActivatedRoute,
    private location:  Location,
    private modalService: BsModalService,
    private departmentService: DepartmentService,
     private localeService: BsLocaleService,
    private spinner: NgxSpinnerService,
    private loadingBar: LoadingBarService,
    private alertService:AlertService ) { 
      this.editor = new Editor();

     }
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
       firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      thirdName: ['', Validators.required],
      lastName: ['', Validators.required],
      university: [''],
      reportDescription: ['', Validators.required],
      isConsultant: [false, Validators.required],
      isShowReportMenu: [true, Validators.required],
       dateOfBirth: [''],
       departmentId: [''],
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
       this.departments = data['data'].department;
       this.form.patchValue(data['data'].doctor);
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
    this.doctorService.register(this.form.value).pipe(delay(500)).subscribe(
      () => { this.alertService.success() },
      () => { this.alertService.error() },
      () => {this.closeSpinner(); }
     );
  }
  onEdit() {   
    this.openSpinner();        // on edit operation
     
    this.doctorService.edit(this.id?.value, this.form.value).pipe(delay(500)).subscribe(
      () => { this.alertService.success( )},
      () => { this.alertService.error( );this.closeSpinner();},
      () => {  this.closeSpinner(); }
    );
  }
  onDelete() {  // on delete operation
           // on edit operation
this.openSpinner();
      this.doctorService.delete(this.id?.value).pipe(delay(500)).subscribe(
      () => { this.alertService.success( )},
      () => { this.alertService.error() ;this.closeSpinner();},
      () => { this.closeSpinner();this.location.back() }
    ); 
  }
  onPrint() {           // om print operation
this.alertService.info('in pro version')
  }
  
// modeal function 
onDepartment(template: TemplateRef<any>) {
   this.modalRef = this.modalService.show(template, this.modelConfig);

}
 
 
saveDepartment() {
  this.departmentService.register(this.DepartModelForm).subscribe(
    (res) => {
      this.departments.push(res);
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
 /// form controll get
  get id() {         
    return this.form.get('id');
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
   
  get university() {
    return this.form.get('university');
  }
  get reportDescription() {
    return this.form.get('reportDescription');
  }
  get isConsultant() {
    return this.form.get('isConsultant');
  }
  get isShowReportMenu() {
    return this.form.get('isShowReportMenu');
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

