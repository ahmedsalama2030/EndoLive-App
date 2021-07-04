import {  Department } from '../models/Entities/Department';
import { Observable, observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationResult } from '../models/hepler/Pagination ';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl=environment.apiUrl+'departments/';
  constructor(private http:HttpClient) { }
 // get all doctors list from api
 get(pageNumber?:any,itemsPerPage?:any,filterType?:any,filterValue?:any,sortType?:any):Observable<PaginationResult<Department[]>>{
  const paginationResult:PaginationResult<Department[]> = new PaginationResult<Department[]>();
  let params=new HttpParams();
  if(pageNumber!=null&&itemsPerPage !=null){
    params=params.append('pageNumber',pageNumber);
    params=params.append('pageSize',itemsPerPage);
    params=params.append('filterType',filterType||'' );
    params=params.append('filterValue',filterValue||'' );
      params=params.append('sortType',sortType||'' );

  }
  return this.http.get<Department[]>(this.baseUrl, {observe:'response',params}).pipe(
    map(response=>{
      paginationResult.result=response.body || undefined ; 
      if(response.headers.get('Pagination')!=null){
        paginationResult.pagination=JSON.parse(response.headers.get('Pagination')||'');
     }
      return paginationResult;
    })
  );
  
  }
  getall():Observable<Department[]>{
   return this.http.get<Department[]>(this.baseUrl+'getall/');
  }
  register(model:any):Observable<Department>{
    return this.http.post<Department>(this.baseUrl+'register/',model);
  }
  edit(id:any,model:any):Observable<Department>{
    return this.http.put<Department>(this.baseUrl+id,model);
  }
  deleteRange(model:any){
    return   this.http.post(this.baseUrl+'deleterange',model)
  }
  delete(id:string)
  {
    return this.http.delete(this.baseUrl+id)
  }
  
}
