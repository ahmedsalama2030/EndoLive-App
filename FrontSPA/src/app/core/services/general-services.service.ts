import { PaginationResult } from 'src/app/core/models/hepler/Pagination ';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Degree } from '../models/Entities/Degree';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

 
export abstract  class GeneralServicesService<T> {
  baseUrl = environment.apiUrl  
  constructor(protected http: HttpClient,protected typeUrl:string ) { 
     this.baseUrl=this.baseUrl+typeUrl;
  }
  get(pageNumber?: any, itemsPerPage?: any, filterType?: any, filterValue?: any, sortType?: any): Observable<PaginationResult<T[]>> {
    const paginationResult: PaginationResult<T[]> = new PaginationResult<T[]>();
    let params = new HttpParams();
    if (pageNumber != null && itemsPerPage == null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', itemsPerPage);
      params = params.append('filterType', filterType);
      params = params.append('filterValue', filterValue);
      params = params.append('sortType', sortType);
     }
     return this.http.get<T[]>(this.baseUrl,{observe:'response',params}).pipe(
       map(res=>{
         paginationResult.result=res.body ||  undefined;
         if(res.headers.get('Pagination')!=null){
          paginationResult.pagination=JSON.parse(res.headers.get('Pagination')||'');
       }
        return paginationResult;
       })
     );

  }
  
  register(model: any):Observable<T> {
   return this.http.post<T>(this.baseUrl + 'register', model)
  }
  edit(id: any, model: any):Observable<T> {
    return this.http.put<T>(this.baseUrl + 'register' + id, model)

  }
  deleteRange(model: any) {
    return this.http.post(this.baseUrl + 'deleterange', model)
  }
  delete(id: string) {
    return this.http.delete(this.baseUrl + id)
  }
}
