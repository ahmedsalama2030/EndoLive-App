import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
 import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
  import { Pagination } from 'src/app/core/models/hepler/Pagination ';
import { AlertService } from 'src/app/core/services/alert.service';
//   import   jsPDF  from 'jspdf';
//  import html2canvas from 'html2canvas';
 
    
@Component({
  selector: 'eg-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit  {
  @Input() filterList?: any;            // input filter list
  @Input() Pagination!: Pagination;    // input pagination 
  @Input() oneAction!: boolean;       // input one action check
  @Input() moreAction!: boolean;     // input more action check
  @Output() searchChange = new EventEmitter<Object>();           // output search Change
  @Output() listLenghtChange = new EventEmitter<string>();      // output list Lenght Change
  @Output() PageChanged = new EventEmitter<string>();          // output pagination  Change
  @Output() onDelete = new EventEmitter<boolean>();           // output delete  Change
  @Output() OnEdit = new EventEmitter<boolean>();            // output edit  Change
  @Output() OnCreate = new EventEmitter<boolean>();         // output create  Change
   listEntires?: any;
   dir?:string;
  selectFilter?:string;
  constructor( 
    private alertService:AlertService ,
    private translateService:TranslateService
    ) { }

  ngOnInit(): void {
     this.createRecordListSize();  // get list entries
     this.dir=(localStorage.getItem('lang')||'en')=='en'?'ltr':'rtl';
     console.log()
     this.translateService.onLangChange.subscribe(
       (event: LangChangeEvent)=>{
 this.dir=event.lang=='en'?'ltr':'rtl';
 
       }
     )
   }

  createRecordListSize() {   // list entries
    this.listEntires = [7, 10, 20, 30, 50, 100, 500, 100, 10000]
  }

  onSearch(value:string) { // search send
    let searchObj={filterType:this.selectFilter,filterValue:value};
    console.log(searchObj);
    this.searchChange.emit(searchObj)
  }
  LenghtChanged(e: any) {  // legth page send
     this.listLenghtChange.emit(e.target.value);
  }
  pageChanged(value: any) {
    this.PageChanged.emit(value);
  }

  printPdf() {
this.alertService.info("in next version");
return;
//         let DATA = document.getElementById('tableList')!;

// html2canvas(DATA).then(canvas => {
    
//     let fileWidth = 208;
//     let fileHeight = canvas.height * fileWidth / canvas.width;
    
//     const FILEURI = canvas.toDataURL('image/png')
//     let PDF = new jsPDF('p', 'mm', 'a4');
//     let position = 0;
//     PDF.text('ee',60,60);
//     PDF.addImage(FILEURI, 'PNG', 0, 10, fileWidth-10, fileHeight-10)
//       PDF.output('dataurlnewwindow');

//     //PDF.save('angular-demo.pdf');
// });     
 
} 
   
selectList(value:string){
this.selectFilter=value;
}
  printExcel() {

  }
  onEditAction(){
    this.OnEdit.emit(true);
   }
  onDeleteAction(){
    this.onDelete.emit(true);
  }
  onCreateAction(){
    this.OnCreate.emit(true);
  }
   
}
