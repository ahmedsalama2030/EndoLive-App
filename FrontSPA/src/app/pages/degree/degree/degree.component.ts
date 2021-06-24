import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil, delay } from 'rxjs/operators';
import { Degree } from 'src/app/core/models/Entities/Degree';
import { Pagination, PaginationResult } from 'src/app/core/models/hepler/Pagination ';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';
 import { DegreeService } from 'src/app/core/services/degree.service';
 @Component({
  selector: 'degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css']
})
 
export class DegreeComponent implements OnInit, OnDestroy {
  filterList: any;   // filter  search
  moreListAction: any;    // more action
  degrees?: Degree[];  // list Degree
  notifier = new Subject();  // valiable destory
  departmentSelected: Degree[] = []; // new list selected
  pagination!: Pagination;   // pagination 
  checkAll: boolean = false;  // check box status
  selectedList?: Degree[];
  modalRef: BsModalRef | undefined;  // model ref 
  @ViewChild('template') template!: TemplateRef<any>;
  modelConfig = {                       // 
    animated: true             // model config
  };
  oneAction: boolean = false;   // one action ex  edit ,delete 
  moreAction: boolean = false;   // more action ex  delete
  checkSave:boolean=false;
  addStatus:boolean=false;
  editStatus:boolean=false;
  form:any={}
  constructor(
    private degreeService: DegreeService,
    public translate: TranslateService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private modalService: BsModalService,
    private toster: ToastrService,
    private loadingBar: LoadingBarService,
   ) { }
  ngOnInit(): void {
    this.routerActive.data.subscribe(         ///get data resolver Degree list 
      (res) => {
        this.degrees = res['data'].result;
        this.pagination = res['data'].pagination!;
        console.log(res);
      }, err => { this.toster.error('fail') }
    );
    this.getFilterList();  // get filter list
  }
  getFilterList() {       // set filter type
    this.filterList = [
      { name: 'name', value: 'name' },
      { name: 'nameAr', value: 'name Ar' },
    
    ];
  }  
  loadData() {   
    // lget Degree from api  
     
    this.degreeService.get(this.pagination.currentPage, this.pagination.itemPerPage, this.pagination.filterType, this.pagination.filterValue).pipe(takeUntil(this.notifier)).subscribe(
      (res: PaginationResult<Degree[]>) => {
         this.degrees = res.result;
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
    console.log(event)

  }
  PageChanged(event: any) {     // pagination change
    this.pagination.currentPage = event.page;
    this.loadData();

  }

  checkChange(value: any, event: any) {  // change checkbox 
    this.degrees?.forEach(element => {
      if (element.id == value) element.selected = event.currentTarget.checked;
    });
    this.setupAction();
  }
  checkedChangeAll() {                 //  check all checkbox
    this.checkAll = !this.checkAll;
    this.degrees?.forEach(element => {
      element.selected = this.checkAll
    });
    this.setupAction();
  }

  getSelectedList(): Degree[] | undefined {    // get selected list   after checkbox selected
    this.departmentSelected = this.degrees?.filter(a => a.selected === true)!;
    return this.departmentSelected;
  }
  OnCreate(value: boolean) {       //  action created
    if (value == true)
    this.addStatus=true;
    this.form={}
    this.editStatus= false;

  }
  createdDepartment(){
    
    this.loadingBar.start();
    this.degreeService.register(this.form).pipe(delay(500)).subscribe(
      (res)=>{
        this.addStatus=false; 
        this.loadData();
        this.toster.success('success')},
      ()=>{this.loderClose(),this.toster.error('error')},
      ()=>{this.loderClose()}
    )
  
  }
  editDepartment(){
    
        this.loadingBar.start();
        this.degreeService.edit(this.form.id,this.form).pipe(delay(500)).subscribe(
          ()=>{
            this.editStatus=false; 
           this.editStatus; 
            this.toster.success('success')},
          ()=>{this.loderClose();this.toster.error('error')},
          ()=>{this.loderClose()}
        )
          
  }
  OnEdit(value: boolean) {   // action edit
    if(value=true)
    this.addStatus=false;
      this.form={}
      this.editStatus= true;
    this.form = this.getSelectedList()![0];
     
  }
  closeform(){
    this.addStatus=this.editStatus=false;
  }
  onDelete(value: boolean) { // action delete
    this.modalRef = this.modalService.show(this.template, this.modelConfig);

  }
  confirmDelete() {             // action delete confirm
    this.loadingBar.start();
    this.checkSave=true;
    this.degreeService.deleteRange(this.getSelectedList()).pipe(delay(500)).subscribe(
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

   loderClose(){
    this.loadingBar.complete();this.loadingBar.stop()
   }
  ngOnDestroy(): void {   // destpory subscription
    this.notifier.next();
    this.notifier.complete();
  }

}

