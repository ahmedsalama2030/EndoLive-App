import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
 import { takeUntil, delay } from 'rxjs/operators';
import { Patient } from 'src/app/core/models/Entities/Patient';
import { Pagination, PaginationResult } from 'src/app/core/models/hepler/Pagination ';
import { PatientService } from 'src/app/core/services/patient.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'eg-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, OnDestroy {
  filterList: any;   // filter  search
  moreListAction: any;    // more action
  patients?: Patient[];  // list patient
  notifier = new Subject();  // valiable destory
  patientSelected: Patient[] = []; // new list selected
  pagination!: Pagination;   // pagination 
  checkAll: boolean = false;  // check box status
  selectedList?: Patient[];
  modalRef: BsModalRef | undefined;  // model ref 
  @ViewChild('template') template!: TemplateRef<any>;
  modelConfig = {                       // 
    animated: true             // model config
  };
  oneAction: boolean = false;   // one action ex  edit ,delete 
  moreAction: boolean = false;   // more action ex  delete
  checkSave:boolean=false;
  constructor(
    private patientService: PatientService,
    public translate: TranslateService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private modalService: BsModalService,
    private alertService:AlertService,
    private loadingBar: LoadingBarService,
  ) { }
  ngOnInit(): void {
    this.routerActive.data.subscribe(         ///get data resolver patient list 
      (res) => {
        this.patients = res['data'].result;
        this.pagination = res['data'].pagination!;
      }, err => { this.alertService.error() }
    );
    this.getFilterList();  // get filter list
  }
  getFilterList() {       // set filter type
    this.filterList = [
      { name: 'name', value: 'name',searchTag:'patient' },
      { name: 'phone', value: 'phone',searchTag:'patient' },
      { name: 'lab code', value: 'Labcode',searchTag:'patient' },
      { name: 'national id', value: 'nationalid',searchTag:'patient' },
      { name: 'degree', value: 'degree',searchTag:'patient' },

      { name: 'department', value: 'department',searchTag:'patient' },
    ];
  }
  loadPatient() {           // lget patient from api  
    this.openSpinner();
    
    this.patientService.getAll(this.pagination.currentPage, this.pagination.itemPerPage, this.pagination.filterType, this.pagination.filterValue).pipe(takeUntil(this.notifier)).subscribe(
      (res: PaginationResult<Patient[]>) => {
        this.patients = res.result;
        this.pagination = res.pagination!;
      },
      () => { this.alertService.error(),this.closeSpinner()  },
      ()=>{this.closeSpinner()     }
    );
  }
  changeSearch(values: any) {   // change search value
    this.pagination.filterType = values.filterType;
    this.pagination.filterValue = values.filterValue;
    this.loadPatient();
  }
  changeLenghtSize(event: any) {  // change length page size
    this.pagination.itemPerPage = event;
    this.loadPatient();
  }
  PageChanged(event: any) {     // pagination change
    this.pagination.currentPage = event.page;
    this.loadPatient();

  }

  checkChange(value: any, event: any) {  // change checkbox 
    this.patients?.forEach(element => {
      if (element.id == value) element.selected = event.currentTarget.checked;
    });
    this.setupAction();
  }
  checkedChangeAll() {                 //  check all checkbox
    this.checkAll = !this.checkAll;
    this.patients?.forEach(element => {
      element.selected = this.checkAll
    });
    this.setupAction();
  }

  getSelectedList(): Patient[] | undefined {    // get selected list   after checkbox selected
    this.patientSelected = this.patients?.filter(a => a.selected === true)!;
    return this.patientSelected;
  }
  OnCreate(value: boolean) {       //  action created
    if (value == true)
      this.router.navigate(['/patients/operation/create']);
  }
  OnEdit(value: boolean) {   // action edit
    this.router.navigate(['/patients/operation/' + this.patientSelected[0].id]);

  }
  onDelete(value: boolean) { // action delete
    this.modalRef = this.modalService.show(this.template, this.modelConfig);

  }
  OnColonoscopy( ) {   // action edit
    this.router.navigate(['/colonoscopy/operation/' + this.patientSelected[0].id]);

  }
  confirmDelete() {             // action delete confirm
    this.openSpinner();
    this.patientService.deleteRange(this.getSelectedList()).pipe(delay(500)).subscribe(
      () => { this.loadPatient(); this.modalService.hide(); this.alertService.success()},
      () => { this.alertService.error(),this.closeSpinner },
      ()=>{this.closeSpinner ()     }
    );
  }

  openSpinner(){
    this.checkSave=true;
    this.loadingBar.start();        // on edit operation
    }
  closeSpinner(){
     this.loadingBar.complete();
     this.loadingBar.stop();
  
  }

  setupAction() {             // setuo one action or more or two
    let length = this.getSelectedList()!.length;
    if (length > 0) {
      if (length < 2) {
        this.oneAction = true;
        this.moreAction = true;
      }
      else { this.moreAction = true; this.oneAction = false }
    } else { this.moreAction = this.oneAction = false }
   }

  ngOnDestroy(): void {   // destpory subscription
    this.notifier.next();
    this.notifier.complete();
  }

}

