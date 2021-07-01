 import { PaginationResult } from 'src/app/core/models/hepler/Pagination ';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Degree } from '../models/Entities/Degree';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  baseUrl = environment.apiUrl+'degrees/';
  constructor(private http: HttpClient) { }
  get(pageNumber?: any, itemsPerPage?: any, filterType?: any, filterValue?: any, sortType?: any): Observable<PaginationResult<Degree[]>> {
    
    
    const paginationResult: PaginationResult<Degree[]> = new PaginationResult<Degree[]>();
    let params = new HttpParams();
    if (pageNumber != null && itemsPerPage == null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', itemsPerPage);
      params = params.append('filterType', filterType);
      params = params.append('filterValue', filterValue);
      params = params.append('sortType', sortType);
     }
     console.log(itemsPerPage);
     return this.http.get<Degree[]>(this.baseUrl,{observe:'response',params}).pipe(
       map(res=>{
         paginationResult.result=res.body ||  undefined;
         if(res.headers.get('Pagination')!=null){
          paginationResult.pagination=JSON.parse(res.headers.get('Pagination')||'');
       }
        return paginationResult;
       })
     );

  }
  getall() {
    return this.http.get(this.baseUrl + 'getall/');
  }
  getById(id:string):Observable<Degree>{
    return this.http.get<Degree>(this.baseUrl+id);

  }
  register(model: any):Observable<Degree> {
   return this.http.post<Degree>(this.baseUrl + 'register', model)
  }
  edit(id: any, model: any):Observable<Degree> {
    return this.http.put<Degree>(this.baseUrl + id, model)

  }
  deleteRange(model: any) {
    return this.http.post(this.baseUrl + 'deleterange', model)
  }
  delete(id: string) {
    return this.http.delete(this.baseUrl + id)
  }
}
