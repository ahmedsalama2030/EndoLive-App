import { BaseReportComponent } from "./base-report/base-report.component";
import { PhotoReportComponent } from "./photo-report/photo-report.component";
import { ReportInfoComponent } from "./report-info/report-info.component";
import { ReportParamenterOperationComponent } from "./report-paramenter-operation/report-paramenter-operation.component";
import { TableComponent } from "./table/table.component"
export  const components:any[]=[
    TableComponent,BaseReportComponent,
    ReportParamenterOperationComponent,ReportInfoComponent,PhotoReportComponent]

 
export * from "./table/table.component";
export * from "./base-report/base-report.component";
export * from "./report-paramenter-operation/report-paramenter-operation.component";
export *   from "./photo-report/photo-report.component";