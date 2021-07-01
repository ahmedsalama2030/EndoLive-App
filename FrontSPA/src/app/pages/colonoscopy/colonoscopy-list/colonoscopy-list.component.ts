

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
 import { takeUntil, delay } from 'rxjs/operators';
import { Colonoscopy } from 'src/app/core/models/Entities/Colonoscopy';
import { Pagination, PaginationResult } from 'src/app/core/models/hepler/Pagination ';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';
 import { AlertService } from 'src/app/core/services/alert.service';
 import { ColonoscopyReportService } from 'src/app/core/services/colonoscopy-report.service';
@Component({
  selector: 'colonoscopy-list',
  templateUrl: './colonoscopy-list.component.html',
  styleUrls: ['./colonoscopy-list.component.css']

})
 
export class ColonoscopyListComponent implements OnInit, OnDestroy {
  filterList: any;   // filter  search
  moreListAction: any;    // more action
  colonoscopies?: Colonoscopy[];  // list Colonoscopy
  notifier = new Subject();  // valiable destory
  colonoscopySelected: Colonoscopy[] = []; // new list selected
  pagination!: Pagination;   // pagination 
  checkAll: boolean = false;  // check box status
  selectedList?: Colonoscopy[];
  modalRef: BsModalRef | undefined;  // model ref 
  @ViewChild('template') template!: TemplateRef<any>;
  modelConfig = {                       // 
    animated: true             // model config
  };
  oneAction: boolean = false;   // one action ex  edit ,delete 
  moreAction: boolean = false;   // more action ex  delete
  checkSave:boolean=false;
  constructor(
    private colonoscopyReportService: ColonoscopyReportService,
    public translate: TranslateService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private modalService: BsModalService,
    private alertService:AlertService,
    private loadingBar: LoadingBarService,
  ) { }
  ngOnInit(): void {
    this.routerActive.data.subscribe(         ///get data resolver Colonoscopy list 
      (res) => {
        console.log(res['data']);
        this.colonoscopies = res['data'].result;
        this.pagination = res['data'].pagination!;
       }, err => { this.alertService.error() }
    );
    this.getFilterList();  // get filter list
  }
  getFilterList() {       // set filter type
    this.filterList = [
      { name: 'dateOfReport', value: 'dateOfReport' ,searchTag:'colonoscopy'},
      { name: 'patient name', value: 'patientName',searchTag:'colonoscopy' },
      { name: 'consultant name', value: 'consultantName',searchTag:'colonoscopy' },
      { name: 'EndoscopistName', value: 'EndoscopistName',searchTag:'colonoscopy' }
      ];
  }  
  loadData() {           // lget Colonoscopy from api      
    this.colonoscopyReportService.get(this.pagination.currentPage, this.pagination.itemPerPage, this.pagination.filterType, this.pagination.filterValue).pipe(takeUntil(this.notifier)).subscribe(
      (res: PaginationResult<Colonoscopy[]>) => {
        this.colonoscopies = res.result;
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
    this.colonoscopies?.forEach(element => {
      if (element.id == value) element.selected = event.currentTarget.checked;
    });
    this.setupAction();
  }
  checkedChangeAll() {                 //  check all checkbox
    this.checkAll = !this.checkAll;
    this.colonoscopies?.forEach(element => {
      element.selected = this.checkAll
    });
    this.setupAction();
  }

  getSelectedList(): Colonoscopy[] | undefined {    // get selected list   after checkbox selected
    this.colonoscopySelected = this.colonoscopies?.filter(a => a.selected === true)!;
    return this.colonoscopySelected;
  }
  OnCreate(value: boolean) {       //  action created
    if (value == true)
      this.router.navigate(['/colonoscopy/operation/create']);
  }
  OnEdit(value: boolean) {   // action edit
    this.router.navigate(['/colonoscopy/operation/' + this.colonoscopySelected[0].id]);

  }
  onDelete(value: boolean) { // action delete
    this.modalRef = this.modalService.show(this.template, this.modelConfig);

  }
  confirmDelete() {             // action delete confirm
    this.loadingBar.start();
    this.checkSave=true;
    this.colonoscopyReportService.deleteRange(this.getSelectedList()).pipe(delay(500)).subscribe(
      () => { this.loadData(); this.modalService.hide(); this.alertService.success()},
      () => { this.alertService.error() },
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
