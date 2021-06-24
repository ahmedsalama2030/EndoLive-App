import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
 import { takeUntil, delay } from 'rxjs/operators';
import { Doctor } from 'src/app/core/models/Entities/Doctor';
import { Pagination, PaginationResult } from 'src/app/core/models/hepler/Pagination ';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { DoctorService } from 'src/app/core/services/doctor.service';

@Component({
  selector: 'eg-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
 
export class DoctorListComponent implements OnInit, OnDestroy {
  filterList: any;   // filter  search
  moreListAction: any;    // more action
  doctors?: Doctor[];  // list Doctor
  notifier = new Subject();  // valiable destory
  doctorSelected: Doctor[] = []; // new list selected
  pagination!: Pagination;   // pagination 
  checkAll: boolean = false;  // check box status
  selectedList?: Doctor[];
  modalRef: BsModalRef | undefined;  // model ref 
  @ViewChild('template') template!: TemplateRef<any>;
  modelConfig = {                       // 
    animated: true             // model config
  };
  oneAction: boolean = false;   // one action ex  edit ,delete 
  moreAction: boolean = false;   // more action ex  delete
  checkSave:boolean=false;
  constructor(
    private doctorService: DoctorService,
    public translate: TranslateService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private modalService: BsModalService,
    private toster: ToastrService,
    private loadingBar: LoadingBarService,
  ) { }
  ngOnInit(): void {
    this.routerActive.data.subscribe(         ///get data resolver Doctor list 
      (res) => {
        this.doctors = res['data'].result;
        this.pagination = res['data'].pagination!;
        console.log(res);
      }, err => { this.toster.error('fail') }
    );
    this.getFilterList();  // get filter list
  }
  getFilterList() {       // set filter type
    this.filterList = [
      { name: 'name', value: 'name' },
      { name: 'phone', value: 'phone' },
      { name: 'university', value: 'university' },
      { name: 'is Consultant', value: 'isConsultant' },
      { name: 'is Show Report ', value: 'isShowReportMenu' },
      { name: 'department', value: 'department' }
    ];
  }  
  loadData() {           // lget Doctor from api      
    this.doctorService.get(this.pagination.currentPage, this.pagination.itemPerPage, this.pagination.filterType, this.pagination.filterValue).pipe(takeUntil(this.notifier)).subscribe(
      (res: PaginationResult<Doctor[]>) => {
        this.doctors = res.result;
        this.pagination = res.pagination!;
      }
    );
  }
  changeSearch(values: any) {   // change search value
    this.pagination.filterType = values.filterType;
    this.pagination.filterValue = values.filterValue;
    this.loadData();
  }
  changeLenghtSize(event: any) {  // change length page size
    this.pagination.itemPerPage = event;
    this.loadData();
  }
  PageChanged(event: any) {     // pagination change
    this.pagination.currentPage = event.page;
    this.loadData();

  }

  checkChange(value: any, event: any) {  // change checkbox 
    this.doctors?.forEach(element => {
      if (element.id == value) element.selected = event.currentTarget.checked;
    });
    this.setupAction();
  }
  checkedChangeAll() {                 //  check all checkbox
    this.checkAll = !this.checkAll;
    this.doctors?.forEach(element => {
      element.selected = this.checkAll
    });
    this.setupAction();
  }

  getSelectedList(): Doctor[] | undefined {    // get selected list   after checkbox selected
    this.doctorSelected = this.doctors?.filter(a => a.selected === true)!;
    return this.doctorSelected;
  }
  OnCreate(value: boolean) {       //  action created
    if (value == true)
      this.router.navigate(['/doctors/operation/create']);
  }
  OnEdit(value: boolean) {   // action edit
    this.router.navigate(['/doctors/operation/' + this.doctorSelected[0].id]);

  }
  onDelete(value: boolean) { // action delete
    this.modalRef = this.modalService.show(this.template, this.modelConfig);

  }
  confirmDelete() {             // action delete confirm
    this.loadingBar.start();
    this.checkSave=true;
    this.doctorService.deleteRange(this.getSelectedList()).pipe(delay(500)).subscribe(
      () => { this.loadData(); this.modalService.hide(); this.toster.success('success')},
      () => { this.toster.error('fail') },
      ()=>{this.loadingBar.complete(),this.loadingBar.stop(),    this.checkSave=false; }
    );
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
