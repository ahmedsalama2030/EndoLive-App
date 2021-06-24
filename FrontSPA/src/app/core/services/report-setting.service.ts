import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ReportSetting } from '../models/Entities/RepportSetting';
import { PaginationResult } from '../models/hepler/Pagination ';
import { GeneralServicesService } from './general-services.service';

@Injectable({
  providedIn: 'root'
})
export class ReportSettingService extends GeneralServicesService<ReportSetting> {
  baseUrl='colonoscopyReport/';
   constructor(protected http:HttpClient) {
   super(http,'colonoscopyReport');
 }
    
 
 }
 
